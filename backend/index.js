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

async function execLang(image, filename, req, res) {
  let dir = uuidv4();
  fs.outputFile(`${process.cwd()}/${dir}/${filename}`, req.body.code, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log(`file written: ${filename}`);
    exec(`docker run --rm -v "${process.cwd()}/${dir}:/execution" ${image}`, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        res.status(500).send({ stdout: stdout, stderr: stderr, error: error.message });
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
      res.status(200).send({ stdout: stdout, stderr: stderr });
    });
  });
}

app.post('/clang', jsonParser, async function (req, res) {
  console.log("request POST on /clang.");
  await execLang("c_app", "test.c", req, res);
});

app.post('/python', jsonParser, async function (req, res) {
  console.log("request POST on /python.");
  await execLang("python_app", "test.py", req, res);
});

app.post('/javascript', jsonParser, async function (req, res) {
  console.log("request POST on /javascript.");
  await execLang("javascript_app", "test.js", req, res);
});