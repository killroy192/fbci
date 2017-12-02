require('simpleenv')('.env');

const uglify = process.env.UGLIFY === '1';

const webpack = require('webpack');

const WebpackDevServer = require('webpack-dev-server');

const port = process.env.DEV_PORT || 3000;
const address = process.env.DEV_ADDRESS || 'localhost';
const env = process.env.NODE_ENV;

const config = require('./webpack.config.js');

const towatch = process.env.WATCH === '1';

const info = `
              Listening at http://${address}:${port} 
              env - ${env}
              uglify - ${uglify}
              watch - ${towatch}
            `;

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: false,
    historyApiFallback: true,
    compress: true,
    clientLogLevel: 'error',
    stats: {
        colors: true,
        chunks: false,
    },
}).listen(port, address, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(info);
    }
});