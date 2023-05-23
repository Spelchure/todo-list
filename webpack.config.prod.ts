import path from 'path';
import nodeExternals from 'webpack-node-externals';
import {Configuration} from 'webpack';
import WebpackShellPluginNext from 'webpack-shell-plugin-next';

const getConfig = (): Configuration => {
  return {
    entry: './src/main.ts',
    target: 'node',
    mode: 'production',
    externals: [nodeExternals()],
    plugins: [
      new WebpackShellPluginNext({
        onBuildStart: {
          scripts: ['npm run clean:prod'],
          blocking: true,
          parallel: false,
        },
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(ts|js)$/,
          loader: 'ts-loader',
          options: {},
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'main.js',
    },
    optimization: {
      moduleIds: 'deterministic',
      splitChunks: {
        chunks: 'all',
      },
    },
  };
};

export default getConfig;
