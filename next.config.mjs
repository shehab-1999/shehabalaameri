/** @type {import('next').NextConfig} */
const nextConfig = {
 
    async redirects() {
        return [ 
            {
                source: '/',
                destination: '/Dashboard',
                permanent: false,
            },
        ];
    },
    pageExtensions:['tsx','ts']
};

export default nextConfig;
