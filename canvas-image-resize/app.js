// 创建写入流
const { createWriteStream } = require("fs");
// 获取文件名
const { basename } = require("path");
// 压缩文件
const archiver = require("archiver");
// 导入canvas库，用于裁剪图片
const { createCanvas, loadImage } = require("canvas");
// 批量获取路径
const glob = require("glob");

// 导入配置文件（用户传过来的配置）
const config = require("./config");


// 获取config字符串
function getConfigStr(config) {
  return Object.values(config).map((el) => (el === "" ? "2" : Number(!!el)));
}
// 根据配置获取宽高
function getOptions(options, config) {
  const [sourceWidth, sourceHeight] = options;
  const { width, height, scale } = config;
  const widthOfOptions = [
    width * scale,
    (sourceHeight * width * scale) / sourceWidth,
  ];
  const heightOfOptions = [
    (sourceWidth * height * scale) / sourceHeight,
    height * scale,
  ];
  const configStr = getConfigStr(config);
  const map = new Map([
    [/^0|^\d0/, [0, 0]],
    [/^1\d1|^1[0|2]0/, widthOfOptions],
    [/^\d101|^210/, heightOfOptions],
    [/^1100/, [width / scale, height / scale]],
    [/^2{2}\d{2}1/, options.map((item) => item / scale)],
  ]);
  return [...map].find(([key]) => key.test(configStr.join("")))[1] || options;
}

!(async () => {
  const paths = glob.sync("./images/*");
  // 压缩成zip
  const archive = archiver("zip", {
    zlib: { level: 9 }, // Sets the compression level.
  });
  // 输出到当前文件夹下的 image-resize.zip
  const output = createWriteStream(__dirname + "/image-resize.zip");
  archive.pipe(output);
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    const image = await loadImage(path);
    const { width, height } = image;
    const options = getOptions([width, height], config);
    console.log(options);
    const canvas = createCanvas(...options);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, ...options);
    archive.append(canvas.toBuffer(), { name: `${basename(path)}` });
  }
  archive.finalize();
})();
