module.exports = {
  basePath: '/spareparts',
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Match all paths that start with /api
        destination: 'https://www.technicalsewa.com/:path*', // Forward them to the external API
      },
      {
        source: '/spareparts/:path*', // Match all paths that start with /spareparts
        destination: 'http://localhost:3000/spareparts/:path*', // Forward them to your local server
      },
      {
        source: '/:path*', // Catch-all for any other paths
        destination: 'https://www.technicalsewa.com/:path*', // Forward them to the external server
      },
    ];
  },
  images: {
    domains: ['www.technicalsewa.com', 'github.com'],
  },
};

// module.exports = {
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*', // Match all paths that start with /api
//         destination: 'https://www.technicalsewa.com/:path*', // Forward them to the external API
//       },
//     ];
//   },
//   images: {
//     domains: ['www.technicalsewa.com', 'github.com']
//   }
// };