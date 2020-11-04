module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  // 按需加载配置
  plugins: [
    ["import", { libraryName: "ant-design-vue", libraryDirectory: "es", style: "css" }], // `style: true` 会加载 less 文件
  ],
};
