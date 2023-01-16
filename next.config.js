/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    webpack: config => {
        config.module.rules.push({
            test: /\.(glsl|vs|fs|vert|frag)$/,
            use: ["raw-loader"],
        });

        const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test(".svg"));
        fileLoaderRule.exclude = /\.svg$/;
        config.module.rules.push({
            test: /\.svg$/,
            loader: require.resolve("@svgr/webpack"),
        });

        return config;
    },
};

module.exports = nextConfig;
