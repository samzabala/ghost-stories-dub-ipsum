module.exports = {
	presets: [
		[
			'@babel/env',
			{
				loose: true,
				bugfixes: true,
				modules: false,
				shippedProposals: true,
			},
		],
	],
	plugins: [
		[
			'@babel/plugin-proposal-private-methods',
			{
				loose: true,
			},
		],
		[
			'@babel/plugin-proposal-class-properties',
			{
				loose: true,
			},
		],
	],
};
