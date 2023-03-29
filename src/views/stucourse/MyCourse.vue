<template>
    <div>

        <div class="selTool">
            <el-tag>全部课程:</el-tag>
            <el-select v-model="courseId" filterable  placeholder="选择课程名称" size="small" style="width: 20%;margin-left: 8px;">
                <el-option
                    v-for="item in allCourseData"
                    :key = "item.id"
                    :label = "item.courseName"
                    :value = "item.id"
                    >
                </el-option>
            </el-select>

            <el-button style="margin-left: 8px;" type="primary" size="small" icon="el-icon-plus" @click="addCou">
                添加该课程</el-button>


        </div>

        <div>
            <el-table :data="courseData" style="margin-top: 10px;" v-loading="loading" element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 0.8)">

                <el-table-column type="index" width="100" label="编号"></el-table-column>

                <el-table-column label="课程名称">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>周: {{ scope.row.week }}</p>
                            <p>节次: {{ scope.row.jieci }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.courseName }}</el-tag>
                            </div>
                        </el-popover>
                    </template>

                </el-table-column>

                <el-table-column label="学分">
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
    </div>
</template>

<script>
    export default {
        name: "CourseMy",
        data() {
            return {
                // 当前登录用户
                user: JSON.parse(window.sessionStorage.getItem("user")),

                //加载bool值
                loading: false,
                //初始化用到的课程数据源
                courseData: [],
                //记录添加选课时下拉选择框的课程id
                courseId:'',
                //全部课程信息
                allCourseData:[],

            }
        },
        mounted() {
            this.initCourse();
        },
        //方法
        methods: {
            //根据学生id搜索课程，查询我的课程
            initCourse() {
                this.loading = true;
                this.getRequest('/student/course/' + this.user.id).then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.courseData = resp;
                    }
                }),
                this.getRequest('/student/getAllCou/').then(resp=>{
                    this.loading = false;
                    if(resp){
                        this.allCourseData = resp;
                    }
                })
            },
            addCou(){
                this.getRequest('/serve/user-courses/add?adminId='+ this.user.id +'&courseId=' + this.courseId).then(resp=>{
                    if(resp){
                        this.initCourse();
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
                    this.deleteRequest('/serve/user-courses/' + this.user.id +'&'+ data.id).then(resp => {
                        if (resp) {
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
        }
    }
</script>

<style scoped>

</style>