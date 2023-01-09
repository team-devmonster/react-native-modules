module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            "@local_modules": "./local_modules",
            "@pages": "./pages",
            "@env":"./env",
            "@image":"./assets/images",
            "@components": "./components",
          },
        },
      ],
      'react-native-reanimated/plugin'
    ]
  };
};
