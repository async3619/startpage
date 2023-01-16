/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    webpack: config => {
        config.module.rules.push({
            test: /\.(glsl|vs|fs|vert|frag)$/,
            use: ["raw-loader"],
        });

        return config;
    },
};

module.exports = nextConfig;
