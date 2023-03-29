import Vue from 'vue';
import Vuex from 'vuex';
import { getRequest } from '../utils/api';
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

import { Notification } from 'element-ui';


Vue.use(Vuex)

// vue-chat
const now = new Date();


//vuex初始配置

//创建并暴露store
const store = new Vuex.Store({
    state: {
        routes: [],

        // vue-chat
        // 存聊天记录
        sessions: {},
        //当前用户
        currentAdmin: JSON.parse(window.sessionStorage.getItem('user')),
        admins: [],
        currentSession: null,
        filterKey: '',
        stomp: null,
        isDot:{}
    },

    mutations: {
        initRoutes(state, data) {
            state.routes = data;
        },

        //vue-chat
        INIT_CURRENTADMIN(state, admin) {
            state.currentAdmin = admin;
        },
        initRoutes(state, data) {
            state.routes = data;
        },
        // 
        changeCurrentSessionId(state, currentSession) {
            state.currentSession = currentSession;
            Vue.set(state.isDot,state.currentAdmin.username+ '#' + state.currentSession.username,false);
        },
        addMessage(state, msg) {
            let mss = state.sessions[state.currentAdmin.username + '#' + msg.to];
            if (!mss) {
                // 让其等于空数组
                //sessions发生变化，页面就会发生变化
                Vue.set(state.sessions, state.currentAdmin.username + '#' + msg.to, []);
               
            }
            state.sessions[state.currentAdmin.username + '#' + msg.to].push({
                content: msg.content,
                date: new Date(),
                self: !msg.notSelf
            })
        },
        INIT_DATA(state) {
            // 浏览器本地的历史聊天记录可以在这里完成
            let data = localStorage.getItem('vue-chat-session');
            //console.log(data)
            if (data) {
                state.sessions = JSON.parse(data);
            }
        },
        //把数据存到vuex中
        INIT_ADMIN(state, data) {
            //给state里的admins传值
            state.admins = data;
        }
    },

    actions: {
        //vue -caht
        //连接
        connect(context) {
            // 连接端点
            context.state.stomp = Stomp.over(new SockJS('/ws/ep'));
            //获取token传到后端
            let token = window.sessionStorage.getItem("tokenStr");
            context.state.stomp.connect({ 'Auth-Token': token }, success => {
                // 成功的回调，订阅消息频道
                context.state.stomp.subscribe('/user/queue/chat', msg => {
                    //拿到消息
                    let receiveMsg = JSON.parse(msg.body);
                    // currentSession是空的，没有在和别人聊天 或者现在收到的消息发送者不是正在聊天的那个人
                    if(!context.state.currentSession || receiveMsg.from != context.state.currentSession.username){
                        Notification({
                            title: '【' + receiveMsg.formNickName + '】发来一条消息',
                            message: receiveMsg.content.length > 10 ? receiveMsg.content.substr(0,10) : receiveMsg.content,
                            type: 'success',
                            position: 'bottom-right'
                          });
                        //   vue监控到值的变化,小红点
                        Vue.set(context.state.isDot,context.state.currentAdmin.username+ '#' + receiveMsg.from,true);
                    }
                    receiveMsg.notSelf = true;
                    receiveMsg.to = receiveMsg.from;
                    context.commit('addMessage', receiveMsg);
                })
            }, error => {
            })
        },


        //friendChat 中钩子函数执行了initData()
        initData(context) {
            // 持久化存储
            context.commit('INIT_DATA');
            //后端接口：根据关键字搜索用户
            getRequest('/friend/chat/').then(resp => {
                if (resp) {
                    //执行mutations里的方法，再把resp传进去
                    context.commit('INIT_ADMIN', resp);
                }
            })
        }
    }
})

//vue-chat
store.watch(function (state) {
    return state.sessions
}, function (val) {
    console.log('CHANGE: ', val);
    localStorage.setItem('vue-chat-session', JSON.stringify(val));
}, {
    deep: true/*这个貌似是开启watch监测的判断,官方说明也比较模糊*/
})

export default store;