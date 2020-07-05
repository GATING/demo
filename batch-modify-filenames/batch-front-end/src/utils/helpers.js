/**
 * 判断是不是大写字母
 * @param { string } word => 字母
 * @return { boolean } 返回是否大写字母
 */
export const isUpper = (word) => {
  return /^[A-Z]$/.test(word[0]);
};

/**
 * 进制转换
 * @param { number } num => 转换的值
 * @param { array } range => 转换的编码
 * @return { string } 返回转换后的字符串
 */
export const convert = (num, range) => {
  // 没有range的时候即为数字，数字我们不需要处理
  if (!range) return num;
  let word = "",
    len = range.length;
  while (num > 0) {
    num--;
    word = range[num % len] + word;
    num = ~~(num / len);
  }

  return word;
};

/**
 * 计算第n位进制数的十进制值
 * @param {*} range => 进制数组
 * @param {*} val => 当前值
 * @param {*} idx => 当前的位置
 * @returns { number } 第n位进制数的十进制值
 */
export const calculate = (range, val, idx) => {
  let word = range.indexOf(val);
  const len = range.length;
  return word === -1 ? 0 : (word + 1) * len ** idx;
};
