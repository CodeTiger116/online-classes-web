<template>
    <div>
        <div v-if="liveShow  ==false">

            <el-table :data="courseData" style="margin-top: 10px;" v-loading="loading" element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 0.8)">

                <el-table-column type="index" width="100" label="编号"></el-table-column>

                <el-table-column label="课程名称">
                    <template slot-scope="scope">

                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.courseName }}</el-tag>
                        </div>

                    </template>

                </el-table-column>

                <el-table-column label="上课时间">
                    <template slot-scope="scope">
                        <el-tag>周{{scope.row.week}}-第{{scope.row.jieci}}节</el-tag>
                    </template>
                </el-table-column>

                <!-- 学生端 -->
                <el-table-column prop="type" label="是否正在上课" v-if="user.isStudent=='1'">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.isOpen == '1' " type="primary" size="small" @click="lisenClass(scope.row)">正在直播</el-button>
                        <el-button v-if="scope.row.isOpen == '0' " type="danger" size="small">不在上课</el-button>
                        <!-- <el-tag v-if="scope.row.isOpen == '1' " type="success">正在直播</el-tag>
                        <el-tag v-if="scope.row.isOpen == '0' " type="danger">不在上课</el-tag> -->
                    </template>
                </el-table-column>
                <!-- 教师端 -->
                <el-table-column prop="type" label="操作" v-if="user.isStudent=='0'">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.isOpen == '1' " type="danger" size="small" @click="handleCloseCou(scope.row)">下课</el-button>
                        <el-button v-if="scope.row.isOpen == '0' " type="primary" size="small" @click="handleOpenCou(scope.row)">开始直播</el-button>
                    </template>
                </el-table-column>


            </el-table>

        </div>



        <div style=" margin-top: 50px;" v-if="liveShow == true">
                            <!--m3u8-->
                            <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions"
                                :playsinline="true" @play="onPlayerPlay($event)" @pause="onPlayerPause($event)"
                                @ended="onPlayerEnded($event)" @loadeddata="onPlayerLoadeddata($event)"
                                @waiting="onPlayerWaiting($event)" @playing="onPlayerPlaying($event)"
                                @timeupdate="onPlayerTimeupdate($event)" @canplay="onPlayerCanplay($event)"
                                @canplaythrough="onPlayerCanplaythrough($event)" @ready="playerReadied"
                                @statechanged="playerStateChanged($event)">
                            </video-player>
        </div>

        <!-- 弹出框显示推流地址 -->
        <el-dialog title="推流地址" :visible.sync="dialogVisible" width="90%">
            <el-row>
                <el-col style="white-space: pre-wrap;">{{this.pushAddress}}</el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">关闭</el-button>

            </span>
        </el-dialog>
    </div>


</template>

<script>

    export default {
        data() {
            return {
                // 当前登录用户
                user: JSON.parse(window.sessionStorage.getItem("user")),

                //初始化用到的课程数据源
                courseData: [],
                //直播界面
                liveShow: false,
                //弹出框
                dialogVisible:false,
                //加载bool值
                loading: false,
                //推流地址
                pushAddress: '',
                //拉流地址
                pullAddress: '',


                // videojs options
                playerOptions: {
                    height: '360',
                    autoplay: true,
                    muted: true,
                    language: 'en',
                    playbackRates: [0.7, 1.0, 1.5, 2.0],
                    sources: [{
                        type: "application/x-mpegURL",
                        //src: "http://play.hanhu116.top/testName/4.m3u8?auth_key=1650040415-0-0-634c4baf608c8f555ef7f40a57dfabc5",
                        src: '',
                    }],
                    poster: "",
                }
            }
        },


        mounted() {
            //初始化课程列表
            this.initCourse(),
                setTimeout(() => {
                    console.log('dynamic change options', this.player)
                    this.player.muted(false)
                }, 5000)
        },


        computed: {
            player() {
                return this.$refs.videoPlayer.player
            }
        },


        methods: {
            //根据学生id搜索课程，查询我的课程
            initCourse() {
                this.loading = true;
                this.getRequest('/student/course/' + this.user.id).then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.courseData = resp;
                    }
                })
            },
            //开始直播
            handleOpenCou(data) {
                this.getRequest('/live/course/startClass/'+ data.id).then(resp => {
                    if (resp) {
                        //返回一个推流地址
                        this.pushAddress = resp;
                        //显示弹出框
                        this.dialogVisible = true;
                        this.initCourse()
                    }
                })

            },
            //下课
            handleCloseCou(data){
                this.getRequest('/live/course/closeClass/'+ data.id).then(resp => {
                    if (resp) {
                        this.initCourse()
                    }
                })
            },
            //听课
            lisenClass(data){
                this.liveShow = true;
                this.playerOptions.sources[0].src = data.courseUrl;
                //console.log(this.pullAddress);

            },


            // listen event
            onPlayerPlay(player) {
                // console.log('player play!', player)
            },
            onPlayerPause(player) {
                // console.log('player pause!', player)
            },
            onPlayerEnded(player) {
                // console.log('player ended!', player)
            },
            onPlayerLoadeddata(player) {
                // console.log('player Loadeddata!', player)
            },
            onPlayerWaiting(player) {
                // console.log('player Waiting!', player)
            },
            onPlayerPlaying(player) {
                // console.log('player Playing!', player)
            },
            onPlayerTimeupdate(player) {
                // console.log('player Timeupdate!', player.currentTime())
            },
            onPlayerCanplay(player) {
                // console.log('player Canplay!', player)
            },
            onPlayerCanplaythrough(player) {
                // console.log('player Canplaythrough!', player)
            },
            // or listen state event
            playerStateChanged(playerCurrentState) {
                // console.log('player current update state', playerCurrentState)
            },
            // player is ready
            playerReadied(player) {
                // seek to 10s
                console.log('example player 1 readied', player)
                player.currentTime(10)
                // console.log('example 01: the player is readied', player)
            },

        }
    }

</script>