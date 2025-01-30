/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'graph.facebook.com',
                // pathname: '/images/**',
            },
            {
                protocol: 'https',
                hostname: 'rezwan-rahim.web.app',
                // pathname: '/images/**',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                // pathname: '/images/**',
            },
            {
                protocol: 'https',
                hostname: 'example.com',
                // pathname: '/images/**',
            },

        ]
    }
};

module.exports = nextConfig;
