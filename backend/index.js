const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');
const fse = require('fs-extra');
const Docker = require('dockerode');
const { WritableStream } = require('memory-streams');

async function execLang(docker, image, filename, req, res) {
  const directory = `${process.cwd()}/${uuidv4()}`;
  const stdout = new WritableStream();
  const stderr = new WritableStream();

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

const endpoints = [
  { path: '/clang',      image: 'c_app',          filename: "test.c"  },
  { path: '/python',     image: 'python_app',     filename: "test.py" },
  { path: '/javascript', image: 'javascript_app', filename: "test.js" },
];

function main() {
  const host = 4000;
  const app = express();
  const docker = new Docker();

  app.use(bodyParser.json());
  app.use(cors());

  endpoints.forEach(endpoint => {
    app.post(endpoint.path, async function (req, res) {
      console.log(`request POST on ${endpoint.path}`);
      await execLang(docker, endpoint.image, endpoint.filename, req, res);
    });
  });

  app.listen(host, () => {
    console.log(`listening on port ${host}`);
  });
}

main();
