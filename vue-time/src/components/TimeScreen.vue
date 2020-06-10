<template>
    <div
        class="time-container"
        :class="{ dark: isDark }"
        @click="toggleClass"
        :date="date"
    >
        <div class="time">
            <template v-for="(str, idx) in time">
                <div
                    class="time-num"
                    v-if="str !== ':'"
                    :style="numStyle[idx]"
                    :key="idx"
                >
                    <span
                        v-for="(i, spanIdx) in haveSpan[idx]"
                        :key="spanIdx"
                        >{{ i - 1 }}</span
                    >
                    <span>0</span>
                </div>
                <div class="time-dist" v-else :key="idx">
                    <span>{{ str }}</span>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import getTime from "../utils/time";

// 清除样式
const style = "transform: translateY(0%);transition:0s all";

// 设置样式
function setStyle(val) {
    return `transform: translateY(-${~~val * 100}%)`;
}
// 每个字的样式
function numStyle(time) {
    // 这里等于0则清除样式，避免0点时，有奇怪的bug
    return time.split("").map(val => (val == "0" ? style : setStyle(val)));
}

export default {
    name: "TimeScreen",
    data() {
        // 获取时间
        let { time, date } = getTime();
        return {
            isDark: 0,
            time,
            date,
            numStyle: numStyle(time)
        };
    },
    methods: {
        // 更新样式
        updateStyle() {
            this.time.split("").forEach((val, idx) => {
                if (val == 0) {
                    if (this.numStyle[idx] !== style) {
                        this.removeAnimate(idx);
                        this.numStyle[idx] = setStyle(this.haveSpan[idx]);
                    }
                } else {
                    this.numStyle[idx] = setStyle(val);
                }
            });
        },
        // 切换样式
        toggleClass() {
            this.isDark = !this.isDark;
        },
        // 清除样式
        removeAnimate(idx) {
            setTimeout(() => {
                this.numStyle[idx] = style;
                this.numStyle = [...this.numStyle];
            }, 500);
        },
        // 每秒更新时间
        updateTime() {
            const { time, date } = getTime();
            this.time = time;
            this.date = date;
            this.updateStyle();
        }
    },
    created() {
        // 判单有多少个Span
        // 比较小时数最多24小时，所以第一位最多是3个，0、1、2
        this.haveSpan = Object.freeze([3, 10, 0, 6, 10, 0, 6, 10]);
        // 定时器
        this.timer = null;
    },
    mounted() {
        // 触发定时器
        this.timer = setInterval(this.updateTime, 1000);
    },
    destroyed() {
        // 清除定时器
        clearInterval(this.timer);
    }
};
</script>

<style lang="scss" scoped>
%flexCenter {
    display: flex;
    justify-content: center;
    align-items: center;
}
$timeColor: #d9d4d0;
$white: #fff;
.time-container {
    background: $white;
    color: $timeColor;
    position: absolute;
    width: 100%;
    height: 100%;
    max-width: 540px;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    &.dark {
        background: #000;
        color: $white;
    }
    &::after {
        content: attr(date);
        position: absolute;
        color: $timeColor;
        font-size: 18px;
        line-height: 1;
        transform: rotate(90deg);
        bottom: 20%;
        left: -48px;
    }
    @extend %flexCenter;
    .time {
        font-size: 70px;
        transform: rotate(90deg);
        position: relative;
        height: 106px;
        line-height: 106px;
        overflow: hidden;
        @extend %flexCenter;

        .time-num {
            position: relative;
            width: 100%;
            height: 100%;
            text-align: center;
            text-shadow: 0 0 2px $white;
            transition: 0.5s all;
            span {
                display: block;
            }
        }
        .time-dist {
            padding-bottom: 15px;
            margin: 0 10px;
        }
    }
}
</style>