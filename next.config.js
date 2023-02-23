module.exports = {
  target: 'server',
    exportPathMap: function() {
      return {
        '/': { page: '/' }
      };
    }
  };