import * as os from 'os';
import * as Docker from 'dockerode';
import * as fse from 'fs-extra';
import generateTests from './generate-tests';
import { SupportedLangInfo } from '../common/constants/supported-langs';
import { ExecutionResultInterface } from '../common/interface/challenge-result.interface';

async function dockerRun(
  image: string, langExtension: string, sourceCode: string, testScript: string,
): Promise<ExecutionResultInterface> {
  const tmpdir = await fse.promises.mkdtemp(`${os.tmpdir()}/pocwar-execution-`);
  const docker = new Docker();
  const dockerConfig = {
    Tty: false,
    AutoRemove: true,
    NetworkDisabled: false,
    Binds: [`${tmpdir}:/execution`],
  };
  let jsonOutput: ExecutionResultInterface;
  try {
    await fse.outputFile(`${tmpdir}/code.${langExtension}`, sourceCode, { mode: 0o755 });
    await fse.outputFile(`${tmpdir}/exec.sh`, testScript, { mode: 0o755 });
    await docker.run(image, [], null, dockerConfig);
    jsonOutput = <ExecutionResultInterface> await fse.readJSON(`${tmpdir}/output.json`);
  } finally {
    fse.remove(tmpdir)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(`Failed to delete tmp dir (${tmpdir}): ${error.message}`);
      });
  }
  return jsonOutput;
}

export default async function execLang(
  lang: SupportedLangInfo, code: string, tests: { args: string}[],
): Promise<ExecutionResultInterface> {
  const testScript = generateTests(tests);

  return dockerRun(lang.image, lang.extension, code, testScript);
}
