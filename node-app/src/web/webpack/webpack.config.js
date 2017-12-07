require('simpleenv')('.env');

const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'dev';

const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlPlugin = require('html-webpack-plugin');

const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const uglify = process.env.UGLIFY === '1';
const towatch = process.env.WATCH === '1';

const plugins = [
    new ExtractTextPlugin('bundle.css'),

    new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(NODE_ENV),
    }),

    new HtmlPlugin({
        template: path.join(__dirname, '../src/template/index.html'),
        filename: 'index.html',
    }),
    new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'async',
    }),

];

const loaders = [
    {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader',
        }),
    },
    {
        test: /\.(mp3|png|jpg|gif|json|ttf|wav|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader?limit=10000&name=[name].[ext]?[hash]',
    },
    {
        enforce: 'pre',
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
    },
];

if (uglify) {
    plugins.push(
        new UglifyJSPlugin({
            output: {
                comments: false,
            },
            compress: {
                warnings: false,
                dead_code: true,
                conditionals: true,
                comparisons: true,
                evaluate: true,
                booleans: true,
                loops: true,
                if_return: true,
                drop_console: true,
                join_vars: true,
                negate_iife: true,
            },
            sourceMap: false,
        })
    );
}

module.exports = {

    entry: [
        path.join(__dirname, '../src/jsx/app.jsx'),
    ],

    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.js',
    },

    plugins,

    resolve: {
        modules: [path.resolve(__dirname, '../src/'), path.resolve(__dirname, '../node_modules/')],
        alias: {
            styles: path.resolve(__dirname, '../src/style/'),
        },
        extensions: ['.jsx', '.js'],
    },

    module: {
        loaders,
    },

    watch: towatch,

    devtool: 'source-map',

};
