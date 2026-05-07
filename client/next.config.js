/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    turbopack: {
        root: __dirname,
    },
};

if (process.env.NODE_ENV === "development") {
    import("@react-grab/mcp/server")
        .then(({ startMcpServer }) => startMcpServer())
        .catch((err) => {
            console.warn("[react-grab/mcp] failed to start:", err?.message);
        });
}

module.exports = nextConfig;
