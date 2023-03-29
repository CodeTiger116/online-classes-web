<template>
    <div class="login-container">
        <div class="login-win">
			<div class="login-body">
				<div class="login-title">
					系统登录
				</div>
                <div class="login-form" >
                    <el-form :model="loginForm" ref="loginForm" :rules="rules" >
                        <!-- 用户名 -->
                        <el-form-item prop="username">
                            <el-input v-model="loginForm.username" type="text" aria-autocomplete="false" placeholder="用户名"></el-input>
                        </el-form-item>

                        <!-- 密码 -->
                        <el-form-item prop="password">
                            <el-input v-model="loginForm.password" type="text" aria-autocomplete="false" placeholder="密码"></el-input>
                        </el-form-item>

                        
                        <!-- 验证码 -->
                        <el-form-item prop="code">
                            <el-input v-model="loginForm.code" type="text" aria-autocomplete="false" style="width: 100px; margin-right: 5px;"></el-input>
                        </el-form-item>
                        

                        <!-- 验证码图片 -->
                        <img :src="captchaUrl" @click="updateCaptcha">


                        <!-- 记住我 -->
                        <el-checkbox v-model="checked" class="loginRemember" >记住我</el-checkbox>

                        <!-- 登录按钮 -->
                        <el-form-item>
                            <el-button style="margin-top: 15px; width: 100%;" type="primary" @click="submitLogin">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

//在main.js中处理
//import {postRequest} from "../utils/api";


export default {
    name:'Login',
    data() {
        return {
            captchaUrl:'/captcha?time='+new Date(),
            loginForm:{
                username:'1812030036',
                password:'123456',
                code:''
            },
            checked:true,
            rules:{
                username:[{required: true, message:'请输入用户名', trigger: 'blur'}],
                password:[{required: true, message:'请输入密码', trigger: 'blur'}],
                code:[{required: true, message:'请输入验证码', trigger: 'blur'}]
            }
        }
    },
    methods: {

        updateCaptcha(){
            this.captchaUrl = 'http://localhost:8081/captcha?time='+new Date();
        },

        submitLogin(){
            this.$refs.loginForm.validate((valid) => {
          if (valid) {
           this.postRequest('/login',this.loginForm).then(resp=>{
            //    alert(JSON.stringify(resp));
               if (resp) {
                //存储用户token
                //console.log('-----');
                const tokenStr = resp.obj.tokenHead + resp.obj.token;
                window.sessionStorage.setItem('tokenStr', tokenStr);
            
                //页面跳转
                //replace和push    路由跳转默认为push
                //this.$router.replace('/home');
                let path = this.$route.query.redirect;
                this.$router.replace((path == '/' || path == undefined)?'/home':path);
                //this.$router.replace('http://localhost:8081/'+path);
              }
           })
          } else {
            this.$message.error('error');
            return false;
          }
        });
        },
        
    },
    
}
</script>

<style scoped>

    .login-container {
		background-color: #ffffff;
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
        box-shadow: 0 0 25px #cac6c6;
	}
	.login-win {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 550px;
		height: 300px;
		padding: 15px;
		border-radius: 5px;
		background-image: url(../assets/login-bg.jpg);
		background-size: cover;
	}
	.login-body {
		position: absolute;
		right: 30px;
		top: 40px;
		width: 240px;
    }
	.login-title {
		text-align: center;
		font-size: 20px;
		font-weight: bold;
		color: #409EFF;
		margin-bottom: 25px;
	}
    .loginRemember{
        text-align: left;
        margin: 0px 0px 15px 0px;

    }
    
</style>