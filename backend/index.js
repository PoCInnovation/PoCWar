const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fse = require('fs-extra');
const Docker = require('dockerode');
const { WritableStream } = require('memory-streams');
const fs = require('fs');
const generateTest = require('./challenge');

async function execLang(docker, config, res, code) {
  const directory = `${process.cwd()}/${uuidv4()}`;
  const stdout = new WritableStream();
  const stderr = new WritableStream();

  try {
    await fse.outputFile(`${directory}/code.${config.ext}`, code);
    console.log(`file written: code.${config.ext}`);
    await fse.outputFile(`${directory}/exec.sh`, generateTest({ print_alpha: [ { code: 0, args: [], stdout: "abcdefghijklmnopqrstuvwxyz", stderr: "" } ] }));
  } catch (err) {
    console.log(err);
    return;
  }

  docker.run(config.image, [], [stdout, stderr], {
      Tty: false,
      AutoRemove: true,                   // --rm
      NetworkDisabled: false,             // --net=none
      Binds: [`${directory}:/execution`],
      //Memory: '1g',                       // limit RAM
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
        .then(() => { console.log('Recursive: Directories Deleted!') })
        .catch(error => { console.log(error); });
    });
}

const endpoints = [
  { lang: 'clang',      image: 'c_app',          ext: 'c'  },
  { lang: 'go',         image: 'go_app',         ext: 'go' },
  { lang: 'javascript', image: 'javascript_app', ext: 'js' },
  { lang: 'python',     image: 'python_app',     ext: 'py' },
  { lang: 'rust',       image: 'rust_app',       ext: 'rs' },
];

function main() {
  const host = 4000;
  const app = express();
  const docker = new Docker();

  app.use(bodyParser.json());
  app.use(cors());

  endpoints.forEach(endpoint => {
    app.post(`/${endpoint.lang}`, async function (req, res) {
      console.log(`request POST on ${endpoint.lang}`);
      await execLang(docker, endpoint, res, req.body.code);
    });
  });

  app.listen(host, () => {
    console.log(`listening on port ${host}`);
  });
}

main();
