<template>
    <div class="case-num">
        <div class="container">
            <div class="title">
                <span>截至{{formatData(caseNumDate.time)}}全国数据统计</span>
            </div>
            <div class="num">
                <ul class="count">
                    <li>
                        <div class="create-item">
                            <div class="create-count">
                                <b>
                                    较昨日<em
                                        style="color: rgb(247, 76, 49)">{{numCompare(caseNumDate.currentConfirmedIncr)}}</em>
                                </b>
                            </div>
                            <strong style="color: rgb(247, 76, 49)">{{caseNumDate.currentConfirmedCount}}</strong>
                            <span>现存确诊</span>
                        </div>
                    </li>
                    <li>
                        <div class="create-item">
                            <div class="create-count">
                                <b>
                                    较昨日<em
                                        style="color: rgb(255,105,180)">{{numCompare(caseNumDate.confirmedIncr)}}</em>
                                </b>
                            </div>
                            <strong style="color: rgb(255,105,180)">{{caseNumDate.confirmedCount}}</strong>
                            <span>累计确诊</span>
                        </div>
                    </li>
                    <li>
                        <div class="create-item">
                            <div class="create-count">
                                <b>
                                    较昨日<em style="color: rgb(138,43,226)">{{numCompare(caseNumDate.suspectedIncr)}}</em>
                                </b>
                            </div>
                            <strong style="color: rgb(138,43,226)">{{caseNumDate.suspectedCount}}</strong>
                            <span>累计境外输入</span>
                        </div>
                    </li>
                    <li>
                        <div class="create-item">
                            <div class="create-count">
                                <b>
                                    较昨日<em style="color: rgb(30,144,255)">{{numCompare(caseNumDate.curedIncr)}}</em>
                                </b>
                            </div>
                            <strong style="color: rgb(30,144,255)">{{caseNumDate.curedCount}}</strong>
                            <span>累计治愈</span>
                        </div>
                    </li>
                    <li>
                        <div class="create-item">
                            <div class="create-count">
                                <b>
                                    较昨日<em style="color: rgb(0,255,255)">{{numCompare(caseNumDate.deadIncr)}}</em>
                                </b>
                            </div>
                            <strong style="color: rgb(0,255,255)">{{caseNumDate.deadCount}}</strong>
                            <span>累计死亡</span>
                        </div>
                    </li>
                    <li>
                        <div class="create-item">
                            <div class="create-count">
                                <b>
                                    较昨日<em style="color: rgb(255,215,0)">{{numCompare(caseNumDate.seriousIncr)}}</em>
                                </b>
                            </div>
                            <strong style="color: rgb(255,215,0)">{{caseNumDate.seriousCount}}</strong>
                            <span>现存无症状</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CaseNum',
        data() {
            return {

            }
        },
        props: {
            caseNumDate: {
                type: Object,
                default: function () {
                    return {}
                }
            }
        },
        methods: {
            //解析时间
            formatData(time) {
                var date = new Date(time);
                var YY = date.getFullYear() + "-";
                var MM =
                    (date.getMonth() + 1 < 10
                        ? "0" + (date.getMonth() + 1)
                        : date.getMonth() + 1) + "-";
                var DD =
                    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
                    "   ";
                var hh =
                    (date.getHours() < 10
                        ? "0" + date.getHours()
                        : date.getHours()) + ":";
                var mm =
                    date.getMinutes() < 10
                        ? "0" + date.getMinutes()
                        : date.getMinutes();
                return YY + MM + DD + hh + mm;
            },
            numCompare(num) {
                if (num >= 0)
                    return num === 0 ? 0 : "+" + num
                else
                    return "-" + num
            }
        }
    }
</script>

<style scoped>
    .case-num {
        padding: 0.16rem;
        background: #fff;
        border-radius: 5px;
    }

    .container {
        margin: -0.16rem 0 0;
        font-size: 0.22rem;
    }

    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.08rem 0 0.07rem;
        line-height: 1.24rem;
    }

    .title span {
        color: #666;
    }

    .title em {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 0.24rem;
        margin-right: -0.16rem;
        padding: 0 0.08rem;
        color: #666;
        font-style: normal;
        background-color: #f7f7f7;
        border-radius: 0.12rem 0 0 0.12rem;
    }

    .title em img {
        width: 0.123rem;
        height: 0.123rem;
        margin-right: 0.037rem;
    }

    .num {
        position: relative;
        text-align: center;
        background: #fff;
    }

    .num::after {
        position: absolute;
        top: -0.01rem;
        left: -0.01rem;
        display: block;
        width: 200%;
        height: 200%;
        border: 0.01rem solid #ebebeb;
        border-radius: 0.08rem;
        box-shadow: 0 0.04rem 0.12rem 0 rgba(0, 0, 0, 0.05);
        transform: scale(0.5);
        transform-origin: 0 0;
        content: "";
    }

    .num ul {
        flex-flow: wrap;
        position: relative;
        display: flex;
        margin: 0;
        padding: 0.08rem 0 0.12rem;
    }

    .num ul li {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 33.3333333%;
        margin: 10px 0;
    }

    .num ul li .create-item {
        position: relative;
        text-align: center;
    }

    .num ul li .create-item .create-count {
        display: flex;
        align-items: center;
        height: 1.12rem;
        margin-bottom: 0.02rem;
        color: #666;
        font-weight: 400;
        font-size: 0.09rem;
    }

    .num ul li .create-item .create-count em {
        font-weight: 400;
        font-style: normal;
    }

    .num ul li strong {
        margin-bottom: 0.01rem;
        font-weight: 700;
        font-size: 1.2rem;
        line-height: 1.25rem;
    }

    .num ul li span {
        display: block;
        color: #333;
        font-weight: 700;
        font-size: 1.00rem;
        line-height: 1.20rem;
    }
</style>