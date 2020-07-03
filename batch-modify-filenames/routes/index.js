const { resolve } = require("path");
// 用于获取文件
const glob = require("glob");
module.exports = (app) => {
  // 获取当前文件夹下的所有文件，除了自己
  glob.sync(resolve(__dirname, "!(index).js")).forEach((item) => {
    // 添加路由
    const route = require(item);
    app.use(route.routes()).use(route.allowedMethods());
  });
};
