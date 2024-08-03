/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/websocket',
                destination: '/api/websocket',
            },
        ];
    },
};

export default nextConfig;

