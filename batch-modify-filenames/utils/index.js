const fs = require("fs");
const path = require("path");
/**
 * 生成文件夹名称
 */
const getUploadDirName = () => {
  const date = new Date();
  let month = date.getMonth() + 1;
  return `${date.getFullYear()}${month}${date.getDate()}`;
};
/**
 * 确定目录是否存在， 如果不存在则创建目录
 * @param {String} pathStr => 文件夹路径
 */
const confirmPath = (dirname) => {
  if (!fs.existsSync(dirname)) {
    if (confirmPath(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
  return true;
};

module.exports = {
  getUploadDirName,
  confirmPath,
};
