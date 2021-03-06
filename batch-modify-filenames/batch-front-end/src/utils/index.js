import {
  extReg,
  testWord,
  isDefaultSerialNum,
  isEmpty,
  testDot,
} from "./regexp";
import { calculate, isUpper, convert } from "./helpers";
import { range, padStart, startsWith } from "lodash";
// 创建一个[0-25]的数组，并转换为[A-Z]数组供默认字母序号使用
let convertArr = range(26).map((i) => String.fromCharCode(65 + i));
/**
 * 获取修改后的后缀名
 * @param { string } fileExt => 匹配的文件后缀名
 * @param { string } oldExt => 所有文件后缀名
 * @param { string } newExt => 修改后文件后缀名
 * @param { boolean } enable => 是否启用修改后缀名
 * @return { string } 返回修改后的后缀名
 */
const getNewFileExt = (fileExt, oldExt, newExt, enable) => {
  if ((oldExt === "*" || fileExt === oldExt) && enable) {
    return newExt;
  } else {
    // 避免没有后缀名的bug
    return fileExt || "";
  }
};

/**
 * 根据输入的后缀名，获取修改文件名的的后缀名
 * @param { array } fileExt => 文件后缀名数组
 * @return { array } [oldExt, newExt] => 返回文件的后缀名
 */
const getFileExt = (fileExt) =>
  // 如果 i 不存在，返回""
  // 如果 i 是以 "." 开头的返回i，即'.png'返回'.png'
  // 如果 i === "*" 的返回i，即'*'返回'*'
  // 如果是 i 是 'png'，则返回 '.png'
  fileExt.map((i) =>
    i ? (startsWith(i, ".") || i === "*" ? i : "." + i) : ""
  );

/**
 * 获取文件和文件后缀名
 * @param { string } filename 原始文件名
 * @return { array } 返回的文件和文件后缀名
 */
const splitFilename = (filename) =>
  filename.replace(extReg, "$1,$2").split(",");

/**
 * 替换文件名
 * @param { string } filename 文件名
 * @param { string } preReplaceWord 需要替换的字符
 * @param { string } replaceWord 替换的字符
 * @return { string } 返回替换后的文件名
 */
const replaceFilename = (filename, preReplaceWord, replaceWord) =>
  filename.replace(preReplaceWord, replaceWord);

/**
 * 获取文件名设置
 * @param { Object } fileSettings 文件名设置
 */
const getFileSetting = (fileSettings) =>
  Object.values(fileSettings).map((setting) => setting.value);

/**
 *  获取起始位置、补位字符和自定义数组
 * @param { string } serialNum 文件序号
 * @param { number } complement 需要补的位数
 * @param { array } range 自定义序号数组
 * @return { object } 返回起始位置、补位字符和自定义数组
 */
const getOptions = (serialNum, complement, range) => {
  // 起始序号的值，补位序号
  let start, padNum;
  // 字母和自定义序号的情况
  if (testWord(serialNum) || range) {
    if (!range) {
      // 转换大小写
      if (!isUpper(serialNum[0])) {
        convertArr = convertArr.map((str) => str.toLocaleLowerCase());
      }
      range = convertArr;
    }
    // 补位字符
    padNum = range[0];
    start = [...serialNum].reduce(
      (res, val, idx) => res + calculate(range, val, complement - 1 - idx),
      0
    );
  } else {
    // 纯数字的情况
    start = serialNum ? ~~serialNum : NaN;
    // 补位字符
    padNum = "0";
  }
  return {
    start,
    padNum,
    convertArr: range,
  };
};
/**
 * 获取文件名
 * @param { string } filename 旧文件名
 * @param { string } newFilename 新文件名
 * @return { string } 返回最终的文件名
 */
const getFileName = (filename, newFilename) =>
  isEmpty.test(newFilename) ? filename : newFilename;

/**
 * 根据配置，获取修改后的文件名
 * @param { array } fileList 原文件
 * @param { object } fileSettings 文件名设置
 * @param { array } extArr 修改的后缀名
 * @param { boolean } enable 是否启用修改后缀名
 * @return { array } 修改后的文件名
 */
export default function getNewFileList(
  fileList,
  fileSettings,
  extArr,
  enable,
  range
) {
  const [
    newFilename,
    serialNum,
    increment,
    preReplaceWord,
    replaceWord,
  ] = getFileSetting(fileSettings);

  // 如果不符合默认序号规则，则不改名
  if (isDefaultSerialNum(serialNum) && !range) {
    return fileList;
  }
  // 获取文件修改的后缀名
  const [oldExt, newExt] = getFileExt(extArr);

  // 补位，比如输入的是001 补位就是00
  const padLen = serialNum.length;
  // 获取开始
  let { start, padNum, convertArr } = getOptions(serialNum, padLen, range);

  return fileList.map((item) => {
    // 获取文件名和后缀名
    let [oldFileName, fileExt] = splitFilename(item.name);
    // 获取修改后的文件名
    let filename = replaceFilename(
      getFileName(oldFileName, newFilename),
      preReplaceWord,
      replaceWord
    );
    // 获取修改后的后缀名
    fileExt = getNewFileExt(fileExt, oldExt, newExt, enable);
    const suffix =
      (padLen && padStart(convert(start, convertArr) + "", padLen, padNum)) ||
      "";
    filename += suffix;
    start += increment;
    // 文件名+后缀名不能是.
    let name = testDot(filename + fileExt) ? item.name : filename + fileExt;
    return {
      ...item,
      basename: filename,
      name,
      ext: fileExt,
    };
  });
}
