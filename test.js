const { rollup } = require('rollup');
const { resolve: resolvePath } = require('path');
const { readFileSync } = require('fs');

const rollupConfig = {
  input: resolvePath(__dirname, './src/main.js'),
  plugins: [{
    name: 'bad-binary-issue',
    transform: (code, id) => {
      if (!/\.wasm$/.test(id)) return null;

      if (code !== readFileSync(id, { encoding: 'binary' })) {
        console.error(`Bad binary (string is not the same): ${id}`);
      } else {
        console.log(`Good binary file: ${id}`);
      }

      return 'export default {};';
    },
  }],
};

(async () => {
  try {
    const bundle = await rollup(rollupConfig);
    await bundle.generate({ format: 'iife' });
  } catch (err) {
    console.error(err);
  }
})();
