import type { StorybookConfig } from '@storybook/react-webpack5/dist';

const config: StorybookConfig = {
  'stories': [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  'addons': [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          // Replaces existing CSS rules with given rule
          {
            test: /\.css$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  esModule: false,
                  modules: {
                    localIdentName: '[local]--[name]--[hash:base64:5]'
                  }
                }
              }
            ]
          }
        ]
      }
    }
  ],
  'framework': '@storybook/react-webpack5'
};
export default config;
