// 月份
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
// 星期
const weekday = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"
];
// 获取日期
function getTime() {
    const date = new Date();
    const days = date.getDate();
    const month = date.getMonth();
    const day = date.getDay();
    const hours = toDou(date.getHours());
    const minutes = toDou(date.getMinutes());
    const seconds = toDou(date.getSeconds());
    return {
        date: `${weekday[day]} ${days} ${months[month]}`,
        time: `${hours}:${minutes}:${seconds}`
    };
}
// 转成两位 eg: 6 => 06
function toDou(str) {
    const num = ~~str;
    return num > 9 ? num : "0" + str;
}

export default getTime