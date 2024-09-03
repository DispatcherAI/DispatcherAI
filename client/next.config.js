/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

module.exports = {
    ...nextConfig,
    parserOptions: {
        project: "./tsconfig.json",  
        tsconfigRootDir: __dirname,  
        sourceType: "module",
    },
};
