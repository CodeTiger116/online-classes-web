<template>
    <div class="info">
        <p class="title">
            <i></i>
            <span style="font-size: 15px;">病毒信息</span>
        </p>
        <div class="content">
            <p>{{covidInfo.remark1}}</p>
            <p>{{covidInfo.remark2}}</p>
            <p>{{covidInfo.remark3}}</p>
            <p>{{covidInfo.note1}}</p>
            <p>{{covidInfo.note2}}</p>
            <p>{{covidInfo.note3}}</p>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Info",
        props:{
            covidInfo:{
                type:Object,
                default:function(){
                    return{}
                }
            }
        }
    }
</script>

<style scoped>
    .info{
        padding: 0.16rem;
        background: #fff;
        border-bottom: 1px solid #fff;
        border-radius: 5px;

    }
    .title{
        font-size: 0.17rem;
    }

    .title i{
        display: inline-block;
        width: 0.14rem;
        height: 1.00rem;
        margin-right: 0.03rem;
        vertical-align: middle;
        background: #4169e2;

    }
    .content{
        padding: 0.06rem 0.16rem;
    }
    .content p{
        font-size: 14px;
        margin: 5px 0;
    }

</style>