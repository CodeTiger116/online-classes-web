<template>

    <div>
        <div class="block" style="width: 70%;">
            <div class="addMajorTool">
                <el-input placeholder="请输入专业名称" suffix-icon="el-icon-plus" v-model="major.majorName" size="small">
                </el-input>

                <el-button type="primary" size="small" @click="addMajor">
                    <i class="el-icon-plus" aria-hidden="true"></i>
                    添加专业
                </el-button>
            </div>
            <el-table :data="majorData" border style="margin-top: 10px;" v-loading="loading"
                element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(255, 255, 255, 0.8)">

                <el-table-column type="index" width="100" label="编号">
                </el-table-column>
                <el-table-column prop="majorName" label="专业">
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete(scope.$index,scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>
         <!-- 编辑弹出框 -->
         <el-dialog title="编辑专业" :visible.sync="dialogVisible" width="30%" >
            <!-- 编辑框主体 -->
            <div>
                <el-tag type="warning" >专业名称:</el-tag></el-tag>
                <el-input v-model="updateMajor.majorName"  style="width: 70%;margin-left: 8px;" size="small"></el-input>
                
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="doUpdate" size="small">确 定</el-button>
            </span>
        </el-dialog>


    </div>

</template>

<script>
    export default {
        name: "SysMaj",
        data() {
            return {
                //添加输入框的数据
                major: {
                    majorName: ''
                },
                //编辑输入框数据
                updateMajor:{
                    majorName:''
                },
                majorData: [],

                loading: false,
                //弹出框的布尔值
                dialogVisible: false
            }
        },
        //钩子
        mounted() {
            this.initMajor();
        },
        //方法
        methods: {
            //获取所有专业信息
            initMajor() {
                this.loading = true;
                this.getRequest('/system/major/').then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.majorData = resp;
                    }
                })
            },
            //添加
            addMajor() {
                if (this.major.majorName) {
                    this.postRequest('/system/major/', this.major).then(resp => {
                        if (resp) {
                            this.initMajor();
                        }
                    })
                } else {
                    this.$message.error("专业名不能为空")
                }
            },
            //编辑
            handleEdit(index, data) {
                 //编辑的输入框显示信息,不能直接赋值,直接赋值，编辑输入框输入过程中，内容会和表格原本内容同步变化
                //this.updateGrade = data;
                //用数据的拷贝
                Object.assign(this.updateMajor,data);
                //显示编辑框
                this.dialogVisible=true;
            },
             //真正的更新
            doUpdate(){
                this.putRequest('/system/major/',this.updateMajor).then(resp=>{
                    if(resp){
                        this.initMajor();
                        this.dialogVisible =false;
                    }
                })
            },
            //删除
            handleDelete(index, data) {
                this.$confirm('此操作将永久删除[' + data.majorName + ']专业, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest('/system/major/'+data.id).then(resp=>{
                        if(resp){
                            this.initMajor();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
        },
    }
</script>


<style scoped>
    .block {
        display: inline-block;
    }

    .addMajorTool {
        margin-top: 10px;
        display: flex;
    }

    .addMajorTool .el-input {
        margin-right: 8px;
    }
</style>