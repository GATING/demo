// 压缩文件
const archiver = require("archiver");
const Stream = require("stream");
exports.upload = async (ctx) => {
  let { files } = ctx.request.files;
  let name = ctx.request.body.name;
  if (!Array.isArray(files)) {
    files = [files];
  }
  ctx.attachment("files.zip");
  ctx.set({ "Content-Type": "application/zip" });
  const stream = new Stream.PassThrough();
  // 压缩成zip
  const archive = archiver("zip", {
    zlib: { level: 9 }, // Sets the compression level.
  });
  archive.pipe(stream);
  ctx.body = stream;
  for (let i = 0; i < files.length; i++) {
    const path = files[i].path;
    archive.file(path, { name: name[i] + "" });
  }
  archive.finalize();
};
