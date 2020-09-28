import * as Docker from 'dockerode';
import * as fse from 'fs-extra';
import generateTests from './generate-tests';
import { SupportedLangInfo } from '../common/constants/supported-langs';
import { ExecutionResultInterface } from '../common/dto/challenge-result.dto';

async function dockerRun(
  image: string, langExtension: string, sourceCode: string, testScript: string,
): Promise<ExecutionResultInterface> {
  const tmpdir = await fse.promises.mkdtemp('pocwar-execution-');
  const docker = new Docker();
  const dockerConfig = {
    Tty: false,
    AutoRemove: true,
    NetworkDisabled: true,
    Binds: [`${process.env.PATH_HOST}/backend/${tmpdir}:/execution`],
  };
  let jsonOutput: ExecutionResultInterface;
  try {
    await fse.promises.chmod(tmpdir, 0o777);
    await fse.outputFile(`${tmpdir}/code.${langExtension}`, sourceCode, { mode: 0o777 });
    await fse.outputFile(`${tmpdir}/exec.sh`, testScript, { mode: 0o777 });
    await docker.run(image, ['./exec.sh'], process.stdout, dockerConfig);
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
  const testScript = generateTests(lang.compilation, tests);

  return dockerRun(lang.image, lang.extension, code, testScript);
}
