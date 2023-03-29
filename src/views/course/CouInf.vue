<template>
    <div>
        <!-- 添加课程 start -->
        <div class="addCourseTool">
            <el-input placeholder="请输入课程名称"  v-model="course.courseName" size="small" clearable ></el-input>
            <el-input placeholder="请输入课程学分"  v-model="course.credit" size="small" clearable></el-input>
            <!-- <el-input placeholder="请输入课程类型"  v-model="course.type" size="small" clearable></el-input> -->
            <el-select v-model="course.type" placeholder="请选择课程类型" size="small" style="width: 480px;margin-right: 8px;">
                <el-option label="选修" value="选修"></el-option>
                <el-option label="必修" value="必修"></el-option>
              </el-select>

            <el-button type="primary" size="small" @click="addCourse">
                <i class="el-icon-plus" aria-hidden="true"></i>
                添加课程
            </el-button>
        </div>
        <!-- 添加课程 end -->

        <div>
            <el-table :data="courseData"  style="margin-top: 10px;" v-loading="loading"
                element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(255, 255, 255, 0.8)">

                <el-table-column type="index" width="100" label="编号"></el-table-column>

                <el-table-column prop="courseName" label="课程名称"></el-table-column>

                <el-table-column  label="学分">
                    <template slot-scope="scope">
                        <el-tag>{{scope.row.credit}}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="type" label="类型">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.type == '必修' " type="success">必修</el-tag>
                        <el-tag v-if="scope.row.type == '选修' " type="warning">选修</el-tag>

                    </template>
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
         <el-dialog title="编辑课程" :visible.sync="dialogVisible" width="30%" >
            <!-- 编辑框主体 -->
            <div>
                <el-tag type="warning" >课程名称:</el-tag>
                <el-input v-model="updateCourse.courseName" class="editInput"  size="small"></el-input>

                <el-tag type="warning" >课程学分:</el-tag>
                <el-input v-model="updateCourse.credit"  class="editInput" size="small"></el-input>

                <el-tag type="warning" >班级名称:</el-tag>
                <el-select v-model="updateCourse.type" placeholder="请选择课程类型" class="editInput" size="small" >
                    <el-option label="选修" value="选修"></el-option>
                    <el-option label="必修" value="必修"></el-option>
                </el-select>
                
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
        // 组件名称，在menu.js中
        name: "CouInf",
        data() {
            return {
                //初始化用到的课程数据源
                courseData:[],

                //输入框数据源，新增数据
                course:{
                    courseName: '',
                    credit:'',
                    type:''
                },
                //编辑框输入源，更新数据
                updateCourse:{
                    courseName: '',
                    credit:'',
                    type:''
                },
                //加载bool值
                loading: false,

                //弹出框的布尔值
                dialogVisible: false

            }
        },
        mounted() {
            this.initCourse();
        },
        //方法
        methods: {
            //初始化课程
            initCourse(){
                this.loading = true;
                this.getRequest('/course/info/').then(resp=>{
                    this.loading = false;
                    if(resp){
                        this.courseData = resp;
                    }
                })
            },
            //新增课程
            addCourse(){
                if(this.course.courseName && this.course.credit && this.course.type){
                    this.postRequest('/course/info/',this.course).then(resp=>{
                        if(resp){
                            this.initCourse();
                            this.course = [];
                        }
                    })
                }else{
                    this.$message.error("名称、学分、类型均不能为空!");
                }
            },
            //编辑
            handleEdit(index,data){
                //编辑的输入框显示信息,不能直接赋值,直接赋值，编辑输入框输入过程中，内容会和表格原本内容同步变化
                //this.updateGrade = data;
                //用数据的拷贝
                Object.assign(this.updateCourse,data);
                //显示编辑框
                this.dialogVisible=true;
            },
            //真正的更新
            doUpdate(){
                this.putRequest('/course/info/',this.updateCourse).then(resp=>{
                    if(resp){
                        this.initCourse();
                        this.dialogVisible =false;
                    }
                })
            },
            //删除课程
            handleDelete(index, data) {
                this.$confirm('此操作将永久删除[' + data.courseName + ']课程, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest('/course/info/'+data.id).then(resp=>{
                        if(resp){
                            this.initCourse();
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
    .addCourseTool {
        margin-top: 10px;
        display: flex;
        width: 70%;
    }

    .addCourseTool .el-input {
        margin-right: 8px;
    }

    .editInput{
        margin-left: 8px;
        margin-top: 4px;
        width: 70%;
    }
</style>