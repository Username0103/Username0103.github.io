const path = require('path');

module.exports = {
  entry: {
    app: './js/RPS.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: './js/RPS.js',
  },
};
