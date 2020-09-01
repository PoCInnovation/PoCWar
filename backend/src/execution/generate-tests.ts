export default function generateTests(compilation: string, tests: { args: string}[]): string {
  let array = '';
  tests.forEach((test) => {
    array += `eval_test '${test.args}'\n`;
  });
  return `#!/bin/bash
bout=$(${compilation} 2> stderr)
berr="$(cat < stderr)"
bret=$?
json_output=$(echo '{"execution":[]}' | jq -c --arg out "$bout" --arg err "$berr" --arg ret "$bret" '.compilation = {"out":$out,"err":$err,"ret":$ret | tonumber}')
if [ $bret != 0 ]
then
    echo $json_output > output.json
    exit 1
fi
eval_test() {
    bout=$(./bin.out $1 2> stderr)
    bret=$?
    berr=$(cat < stderr)
    json_output=$(echo $json_output | jq -c --arg out "$bout" --arg err "$berr" --arg ret "$bret" '.tests += [{"out":$out, "err":$err,"ret":$ret | tonumber}]')
}
${array}
echo $json_output > output.json
`;
}
