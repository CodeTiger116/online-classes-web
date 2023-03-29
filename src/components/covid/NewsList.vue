<template>
    <div>
        <p class="title"><i></i>实时新闻</p>
        <el-card class="box-card">
            <div slot="header" class="clearfix" @click="more0" >
                <span class="newstitle">{{newsData.title0}}</span>
                <span style="float: right;">{{newsData.time0}}</span>
            </div>
            <div>
                {{newsData.content0}}
            </div>
        </el-card>

        <el-card class="box-card">
            <div slot="header" class="clearfix" @click="more1" >
                <span class="newstitle">{{newsData.title1}}</span>
                <span style="float: right;">{{newsData.time1}}</span>
            </div>
            <div>
                {{newsData.content1}}
            </div>
        </el-card>

        <el-card class="box-card">
            <div slot="header" class="clearfix" @click="more2" >
                <span class="newstitle">{{newsData.title2}}</span>
                <span style="float: right;">{{newsData.time2}}</span>
            </div>
            <div>
                {{newsData.content2}}
            </div>
        </el-card>

        <el-card class="box-card">
            <div slot="header" class="clearfix"  @click="more3">
                <span class="newstitle">{{newsData.title3}}</span>
                <span style="float: right;">{{newsData.time3}}</span>
            </div>
            <div>
                {{newsData.content3}}
            </div>
        </el-card>

        <el-card class="box-card">
            <div slot="header" class="clearfix" @click="more4" >
                <span class="newstitle">{{newsData.title4}}</span>
                <span style="float: right;">{{newsData.time4}}</span>
            </div>
            <div>
                {{newsData.content4}}
            </div>
        </el-card>

    </div>
</template>

<script>
    export default {
        name: "NewsList",
        data() {
            return {
                newsData: {},
                activeName: ''

            }
        },

        mounted() {
            this.initData();
        },
        methods: {
            initData() {
                this.getRequest('/api/ncov/index?key=52e3c6b5808b704c5c01a32a43496606').then((resp) => {
                    if (resp) {
                        console.log(resp)
                        //const { data1 } = resp.newslist[0]
                        this.newsData = {
                            time0: resp.newslist[0].news[0].pubDateStr,
                            time1: resp.newslist[0].news[1].pubDateStr,
                            time2: resp.newslist[0].news[2].pubDateStr,
                            time3: resp.newslist[0].news[3].pubDateStr,
                            time4: resp.newslist[0].news[4].pubDateStr,

                            title0: resp.newslist[0].news[0].title,
                            title1: resp.newslist[0].news[1].title,
                            title2: resp.newslist[0].news[2].title,
                            title3: resp.newslist[0].news[3].title,
                            title4: resp.newslist[0].news[4].title,

                            content0: resp.newslist[0].news[0].summary,
                            content1: resp.newslist[0].news[1].summary,
                            content2: resp.newslist[0].news[2].summary,
                            content3: resp.newslist[0].news[3].summary,
                            content4: resp.newslist[0].news[4].summary,

                            url0: resp.newslist[0].news[0].sourceUrl,
                            url1: resp.newslist[0].news[1].sourceUrl,
                            url2: resp.newslist[0].news[2].sourceUrl,
                            url3: resp.newslist[0].news[3].sourceUrl,
                            url4: resp.newslist[0].news[4].sourceUrl,

                        }
                    }

                }).catch((err) => {

                });
            },
            more0(){
                window.open(this.newsData.url0);
            },
            more1(){
                window.open(this.newsData.url1);
            },
            more2(){
                window.open(this.newsData.url2);
            },
            more3(){
                window.open(this.newsData.url3);
            },
            more4(){
                window.open(this.newsData.url4);
            },


        },
    }
</script>

<style scoped>
    .title {
        border-top: 0.005rem solid #ebebeb;
        border-bottom: 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        height: 1.44rem;
        padding: 0 0.16rem;
        font-weight: 500;
        font-size: 0.17rem;
        line-height: 0.44rem;
        background: #fff;
        border-radius: 5px;
    }

    .title::before {
        content: "";
        width: 5px;
        height: 20px;
        background: #4169e2;
        margin-right: 10px;
    }
    .newstitle {
        font-weight:bold;
        font-size: large;
    }

    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 100%;
        margin-top: 10px;
    }
</style>