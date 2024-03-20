module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],

    // Código copiado da documentação
    // https://www.npmjs.com/package/react-native-dotenv
    // por Almada
    plugins: [
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env",
          blocklist: null,
          allowlist: null,
          blacklist: null, // DEPRECATED
          whitelist: null, // DEPRECATED
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
    ],
  };
};
