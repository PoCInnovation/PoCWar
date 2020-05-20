var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var jsonParser = bodyParser.json()
const { exec } = require("child_process");
var cors = require("cors");

app.listen(4000, () => {
    console.log("listening on port 4000");
});

app.use(cors());

app.post('/clang', jsonParser, function (req, res) {
    console.log("request GET on /.");
    fs = require('fs');
    fs.writeFile('test.c', req.body.code, function (err) {
        if (err) return console.log(err);
        console.log('file write in test.c');
    });
    exec(`gcc -o test ${process.cwd()}/test.c`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        exec(`${process.cwd()}/test`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
            console.log(`stdout: ${stdout}`);
            res.status(200).send(`${stdout}`);
            return;
        });
    });
});

app.post('/python', jsonParser, function (req, res) {
    console.log("request GET on /.");
    fs = require('fs');
    fs.writeFile('test.py', req.body.code, function (err) {
        if (err) return console.log(err);
        console.log('file write in test.c');
    });
    exec(`python3 ${process.cwd()}/test.py`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
});
