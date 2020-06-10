// 创建写入流
const { createWriteStream } = require("fs");
// 获取文件名
const { basename } = require("path");
// 压缩文件
const archiver = require("archiver");
// 导入canvas库，用于裁剪图片
const { createCanvas, loadImage } = require("canvas");
// 获取图片大小
const sizeOf = require("image-size");
// 批量获取路径
const glob = require("glob");
!(async () => {
  const paths = glob.sync("./images/*");
  // 压缩成zip
  const archive = archiver("zip", {
    zlib: { level: 9 }, // Sets the compression level.
  });
  // 输出到当前文件夹下的 blank-area.zip
  const output = createWriteStream(__dirname + "/blank-area.zip");
  archive.pipe(output);
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    const image = await loadImage(path);
    const { width, height } = await sizeOf(path);
    const canvas = createCanvas(81, 81);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, (81 - width) / 2, (81 - height) / 2);
    archive.append(canvas.toBuffer(), { name: `${basename(path)}` });
  }
  archive.finalize();
})();
