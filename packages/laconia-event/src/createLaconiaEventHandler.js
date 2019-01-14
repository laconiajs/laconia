const laconia = require("@laconia/core");

module.exports = inputConverterFactory => {
  return app => {
    return laconia(async (event, laconiaContext) => {
      const input = await inputConverterFactory(laconiaContext).convert(event);
      return app(input, laconiaContext);
    });
  };
};