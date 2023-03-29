<template>
    <div style="width: 80%;">

        <div style="display: flex;justify-content: space-between;" v-if="createPostView == false">
            <el-menu default-active="首页" class="el-menu-demo" mode="horizontal" @select="selectColumn">
                <el-menu-item index="首页">首页</el-menu-item>
                <el-menu-item index="提问">提问</el-menu-item>
                <el-menu-item index="分享">分享</el-menu-item>
                <el-menu-item index="建议">建议</el-menu-item>
                <el-menu-item index="讨论">讨论</el-menu-item>
                <el-menu-item index="公告">公告</el-menu-item>
                <el-menu-item index="动态">动态</el-menu-item>
                <el-menu-item index="8" disabled>|</el-menu-item>
                <el-menu-item index="我发表的贴">我发表的贴</el-menu-item>
                <el-menu-item index="我收藏的贴">我收藏的贴</el-menu-item>
            </el-menu>
            <el-button type="primary" style="margin: 10px;" v-if="createPostView == false" @click="showCreatePostView">
                发表新帖</el-button>
        </div>


        <div>

            <div v-if="createPostView == false && postDetailView == true">
                <el-card shadow="always" style="margin-bottom: 10px;">
                    <div style="height:40px">
                        <span style="font-size: 25px;">{{currentPostDetail.title}}</span>
                    </div>
                    <div style="height:40px">
                        <span style="font-size: 15px;">{{currentPostDetail.content}}</span>
                    </div>
                    <el-divider style="margin-top: 1px; margin-bottom: 10px;"></el-divider>
                    <div style="height:30px">
                        分类: <span>
                            <el-tag style="margin-right: 10px;">{{currentPostDetail.postColumn}}</el-tag>
                        </span>
                    </div>
                    <div style="height: 66px; display: flex;margin-left: 10px;">
                        <div style=" height: 55px; width: 55px; padding-top: 15px;">
                            <el-image style="width: 100%; height: 100%;" :src="currentPostDetail.creatorFace">
                            </el-image>
                        </div>
                        <div style=" height: 55px; width: 503px; padding-top: 15px; padding-left: 10px;">
                            <div style="height: 32.5px;margin-top: 10px;">
                                <span style="margin-right: 30px">{{currentPostDetail.creatorName}}</span>
                                <span style="margin-right: 30px">{{currentPostDetail.createTimeStr}}发表</span>
                            </div>
                        </div>
                    </div>
                    <div style="margin-top: 13px">
                        相关标签：
                        <span>
                            <el-tag v-for="tag in currentPostDetail.tagArr" :key="tag" :type="tag"
                                style="margin-bottom: 10px;margin-right: 10px;" @click="clickTag(tag)">
                                {{tag}}
                            </el-tag>
                        </span>
                        <br>
                    </div>
                </el-card>

                <!-- 回复 -->
                <el-card shadow="always">
                    <el-divider>一共{{commentList.length}}个回复</el-divider>
                    <div style="height: 66px; display: flex;margin-left: 10px;" v-for="comment in commentList"
                        :key="comment.id">
                        <div style=" height: 55px; width: 55px; padding-top: 15px;">
                            <el-image style="width: 100%; height: 100%;" :src="currentPostDetail.creatorFace">
                            </el-image>
                        </div>
                        <div style=" height: 55px; width: 90%; padding-top: 15px; padding-left: 10px;">
                            <div style="height: 32.5px;margin-top: 10px;display: flex;justify-content: space-between;">
                                <div>
                                    <span style="margin-right: 5px;color: #69a8df;">{{comment.creatorName}} :</span>
                                    <span> {{comment.content}}</span>
                                </div>
                                <div>
                                    <el-button size="small" @click="showSubCommitComment(comment)">回复</el-button>
                                </div>
                            </div>
                            <div style="height: 32.5px;margin-top: 10px;">
                                <span style="margin-right: 30px"></span>
                            </div>
                        </div>
                    </div>
                    <el-dialog title="回复评论" :visible.sync="subCommentdialogFormVisible">
                        <el-form :model="currentSubComment">
                            <el-input v-model="currentSubComment.content"></el-input>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="subCommentdialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="commitSubComment()">确 定</el-button>
                        </div>
                    </el-dialog>
                    <el-form ref="commentForm" :model="currentComment" label-width="80px"
                        style="width:100%;margin-top: 80px;">
                        <el-form-item label="评论">
                            <el-input v-model="currentComment.content"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="commitComment()">提交评论</el-button>
                            <el-button @click="showPostListView()">返回列表</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </div>

            <!-- 发表新帖 -->
            <div v-if="createPostView == true && postDetailView == false">
                <div style="display: flex;width: 600px;">
                    <el-form ref="form" :model="post" label-width="80px" style="width:100%">
                        <el-form-item label="标题">
                            <el-input v-model="post.title"></el-input>
                        </el-form-item>
                        <el-form-item label="内容">
                            <el-input v-model="post.content"></el-input>
                        </el-form-item>
                        <el-form-item label="标签">
                            <el-input v-model="post.tag"></el-input>
                        </el-form-item>
                        <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelectPostTag"
                            style="margin-top: -20px;margin-bottom: 10px;">
                            <el-menu-item index="1">常用</el-menu-item>
                            <el-menu-item index="2">开发语言</el-menu-item>
                        </el-menu>

                        <div style="display: flex;justify-content: flex-start;">
                            <el-tag v-for="tag in postTagArray" :key="tag" :type="tag"
                                style="margin-bottom: 10px;margin-right: 10px;" @click="clickTag(tag)">
                                {{tag}}
                            </el-tag>
                        </div>
                        <el-form-item label="所在专栏">
                            <el-select v-model="post.postColumn" placeholder="所在专栏">
                                <el-option label="提问" value="提问"></el-option>
                                <el-option label="分享" value="分享"></el-option>
                                <el-option label="建议" value="建议"></el-option>
                                <el-option label="讨论" value="讨论"></el-option>
                                <el-option label="公告" value="公告"></el-option>
                                <el-option label="动态" value="动态"></el-option>
                                <el-option label="其它" value="其它"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="createPost()">立即创建</el-button>
                            <el-button @click="showPostListView()">返回</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>


            <!-- 主页的帖子列表的热门话题 -->
            <div style="display: flex;" v-if="createPostView == false && postDetailView == false">
                <div style="width: 73%;">
                    <el-card shadow="always" style="margin-bottom: 10px;">
                        欢迎您的到来~
                    </el-card>
                    <el-card shadow="always">
                        <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
                            <el-menu-item index="1">综合</el-menu-item>
                            <el-menu-item index="2">周榜</el-menu-item>
                            <el-menu-item index="3">月榜</el-menu-item>
                            <el-menu-item index="4">精华</el-menu-item>
                        </el-menu>

                        <div style="height: 76px; display: flex;margin-bottom: 24px;" v-for="post in postList"
                            :key="post.id">

                            <!-- 头像 -->
                            <div style=" height: 65px; width: 65px; padding-top: 15px;">
                                <el-image style="width: 100%; height: 100%;" :src="post.creatorFace"></el-image>
                            </div>

                            <!--  帖子分类和标题-->
                            <div style=" height: 65px; padding-top: 15px; padding-left: 10px;">
                                <div style="height: 32.5px;">
                                    <el-tag style="margin-right: 10px;">{{post.postColumn}}</el-tag> <a
                                        @click="postViewDetail(post.id)">{{post.title}}</a>
                                </div>
                                <!-- 发布者和时间 -->
                                <div style="height: 32.5px;margin-top: 10px;">
                                    <span style="margin-right: 30px">{{post.creatorName}}</span>
                                    <span>{{post.createTime[0]}}年{{post.createTime[1]}}月{{post.createTime[2]}}日
                                        {{post.createTime[3]}}:{{post.createTime[4]}}</span>
                                </div>
                            </div>

                        </div>

                    </el-card>
                </div>
                <div style="padding-left: 10px;width: 27%;">
                    <el-card shadow="always" style="margin-bottom: 10px;">
                        热门话题
                        <el-divider></el-divider>
                        <el-tag style="margin-right: 10px;">测试</el-tag>
                        <el-tag style="margin-right: 10px;">灌水</el-tag>
                        <el-tag style="margin-right: 10px;">公告</el-tag>
                        <el-tag style="margin-right: 10px;">教程</el-tag>
                    </el-card>

                </div>
            </div>
        </div>

    </div>

