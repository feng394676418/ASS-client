<template>
  <div class="app-container calendar-list-container page-content">
    <div class="Sharing_head">
      <div class="page-header navbar">
        <div class="page-header-inner">
          <div class="pull-right">
            <div class="top-menu">
              <!--<ul class="nav navbar-nav pull-right" style="position:absolute;right:120px;">
                                  <li class="dropdown dropdown-extended dropdown-notification" id="header_notification_bar">                  
                                    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown"  data-close-others="true" :title="$t('Unreadmessage')">
                                        <i class="icon-bell"></i>
                                        <span class="badge bg-important"></span>
                                    </a>						
                                    <ul class="dropdown-menu dropdown_msg">
                                      <li>
                                          <ul class="dropdown-menu-list">
                                              <li class="esh-menu-list-no-msg">
                                                  厂商一加备件申请单PP17062700001于2017/06/27 10:50:30<span class="yellow">通过审核</span>。
                                              </li>
                                              <li class="esh-menu-list-no-msg">
                                                  工单AS170627000001于2017/06/27 10:50:30<span class="yellow">已确认报价</span>，待维修。
                                              </li>
                                              <li class="esh-menu-list-no-msg">
                                                  工单AS170627000001于2017/06/27 10:50:30<span class="yellow">已确认报价</span>，待维修。
                                              </li>
                                              <li class="esh-menu-list-no-msg">
                                                  厂商一加于2017/06/27 10:50:30<span class="yellow">发起坏件返厂</span>单RT17062700001，待发货。
                                              </li>
                                          </ul>
                                      </li>
                                    </ul>
                                  </li> 
                                </ul>-->
              <ul>
                <li>
                  <rightButtonChild></rightButtonChild>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="top_menu">
      <h2 class="title_shadow"> {{$t('Changepassword')}}</h2>
    </div>
    <div class="clearfix"></div>
    <div class="user_content main_form_input">
      <el-row :gutter="20">
        <el-col :xs="18" :sm="14" :md="8" :lg="5">
          <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="120px" class="demo-ruleForm">
            <el-form-item :label="$t('oldpassword')" prop="pass">
              <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('newpassword')" prop="checkPass">
              <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('confirmpassword')" prop="confirmpass">
              <el-input type="password" v-model="ruleForm2.confirmpass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')">{{$t('order.Affirm')}}</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
import bootstrap from 'bootstrap';
import { getProviderList } from 'api/providerMgr';
import rightButtonChild from './../layout/rightButtonChild';
import Vue from 'vue';

export default {
  components: { rightButtonChild },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('enterpassword')));
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('enterpasswordagain')));
      } else {
        callback();
      }
    };
    var validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('enterpasswordagain')));
      } else if (value !== this.ruleForm2.checkPass) {
        callback(new Error(this.$t('Passwordinconsistent')));
      } else {
        callback();
      }
    };
    return {

      ruleForm2: {
        pass: '',
        checkPass: '',
        confirmpass: ''
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        confirmpass: [
          { validator: validatePass3, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
@import '/static/css/bootstrap.min.css';
@import '/static/css/layout.css';
@import '/static/css/custom.css';
@import '/static/css/default.css';
@import '/static/css/style.css';
</style>
<style>
.main_form_input .form-group {
  margin-bottom: 25px;
}

.el-form-item__error {
  left: 0;
}

.el-form-item__label {
  font-weight: normal;
  color: #666577;
  font-size: 12px;
}

.el-input__inner {
  background: #f7f8fd;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;
  border: 1px solid #aab0d1;
  height: 34px;
}

.el-button--primary,
.el-button--primary:hover,
.el-button--primary:focus {
  background: #2486c5;
  border-radius: 10px;
  height: 34px;
  padding-left: 30px;
  padding-right: 30px;
}
</style>
