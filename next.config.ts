import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
};

module.exports = nextConfig;

//#region Bundle Analyzer
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled:
		process.env.ANALYZE === 'true' && process.env.NODE_ENV === 'production',
});
//#endregion

//#region Combine plugin
module.exports = withBundleAnalyzer({
	output: 'standalone',
	reactStrictMode: true,
	images: {
		domains: ['images.dmca.com', 'cdn.evelingo.vn'],
	},
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production',
	},
});
//#endregion

export default nextConfig;
