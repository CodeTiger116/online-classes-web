<template>

    <div>

        <!-- 学号 start -->
        <div class="selTool">
            <el-select v-model="studentId" filterable placeholder="选择学号" size="small" style="width: 15%">
                <el-option v-for="item in studentData" :key="item.id" :label="item.username" :value="item.id">
                </el-option>
            </el-select>
            <!-- <el-button type="primary" size="small" icon="el-icon-search" @click="searchBystudent">查看课程</el-button> -->

            
            <el-tag type="info" style="font-style: italic;">或者</el-tag>
        

            <el-select v-model="studentId" filterable placeholder="选择姓名" size="small" style="width: 15%">
                <el-option v-for="item in studentData" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
            </el-select>

            <el-button type="primary" size="small" icon="el-icon-search" @click="searchBystudent">查看课程</el-button>

            <el-button v-if="studentId!='' " type="primary" size="small" icon="el-icon-plus" @click="addCourse">为该生添加课程</el-button>

        </div>
        <!-- 表格 start -->
        <div >
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
                            
                            <el-button type="danger" size="mini" @click="handleDelete(scope.$index,scope.row)">删除该选课</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

             <!-- 弹出框 -->
            <el-dialog title="添加选课" :visible.sync="dialogVisible" width="30%" >
                <!-- 弹出框主体 -->
                <div>
                    <el-tag type="warning" >课程名称:</el-tag></el-tag>
                    <el-select v-model="courseId" filterable  placeholder="选择课程名称" size="small" style="width: 70%;margin-left: 8px;">
                        <el-option
                            v-for="item in allCourseData"
                            :key = "item.id"
                            :label = "item.courseName"
                            :value = "item.id"
                            >
                        </el-option>
                    </el-select>
                    
                </div>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                    <el-button type="primary" @click="doAddCourse" size="small">确 定</el-button>
                </span>
            </el-dialog>

        </div>
    </div>

</template>

<script>
    export default {
        name: "StuOth",
        data() {
            return {
                loading:false,
                dialogVisible:false,

                //搜索框数据,记录当前选择的学生id
                studentId:'',

                //记录添加选课时下拉选择框的课程id
                courseId:'',

                //选择框数据源
                studentData:[],

                //表格数据源
                courseData:[],
                
                //全部课程信息
                allCourseData:[],
            }
        },
        //钩子
        mounted() {
            this.initStudentData();
            this.initCourse();
        },
        //方法
        methods: {
            //获取全部学生信息，不分页
            initStudentData(){
                this.getRequest('/student/basic/all').then(resp=>{
                    if(resp){
                        this.studentData = resp;
                    }
                })
                
            },
             //初始化课程
            initCourse(){
                this.loading = true;
                this.getRequest('/course/info/').then(resp=>{
                    this.loading = false;
                    if(resp){
                        this.allCourseData = resp;
                    }
                })
            },
            //根据学生id搜索课程
            searchBystudent(){
                this.loading = true;
                this.getRequest('/course/info/course/'+this.studentId).then(resp=>{
                    this.loading = false;
                    if(resp){
                        this.courseData = resp;
                    }
                })
            },
            //为选中的学生添加课程
            addCourse(){
                //显示添加框
                this.dialogVisible=true;
            },
            //真正的添加操作
            doAddCourse(){
                this.getRequest('/serve/user-courses/add?adminId='+ this.studentId +'&courseId=' + this.courseId).then(resp=>{
                    if(resp){
                        this.searchBystudent();
                        this.dialogVisible =false;
                    }
                })

            },
            //删除
            handleDelete(index, data) {
                this.$confirm('确定从该生选课表中删除[' + data.courseName + ']课程?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest('/serve/user-courses/' + this.studentId +'&'+ data.id).then(resp => {
                        if (resp) {
                            this.searchBystudent();
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
    .selTool {
        margin-top: 10px;
        display: flex;
    }
    .selTool .el-button{
        margin-left: 8px;
    }
    .selTool .el-tag{
        margin-right: 2%;
        margin-left: 2%;
    }
</style>