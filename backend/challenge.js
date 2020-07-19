function generateTests(challenge) {
    let command = "";

    Object.entries(challenge).forEach(([suiteName, tests], _) => {
        command += `"${suiteName}": [`;
        tests.forEach((test, index) => {
            command += `$(execTest "${test.args.join(" ")}" "${test.stdout}" "${test.stderr}" ${test.code})${tests.length - 1 !== index ? ',' : ''}`;
        });
        command += "],";
    });
    return `#!/bin/bash

# $1 => args
# $2 => stdout
# $3 => stderr
# $4 => exit status
execTest() {
    eval "$({ berr=$({ bout=$(eval "./bin.out" $1); bret=$?; } 2>&1; declare -p bout bret >&2); declare -p berr; } 2>&1)"
    status=""
    if [ "$bout" = "$2" ] && [ "$berr" = "$3" ] && [ $bret -eq $4 ]; then
        status="passed"
    else
        status="failed"
    fi
    echo -ne "{\\"status\\":\\"$status\\", \\"code\\":\\"$bret\\", \\"stdout\\":\\"$bout\\", \\"stderr\\":\\"$berr\\"}"
}

echo {${command.substring(0, command.length - 1)}}`;
}

module.exports = generateTests;
