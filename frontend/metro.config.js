const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for react-native-web
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Ensure proper resolution for web
config.resolver.alias = {
  ...config.resolver.alias,
  'react-native$': 'react-native-web',
};

module.exports = config; 