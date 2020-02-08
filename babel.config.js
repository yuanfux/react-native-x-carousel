module.exports = (api) => {
  const isRollupPlugin = api.caller(caller => caller && caller.name === 'rollup-plugin-babel');

  // if (isBabelJest) {
  //   return {
  //     presets: [
  //       'module:metro-react-native-babel-preset',
  //     ],
  //   };
  // }

  if (isRollupPlugin) {
    return {
      presets: [
        ['module:metro-react-native-babel-preset', {
          disableImportExportTransform: true,
        }],
      ],
    };
  }

  return {
    presets: ['babel-preset-expo'],
  };
};
