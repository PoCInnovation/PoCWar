var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var jsonParser = bodyParser.json()
let { exec } = require("child_process");
const { v4: uuidv4 } = require('uuid');
var cors = require("cors");
const fs = require('fs-extra')

app.listen(4000, () => {
    console.log("listening on port 4000");
});

app.use(cors());

app.post('/clang', jsonParser, function (req, res) {
    console.log("request POST on /clang.");
    let dir = uuidv4();
    console.log(`${process.cwd()}/${dir}`);
    fs.mkdir(`${process.cwd()}/${dir}`, { recursive: true }, (err) => {
        if (err) throw err;
    });
    fs.writeFile(`${dir}/test.c`, req.body.code, function (err) {
        if (err) return console.log(err);
        console.log('file write in test.c');
    });
    exec(`docker run --rm -v "${process.cwd()}/${dir}:/execution" app`, { timeout: 1000 }, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.status(500).send({stdout:stdout, stderr:stderr, error:error.message});
            return;
        }
        console.log(`stdout: ${stdout} stderr: ${stderr}`);
        fs.remove(`${process.cwd()}/${dir}`, (error) => { 
            if (error) { 
              console.log(error); 
            } 
            else { 
              console.log("Recursive: Directories Deleted!"); 
            } 
          });
        res.status(200).send({stdout:stdout, stderr:stderr});
    });
});

app.post('/python', jsonParser, function (req, res) {
    console.log("request POST on /python.");
    let dir = uuidv4();
    console.log(`${process.cwd()}/${dir}`);
    fs.mkdir(`${process.cwd()}/${dir}`, { recursive: true }, (err) => {
        if (err) throw err;
    });
    fs.writeFile(`${process.cwd()}/${dir}/test.py`, req.body.code, function (err) {
        if (err) return console.log(err);
        console.log('file write in test.c');
    });
    exec(`docker run -v "${process.cwd()}/${dir}:/execution" python_app`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.status(500).send({stdout:stdout, stderr:stderr, error:error.message});
            return;
        }
        console.log(`stdout: ${stdout} stderr: ${stderr}`);
        fs.remove(`${process.cwd()}/${dir}`, (error) => { 
            if (error) { 
              console.log(error); 
            } 
            else { 
              console.log("Recursive: Directories Deleted!"); 
            } 
          });
        res.status(200).send({stdout:stdout, stderr:stderr});
    });
});

app.post('/javascript', jsonParser, function (req, res) {
    console.log("request POST on /javascript.");
    let dir = uuidv4();
    console.log(`${process.cwd()}/${dir}`);
    fs.mkdir(`${process.cwd()}/${dir}`, { recursive: true }, (err) => {
        if (err) throw err;
    });
    fs.writeFile(`${process.cwd()}/${dir}/test.js`, req.body.code, function (err) {
        if (err) return console.log(err);
        console.log('file write in test.c');
    });
    exec(`docker run -v "${process.cwd()}/${dir}:/execution" javascript_app`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.status(500).send({stdout:stdout, stderr:stderr, error:error.message});
            return;
        }
        console.log(`stdout: ${stdout} stderr: ${stderr}`);
        fs.remove(`${process.cwd()}/${dir}`, (error) => { 
            if (error) { 
              console.log(error); 
            } 
            else { 
              console.log("Recursive: Directories Deleted!"); 
            } 
          });
        res.status(200).send({stdout:stdout, stderr:stderr});
    });
});