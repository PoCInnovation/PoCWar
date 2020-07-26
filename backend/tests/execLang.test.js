const { execLang } = require('../src/execution/execLang');

test('python3: ref and user should have same output', async () => {
    try {
        const output = await execLang(
            { image: 'python_app', ext: 'py' }, 'print("1 2 3 4")',
            { image: 'python_app', ext: 'py' }, 'print("1 2 3 4")'
        );
        expect(output.user).toStrictEqual(output.ref)
    } catch (err) {

    }
});
