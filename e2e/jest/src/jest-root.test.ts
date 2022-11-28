import { newProject, runCLI, uniq, runCLIAsync } from '@nrwl/e2e/utils';

describe('Jest root projects', () => {
  const myapp = uniq('myapp');
  const mylib = uniq('mylib');
  beforeAll(() => {
    newProject();
  });

  it('should test root level app projects', async () => {
    runCLI(`generate @nrwl/react:app ${myapp} --rootProject=true`);

    const rootProjectTestResults = await runCLIAsync(`test ${myapp}`);

    expect(rootProjectTestResults.combinedOutput).toContain(
      'Test Suites: 1 passed, 1 total'
    );
  });

  it('should add lib project and tests should still work', async () => {
    runCLI(`generate @nrwl/react:lib ${mylib}`);

    const libProjectTestResults = await runCLIAsync(`test ${mylib}`);

    expect(libProjectTestResults.combinedOutput).toContain(
      'Test Suites: 1 passed, 1 total'
    );

    const rootProjectTestResults = await runCLIAsync(`test ${myapp}`);

    expect(rootProjectTestResults.combinedOutput).toContain(
      'Test Suites: 1 passed, 1 total'
    );
  });
});
