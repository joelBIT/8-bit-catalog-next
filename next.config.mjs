/** @type {import('next').NextConfig} */

const nextConfig = {
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
