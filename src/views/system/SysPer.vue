<template>
    <div>
        <!-- 添加角色 start -->
        <div class="permissionTool">
            <el-input placeholder="请输入角色英文名" v-model="role.name" size="small">
                <template slot="prepend">ROLE_</template>
            </el-input>

            <el-input v-model="role.nameZh" placeholder="请输入角色中文名" size="small" clearable @change=""></el-input>

            <el-button type="primary" size="small" icon="el-icon-plus" @click="doAddRole">添加角色</el-button>

        </div>
        <!-- 添加角色  end -->

        <!-- 折叠面板  start -->
        <div class="permissionMain">
            <!-- 点击事件 @change -->
            <el-collapse v-model="activeName" accordion @change="change">
                <el-collapse-item :title="r.nameZh" :name="r.id" v-for="(r,index) in roles" :key="index">
                    <el-card class="box-card">

                        <div slot="header" class="clearfix">
                            <span>可访问资源</span>
                            <el-button style="float: right; padding: 3px 0;color: rgb(243, 9, 9);" type="text"
                                icon="el-icon-delete" @click="doDeleteRole(r)"></el-button>
                        </div>

                        <!-- 树形控件 -->
                        <div>
                            <!-- 公用同一个AllMene和SelectMenu，用同一个数据源，会有显示问题，来回切换时显示反应有延迟 -->
                            <!-- 加上key属性，保证切换时并不是同一个树形控件 -->
                            <el-tree 
                            :key="index"
                            :data="allMenus" 
                            :props="defaultProps" 
                            ref="tree"
                            show-checkbox 
                            :default-checked-keys="selectMenus" 
                            node-key="id"
                            >
                            </el-tree>

                            <!-- 确认和取消按钮 -->
                            <div style="margin-top: 20px;display: flex;justify-content: flex-end;">
                                <el-button type="primary" size="mini" @click="cancelUpdate">取消修改</el-button>
                                <el-button type="primary" size="mini" @click="doUpdate(r.id,index)">确认修改</el-button>
                                

                            </div>
                        </div>
                    </el-card>
                </el-collapse-item>
            </el-collapse>
        </div>
        <!-- 折叠面板  end -->
    </div>
</template>

<script>

    export default {
        name: 'SysPer',
        data() {
            return {
                role: {
                    name: '',
                    nameZh: ''
                },
                activeName: -1,
                roles: [],
                // 手风琴模式，一次只展开一个，因此allMenus可以只设置这一个
                allMenus: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                selectMenus:[]
            }
        },
        // 钩子
        mounted() {
            this.initRoles();
        },
        methods: {
            // 折叠面板点击事件
            change(rid) {
                if (rid) {
                    this.initAllMenus();
                    this.initSelectMenus(rid);
                }
            },
            //初始化 获取所有角色，
            initRoles() {
                this.getRequest('/system/basic/').then(resp => {
                    if (resp) {
                        this.roles = resp;
                    }
                })
            },
            //初始化全部菜单
            initAllMenus() {
                this.getRequest('/system/basic/menus').then(resp => {
                    if (resp) {
                        this.allMenus = resp;
                    }
                })
            },
            // 根据角色id查询菜单id
            initSelectMenus(rid){
                this.getRequest('/system/basic/mid/'+rid).then(resp=>{
                    if(resp){
                        this.selectMenus = resp;
                    }
                })

            },
            //确认修改
            doUpdate(rid,index){

                this.$confirm('确认修改?','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() =>{
                    let tree = this.$refs.tree[index];
                    let selectedKeys = tree.getCheckedKeys(true);
                    let url = '/system/basic/update?rid='+rid;
                    selectedKeys.forEach(key => {
                        url += '&mids='+key;
                    });
                    this.getRequest(url).then(resp=>{
                        if(resp){
                            //this.initRoles();
                            this.activeName = -1;
                        }
                    })
                }).catch(()=>{
                    this.$message({
                    type: 'info',
                    message: '已取消修改'
                  }); 
                });


            },
            //取消修改
            cancelUpdate(){
                this.activeName = -1; 
            },

            //添加角色
            doAddRole(){
                if(this.role.name && this.role.nameZh){
                    this.postRequest('/system/basic/role',this.role).then(resp =>{
                        if(resp){
                           
                            this.initRoles();
                            this.role.name ='';
                            this.role.nameZh ='';
                        }
                    })
                }else{
                    this.$message.error('所有字段不能为空');
                }
            },
            //删除角色
            doDeleteRole(role){
                this.$confirm('此操作将永久删除['+role.nameZh+']角色,是否继续?','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() =>{
                    this.deleteRequest('/system/basic/role/'+role.id).then(resp=>{
                        if(resp){
                            this.initRoles();
                        }
                    })
                   
                }).catch(()=>{
                    this.$message({
                    type: 'info',
                    message: '已取消删除'
                  }); 
                });
            }

        },
    }
</script>

<style scoped>
    .permissionTool {
        margin-top: 20px;
        display: flex;
    }

    .permissionTool .el-input {
        width: 300px;
        margin-right: 8px;
    }

    .permissionMain {
        margin-top: 30px;
        width: 700px;
    }
</style>