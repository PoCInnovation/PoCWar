const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');
const fse = require('fs-extra');
const Docker = require('dockerode');
const { WritableStream } = require('memory-streams');

const docker = new Docker()

async function execLang(image, filename, req, res) {
  const stdout = new WritableStream()
  const stderr = new WritableStream()

  const directory = `${process.cwd()}/${uuidv4()}`;

  try {
    await fse.outputFile(`${directory}/${filename}`, req.body.code);
    console.log(`file written: ${filename}`);
  } catch (err) {
    console.log(err);
    return;
  }

  docker.run(image, [], [stdout, stderr], {
      Tty: false,
      AutoRemove: true,       // --rm
      NetworkDisabled: false, // --net=none
      Binds: [`${directory}:/execution`]
    })
    .then(([data, container]) => {
      console.log(`stdout: ${stdout}\n stderr: ${stderr}`);
      res.send({ stdout: stdout.toString(), stderr: stderr.toString() });
    })
    .catch(error => {
      console.log(`error: ${error.message}`);
      res.status(500).send({ stdout: stdout.toString(), stderr: stderr.toString(), error: error.message });
    })
    .finally(() => {
      fse.remove(directory)
        .then(() => { console.log("Recursive: Directories Deleted!") })
        .catch(error => { console.log(error); });
    });
}

endpoints = [
  { path: '/clang',      image: 'c_app',          filename: "test.c"  },
  { path: '/python',     image: 'python_app',     filename: "test.py" },
  { path: '/javascript', image: 'javascript_app', filename: "test.js" },
];

const app = express();

app.use(bodyParser.json());
app.use(cors());

endpoints.forEach(endpoint => {
  app.post(endpoint.path, async function (req, res) {
    console.log(`request POST on ${endpoint.path}`);
    await execLang(endpoint.image, endpoint.filename, req, res);
  });
});

app.listen(4000, () => {
  console.log("listening on port 4000");
});
