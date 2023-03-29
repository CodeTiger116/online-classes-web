import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

// 导入图标库
import 'font-awesome/css/font-awesome.css'

import  ECharts  from './plugins/echarts'
import VueVideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
const hls = require('videojs-contrib-hls')

import { postRequest } from "./utils/api";
import { putRequest } from "./utils/api";
import { getRequest } from "./utils/api";
import { deleteRequest } from "./utils/api";
import {downloadRequest} from "./utils/download";
import { initMenu } from './utils/menu';

// const hls =require("videojs-contrib-hls")
// Vue.use(hls)

//导入地图相关
import echarts from "./plugins/echarts"
import "../node_modules/echarts/map/js/china"
import "../node_modules/echarts/map/js/world"
import "../node_modules/echarts/map/js/province/anhui"
import "../node_modules/echarts/map/js/province/anhui"
import "../node_modules/echarts/map/js/province/aomen"
import "../node_modules/echarts/map/js/province/beijing"
import "../node_modules/echarts/map/js/province/chongqing"
import "../node_modules/echarts/map/js/province/fujian"
import "../node_modules/echarts/map/js/province/gansu"
import "../node_modules/echarts/map/js/province/guangdong"
import "../node_modules/echarts/map/js/province/guangxi"
import "../node_modules/echarts/map/js/province/guizhou"
import "../node_modules/echarts/map/js/province/hainan"
import "../node_modules/echarts/map/js/province/hebei"
import "../node_modules/echarts/map/js/province/heilongjiang"
import "../node_modules/echarts/map/js/province/henan"
import "../node_modules/echarts/map/js/province/hubei"
import "../node_modules/echarts/map/js/province/hunan"
import "../node_modules/echarts/map/js/province/jiangsu"
import "../node_modules/echarts/map/js/province/jiangxi"
import "../node_modules/echarts/map/js/province/jilin"
import "../node_modules/echarts/map/js/province/liaoning"
import "../node_modules/echarts/map/js/province/neimenggu"
import "../node_modules/echarts/map/js/province/ningxia"
import "../node_modules/echarts/map/js/province/qinghai"
import "../node_modules/echarts/map/js/province/shandong"
import "../node_modules/echarts/map/js/province/shanghai"
import "../node_modules/echarts/map/js/province/shanxi"
import "../node_modules/echarts/map/js/province/shanxi1"
import "../node_modules/echarts/map/js/province/sichuan"
import "../node_modules/echarts/map/js/province/taiwan"
import "../node_modules/echarts/map/js/province/tianjin"
import "../node_modules/echarts/map/js/province/xianggang"
import "../node_modules/echarts/map/js/province/xinjiang"
import "../node_modules/echarts/map/js/province/xizang"
import "../node_modules/echarts/map/js/province/yunnan"
import "../node_modules/echarts/map/js/province/zhejiang"

import Tabs from "./components/covid/tabs"

//弹幕插件
//不需要引入源码样式
import { vueBaberrage } from 'vue-baberrage'

Vue.use(echarts)
Vue.use(Tabs)
Vue.use(vueBaberrage)




import { VueJsonp } from 'vue-jsonp'
Vue.use(VueJsonp)

Vue.use(ElementUI);
Vue.use(ECharts);

Vue.use(VueVideoPlayer)
Vue.use(hls)


//关闭浏览器显示生产模式的消息
Vue.config.productionTip = false

//插件形式使用请求
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.downloadRequest = downloadRequest;



//需求，
//全局前置守卫：初始化时执行、每次路由切换前执行
router.beforeEach((to, from, next) => {
  //console.log('beforeEach', to, from)
  //判断用户是不是登陆了
  if (window.sessionStorage.getItem('tokenStr')) {
    //如果登录，初始化菜单
    initMenu(router, store);
    if (!window.sessionStorage.getItem('user')) {
      //判断用户信息是否存在
      return getRequest('/admin/info').then(resp => {
        if (resp) {
          //alert(resp);
          //存入用户信息
          window.sessionStorage.setItem('user', JSON.stringify(resp));

          // 调用index.js的方法
          //store.commit('INIT_CURRENTADMIN',JSON.stringify(reesp));
         // store.commit('INIT_CURRENTADMIN',resp);

          next();
        }
      })
    }
    next();
  } else {
    if (to.path == '/') {
      next();
    } else {
      // this.$message.error('请先登录！');

      window.alert("请先登录！");
      next('/?redirect=' + to.path)
    }

  }
})


new Vue({

  store,
  router,

  //渲染app组件 
  render: h => h(App)
}).$mount('#app')
