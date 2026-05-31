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
        qualities: [100, 75]
    }
};
export default nextConfig;
