// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ["babel-preset-expo"],
//     plugins: [
//       [
//         "module-resolver",
//         {
//           extensions: [".tsx", ".ts", ".js", ".json"],
//           root: ['./src'],
//           "alias": {"~": "./src"}
//         },
//       ],
//       "react-native-reanimated/plugin",
//     ],
//   }
// }
// const path = require('path');

// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ["babel-preset-expo"],
//     plugins: [
//       "react-native-reanimated/plugin",
//       [
//         "module-resolver",
//         {
//           root: [path.resolve('./')],
//           alias: {
//             "~": "./src",
//           },
//           extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"]
//         },
//       ]
//     ],
//   };
// };

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          "alias": {"~": "./src"}
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};