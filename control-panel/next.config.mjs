/** @type {import('next').NextConfig} */
const nextConfig = {
 
    async redirects() {
        return [ 
            {
                source: '/',
                destination: '/redirect',
                permanent: false,
            },
        ];
    },
    pageExtensions:['tsx','ts']
};

export default nextConfig;
