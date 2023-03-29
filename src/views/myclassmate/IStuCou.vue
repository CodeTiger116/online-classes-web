<template>
    <div>

        <!-- 学号 start -->
        <div class="selTool">
            <el-tag>我的课程:</el-tag></el-tag>
            <el-select v-model="courseId" filterable placeholder="选择课程..." size="small" style="width: 15%;margin-left: 4px;">
                <el-option v-for="item in MyCourseData" :key="item.id" :label="item.courseName" :value="item.id">
                </el-option>
            </el-select>

            <el-button style="margin-left: 8px;" type="primary" size="small" icon="el-icon-search" @click="showStudent">查看同学</el-button>


        </div>


        <div>
            <el-table :data="studentData" border style="margin-top: 10px;" v-loading="loading"
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
        name: "IStuCou",
        data() {
            return {
                //
                loading:false,
                // 当前登录用户
                user: JSON.parse(window.sessionStorage.getItem("user")),

                //选择框中选择的课程id，用于搜索选秀该课程的学生
                courseId:'',
                // 存储选修某一门课程的学生
                studentData: [],
                // 存储当前登录用户的课程
                MyCourseData: [],

            }
        },
        mounted() {
            this.searchBystudent();
        },
        methods: {

            //根据学生id搜索课程，查询我的课程
            searchBystudent() {
                this.loading = true;
                this.getRequest('/student/course/' + this.user.id).then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.MyCourseData = resp;
                    }
                })
            },
            //根据课程id查看学生
            showStudent() {
                this.loading = true;
                this.getRequest('/student/student/' + this.courseId).then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.studentData = resp;
                    }
                })
            }
        },
    }
</script>


<style scoped>

</style>