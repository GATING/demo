// 匹配文件名和拓展名
export const extReg = /(.+)(\..+)$/;
// 是否为空字符串
export const isEmpty = /^\s*$/;

/**
 * 整个文件名+后缀名不能是 .
 * @param { string }} str 文件名
 */
export const testDot = (str) => /^\s*\.+\s*$/.test(str);

/**
 * 序号是否为字母
 * @param { string }} str 序号
 */
export const testWord = (str) => /^[a-zA-Z]+$/.test(str);

/**
 * 是否符合默认序号规范
 * @param { string } str 序号
 * @return { object } 返回是否符合默认序号规范（纯字母/纯数字）
 */
export const isDefaultSerialNum = (str) =>
  !/(^\d+$)|(^[a-zA-Z]+$)/.test(str) && !isEmpty.test(str);
