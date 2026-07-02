import path from 'node:path';

// See https://nextjs.org/docs/app/api-reference/config/eslint#running-lint-on-staged-files for details
const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames.map((f) => `"${path.relative(process.cwd(), f)}"`).join(' ')}`;

const buildBiomeCommand = (filenames) =>
  `biome check --write ${filenames.map((f) => `"${path.relative(process.cwd(), f)}"`).join(' ')}`;

/**
 * @type {import('lint-staged').Configuration}
 */
const lintStagedConfig = {
  '*.{js,jsx,ts,tsx}': (filenames) => {
    const filtered = filenames.filter((f) => !f.includes('animated-lucide') && !f.includes('animateicons'));
    return [buildBiomeCommand(filtered)];
  },
  '*.mdx': buildBiomeCommand,
};

export default lintStagedConfig;
