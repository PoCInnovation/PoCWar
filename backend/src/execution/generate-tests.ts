export default function generateTests(tests: { args: string}[]): string {
  let array = '';
  tests.forEach((test) => {
    array += `eval_test '${test.args}'\n`;
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
    json_output=$(echo $json_output | jq -c --arg out "$bout" --arg err "$berr" --arg ret "$bret" '.tests += [{"out":$out, "err":$err,"ret":$ret | tonumber}]')
}
${array}
echo $json_output > output.json
`;
}
