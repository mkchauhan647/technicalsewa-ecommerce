module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Match all paths that start with /api
        destination: 'https://www.technicalsewa.com/:path*', // Forward them to the external API
      },
    ];
  },
  images: {
    domains: ['www.technicalsewa.com', 'github.com']
  }
};
