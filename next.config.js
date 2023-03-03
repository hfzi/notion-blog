module.exports = {
  images: {
    loader: 'akamai',
    path: '',
  },
  target: 'server',
    exportPathMap: function() {
      return {
        '/': { page: '/' }
      };
    }
  };