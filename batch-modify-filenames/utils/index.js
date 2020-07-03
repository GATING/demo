const fs = require("fs");
const path = require("path");
/**
 * 生成文件夹名称
 */
const getUploadDirName = () => {
  const date = new Date();
  let month = Number.parseInt(date.getMonth()) + 1;
  month = month.toString().length > 1 ? month : `0${month}`;
  const dir = `${date.getFullYear()}${month}${date.getDate()}`;
  return dir;
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
