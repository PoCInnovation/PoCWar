#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <criterion/stats.h>
#include <criterion/options.h>
#include <criterion/internal/ordered-set.h>
#include <log/logging.h>
#include <compat/posix.h>
#include <compat/strtok.h>
#include <compat/time.h>
#include <config.h>
#include <common.h>

#define JSON_TEST_TEMPLATE_BEGIN                     \
    "        {\n"                                    \
    "          \"name\": \"%s\",\n"                  \
    "          \"assertions\": %" CRI_PRIuSIZE ",\n" \
    "          \"status\": \"%s\""

#define JSON_TEST_TEMPLATE_END \
    "\n"                       \
    "        }"

#define JSON_TEST_FAILED_TEMPLATE_BEGIN \
    ",\n"                               \
    "          \"messages\": [\n"

#define JSON_TEST_FAILED_TEMPLATE_END \
    "\n"                              \
    "          ]"

#define JSON_FAILURE_MSG_ENTRY \
    "            \"%s:%u: %s\""

#define JSON_CRASH_MSG_ENTRY \
    ",\n"                    \
    "          \"messages\": [\"The test crashed.\"]"

#define JSON_TIMEOUT_MSG_ENTRY \
    ",\n"                      \
    "          \"messages\": [\"The test timed out.\"]"

#define JSON_TEST_SKIPPED_TEMPLATE_BEGIN \
    ",\n"                                \
    "          \"messages\": [\""

#define JSON_TEST_SKIPPED_TEMPLATE_END \
    "\"]"

#define JSON_SKIPPED_MSG_ENTRY \
    "The test was skipped."

#define JSON_TEST_LIST_TEMPLATE_BEGIN \
    "      \"tests\": [\n"

#define JSON_TEST_LIST_TEMPLATE_END \
    "      ]\n"

#define JSON_TESTSUITE_TEMPLATE_BEGIN         \
    "    {\n"                                 \
    "      \"name\": \"%s\",\n"               \
    "      \"passed\": %" CRI_PRIuSIZE ",\n"  \
    "      \"failed\": %" CRI_PRIuSIZE ",\n"  \
    "      \"errored\": %" CRI_PRIuSIZE ",\n" \
    "      \"skipped\": %" CRI_PRIuSIZE ",\n"

#define JSON_TESTSUITE_TEMPLATE_END \
    "    }"

#define JSON_TESTSUITE_LIST_TEMPLATE_BEGIN \
    "  \"test_suites\": [\n"

#define JSON_TESTSUITE_LIST_TEMPLATE_END \
    "  ]\n"

#define JSON_BASE_TEMPLATE_BEGIN              \
    "{\n"                                     \
    "  \"id\": \"Criterion " VERSION "\",\n"  \
    "  \"passed\": %" CRI_PRIuSIZE ",\n"      \
    "  \"failed\": %" CRI_PRIuSIZE ",\n"      \
    "  \"errored\": %" CRI_PRIuSIZE ",\n"     \
    "  \"skipped\": %" CRI_PRIuSIZE ",\n"     \

#define JSON_BASE_TEMPLATE_END \
    "}\n"

static CR_INLINE const char *get_status_string(struct criterion_test_stats *ts)
{
    return (ts->crashed || ts->timed_out)           ? "ERRORED"
           : ts->test_status == CR_STATUS_FAILED     ? "FAILED"
           : ts->test_status == CR_STATUS_SKIPPED    ? "SKIPPED"
           : "PASSED";
}

static void print_test(FILE *f, struct criterion_test_stats *ts)
{
    fprintf(f, JSON_TEST_TEMPLATE_BEGIN,
            ts->test->name,
            (size_t) (ts->passed_asserts + ts->failed_asserts),
            get_status_string(ts)
            );

    if (ts->test_status == CR_STATUS_SKIPPED) {
        fprintf(f, "%s%s%s", JSON_TEST_SKIPPED_TEMPLATE_BEGIN,
                ts->message ? ts->message : JSON_SKIPPED_MSG_ENTRY,
                JSON_TEST_SKIPPED_TEMPLATE_END);
    } else if (ts->crashed) {
        fprintf(f, JSON_CRASH_MSG_ENTRY);
    } else if (ts->timed_out) {
        fprintf(f, JSON_TIMEOUT_MSG_ENTRY);
    } else if (ts->test_status == CR_STATUS_FAILED) {
        fprintf(f, JSON_TEST_FAILED_TEMPLATE_BEGIN);

        bool first = true;
        for (struct criterion_assert_stats *asrt = ts->asserts; asrt; asrt = asrt->next) {
            if (!asrt->passed) {
                if (!first)
                    fprintf(f, ",\n");
                else
                    first = false;

                bool sf = criterion_options.short_filename;
                char *dup = strdup(*asrt->message ? asrt->message : "");
                char *saveptr = NULL;
                char *line = strtok_r(dup, "\n", &saveptr);

                fprintf(f, JSON_FAILURE_MSG_ENTRY,
                        sf ? basename_compat(asrt->file) : asrt->file,
                        asrt->line,
                        line
                        );

                while ((line = strtok_r(NULL, "\n", &saveptr)))
                    fprintf(f, ",\n            \"  %s\"", line);
                free(dup);
            }
        }
        fprintf(f, JSON_TEST_FAILED_TEMPLATE_END);
    }

    fprintf(f, JSON_TEST_TEMPLATE_END);
}

void json_report(FILE *f, struct criterion_global_stats *stats)
{
    fprintf(f, JSON_BASE_TEMPLATE_BEGIN,
            stats->tests_passed,
            stats->tests_failed,
            stats->tests_crashed,
            stats->tests_skipped
            );

    fprintf(f, JSON_TESTSUITE_LIST_TEMPLATE_BEGIN);
    for (struct criterion_suite_stats *ss = stats->suites; ss; ss = ss->next) {
        fprintf(f, JSON_TESTSUITE_TEMPLATE_BEGIN,
                ss->suite->name,
                ss->tests_passed,
                ss->tests_failed,
                ss->tests_crashed,
                ss->tests_skipped
                );

        fprintf(f, JSON_TEST_LIST_TEMPLATE_BEGIN);
        for (struct criterion_test_stats *ts = ss->tests; ts; ts = ts->next) {
            print_test(f, ts);
            fprintf(f, ts->next ? ",\n" : "\n");
        }
        fprintf(f, JSON_TEST_LIST_TEMPLATE_END);

        fprintf(f, JSON_TESTSUITE_TEMPLATE_END);
        fprintf(f, ss->next ? ",\n" : "\n");
    }
    fprintf(f, JSON_TESTSUITE_LIST_TEMPLATE_END);

    fprintf(f, JSON_BASE_TEMPLATE_END);
}
