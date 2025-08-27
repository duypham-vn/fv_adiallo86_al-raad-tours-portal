/** @type {import("eslint").Linter.Config} */
module.exports = {
	env: {
		es6: true,
	},
	extends: [
		'eslint:recommended',
		'next/core-web-vitals',
		'plugin:react/recommended',
		'plugin:import/recommended',
		'plugin:react/jsx-runtime',
	],
	rules: {
		'prefer-const': 'error',
		'unused-imports/no-unused-imports': 'error',
		'no-use-before-define': 'error',
		'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
		'@next/next/no-img-element': 'off',
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					['^next'],
					['^react'],
					['^@?\\w'],
					['^@(app)(/.*|$)'],
					['^@(apis)(/.*|$)'],
					['^@(assets)(/.*|$)'],
					['^@(commons)(/.*|$)'],
					['^@(configs)(/.*|$)'],
					['^@(hooks)(/.*|$)'],
					['^@(helpers)(/.*|$)'],
					['^@(utils)(/.*|$)'],
					['^@(hooks)(/.*|$)'],
					['^@(modules)(/.*|$)'],
					['^(@styles)(/.scss|$)'],
					['^\\.\\.(?!/?$)', '^\\.\\./?$'],
					['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
				],
			},
		],
		'simple-import-sort/exports': 'error',
		'import/no-named-as-default': 'off',
	},
	plugins: ['react', 'unused-imports', 'simple-import-sort'],
	settings: {
		'import/resolver': {
			alias: {
				map: [
					['@app', './src/app'],
					['@components', './src/components'],
					['@modules', './src/modules'],
					['@helpers', './src/helpers'],
					['@configs', './src/configs'],
					['@utils', './src/utils'],
					['@apis', './src/apis'],
					['@assets', './src/assets'],
					['@styles', './src/styles'],
					['@hooks', './src/hooks'],
				],
				extensions: ['.ts', '.tsx', '.js', '.jsx'],
			},
		},
	},
};
