<template>

    <div>
        <!-- 工具栏 start -->
        <div>
            <!-- 搜索、导入、导出 start -->
            <div style="display: flex;justify-content: space-between;">

                <div>
                    <el-input v-model="empName" @keydown.enter.native="initBasicData" @clear="initBasicData"
                        prefix-icon="el-icon-search" placeholder="学生姓名" style="width: 200px; margin-right: 10px;"
                        size="small" clearable></el-input>
                    <el-button type="primary" icon="el-icon-search" size="small" @click="initBasicData">
                        搜索
                    </el-button>

                    <el-button type="primary" size="small"
                        @click="showAdvanceSearchVisible = !showAdvanceSearchVisible">
                        <i :class=" showAdvanceSearchVisible ? 'el-icon-arrow-up' : 'el-icon-arrow-down' "
                            aria-hidden="true"></i>
                        高级搜索
                    </el-button>
                </div>

                <div>
                    <!-- before-upload： 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。 -->
                    <!-- headers：	设置上传的请求头部 -->
                    <!-- on-success： 文件上传成功时的钩子-->
                    <!-- on-error： 文件上传失败时的钩子-->
                    <!-- show-file-list： 	是否显示已上传文件列表-->
                    <el-upload action="/student/basic/import" :before-upload="beforeUpload" :headers="headers"
                        :on-success="onSuccess" :on-error="onError" :disabled="importDataDisabled"
                        style="display: inline-flex;margin-right: 8px" :show-file-list="false">
                        <el-button :disabled="importDataDisabled" size="small" type="success" :icon="importDataBtnIcon">
                            {{importDataBtnText}}
                        </el-button>
                    </el-upload>


                    <el-button type="success" size="small" @click="downloadFile">
                        <i class="fa fa-level-down" aria-hidden="true"></i>
                        导出数据
                    </el-button>
                    <el-button type="primary" size="small" @click="">
                        <i class="el-icon-plus" aria-hidden="true"></i>
                        添加学生
                    </el-button>

                </div>

            </div>
            <!-- end -->

            <!-- 高级搜索 start -->
            <transition name="slide-fade">
                <div v-show="showAdvanceSearchVisible"
                    style="border: 1px solid #DCDCDC;border-radius: 4px;box-sizing: border-box;padding: 10px;margin: 8px 0px;">
                    <!-- 专业、班级、性别、是否在校、入学时间 -->
                    <el-row>
                        <el-col :span="7">
                            <font style="font-size: 13px; color: #696969;">专业：</font>
                            <el-select v-model="value" clearable placeholder="请选择" size="mini" style="width: 150px;">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>

                        <el-col :span="7">
                            <font style="font-size: 13px; color: #696969;">班级：</font>
                            <el-select v-model="value" clearable placeholder="请选择" size="mini" style="width: 130px;">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="5">
                            <font style="font-size: 13px; color: #696969;">性别：</font>
                            <el-select v-model="value" clearable placeholder="请选择" size="mini" style="width: 100px;">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="5">
                            <font style="font-size: 13px; color: #696969;">是否在校：</font>
                            <el-select v-model="value" clearable placeholder="请选择" size="mini" style="width: 100px;">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <div style="margin-bottom: 8px;margin-top: 8px; height:1px; background:#E0E0E0;"></div>
                    <el-row>
                        <el-col :span="8">
                            <font style="font-size: 13px; color: #696969;">入学时间：</font>
                            <el-date-picker v-model="value1" type="monthrange" range-separator="至"
                                start-placeholder="开始月份" end-placeholder="结束月份" size="mini">
                            </el-date-picker>
                        </el-col>
                        <el-col :span="4" :offset="11">
                            <el-button type="primary" icon="el-icon-search" size="mini">搜索</el-button>
                            <el-button type="primary" icon="el-icon-close" size="mini">取消</el-button>
                        </el-col>
                    </el-row>
                </div>
            </transition>
            <!-- 高级搜索 end -->
        </div>
        <!-- 工具栏 end -->


        <!-- 表格 -->
        <div style="margin-top: 15px;">
            <el-table :data="basicData" max-height="490" style="width: 100%" v-loading="loading"
                element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(255, 255, 255, 0.8)">

                <el-table-column type="selection" width="45"></el-table-column>

                <el-table-column prop="username" label="学号" width="120"></el-table-column>

                <el-table-column prop="name" label="姓名" width="70" fixed></el-table-column>

                <el-table-column prop="major.majorName" label="专业" width="100" show-overflow-tooltip>
                </el-table-column>

                <el-table-column prop="grades.gradeName" label="班级" width="60"></el-table-column>

                <el-table-column label="性别" width="60">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.gender == '男'" type="success">男</el-tag>
                        <el-tag v-if="scope.row.gender == '女'" type="warning">女</el-tag>

                    </template>
                </el-table-column>

                <el-table-column prop="birthday" label="生日" width="120"></el-table-column>

                <el-table-column prop="idCard" label="身份证号" width="180"></el-table-column>

                <el-table-column prop="phone" label="电话" width="120"></el-table-column>

                <el-table-column prop="address" label="地址" width="160" show-overflow-tooltip></el-table-column>

                <el-table-column prop="email" label="邮箱" width="190"></el-table-column>

                <el-table-column label="是否在校" width="80">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.isInSchool" type="success">在校</el-tag>
                        <el-tag v-if="!scope.row.isInSchool" type="danger">离校</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="enrollmentTime" label="入学时间" width="120"> </el-table-column>

                <el-table-column label="是否锁定" width="80">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.enabled" type="success">可用</el-tag>
                        <el-tag v-if="!scope.row.enabled" type="warning">锁定</el-tag>

                    </template>
                </el-table-column>

                <el-table-column label="操作" width="260" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="">编辑</el-button>
                        <el-button type="primary" size="mini" @click="">查看高级资料</el-button>
                        <el-button type="danger" size="mini" @click="">锁定</el-button>
                        </el-button>
                    </template>

                </el-table-column>

            </el-table>
            <!-- 表格 end -->

            <!-- 分页 start -->
            <div style="margin-top: 10px;display: flex;justify-content: flex-end;">
                <el-pagination background @current-change="currentChange" layout="total,jumper,prev, pager, next"
                    :total="total">
                </el-pagination>
            </div>

            <!-- 分页 end -->
        </div>
        <!--表格 end -->
    </div>

