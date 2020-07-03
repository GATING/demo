// 压缩文件
const archiver = require("archiver");
const Stream = require("stream");
const isArray = (arr) => {
  if (!Array.isArray(arr)) {
    arr = [arr];
  }

  return arr;
};
exports.upload = async (ctx) => {
  let { files } = ctx.request.files;
  let filenames = isArray(ctx.request.body.name);
  files = isArray(files);
  ctx.attachment("files.zip");
  ctx.set({ "Content-Type": "application/zip" });
  const stream = new Stream.PassThrough();
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

exports.test = async (ctx) => {
  ctx.set("Content-Type", "application/zip");
  const archive = archiver("zip", {
    zlib: { level: 9 },
  });

  const stream = new Stream.PassThrough();
  ctx.body = stream;

  archive.pipe(stream);

  for (let i = 0; i < 2; i++) {
    archive.file(
      "C:\\Users\\gating\\Desktop\\demo\\batch-modify-filenames\\uploads\\2020073\\e8afd953-2a05-45d9-a9a7-2189678d08da",
      { name: `hello${i}.txt` }
    );
  }
  archive.finalize();
};
