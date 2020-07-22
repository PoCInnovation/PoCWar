const firebase = require('firebase');
const admin = require('firebase-admin');
require('firebase/storage');

function generateTests(challenge) {
    let command = `#!/bin/bash

# $1 => args
# $2 => stdout
# $3 => stderr
# $4 => exit status
exec_test() {
    eval "$({ berr=$({ bout=$(eval "./bin.out" $1); bret=$?; } 2>&1; declare -p bout bret >&2); declare -p berr; } 2>&1)"

    if [ "$bout" != "$2" ]; then
        echo -ne "{\\"status\\":\\"failed\\",\\"error\\":\\"stdout\\",\\"stdout\\":{\\"expected\\":\\"$2\\",\\"actual\\":\\"$bout\\"},"
    elif [ "$berr" != "$3" ]; then
        echo -ne "{\\"status\\":\\"failed\\",\\"error\\":\\"stderr\\",\\"stderr\\":{\\"expected\\":\\"$3\\",\\"actual\\":\\"$berr\\"},"
    elif [ $bret -ne $4 ]; then
        echo -ne "{\\"status\\":\\"failed\\",\\"error\\":\\"ret\\",\\"ret\\":{\\"expected\\":\\"$3\\",\\"actual\\":\\"$bret\\"},"
    else
        return 0
    fi
    return 1
}

echo -ne '{"suites":['
`;
    const suiteCount = Object.keys(challenge).length;
    Object.entries(challenge).forEach(([suiteName, tests], suiteIndex) => {
        let array = "";
        tests.forEach((test, index) => {
            array += `        "'${test.args.join(' ')}' '${test.stdout}' '${test.stderr}' ${test.code}"\n`;
        });
        command += `exec_suite_${suiteName}() {
    declare -a array=(
${array}
    )

    test_count=${tests.length}

    for i in "\${!array[@]}"
    do
        eval exec_test \${array[$i]}
        if [ $? -ne 0 ]; then
            break
        fi
        if [ $i -eq $(($test_count - 1)) ]; then
            echo -ne '{"status":"passed",'
        fi
    done
    echo -ne "\\"name\\":\\"${suiteName}\\",\\"test_passed\\":$i,\\"test_count\\":$test_count}${suiteIndex !== suiteCount - 1 ? ',' : ''}"
}

exec_suite_${suiteName}`;
    });
    console.log(command + '\necho "]}"');
    return command + '\necho "]}"';
}

function addChallenge(req, res) {
    const firebaseConfig = {
        apiKey: 'AIzaSyAN3COB5bWH1k9SsdX0cRQlNJ-inmYxJEU',
        authDomain: 'poc-war.firebaseapp.com',
        databaseURL: 'https://poc-war.firebaseio.com',
        storageBucket: 'poc-war.appspot.com',
        messagingSenderId: "899918222184",
        appId: "1:899918222184:web:f7af640d76a824a7aefcdd",
        measurementId: "G-N7V8BE95V2"
    };
    firebase.initializeApp(firebaseConfig);
    firebase.database().ref('challenges/').push(req.body)
        .then(() => {
            res.send('All good!').status(200);
        })
        .catch((e) => {
            res.send(`error: ${e}`).status(500);
        });
}

module.exports = {
    generateTests,
    addChallenge
};