</template>

<script>

    export default {

        name: 'Froum',
        data() {
            return {
                user: JSON.parse(window.sessionStorage.getItem('user')),
                showHome: true,
                createPostView: false,
                postDetailView: false,
                post: {
                    "title": "",
                    "content": "",
                    "tag": "",
                    "postColumn": "",
                    "commentCount": 0,
                    "viewCount": 0,
                    "likeCount": 0,
                    "postStatus": 0,
                    "latestComment": 0
                },
                generalTagArray: ['spring', 'springboot', 'springmvc'],
                languageTagArray: ['python', 'java', 'c++'],
                postTagArray: ['spring', 'springboot', 'springmvc'],
                postList: [],
                currentPostDetail: {},
                currentComment: {
                    "content": "",
                    "postId": 0,
                    "creator": 0,
                    "parentCommentId": 0
                },
                commentList: [],
                commentListLen: 0,
                subCommentdialogFormVisible: false,
                currentSubComment: {
                    "content": "",
                    "postId": 0,
                    "creator": 0,
                    "parentCommentId": 0
                },
            }
        },

        // computed: {
        //     //从vuex获取是
        //     routes() {
        //         return this.$store.state.routes;
        //     }
        // },
        mounted() {
            //进来首先显示“首页”内容
            this.selectColumn('首页');

        },

        methods: {
            // 显示提交子评论窗口
            showSubCommitComment(comment) {
                this.subCommentdialogFormVisible = true;
                this.currentSubComment.postId = this.currentPostDetail.id;
                this.currentSubComment.creator = this.user.id;
                this.currentSubComment.parentCommentId = comment.id;
                this.currentSubComment.content = "回复@" + comment.creatorName + "：";
            },
            // 提交子评论
            commitSubComment() {
                // console.log(this.currentSubComment)
                this.postRequest('/postComment/info/', this.currentSubComment).then(resp => {
                    this.getComments()
                    this.subCommentdialogFormVisible = false;
                })
            },
            // 获取评论
            getComments() {
                this.getRequest('/postComment/info/' + this.currentPostDetail.id).then(resp => {
                    if (resp) {
                        this.commentList = resp.obj;
                    }
                })
            },
            // 提交评论
            commitComment() {
                this.currentComment.creator = this.user.id;
                this.currentComment.postId = this.currentPostDetail.id;
                if (this.currentComment.content) {
                    this.postRequest('/postComment/info/', this.currentComment).then(resp => {
                        this.getComments()
                    })
                } else {
                    this.$message.error("标题、内容、分类均不能为空!");
                }
            },
            // 显示列表
            showPostDetailView() {
                this.createPostView = false;
                this.postDetailView = true;
            },
            // 显示列表
            showPostListView() {
                this.createPostView = false;
                this.postDetailView = false;
            },
            // 显示创建帖子
            showCreatePostView() {
                this.createPostView = true;
                this.postDetailView = false;
            },
            // 点击贴子,进入详情
            postViewDetail(id) {
                this.postDetailView = true
                this.getRequest('/post/info/' + id).then(resp => {
                    if (resp) {
                        this.currentPostDetail = resp
                        this.currentPostDetail.tagArr = this.currentPostDetail.tag.split(',')
                        this.currentPostDetail.createTimeStr = this.currentPostDetail.createTime[0] + '年' +
                            this.currentPostDetail.createTime[1] + '月' +
                            this.currentPostDetail.createTime[2] + '日 ' +
                            this.currentPostDetail.createTime[3] + ':' +
                            this.currentPostDetail.createTime[4] + '年';
                        this.getComments(this.currentComment.postId);

                    }
                });

            },
            // 选择分类
            selectColumn(key) {
                this.getRequest('/post/info/list/' + key).then(resp => {
                    if (resp) {
                        this.postList = resp
                        this.createPostView = false
                    }
                })
            },
            // 点击tag标签
            clickTag(tag) {
                console.log(this.user)
                if (this.post.tag == "") {
                    this.post.tag = tag
                } else {
                    // console.log(this.post.tag.indexOf(","))
                    if (this.post.tag.split(",").indexOf(tag) != -1) {
                        return;
                    }
                    this.post.tag = this.post.tag + "," + tag
                }

            },
            // 点击提交post按钮
            createPost() {
                this.post.creator = this.user.id;
                if (this.post.title && this.post.content && this.post.postColumn) {
                    this.postRequest('/post/info/', this.post).then(resp => {
                        if (resp) {
                            console.log(resp)
                            this.createPostView = false
                            this.selectColumn('首页');
                            
                        }
                    })
                } else {
                    this.$message.error("标题、内容、分类均不能为空!");
                }
                console.log()
            },
            // 点击tag类型
            handleSelectPostTag(key, keyPath) {
                if (key == 1) {
                    this.postTagArray = this.generalTagArray
                } else if (key == 2) {
                    this.postTagArray = this.languageTagArray
                }
            },
            // 点击顶部按钮
            clickTopButton(flag) {
                this.showHome = flag;
                if (!flag) {
                    this.selectColumn('首页');
                }
            },
            commandHandler(command) {
                //注销登录
                if (command == 'logout') {
                    this.$confirm('确认退出登录?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        //确认退出
                        this.postRequest('/logout');
                        //清空用户信息
                        window.sessionStorage.removeItem('tokenStr');
                        window.sessionStorage.removeItem('user');
                        //清空vuex中的用户菜单信息
                        this.$store.commit('initRouters', []);
                        //路由跳转,跳转到登录页
                        this.$router.replace('/')
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        });
                    });

                }

            }
        },


    }

</script>


<style scoped>

</style>