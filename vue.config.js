const { faLeaf } = require("@fortawesome/free-solid-svg-icons")

let proxyObj = {}

//疫情数据，接口1
proxyObj['/api'] = {
    ws: false,
    // 代理目标的基础路径
    target: 'http://api.tianapi.com',
    //changeOrigin设置为true时，服务器收到的请求头中的host为8081
    changeOrigin: true,
    //重写路径
    pathRewrite: { '^/api': '/' }
}

//疫情数据，接口2
proxyObj['/map'] = {
    ws: false,
    // 代理目标的基础路径
    target: 'https://qayz.api.storeapi.net/api/94',

    //changeOrigin设置为true时，服务器收到的请求头中的host为8081
    changeOrigin: true,

    //重写路径
    pathRewrite: { '^/map': '/' }
}


// proxyObj['/video'] = {
//     ws: false,
//     // 代理目标的基础路径
//     target: 'http://dbiptv.sn.chinamobile.com',
//     //changeOrigin设置为true时，服务器收到的请求头中的host为8081
//     changeOrigin: true,
//     //重写路径
//     pathRewrite: { '^video': '/' }
// }

proxyObj['/'] = {
    ws: false,
    // 代理目标的基础路径
    target: 'http://localhost:8081',
    //changeOrigin设置为true时，服务器收到的请求头中的host为8081
    changeOrigin: true,
    //重写路径
    pathRewrite: { '^/': '/' }
}



// WebSocket
proxyObj['/ws'] = {
    // 表示这是一个websocket
    ws: true,
    target: 'ws://localhost:8081'
}




module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: proxyObj,

    }

}