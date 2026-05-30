import prettier from 'eslint-config-prettier';
import path from 'node:path';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	ts.configs.recommended,
	svelte.configs.recommended,
	prettier,
	svelte.configs.prettier,
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			'no-undef': 'off',
		},
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig,
			},
		},
	},
	{
		rules: {
			// --- Catch common mistakes ---
			'no-console': 'warn',
			'no-debugger': 'warn',
			'no-alert': 'warn',
			'no-var': 'error',
			'prefer-const': 'warn',
			eqeqeq: ['error', 'always'],
			'no-implicit-coercion': 'warn',
			'no-unused-expressions': 'warn',
			'no-shadow': 'off',
			'@typescript-eslint/no-shadow': 'warn',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
			],
			'@typescript-eslint/no-explicit-any': 'warn',

			// --- Svelte best practices ---
			'svelte/no-at-html-tags': 'error',
			'svelte/require-each-key': 'error',
			'svelte/valid-compile': 'error',
			'svelte/button-has-type': 'warn',
			'svelte/no-target-blank': 'warn',
			'svelte/no-reactive-reassign': 'warn',

			// --- SvelteKit navigation safety (Svelte 5 uses resolve() not base) ---
			'svelte/no-navigation-without-resolve': 'error',
		},
	},
);
