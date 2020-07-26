function generateTests(challenge) {
    array = "";
    challenge.tests.forEach((test, index) => {
        array += `eval_test '${test.args}'\n`; // .join(' ')
    });
    return `#!/bin/sh

bout=""
berr=""
bret=$?

json_output=$(echo '{"execution":[]}' | jq -c --arg out "$bout" --arg err "$berr" --arg ret "$bret" '.compilation = {"out":$out,"err":$err,"ret":$ret}')
if [ $bret != 0 ]
then
    echo $json_output > output.json

    exit 1
fi

eval_test() {
    bout=$(./bin.out $1 2> /tmp/stderr)
    bret=$?
    berr=$(cat < /tmp/stderr)
    json_output=$(echo $json_output | jq -c --arg out "$bout" --arg err "$berr" --arg ret "$bret" '.execution += [{"out":$out, "err":$err,"ret":$ret}]')
}

${array}

echo $json_output > output.json
`;
}

module.exports = generateTests;
