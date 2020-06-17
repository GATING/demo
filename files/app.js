/*
 * @Author: gating
 * @Date: 2020-06-17 12:50:23
 * @Last Modified by: gating
 * @Last Modified time: 2020-06-17 17:47:28
 */
// 导入 utimes
const { utimes } = require("@ronomon/utimes");
const glob = require("glob");
const { promisify } = require("util");

/**
 *
 * @param {String} path => 路径
 * @param {Number} btime => 创建时间，不传即不修改
 * @param {Number} mtime => 修改时间，不传即不修改
 * @param {Number} atime => 访问时间，不传即不修改
 */
const utimesPromise = promisify(utimes);

(async () => {
  const paths = glob.sync("./test-files/**");
  const len = paths.length;
  for (let i = 0; i < len; i++) {
    await utimesPromise(
      paths[i],
      +new Date("2010/01/01"),
      +new Date("2010/01/02"),
      +new Date("2010/01/04")
    );
  }
})();
