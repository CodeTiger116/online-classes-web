<template>
    <div>
        <!-- 选择课程名称 start -->
        <div class="courseSelTool">
            <el-select v-model="courseId" filterable  placeholder="选择课程名称" size="small" style="width: 30%">
                <el-option
                    v-for="item in courseData"
                    :key = "item.id"
                    :label = "item.courseName"
                    :value = "item.id"
                    >
                </el-option>
            </el-select>
            <el-button type="primary" size="small" icon="el-icon-search" @click="showStudent">查看学生</el-button>

        </div>
        <!-- 选择课程名称  end -->

        <!-- 学生表 -->
        <div>
            <el-table :data="studentData" border style="margin-top: 10px;"  v-loading="loading"
                element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(255, 255, 255, 0.8)">

                <el-table-column prop="username" label="学号" width="110"></el-table-column>

                <el-table-column prop="name" label="姓名" width="70" fixed></el-table-column>

                <el-table-column prop="major.majorName" label="专业" width="140">
                </el-table-column>

                <el-table-column prop="grades.gradeName" label="班级" width="60"></el-table-column>

                <el-table-column label="性别" width="60">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.gender == '男'" type="success">男</el-tag>
                        <el-tag v-if="scope.row.gender == '女'" type="warning">女</el-tag>

                    </template>
                </el-table-column>

                <el-table-column prop="birthday" label="生日" width="110"></el-table-column>

                <el-table-column prop="idCard" label="身份证号" width="170"></el-table-column>

                <el-table-column prop="phone" label="电话" width="120"></el-table-column>

                <el-table-column prop="address" label="地址" width="160" show-overflow-tooltip></el-table-column>

                <el-table-column prop="email" label="邮箱" width="190"></el-table-column>

                <el-table-column label="是否在校" width="80" fixed="right">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.isInSchool" type="success">在校</el-tag>
                        <el-tag v-if="!scope.row.isInSchool" type="danger">离校</el-tag>
                    </template>
                </el-table-column>

            </el-table>
        </div>
    </div>
</template>


<script>
    export default {
        name: "CouSel",
        data() {
            return {
                loading: false,
                //下拉框课程数据源
                courseData:[],
                //表格数据源
                studentData: [],
                //查看学生时传递的参数，课程id
                courseId:''
            }
        },
        //钩子
        mounted() {
            this.initCourse();
            //this.showStudent();
        },
        methods: {
            //初始化所有课程,默认
            initCourse(){
                this.loading = true;
                this.getRequest('/course/info/').then(resp=>{
                    this.loading = false;
                    if(resp){
                        this.courseData = resp;
                    }
                })
            },
            //根据课程id查看学生
            showStudent(){
                this.loading = true;
                this.getRequest('/course/info/student/'+ this.courseId).then(resp=>{
                    this.loading = false;
                    if(resp){
                        this.studentData = resp;
                    }
                })
            }
        },
    }
</script>

<style scoped>
    .courseSelTool {
        margin-top: 10px;
        display: flex;
    }

    .courseSelTool .el-select {
        margin-right: 8px;
    }
</style>