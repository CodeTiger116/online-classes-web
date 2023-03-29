<template>
    <div>
        <el-container>
            <!-- 头部 -->
            <el-header>
                <div style="display: flex;justify-content: space-between;margin-top: 12px;">

                    <!-- 左边两个div -->
                    <div style="display: flex;justify-content: space-between">

                        <div class="grid-content bg-purple" style="font-size: 20px;font-weight: bold; color: #409EFF">
                            <i class="el-icon-monitor"></i>
                            线上直播授课平台
                        </div>
                        <div class="grid-content bg-purple" @click="goFroum"
                            style="font-size: 20px;font-weight: bold; color: #409EFF;margin-left: 18px;">
                            <i class="el-icon-chat-line-square"></i>
                            师生交流区
                            <!-- <el-button type="text" class="top-button" @click="goFroum">论坛</el-button> -->
                        </div>
                    </div>

                    <!-- 右边两个div -->
                    <div style="display: flex;justify-content: space-between">
                        <div @click="drawer = true"
                            style="margin-right: 100px;font-size: 20px;font-weight: bold; color: #409EFF;margin-left: 18px;">
                            <i class="el-icon-edit-outline"></i>
                            待办
                        </div>

                        <div class="grid-content bg-purple">
                            <el-dropdown @command="commandHandler">
                                <span class="el-dropdown-link" style="margin-right: 20px;">
                                    你好, {{user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
                                    <el-dropdown-item command="setting">设置</el-dropdown-item>
                                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </div>

                </div>

                <!-- 待办 -->
                <!-- <el-drawer title="我的待办" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
                    <div style="margin-left: 10px; margin-right: 10px;">
                        <MyHeader :addTodo="addTodo" />
                        <MyList :todos="todos" :checkTodo="checkTodo" :deleteTodo="deleteTodo" />
                        <MyFooter :todos="todos" :checkAllTodo="checkAllTodo" :clearAllTodo="clearAllTodo" />
                    </div>
                </el-drawer> -->

                <el-drawer title="我的待办" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
                    <div style="margin-left: 10px; margin-right: 10px;">
                       <ToDo/>
                    </div>
                </el-drawer>

                <!-- <div style="line-height: 50px;">
                    <el-row :gutter="20">
                        <el-col :span="3">
                            <div class="grid-content bg-purple">
                                <i class="el-icon-monitor top-button"></i>
                                <el-button type="text" class="top-button" @click="clickTopButton(true)">线上直播授课平台</el-button>
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <div class="grid-content bg-purple">
                                <i class="el-icon-monitor top-button"></i>
                                <el-button type="text" class="top-button" @click="clickTopButton(false)">论坛</el-button>
                            </div>
                        </el-col>
                        
                        <el-col :span="2" :offset="16">
                            <div class="grid-content bg-purple">
                                <el-dropdown @command="commandHandler">
                                    <span class="el-dropdown-link" style="margin-right: 20px;">
                                        你好, {{user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
                                        <el-dropdown-item command="setting">设置</el-dropdown-item>
                                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                        </el-col>
                    </el-row>
                </div> -->

            </el-header>
            <div style="margin-bottom: 0px;height:1px; background:#E0E0E0;"></div>
            <el-container>
                <!-- 侧边栏 -->
                <el-aside width="200px">
                    <!-- @select  菜单激活回调，点击找对应的index -->
                    <!-- <el-menu @select="menuClick"> -->
                    <!--router:启用view-router模式，激活菜单时就会以index的path路径进行路由的跳转  -->
                    <el-menu router unique-opened>
                        <el-submenu :index="index+''" v-for="(item, index) in routes" :key="index" v-if="!item.hidden">

                            <!-- 导航一 -->
                            <template slot="title"><i class="el-icon-s-operation"></i>
                                <span>{{item.name}}</span>
                            </template>

                            <!--选项1  -->
                            <el-menu-item :index="children.path" v-for="(children, indexj) in item.children"
                                :key="indexj">
                                {{children.name}}
                            </el-menu-item>

                        </el-submenu>

                    </el-menu>
                </el-aside>
                <!-- Main -->
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!='/home'">
                        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
                    </el-breadcrumb>

                    <router-view class="homeRouterView"></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>

</template>

<script>
    // import MyFooter from '@/components/todo/MyFooter'
    // import MyHeader from '@/components/todo/MyHeader'
    // import MyList from '@/components/todo/MyList'
    import ToDo from '@/components/todo/ToDo'

    export default {

        name: 'Home',
        //components:{MyHeader,MyList,MyFooter},
        components:{
            ToDo
        },
        data() {
            return {
                user: JSON.parse(window.sessionStorage.getItem('user')),
                //代办抽屉
                drawer: false,
                direction: 'rtl',

                //由于todos是MyHeader组件和MyFooter组件都在使用，所以放在App中（状态提升）
				todos:[
					{id:'001',title:'抽烟',done:true},
					{id:'002',title:'喝酒',done:false},
					{id:'003',title:'开车',done:true}
				]
            }
        },

        computed: {
            //从vuex获取
            routes() {
                return this.$store.state.routes;
            }
        },

        methods: {
            goFroum() {
                //跳到讨论区
                this.$router.push('/ifroum');

            },
            //代办抽屉
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => { });
            },
            			//添加一个todo
			addTodo(todoObj){
				this.todos.unshift(todoObj)
			},
			//勾选or取消勾选一个todo
			checkTodo(id){
				this.todos.forEach((todo)=>{
					if(todo.id === id) todo.done = !todo.done
				})
			},
			//删除一个todo
			deleteTodo(id){
				this.todos = this.todos.filter( todo => todo.id !== id )
			},
			//全选or取消全选
			checkAllTodo(done){
				this.todos.forEach((todo)=>{
					todo.done = done
				})
			},
			//清除所有已经完成的todo
			clearAllTodo(){
				this.todos = this.todos.filter((todo)=>{
					return !todo.done
				})
			},

            commandHandler(command) {

                //注销登录
                if (command == 'logout') {
                    this.$confirm('确认退出登录?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        //确认退出
                        this.postRequest('/logout');
                        //清空用户信息
                        window.sessionStorage.removeItem('tokenStr');
                        window.sessionStorage.removeItem('user');
                        //清空vuex中的用户菜单信息
                        this.$store.commit('initRouters', []);
                        //路由跳转,跳转到登录页
                        this.$router.replace('/')
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        });
                    });

                }

            }
        },


    }

</script>


<style>
    .top-button {
        font-size: 20px;
        font-weight: bold;
        color: #409EFF;
        margin-top: 0px;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    .homeRouterView {
        margin-top: 10px;
    }



    .btn {
		display: inline-block;
		padding: 4px 12px;
		margin-bottom: 0;
		font-size: 14px;
		line-height: 20px;
		text-align: center;
		vertical-align: middle;
		cursor: pointer;
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
		border-radius: 4px;
	}
	.btn-danger {
		color: #fff;
		background-color: #da4f49;
		border: 1px solid #bd362f;
	}
	.btn-danger:hover {
		color: #fff;
		background-color: #bd362f;
	}
	.btn:focus {
		outline: none;
	}
	.todo-container {
		/* width: 600px; */
		margin: 0 auto;
	}
	.todo-container .todo-wrap {
		padding: 10px;
		border: 1px solid #ddd;
		border-radius: 5px;
	}
</style>