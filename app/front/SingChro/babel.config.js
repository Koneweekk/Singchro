module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'], // 프로젝트 루트 디렉토리를 설정합니다.,
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@constants': './src/constants',
          '@functions': './src/functions',
          '@states': './src/states',
          '@styles': './src/styles',
          '@views': './src/views',
        },
      },
    ],
  ],
};
