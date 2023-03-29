<template>
  <div>
    <!-- <div class="background">
        <img :src="imgSrc" width="100%" height="100%" alt="">
      </div> -->
    <div class="home" style="width: 100%;">
      <!-- 疫情信息 -->
      <div style="margin-top:2%;margin-left: 2%;width: 70%;">
        <Info :covidInfo="covidInfo" />
      </div>
      <!-- 确诊信息 -->
      <div style="margin-top: 4px;margin-left: 2%;width: 70%;">
        <CaseNum :caseNumDate="caseNumDate" />
      </div>
      <!-- 地图 -->
      <div style="margin-top: 4px;margin-left: 2%;width: 70%;">
        <Map />
      </div>
      <!-- 新闻 -->
      <div style="margin-top: 4px;margin-left: 2%;width: 70%;">
        <NewsList />
      </div>

    </div>
  </div>

</template>

<script>
  import Info from '@/components/covid/Info'
  import CaseNum from '@/components/covid/CaseNum'
  import Map from '@/components/covid/Map'
  import NewsList from '@/components/covid/NewsList'

  export default {
    name: 'CovidInf',
    data() {
      return {
        imgSrc: require('../../assets/1.png'),
        //疫情信息
        covidInfo: {},
        //感染人数
        caseNumDate: {},
        //新闻
        //newsListData: {},
      }
    },
    components: {
      Info,
      CaseNum,
      Map,
      NewsList,
    },
    mounted() {
      this.initData();
    },
    methods: {
      initData() {
        this.getRequest('/api/ncov/index?key=52e3c6b5808b704c5c01a32a43496606').then(resp => {
          if (resp) {
            console.log(resp);
            //const{desc} = resp.data.newslist[0]
            const { desc } = resp.newslist[0]

            //新闻
            //this.newsListData = resp.newslist[0]
            //console.log(this.newsListData);
            //病毒信息
            this.covidInfo = {
              note1: desc.note1,
              note2: desc.note2,
              note3: desc.note3,
              remark1: desc.remark1,
              remark2: desc.remark2,
              remark3: desc.remark3,
            },
              // 疫情病例数
              this.caseNumDate = {
                time: desc.modifyTime,
                currentConfirmedCount: desc.currentConfirmedCount,
                confirmedCount: desc.confirmedCount,
                suspectedCount: desc.suspectedCount,
                curedCount: desc.curedCount,
                deadCount: desc.deadCount,
                seriousCount: desc.seriousCount,
                currentConfirmedIncr: desc.currentConfirmedIncr,
                confirmedIncr: desc.confirmedIncr,
                curedIncr: desc.curedIncr,
                deadIncr: desc.deadIncr,
                seriousIncr: desc.seriousIncr,
                suspectedIncr: desc.suspectedIncr,
              }
          }
        })
      }
    },


  }
</script>

<style scoped>

</style>