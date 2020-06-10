// 创建写入流
const { createWriteStream } = require("fs");
// 压缩文件
const archiver = require("archiver");
// 批量裁剪
const { createCanvas, loadImage } = require("canvas");
// 获取图片大小
const sizeOf = require("image-size");
// 切割方向配置
const directionConfig = ["vertical", "horizontal"];
!(async () => {
  const image = await loadImage("./clip.png");
  const { width, height } = await sizeOf("./clip.png");
  const mainCanvas = createCanvas(width, height);
  const ctx = mainCanvas.getContext("2d");
  ctx.drawImage(image, 0, 0);
  // 压缩成zip
  const archive = archiver("zip", {
    zlib: { level: 9 }, // Sets the compression level.
  });
  const output = createWriteStream(__dirname + "/clip.zip");
  archive.pipe(output);
  const clip = clipNumImage({ canvas: mainCanvas, width, height }, 3);
  clip.forEach((img, idx) => {
    archive.append(img, { name: `${idx + 1}.png` });
  });
  archive.finalize();
})();

function clipNumImage(options, num, direction = "horizontal") {
  const { canvas, ...canvasSize } = options;
  // 生成配置的参数
  let directionIdx = getIdx(direction);
  // 公有配置
  const directionOptions = getOptions(canvasSize, directionIdx, num);
  const clip = [];
  for (let i = 0; i < num; i++) {
    let clipCanvas = createCanvas(...directionOptions);
    const clipCtx = clipCanvas.getContext("2d");
    clipCtx.drawImage(
      canvas,
      ...directionOptions.map((val, idx) =>
        idx === directionIdx ? val * i : 0
      ),
      ...directionOptions,
      0,
      0,
      ...directionOptions
    );
    clip.push(clipCanvas.toBuffer());
    clipCanvas = null;
  }
  return clip;
}

// 获取传递过来的是垂直切割还是水平切割
function getIdx(direction) {
  let directionIdx = directionConfig.indexOf(direction);
  if (directionIdx === -1) {
    directionIdx = 1;
  }
  return directionIdx;
}
// 获取切割参数
function getOptions(size, directionIdx, num) {
  return Object.values(size).map((val, idx) =>
    idx === directionIdx ? val / num : val
  );
}
