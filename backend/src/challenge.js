const firebase = require('firebase');
const admin = require('firebase-admin');
require('firebase/storage');

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
