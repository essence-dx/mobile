import path from 'node:path';

/**
 * @type {import('lint-staged').Configuration}
 */
const lintStagedConfig = {
  '*.{js,jsx,ts,tsx,mjs}': (filenames) => {
    const filtered = filenames.filter(
      (f) => !f.includes('animated-lucide') && !f.includes('animateicons')
    );
    return filtered.map((f) => `biome format --write "${path.relative(process.cwd(), f)}"`);
  },
  '*.d.ts': (filenames) =>
    filenames.map((f) => `biome format --write "${path.relative(process.cwd(), f)}"`),
  '*.mdx': (filenames) =>
    filenames.map((f) => `biome format --write "${path.relative(process.cwd(), f)}"`),
};

export default lintStagedConfig;
