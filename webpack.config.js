const join = require('path').join;
const resolve = require('path').resolve;
const webpack = require('webpack');

var debug = process.env.NODE_ENV !== "production";

const PATHS = {
    src: join(__dirname, 'app/js'),
    fonts: join(__dirname, 'fonts'),
    build: join(__dirname,'dist')
};
console.log("***** DIRECTORY : \n" + __dirname);
console.log("***** PATHS : \n");
console.log(PATHS);

module.exports = {
    entry: {
        src: join(PATHS.src, 'index.js')
    },
    resolve: {
        extensions: ['.js']
    },
    output: {
        filename: 'index.min.js',
        path: resolve(__dirname,'dist'),
        publicPath: "/js/"
    },
    module: {
        loaders: [
            {
            test: /\.css$/,
            loaders: ['style', 'css'],
            include: PATHS.src
            },
            {
                test: /\.js$/,
                loader: 'babel-loader?presets[]=es2015',
                query: {
                    presets: ['es2015']
                },
                include: PATHS.src,
                exclude: ['./node_modules/','webpack.config.js']
            },
            {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            include : PATHS.fonts,
            loader: `file?name=/fonts/[name].[ext]`
        }
        ]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: process.cwd(),
        historyApiFallback: true,
        inline: true,
        stats: 'errors-only',
        host: process.env.HOST,
        port: process.env.PORT
    }
};