</template>

<script>
    export default {
        name: "StuBas",
        data() {
            return {
                showAdvanceSearchVisible: false,

                basicData: [],
                loading: false,
                total: 0,
                currentPage: 1,
                size: 10,
                empName: '',

                //导入数据  是否禁用
                headers: {
                    Authorization: window.sessionStorage.getItem('tokenStr')
                },
                importDataDisabled: false,
                importDataBtnText: '导入数据',
                importDataBtnIcon: 'el-icon-upload2'
            }
        },
        //钩子
        mounted() {
            this.initBasicData();
        },
        methods: {

            //获取数据
            initBasicData() {
                this.loading = true;
                this.getRequest('/student/basic/?currentPage=' + this.currentPage +
                    '&size=' + this.size +
                    '&name=' + this.empName).then(resp => {
                        this.loading = false;
                        if (resp) {
                            this.basicData = resp.data;
                            this.total = resp.total;
                        }
                    })
            },
            //换页
            currentChange(currentPage) {
                this.currentPage = currentPage;
                this.initBasicData();
            },
            //导入学生数据
            onError() {
                this.importDataBtnText = '导入数据';
                this.importDataBtnIcon = 'el-icon-upload2';
                this.importDataDisabled = false;
            },
            onSuccess() {
                this.importDataBtnText = '导入数据';
                this.importDataBtnIcon = 'el-icon-upload2';
                this.importDataDisabled = false;
                this.initBasicData();
            },
            beforeUpload() {
                this.importDataBtnText = '正在导入';
                this.importDataBtnIcon = 'el-icon-loading';
                this.importDataDisabled = true;
            },
            //导出学生数据
            downloadFile() {
                this.downloadRequest('/student/basic/export')

            }
        },
    }
</script>


<style scoped>
    .slide-fade-enter-active {
        transition: all .5s ease;
    }

    .slide-fade-leave-active {
        transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter,
    .slide-fade-leave-to

    /* .slide-fade-leave-active for below version 2.1.8 */
        {
        transform: translateX(10px);
        opacity: 0;
    }
</style>