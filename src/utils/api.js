import axios from "axios";
//import { replace } from "core-js/fn/symbol";
import { Message } from 'element-ui';
//import { config } from "vue/types/umd";
import router from '../router'


axios.interceptors.request.use(config => {
    //如果存在token，请求携带token
    if (window.sessionStorage.getItem('tokenStr')) {
        config.headers['Authorization'] = window.sessionStorage.getItem('tokenStr');
    }
    return config;
}), error => {
    console.log(error);
}


//响应拦截器
axios.interceptors.response.use(success => {

    //业务逻辑错误
    if (success.status && success.status == 200) {
        if (success.data.code == 500 || success.data == 401 || success.data == 403) {
            Message.error({ message: success.data.message });
            return;
        }

        if (success.data.message) {
            Message.success({ message: success.data.message });
        }
    }
    return success.data;

}, error => {
    //接口访问失败
    if (error.response.code == 504 || error.response.code == 404) {
        Message.error({ message: '服务器被吃了' });
    } else if (error.response.code == 403) {
        Message.error({ message: '权限不足，请联系管理员' });
    } else if (error.response.code == 401) {
        Message.error({ message: '尚未登录，请登录' });
        return replace('/');
    } else {
        if (error.response.data.message) {
            Message.error({ message: error.response.data.message });
        } else {
            Message.error({ message: '未知错误' });
        }
    }
    return;

});


let base = '';

//传送json格式的post请求
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        //此处不是单引号  而是  ` `
        url: `${base}${url}`,
        data: params
    })
}

//传递json的put请求
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    })
}

//传递json的get请求
export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        data: params
    })
}

//传递json的delete请求
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params
    })
}
