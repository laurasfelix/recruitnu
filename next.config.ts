import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://work-env.eba-4zj5h2kc.us-west-2.elasticbeanstalk.com/api/:path*',
      },
    ];
  },
};