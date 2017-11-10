<template>
    <div class="login-container">

  <div class="dropdown language_down" style="position: absolute;right: 90px; top:16px; height:30px;">
                          <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-close-others="true" title="">
                            <i class="login-language"></i>
                          </a>
                          <ul class="dropdown-menu dropdown-menu-default">
                            <li>
                              <a @click="changeAssLang('en')">English</a>
                            </li>
                            <li>
                              <a @click="changeAssLang('zh')">{{$t('Chinese')}}</a>
                            </li>
                          </ul>
                        </div>


        <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left"
                 label-width="0px"
                 class="card-box login-form">
            <h3 class="title">{{$t('WingsingASS')}}</h3>
            <el-form-item prop="username">
                <span class="svg-container"><wscn-icon-svg icon-class="yonghufill"/></span>
                <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on"
                          :placeholder="$t('username')"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container"><wscn-icon-svg icon-class="mima"/></span>
                <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                          autoComplete="on" :placeholder="$t('password')"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
                    {{$t('Login')}}
                </el-button>
            </el-form-item>
            
            <router-link to="/sendpwd" class="forget-pwd">
                {{$t('Forgotpassword')}}
            </router-link>
        </el-form>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { isWscnEmail } from 'utils/validate';
    import bootstrap from 'bootstrap';
    import Cookies from 'js-cookie';
    // import { Message } from 'element-ui';
    // import { getQueryObject } from 'utils';

    export default {
      name: 'login',
      data() {
        // const validateEmail = (rule, value, callback) => {
        //   if (!isWscnEmail(value)) {
        //     callback(new Error(this.$t('legalemail')));
        //   } else {
        //     callback();
        //   }
        // };
        // const validatePass = (rule, value, callback) => {
        //   if (value.length < 6) {
        //     callback(new Error(this.$t('passworddigits')));
        //   } else {
        //     callback();
        //   }
        // };
        const validateusername = (rule, value, callback) => {
          if (!value) {
            callback(new Error(this.$t('Usernameempty')));
          } else {
            callback();
          }
        };
        const validatePass = (rule, value, callback) => {
          if (!value) {
            callback(new Error(this.$t('passwordempty')));
          } else {
            callback();
          }
        };       
        return {
          loginForm: {
            username: '',
            password: ''
          },
          loginRules: {
            username: [
                { required: true, trigger: 'blur', validator: validateusername }
            ],
            password: [
                { required: true, trigger: 'blur', validator: validatePass }
            ]
          },
          loading: false,
          showDialog: false
        }
      },
      created() {
            //
      },
      computed: {
        ...mapGetters([
          'auth_type'
        ])
      },
      methods: {
        handleLogin() {
          this.$refs.loginForm.validate(valid => {
            if (valid) {
              this.loading = true;
              this.$store.dispatch('LoginByEmail', this.loginForm).then(() => {
                this.loading = true;
                this.$router.push({ path: '/' });
                // this.showDialog = true;
              }).catch(err => {
               // console.log('-------------->>>' + err);
                // Message({
                //   message: err.message,
                //   type: 'error',
                //   duration: 5 * 1000
                //  });
                this.$message.error(err.message);
                this.loading = false;
              });
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        changeAssLang(lang) {
            // 转换全局语言
            //this.$i18n.locale = 'zh';
            Cookies.set("assLang",lang);
            location.reload();
        }
      }
    }
</script>
<style>
@import '/static/css/bootstrap.min.css';
@import '/static/css/layout.css';
@import '/static/css/custom.css';
@import '/static/css/default.css';
@import '/static/css/style.css';
@import '/static/layer/skin/default/layer.css';
</style>
<style rel="stylesheet/scss" lang="scss">
    @import "src/styles/mixin.scss";
    .tips{
      font-size: 14px;
      color: #fff;
      margin-bottom: 5px;
    }
    .login-container {
        @include relative;
        height: 100vh;
        background-color: #2d3a4b;

        input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
            -webkit-text-fill-color: #fff !important;
        }
        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: #eeeeee;
            height: 47px;
        }
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;
        }
        .svg-container {
            padding: 6px 5px 6px 15px;
            color: #889aa4;
        }

        .title {
            font-size: 26px;
            font-weight: 400;
            color: #eeeeee;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }

        .login-form {
            position: absolute;
            left: 0;
            right: 0;
            width: 400px;
            padding: 35px 35px 15px 35px;
            margin: 120px auto;
        }

        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }

        .forget-pwd {
            color: #fff;
        }
    }

 .navbar {
        height: 50px;
        line-height: 50px;
        border-radius: 0px !important;
        .hamburger-container {
            line-height: 58px;
            height: 50px;
            float: left;
            padding: 0 10px;
        }
        .avatar-container {
            height: 50px;
            display: inline-block;
            position: absolute;
            right: 35px;
            .avatar-wrapper {
                cursor: pointer;
                margin-top:5px;
                position: relative;
                .user-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }
                .el-icon-caret-bottom {
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
</style>
