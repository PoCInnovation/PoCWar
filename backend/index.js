var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var jsonParser = bodyParser.json()
let { exec } = require("child_process");
const { v4: uuidv4 } = require('uuid');
var cors = require("cors");

app.listen(4000, () => {
    console.log("listening on port 4000");
});

app.use(cors());

app.post('/clang', jsonParser, function (req, res) {
    console.log("request POST on /clang.");
    let name = uuidv4();
    console.log(name);
    fs = require('fs');
    fs.writeFile('test.c', req.body.code, function (err) {
        if (err) return console.log(err);
        console.log('file write in test.c');
    });
    exec(`docker run -v "${process.cwd()}:/execution" app`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.status(500).send({stdout:stdout, stderr:stderr, error:error.message});
            return;
        }
        console.log(`stdout: ${stdout} stderr: ${stderr}`);
        res.status(200).send({stdout:stdout, stderr:stderr});
    });
});

app.post('/python', jsonParser, function (req, res) {
    console.log("request POST on /python.");
    fs = require('fs');
    fs.writeFile('test.py', req.body.code, function (err) {
        if (err) return console.log(err);
        console.log('file write in test.py');
    });
    exec(`docker run -v "${process.cwd()}:/execution" python_app`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.status(500).send(`error in docker run : ${error.message}`);
            return;
        }
        console.log(`stdout: ${stdout} stderr: ${stderr}`);
        res.status(200).send({stdout:stdout, stderr:stderr});
    });
});

app.post('/javascript', jsonParser, function (req, res) {
    console.log("request POST on /javascript.");
    fs = require('fs');
    fs.writeFile('test.js', req.body.code, function (err) {
        if (err) return console.log(err);
        console.log('file write in test.js');
    });
    exec(`docker run -v "${process.cwd()}:/execution" javascript_app`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.status(500).send(`error in docker run : ${error.message}`);
            return;
        }
        console.log(`stdout: ${stdout} stderr: ${stderr}`);
        res.status(200).send({stdout:stdout, stderr:stderr});
    });
});