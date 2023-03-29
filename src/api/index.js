import axios from '../utils/request'

// 新冠疫情总体
const base = {
    //api
    baseUrl: "http://api.tianapi.com",
    ncov: "/ncov/index",
    juheBaseUrl: "/api",
    springTravel: "/springTravel/citys",
    springTravelQuery: "/springTravel/query",
}
// 挖数据 --- 全国各省市疫情
const base2 = {
    //api2
    baseUrl: "https://qayz.api.storeapi.net/api/94",
    ncovcity: "/219?format=json&appid=12395&sign=83feaadc1daa89cc73988af6f3fb9173",
    ncovworld: "/222?format=json&appid=12395&sign=83feaadc1daa89cc73988af6f3fb9173",
}

const api = {
    // 获取疫情数据
    getNcov(params) {
        // return axios.get(base.baseUrl + base.ncov, {
        //     params
        // })
        return axios.get('/api/ncov/index', {
            params
        })
    },
    // 省市疫情
    getNcovCity() {
        // return axios.get(base2.baseUrl + base2.ncovcity)
        return axios.get('/api2/219?format=json&appid=12395&sign=83feaadc1daa89cc73988af6f3fb9173')
    },
    // 世界疫情
    getNcoWorld() {
        return axios.get('api2/222?format=json&appid=12395&sign=83feaadc1daa89cc73988af6f3fb9173')
    },

    // 各地政策
    springTravel(params) {
        return axios.get(base.juheBaseUrl + base.springTravel, {
            params
        })
    },
    // 各地政策详情
    springTravelQuery(params) {
        return axios.get(base.juheBaseUrl + base.springTravelQuery, {
            params
        })
    }
}

export default api