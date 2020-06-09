/*
 * @Author: gating
 * @Date: 2020-06-08 16:04:56
 * @Last Modified by: gating
 * @Last Modified time: 2020-06-09 00:59:01
 */
/**
 * 获取当月有多少天
 * @param {String | Number} year => 年
 * @param {String | Number} month => 月
 */
const getMonthDays = (year, month) => {
  let days = new Date(year, month + 1, 0).getDate();
  return days;
};
/**
 * 补0
 * @param {String | Number} num
 */
const toDou = (num) => {
  return num > 9 ? num : "0" + num;
};

/**
 * 转换为日期格式
 * @param {*} date
 */
const transformDate = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return date;
};
/**
 * 获取当前日期的年月日
 * @param {any} date => 日期对象
 */
const getDateObj = (date) => {
  date = transformDate(date);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  return {
    year,
    month,
    day,
    dataStr: `${year}/${toDou(month)}/${toDou(day)}`,
  };
};

/**
 * 获取当月1号的时间戳
 * @param {Date} date => 日期对象
 */
const startOfMonth = (date) => {
  return date.setDate(1);
};

// 获取今天，导出供组件作为默认值使用
const { dataStr } = getDateObj(new Date());

/**
 * 生成日历数据
 * @param {Date} date => 日期对象
 */
const getDate = (date) => {
  date = transformDate(date);
  // 计算需要补的格子
  let dist;
  const { year, month } = getDateObj(date);
  // 获取当月有多少天
  const days = getMonthDays(year, month - 1);
  // 获取当前日期是星期几
  let currentDate = new Date(startOfMonth(date)).getDay();
  // 众所周知的原因，一周的第一天时星期天，而我们做的日历星期天是放在最后的，所以我们这里需要改一下值
  if (currentDate == 0) {
    currentDate = 7;
  }
  dist = currentDate - 1;
  currentDate -= 2;
  const res = [];
  for (let i = 0; i < 42; i++) {
    // 是否不是当前月
    const otherMonth = i >= dist + days || i <= currentDate;
    const date = new Date(year, month - 1, -currentDate + i);
    const dateObj = getDateObj(date);
    res.push({
      ...dateObj,
      today: dataStr === dateObj.dataStr,
      otherMonth,
    });
  }
  return res;
};

module.exports = {
  getMonthDays,
  toDou,
  getDateObj,
  startOfMonth,
  getDate,
  dataStr,
  transformDate,
};
