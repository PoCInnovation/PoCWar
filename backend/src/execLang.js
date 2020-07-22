const challenge = require('./challenge');
const Docker = require('dockerode');
const { WritableStream } = require('memory-streams');
const { v4: uuidv4 } = require('uuid');
const fse = require('fs-extra');
const fs = require('fs');

async function execLang(config, res, code) {
  const docker = new Docker();
  const directory = `${process.cwd()}/${uuidv4()}`;
  const stdout = new WritableStream();
  const stderr = new WritableStream();

  try {
    await fse.outputFile(`${directory}/code.${config.ext}`, code);
    console.log(`file written: code.${config.ext}`);
    await fse.outputFile(`${directory}/exec.sh`, challenge.generateTests({ print_alpha: [ { code: 0, args: [], stdout: "abcdefghijklmnopqrstuvwxyz", stderr: "" } ] }));
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
    console.log(`stdout: ${stdout}\nstderr: ${stderr}`);
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

module.exports = {
  execLang
}