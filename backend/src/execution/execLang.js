const Docker = require('dockerode');
const { v4: uuidv4 } = require('uuid');
const fse = require('fs-extra');
const generateTests = require('./generateTests');

function dockerRun(image, langExtension, sourceCode, testScript) {
  return new Promise((resolve, reject) => {
    const directory = `${process.cwd()}/${uuidv4()}`;
    const docker = new Docker();
    const dockerConfig = { // timeout 10s
      Tty: false,
      AutoRemove: true,
      NetworkDisabled: false,
      Binds: [`${directory}:/execution:delegated`],
      //Memory: '1g', // limit RAM
    };

    fse.outputFile(`${directory}/code.${langExtension}`, sourceCode, { mode: 0o755 })
      .then(() => fse.outputFile(`${directory}/exec.sh`, testScript, { mode: 0o755 }))
      .then(() => docker.run(image, [], null, dockerConfig))
      .then((_) => fse.readJSON(`${directory}/output.json`))
      .then((data) => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      })
      .finally(() => {
        fse.remove(directory)
          .then(() => {})
          .catch(error => { console.error(`Folder (${directory}) deletion failed: ${error.message}`); });
      });
  });
}

async function execLang(refLang, refCode, userLang, userCode) {
  testScript = generateTests({ tests: [ { args: '1 2 3 4' } ] });

  ref = dockerRun(refLang.image, refLang.ext, refCode, testScript);
  user = dockerRun(userLang.image, userLang.ext, userCode, testScript);

  return {
    ref: await ref,
    user: await user
  };
}

module.exports = {
  execLang
}
