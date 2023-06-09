/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		API: process.env.API,
	},
	async redirects() {
		return [
			{
				source: "/admin",
				destination: "https://mxoil1.pythonanywhere.com/admin",
				permanent: true,
			},
		];
	},
}

module.exports = nextConfig
