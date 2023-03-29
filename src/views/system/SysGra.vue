<template>

    <div class="block" style="width: 70%;">
        <div class="addGradeTool">
            <el-input placeholder="请输入班级名称" suffix-icon="el-icon-plus" v-model="grade.gradeName" size="small">
            </el-input>

            <el-button type="primary" size="small" @click="addGrade">
                <i class="el-icon-plus" aria-hidden="true"></i>
                添加班级
            </el-button>
        </div>

        <div>
            <el-table :data="gradeData" border style="margin-top: 10px;" v-loading="loading"
                element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(255, 255, 255, 0.8)">
                <el-table-column type="index" width="100" label="编号">
                </el-table-column>
                <el-table-column prop="gradeName" label="班级">
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <!-- scope.$index,scope.row  当前行的索引下标和当前行的数据 -->
                        <el-button type="primary" size="mini" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete(scope.$index,scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑班级" :visible.sync="dialogVisible" width="30%" >
            <!-- 编辑框主体 -->
            <div>
                <el-tag type="warning" >班级名称:</el-tag></el-tag>
                <el-input v-model="updateGrade.gradeName"  style="width: 70%;margin-left: 8px;" size="small"></el-input>
                
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
        name: "SysGra",
        data() {
            return {
                // 输入框输入数据
                grade: {
                    gradeName: ''
                },
                //编辑输入框数据
                updateGrade:{
                    gradeName:''
                },
                // 班级数据源
                gradeData: [],

                //加载
                loading: false,

                //弹出框的布尔值
                dialogVisible: false

            }
        },
        //放在钩子中，一进入页面就调用方法，显示所有班级
        mounted() {
            this.initGrades();
        },
        methods: {
            // 获取所有班级数据
            initGrades() {
                this.loading = true;
                this.getRequest('/system/grade/').then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.gradeData = resp;
                    }
                })
            },
            //添加
            addGrade() {
                if (this.grade.gradeName) {
                    this.postRequest('/system/grade/', this.grade).then(resp => {
                        if (resp) {
                            this.initGrades();
                            //this.grade=[];
                        }
                    })
                } else {
                    this.$message.error("班级名不能为空")
                }
            },
            //编辑，只是将编辑框显示
            handleEdit(index, data) {
                //编辑的输入框显示信息,不能直接赋值,直接赋值，编辑输入框输入过程中，内容会和表格原本内容同步变化
                //this.updateGrade = data;
                //用数据的拷贝
                Object.assign(this.updateGrade,data);
                //显示编辑框
                this.dialogVisible=true;

            },
            //真正的更新
            doUpdate(){
                this.putRequest('/system/grade/',this.updateGrade).then(resp=>{
                    if(resp){
                        this.initGrades();
                        this.dialogVisible =false;
                    }
                })
            },
            //删除
            handleDelete(index, data) {
                this.$confirm('此操作将永久删除[' + data.gradeName + ']班级, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest('/system/grade/' + data.id).then(resp => {
                        if (resp) {
                            this.initGrades();
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

    .addGradeTool {
        margin-top: 10px;
        display: flex;
    }

    .addGradeTool .el-input {
        margin-right: 8px;
    }
</style>