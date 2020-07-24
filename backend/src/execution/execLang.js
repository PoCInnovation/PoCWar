const challenge = require('../routes/challenge');
const Docker = require('dockerode');
const { WritableStream } = require('memory-streams');
const { v4: uuidv4 } = require('uuid');
const fse = require('fs-extra');
const fs = require('fs');

const generateTests = require('./generateTests');

async function execLang(config, res, code) {
  const docker = new Docker();
  const directory = `${process.cwd()}/${uuidv4()}`;
  const stdout = new WritableStream();
  const stderr = new WritableStream();

  try {
    await fse.outputFile(`${directory}/code.${config.ext}`, code);
    await fse.outputFile(`${directory}/exec.sh`, generateTests({ print_alpha: [ { code: 0, args: [], stdout: "abcdefghijklmnopqrstuvwxyz", stderr: "" } ] }));
  } catch (err) {
    res.status(500).json({ error: err.message });
    return;
  }

  docker.run(config.image, [], [stdout, stderr], {
    Tty: false,
    AutoRemove: true,
    NetworkDisabled: false,
    Binds: [`${directory}:/execution`],
    //Memory: '1g', // limit RAM
  })
    .then(([data, container]) => {
      res.json({ stdout: stdout.toString(), stderr: stderr.toString() });
    })
    .catch(error => {
      console.log(`error: ${error.message}`);
      res.status(500).json({ stdout: stdout.toString(), stderr: stderr.toString(), error: error.message });
    })
    .finally(() => {
      fse.remove(directory)
        .then(() => {})
        .catch(error => { console.log(error); });
    });
}

module.exports = {
  execLang
}
