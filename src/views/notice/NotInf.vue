<template>
    <div>

        <div v-if="this.user.isStudent == 0" style="display: flex;justify-content: flex-end; margin-right: 45px;">
            <el-button type="success" size="small" @click="add">
                <i class="fa fa-plus" aria-hidden="true"></i>
                发布通知
            </el-button>
        </div>

        <!-- 表格 -->
        <div style="margin-top: 15px;">
            <el-table :data="noticeData" max-height="490" style="width: 100%" v-loading="loading"
                element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(255, 255, 255, 0.8)">


                <el-table-column width="500" show-overflow-tooltip label="学院公告">
                    <template slot-scope="scope">
                        <div @click='showContent(scope.row)'>{{scope.row.title}}</div>
                    </template>
                </el-table-column>

                <el-table-column prop="createDate" label="发布时间"></el-table-column>

                <el-table-column prop="updateDate" label="更新时间"> </el-table-column>

                <el-table-column v-if="this.user.isStudent == 0" label="操作" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                        </el-button>
                    </template>
                </el-table-column>


            </el-table>
            <!-- 表格 end -->
        </div>


        <!-- 查看内容 -->
        <el-dialog title="通知内容" :visible.sync="dialogVisible" width="90%">
            <el-row>
                <el-col style="white-space: pre-wrap;">{{this.content}}</el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">关闭</el-button>

            </span>
        </el-dialog>

        <!-- 编辑内容 -->
        <el-dialog title="编辑通知" :visible.sync="dialogFormVisible" width="90%">

            <div>
                <el-tag type="warning">通知标题:</el-tag>
                <el-input v-model="editNoticeData.title"></el-input>
                <el-tag type="warning">通知内容:</el-tag>
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 10}" v-model="editNoticeData.content">
                </el-input>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateNotice">提交</el-button>
            </div>
        </el-dialog>
        <!-- 发布内容 -->
        <el-dialog title="编辑通知" :visible.sync="dialogFormVisible2" width="90%">

            <div>
                <el-tag type="warning">通知标题:</el-tag>
                <el-input v-model="addNoticeData.title"></el-input>
                <el-tag type="warning">通知内容:</el-tag>
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 10}" v-model="addNoticeData.content">
                </el-input>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="addNotice">提交</el-button>
            </div>
        </el-dialog>





    </div>
</template>

<script>
    export default {
        name: "NotInf",
        data() {
            return {
                user: JSON.parse(window.sessionStorage.getItem("user")),
                //
                loading: false,
                //数据源
                noticeData: [],

                //编辑框数据
                editNoticeData: {
                    title: '',
                    content: '',
                },
                //发布弹出框
                addNoticeData:{
                    title: '',
                    content: '',
                },
                //显示框
                dialogVisible: false,
                dialogFormVisible: false,
                dialogFormVisible2:false,
                //弹出框显示的内容
                content: '',
            }
        },
        mounted() {
            this.initNoticeData();
        },
        methods: {
            initNoticeData() {
                this.loading = true;
                this.getRequest('/notice/info/').then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.noticeData = resp;
                    }
                })
            },
            //
            showContent(row) {
                this.content = row.content;
                this.dialogVisible = true;

                //console.log(row.content)
            },
            //显示出编辑弹框
            handleEdit(data) {

                Object.assign(this.editNoticeData, data);
                this.editNoticeData.updateDate = '';
                this.editNoticeData.createDate = '';
                this.dialogFormVisible = true;
            },
            //真正的更新
            updateNotice() {
                this.putRequest('/notice/info/', this.editNoticeData).then(resp => {
                    if (resp) {
                        this.initNoticeData();
                        this.dialogFormVisible = false;
                    }
                })
            },
            //
            handleDelete(data) {
                this.$confirm('此操作将永久删除通知, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest('/notice/info/' + data.id).then(resp => {
                        if (resp) {
                            this.initNoticeData();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            add() {
                this.dialogFormVisible2 = true;
            },
            addNotice(){
                if (this.addNoticeData.title && this.addNoticeData.content) {
                    this.postRequest('/notice/info/', this.addNoticeData).then(resp => {
                        if (resp) {
                            this.initNoticeData();
                            this.dialogFormVisible2 = false;
                            this.addNoticeData=[];
                        }
                    })
                } else {
                    this.$message.error("标题和内容不能为空")
                }
            }

        },
    }
</script>