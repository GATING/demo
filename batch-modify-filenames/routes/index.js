const { resolve } = require("path");
const glob = require("glob");
module.exports = (app) => {
  glob.sync(resolve(__dirname, "!(index).js")).forEach((item) => {
    const route = require(item);
    app.use(route.routes()).use(route.allowedMethods());
  });
};
