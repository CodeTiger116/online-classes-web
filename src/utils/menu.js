import { getRequest } from "./api"


export const initMenu = (router, store) => {
    // 不为空就不必再初始化
    if (store.state.routes.length > 0) {
        return;
    }

    //通过用户id查询菜单请求的url
    getRequest('/system/cfg/menu').then(data => {
        if (data) {

            //格式化Routes
            let fmtRoutes = formateRoutes(data);
            //格式化好还需要添加到路由
            router.addRoutes(fmtRoutes);
            //把数据存到store，也就是vuex
            store.commit('initRoutes', fmtRoutes);

            //连接websocket
            store.dispatch('connect');
        }
    })
}



//formateRoutes方法
export const formateRoutes = (routes) => {
    let fmtRoutes = [];
    routes.forEach(router => {
        let {
            path,
            component,
            name,
            children,
        } = router;

        //如果children存在，并属于一个方法
        if (children && children instanceof Array) {
            //递归
            children = formateRoutes(children);
        }
        //
        let fmRouter = {
            path: path,
            name: name,
            children: children,
            component(resolve) {
                if (component.startsWith("Home")) {
                    require(['../views/' + component + '.vue'], resolve);
                } else if (component.startsWith("Stu")) {
                    require(['../views/student/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sys")) {
                    require(['../views/system/' + component + '.vue'], resolve);
                } else if (component.startsWith("Cou")) {
                    require(['../views/course/' + component + '.vue'], resolve);
                } else if (component.startsWith("Live")) {
                    require(['../views/live/' + component + '.vue'], resolve);
                } else if (component.startsWith("My")) {
                    require(['../views/stucourse/' + component + '.vue'], resolve);
                } else if (component.startsWith("Friend")) {
                    require(['../views/chat/' + component + '.vue'], resolve);
                } else if (component.startsWith("IStu")) {
                    require(['../views/myclassmate/' + component + '.vue'], resolve);
                } else if (component.startsWith("File")) {
                    require(['../views/filemgr/' + component + '.vue'], resolve);
                } else if (component.startsWith("INot")) {
                    require(['../views/Inotice/' + component + '.vue'], resolve);
                } else if (component.startsWith("Not")) {
                    require(['../views/notice/' + component + '.vue'], resolve);
                }else if (component.startsWith("Covid")) {
                    require(['../views/covid/' + component + '.vue'], resolve);
                }




            }
        }

        fmtRoutes.push(fmRouter);
    });
    return fmtRoutes;
}