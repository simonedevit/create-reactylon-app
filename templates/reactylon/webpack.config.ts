import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const config: Configuration = {
    entry: './src/index.tsx',
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    },
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                ["@babel/preset-env", {
                                    "modules": false
                                }],
                                ["@babel/preset-react", {
                                    runtime: "automatic"
                                }],
                                "@babel/preset-typescript"
                            ],
                            plugins: [
                                ["babel-plugin-reactylon"]
                            ]
                        }
                    },
                ],
                exclude: '/node_modules/',
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(png|jpg|jpeg)$/i,
                type: 'asset/resource'
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: 'public/index.html' }),
        new ForkTsCheckerWebpackPlugin()
    ]
};

export default config;
