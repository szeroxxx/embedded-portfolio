/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {source:'/projects/esp32-s3-terminal',destination:'/projects/esp32-s3-smart-gst-calculator',permanent:true},
      {source:'/workexperience',destination:'/about#experience',permanent:true},
    ];
  },
  async headers() {
    return [
      {source:'/api/:path*',headers:[{key:'X-Robots-Tag',value:'noindex, nofollow'}]},
      {source:'/reviewmanagement',headers:[{key:'X-Robots-Tag',value:'noindex, nofollow'}]},
      {source:'/review',headers:[{key:'X-Robots-Tag',value:'noindex, follow'}]},
    ];
  },
};
export default nextConfig;
