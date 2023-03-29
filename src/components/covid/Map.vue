<template>
    <div class="map">
        <p class="title" ><i></i>疫情地图</p>

        <Tabs :currentIndex="currentIndex" @onIndex="getIndex">
            <Tab index="1" label="国内疫情">
                <div id="chinaMap"></div>
            </Tab>
            <Tab index="2" label="世界疫情">
                <div id="worldMap"></div>
            </Tab>
        </Tabs>

    </div>
</template>

<script>

    //import api from '../../api'

    export default {
        data() {
            return {
                currentIndex: "1"
            }
        },

        mounted() {
            this.initCity();
            this.initWord()
            // 城市信息
            // api.getNcovCity().then((res) => {
            //     console.log(res.data);
            //     var Citys = [];
            //     for (let i = 0; i < res.data.retdata.length; i++) {
            //         var temp = {
            //             // name:省市
            //             name:  res.data.retdata[i].subList[j].city+"市",
            //             value: res.data.retdata[i].subList[j].confirm,
            //         }
            //         Citys.push(temp)
            //     }
            //     this.$charts.chinaMap("chinaMap", Citys);

            // }).catch(error => {
            //     console.log(error);
            //     this.$charts.chinaMap("chinaMap");
            // })

            // 世界信息
            // api.getNcoWorld().then((res) => {

            //     var Countries = [];
            //     for (let i = 0; i < res.data.retdata.caseOutsideList.length; i++) {
            //         var temp = {
            //             name: res.data.retdata.caseOutsideList[i].xArea,
            //             value: res.data.retdata.caseOutsideList[i].curConfirm,
            //         }
            //         Countries.push(temp)
            //     }
            //     // console.log(res);
            //     // console.log(Countries);
            //     this.$charts.worldMap("worldMap", Countries);
            // }).catch((err) => {
            //     console.log(err);
            //     this.$charts.worldMap("worldMap");
            // })


        },
        methods: {
            getIndex(index) {
                this.currentIndex = index
            },
            initCity() {
                this.getRequest('/map/219?format=json&appid=12395&sign=83feaadc1daa89cc73988af6f3fb9173').then(res => {
                    if (res) {
                        //console.log(res);
                        var Citys = [];
                        for (let i = 0; i < res.retdata.length; i++) {
                            var temp = {
                                // name:省市
                                name: res.retdata[i].xArea,
                                // 省市匹配的值
                                value: res.retdata[i].curConfirm,
                            }
                            Citys.push(temp)
                        }
                        this.$charts.chinaMap("chinaMap", Citys);
                    }

                })

            },
            initWord(){
            // 世界信息
            this.getRequest('/map/222?format=json&appid=12395&sign=83feaadc1daa89cc73988af6f3fb9173').then((res) => {

                var Countries = [];
                for (let i = 0; i < res.retdata.caseOutsideList.length; i++) {
                    var temp = {
                        name: res.retdata.caseOutsideList[i].xArea,
                        value: res.retdata.caseOutsideList[i].curConfirm,
                    }
                    Countries.push(temp)
                }
                // console.log(res);
                // console.log(Countries);
                this.$charts.worldMap("worldMap", Countries);
            }).catch((err) => {
                console.log(err);
                this.$charts.worldMap("worldMap");
            })

            },
        }
    }
</script>

<style scoped>
    #chinaMap {
        width: 100%;
        height: 500px;
    }

    #worldMap {
        width: 1000px;
        height: 500px;
    }

    .map {
        margin-top: 4px;
        border-radius: 5px;
    }

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
</style>