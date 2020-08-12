import * as os from 'os';
import * as Docker from 'dockerode';
import * as fse from 'fs-extra';
import generateTests from './generate-tests';

async function dockerRun(image, langExtension, sourceCode, testScript): Promise<string> {
  const tmpdir = await fse.promises.mkdtemp(`${os.tmpdir()}/pocwar-execution-`);
  const docker = new Docker();
  const dockerConfig = {
    Tty: false,
    AutoRemove: true,
    NetworkDisabled: false,
    Binds: [`${tmpdir}:/execution`],
  };
  let jsonOutput = '';
  try {
    await fse.outputFile(`${tmpdir}/code.${langExtension}`, sourceCode, { mode: 0o755 });
    await fse.outputFile(`${tmpdir}/exec.sh`, testScript, { mode: 0o755 });
    await docker.run(image, [], null, dockerConfig);
    jsonOutput = await fse.readJSON(`${tmpdir}/output.json`);
  } finally {
    fse.remove(tmpdir)
      .catch((error) => { console.error(`Failed to delete tmp dir (${tmpdir}): ${error.message}`); });
  }
  return jsonOutput;
}

export default async function execLang(refLang, refCode, userLang, userCode): Promise<string> {
  const testScript = generateTests({ tests: [{ args: '1 2 3 4' }] });

  return dockerRun(userLang.image, userLang.ext, userCode, testScript);
}
