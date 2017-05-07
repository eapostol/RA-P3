
const join = require('path').join;
const resolve = require('path').resolve;
const webpack = require('webpack');

let debug = process.env.NODE_ENV !== "production";

const PATHS = {
    src: join(__dirname, 'app'),
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
        path: resolve(PATHS.build),
        publicPath: "/js/"
    },
    module: {
        loaders: [
            {
                test: /\.(sass|scss)$/,
                loaders: 'style-loader!css-loader!sass-loader'
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
            },
            { 
                test: /\.(jpg|gif|png)$/, 
                loader: "url-loader?limit=5000&name=image/[hash].[ext]" 
            },
            {   test: /flickity/, 
                loader: 'imports-loader?define=>undefined' 
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
