/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 * converts javascript based to native based
 * also used as a compiler.
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  assets: ['./assets/font'],
};
