module.exports = {
  presets: ['module:metro-react-native-babel-preset'], //convert the es5,es6 to vanilla javascript so that any browser can understand it.
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
