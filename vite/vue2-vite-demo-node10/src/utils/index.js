/**
 * 求和
 * @param  {...number} rest 用于求和数
 * @returns { number } 所有数字的和
 */
exports.sum = function (...rest) {
  return rest.reduce((result, num) => result + num)
}
