<template>
          <div class="pull-left">
                      <li class="dropdown language_down  pull-left top_dropmenu">
                        <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-close-others="true" title="">
                          <i class="icon-language"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-default">
                          <li>
                            <a @click="changeAssLang('en')">English</a>
                          </li>
                          <li>
                            <a @click="changeAssLang('zh')">{{$t('Chinese')}}</a>
                          </li>
                        </ul>
                      </li>     
            <el-dropdown class="avatar-container" trigger="click">
                <div class="avatar-wrapper">
                    <img class="user-img img-circle" :src="avatar">
                    <span class="username username-hide-on-mobile">{{this.$store.getters.name}}</span>
                    <i class="el-icon-caret-bottom" style="top:16px;"></i>
                </div>
                <el-dropdown-menu class="user-dropdown" slot="dropdown">
                    <router-link class='inlineBlock' to="/">
                        <el-dropdown-item>
                            {{$t('Personalinfo')}}
                        </el-dropdown-item>
                    </router-link>
                    <router-link class='inlineBlock' to="/">
                        <el-dropdown-item>
                            {{$t('Changepassword')}}
                        </el-dropdown-item>
                    </router-link>
                    <el-dropdown-item divided><span @click="logout" style="display:block;">{{$t('Logout')}}</span></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
</template>

<script>
// import { mapGetters } from 'vuex';
import Cookies from 'js-cookie';
export default {
  name: 'rightButtonChild',
  props: '',
  data() {
    return {
      avatar: this.$store.getters.avatar
    }
  },
//  computed: {
//    ...mapGetters([
//           'name',
//           'avatar'
//         ])
//       },
 methods: {
        changeAssLang(lang) {
            // 转换全局语言
            //this.$i18n.locale = 'zh';
            Cookies.set("assLang",lang);
            location.reload();
        },
        logout() {
          this.$store.dispatch('LogOut').then(() => {
            location.reload();// 为了重新实例化vue-router对象 避免bug
          });
        }
      }
}
</script>



<style rel="stylesheet/scss" lang="scss" scoped>
    .top_dropmenu{
    padding-right:23px; 
    padding-left:16px;
    height: 55px; 
    line-height: 55px;
    }
    .language_down{
        padding-top: 0;
    }    
    .avatar-wrapper{
        line-height: 40px;
    }
    .user-img{
    border: 1px solid #caccd6;
    display: inline-block;
    float: left;
    height: 35px;
    margin-right: 5px;
    margin-top: 2px;
    width: 35px;
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



