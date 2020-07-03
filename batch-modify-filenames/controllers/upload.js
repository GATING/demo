// 压缩文件
const archiver = require("archiver");
const Stream = require("stream");
// 判断是否为数组，如果不是，则转为数组
const isArray = (arr) => {
  if (!Array.isArray(arr)) {
    arr = [arr];
  }
  return arr;
};
// 上传接口
exports.upload = async (ctx) => {
  // 获取上传的文件
  let { files } = ctx.request.files;
  // 获取上传的文件名
  let filenames = isArray(ctx.request.body.name);
  // 将文件转为数组
  files = isArray(files);
  // 设置响应头，告诉浏览器我要下载的文件叫做files.zip
  // attachment用于浏览器文件下载
  ctx.attachment("files.zip");
  // 设置响应头的类型
  ctx.set({ "Content-Type": "application/zip" });
  // 定义一个双向流
  const stream = new Stream.PassThrough();
  // 把流返回给前端
  ctx.body = stream;
  // 压缩成zip
  const archive = archiver("zip", {
    zlib: { level: 9 }, // Sets the compression level.
  });
  archive.pipe(stream);
  for (let i = 0; i < files.length; i++) {
    const path = files[i].path;
    archive.file(path, { name: filenames[i] });
  }
  archive.finalize();
};
