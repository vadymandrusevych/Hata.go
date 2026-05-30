import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) =>
			filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
		rewriteRelativeImportExtensions: true,
		allowJs: true,
		checkJs: true,
		esModuleInterop: true,
		forceConsistentCasingInFileNames: true,
		resolveJsonModule: true,
		skipLibCheck: true,
		sourceMap: true,
		strict: true,
		moduleResolution: 'bundler',
	},
	kit: { adapter: adapter() },
};

export default config;
