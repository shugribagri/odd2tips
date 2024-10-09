/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        // destination: "http://localhost:8888/api/:path*",
        destination: "https://odd2tips.onrender.com/api/:path*",
      },
      {
        source: "/auth/:path*",
        // destination: "http://localhost:8888/auth/:path*",
        destination: "https://odd2tips.onrender.com/auth/:path*",
      },

      {
        source: "/sockets/:path*",
        // destination: "http://localhost:8888/:path*",
        destination: "https://odd2tips.onrender.com/:path*",
      },
    ];
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "ichef.bbci.co.uk",
      "www.bbc.co.uk",
      "img.legaseriea.it",
      "assets.bundesliga.com",
    ],
  },
};

export default nextConfig;
