const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
const isProduction = process.env.NODE_ENV !== "development";
module.exports = {
  publicPath: "./",
  outputDir: "../public",
  productionSourceMap: false,
  devServer: {
    open: true,
    proxy: {
      "/upload": {
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: {
          "^/upload": "/upload",
        },
      },
    },
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  chainWebpack(config) {
    // 建议打开预加载，它可以提高第一屏的速度
    config.plugin("preload").tap(() => [
      {
        rel: "preload",
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: "initial",
      },
    ]);

    // 去除预读取，因为如果页面过多，会造成无意义的请求
    config.plugins.delete("prefetch");

    // https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-template-compiler/README.md#%E9%80%89%E9%A1%B9
    // config.module
    //   .rule("vue")
    //   .use("vue-loader")
    //   .loader("vue-loader")
    //   .tap((options) => {
    //     // vue-cli后面已经默认修改为true
    //     options.compilerOptions.preserveWhitespace = true;
    //     return options;
    //   })
    //   .end();

    // https://webpack.js.org/configuration/devtool/#development
    // 生成一个没有列信息（column-mappings）的SourceMaps文件（不包含loader的 SourceMaps）
    config.when(!isProduction, (config) => config.devtool("cheap-source-map"));

    config.when(isProduction, (config) => {
      // html-webpack-plugin的增强功能
      // 打包生成的 runtime.js非常的小，但这个文件又经常会改变，它的 http 耗时远大于它的执行时间了，所以建议不要将它单独拆包，而是将它内联到我们的 index.html 之中
      // inline 的name 和你 runtimeChunk 的 name保持一致
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            inline: /runtime\..*\.js$/,
          },
        ])
        .end();

      // 拆分模块
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs", // 输出名字
            test: /[\\/]node_modules[\\/]/, // 匹配目录
            priority: 10, // 优先级
            chunks: "initial", // 从入口模块进行拆分
          },
          antDesign: {
            name: "chunk-antd", // 将antd拆分为单个包
            priority: 20, // 权重需要大于libs和app，否则将打包成libs或app
            test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/, // 为了适应cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"),
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true, // 复用其他chunk内已拥有的模块
          },
        },
      });
      // 单独打包runtime
      config.optimization.runtimeChunk("single");
    });
  },
};
