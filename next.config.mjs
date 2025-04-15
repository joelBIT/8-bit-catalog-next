/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
        serverActions: {
          bodySizeLimit: '3mb'
        }
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tnkcekyijuynctkddkwy.supabase.co',
                port: '',
                pathname: '/**',
            },
        ],
    },
};
export default nextConfig;
