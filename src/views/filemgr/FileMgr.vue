<template>
    <div>

        <!-- 搜索start -->
        <div style="display: flex;justify-content: space-between;">

            <div>
                <el-input v-model="fileName" @keydown.enter.native="initBasicData" @clear="initFileDate"
                    prefix-icon="el-icon-search" placeholder="文件名称" style="width: 40%; margin-right: 10px;"
                    size="small" clearable></el-input>

                <!-- <el-select  filterable placeholder="文件类型" size="small"
                    style="width: 30%;margin-right: 10px;">
                    <el-option v-for="item in fileType" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select> -->

                <el-button type="primary" icon="el-icon-search" size="small" @click="searchByName">
                    搜索
                </el-button>
            </div>

            <div>
                <el-button type="success" size="small" @click="uploadFile">
                    <i class="fa fa-level-up" aria-hidden="true"></i>
                    上传文件
                </el-button>

            </div>

        </div>
        <!-- end -->
        <!-- 表格 -->
        <div style="margin-top: 15px;">
            <el-table :data="fileData" max-height="490" style="width: 100%" v-loading="loading"
                element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(255, 255, 255, 0.8)">


                <el-table-column label="文件名" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <i v-if="scope.row.fileType == 'jpg'" class="fa fa-picture-o"></i>
                        <i v-else-if="scope.row.fileType == 'png'" class="fa fa-picture-o"></i>
                        <i v-else-if="scope.row.fileType == 'jepg'" class="fa fa-picture-o"></i>
                        <i v-else-if="scope.row.fileType == 'pdf' " class="fa fa-file-pdf-o"></i>
                        <i v-else = "scope.row.fileType == 'xxx' " class="fa fa-file"></i>
                        <span style="margin-left: 10px">{{ scope.row.name }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="文件大小">
                    <template slot-scope="scope">
                        <el-tag type="warning">{{fun(scope.row.fileSize)}}MB</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="uploadTime" label="上传时间"> </el-table-column>

                <el-table-column label="上传用户"> 
                    <template slot-scope="scope">
                        <el-tag>{{scope.row.uploadUser}}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="fileType" label="文件类型"> </el-table-column>

                <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handle(scope.row)">下载</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                        </el-button>
                    </template>
                </el-table-column>


            </el-table>
            <!-- 表格 end -->
        </div>
    </div>
</template>


<script>
    export default {
        name: "FileMgr",
        data() {
            return {

                user: JSON.parse(window.sessionStorage.getItem("user")),

                // 加载
                loading: false,

                // 文件信息数据源，文件列表
                fileData: [],

                // 文件名称
                fileName: '',
                //下拉选择框的文件类型（死数据）
                fileType: [
                    {
                        // value: 'pdf',
                        label: 'PDF'
                    }, {
                        // value: 'word',
                        label: 'WORD'
                    }, {
                        //value: 'excel',
                        label: 'EXCEL'
                    }, {
                        //value: 'jpg',
                        label: '图片'
                    }
                ]
            }
        },
        mounted() {
            this.initFileDate();
        },
        methods: {
            //查询所有文件
            initFileDate(){
                this.loading = true;
                this.getRequest('/file/manager/').then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.fileData = resp;
                    }
                })
            },
            //根据关键词搜索
            searchByName(){
                this.getRequest('/file/manager/' + this.fileName).then(resp => {
                    if (resp) {
                        this.fileData = resp;
                    }
                })
            },
            //下载
            handle(data){
                //本页面
                //window.location.href=data.fileUrl
                //新页面
                window.open(data.fileUrl)
            },
            //删除
            handleDelete(data){
                this.$confirm('此操作将永久删除[' + data.name + ']文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest('/file/manager/' + data.id).then(resp => {
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
            //上传文件
            uploadFile(){

            },
            //小数点
            fun(val){
                return Number(val/1024/1024).toFixed(2);
            }
        },
    }
</script>