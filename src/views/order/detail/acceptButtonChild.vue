<!--受理按钮-->
<template>
  <div>
<dl class="line">
<dt>&nbsp;</dt>
	</dl>
		<dl>
			<dt :class="progress"><a href="#myModal" data-toggle="modal">{{$t('order.Detail.Accepted')}}</a></dt>

<div class="modal fade" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{$t('order.Detail.ProcessedWorkOrder')}}</h5></div>
      <div class="modal-body">
        <div class="order_detection main_form_input">
          <div class="panel-body">
            <form role="form">
              <div class="col-md-6">
	              <div class="form-group">
	                <label for="">{{$t('order.userName')}}<b>* </b></label>
	                <p>{{baseInfo.userName}}</p>
	              </div>
	              <div class="form-group">
	                <label for="">{{$t('order.tel')}}<b>* </b></label>
	                <p>{{baseInfo.userPhone}}</p>
	              </div>
	              <div class="form-group">
	                <label for="">{{$t('order.mail')}}<b>* </b> </label>
	                <p>{{baseInfo.userEmail}}</p>
	              </div>
              </div>
              <div class="form-group col-md-6">
                <label for="">{{$t('order.address')}}<b>*</b>:</label>
                <p>{{baseInfo.userAddress}}</p>
              </div>
          </form></div>
          <div class="panel-body">            
              <div class="form-group col-md-6">
                <label for="">{{$t('order.Alternativecontact')}} </label>
                <input class="form-control" id="" :placeholder="baseInfo.emergencyName" type="text" v-model="baseInfo.emergencyName"></input>
              </div>
              <div class="form-group col-md-6">
                <label for="">{{$t('order.Alternativecontacttel')}}</label>
                <input class="form-control" id="" :placeholder="baseInfo.emergencyPhone" type="text" v-model="baseInfo.emergencyPhone" />
              </div>
          </div>
          <div class="panel-body">            
              <div class="col-md-6">
	              <div class="form-group">
	                <label for="">{{$t('order.Courier')}}<b>* </b></label>
	                <p>{{baseInfo.expressCode}}</p>
	              </div>
	              <div class="form-group">
	                <label for="">{{$t('order.AWBNo')}}<b>* </b></label>
	                <p>{{baseInfo.trackingNo}}</p>
	              </div>
              </div>
              <div class="col-md-6">
	              <div class="form-group">
	                <label for="">{{$t('order.productType')}}<b>* </b></label>
	                <p>{{baseInfo.productType}}</p>
	              </div>
	              <div class="form-group">
	                <label for="">{{$t('order.imei')}}<b>* </b> </label>
	                <p>{{baseInfo.imei}}</p>
	              </div>
              </div>
          </div>
          <div class="panel-body">      
              <div class="form-group col-md-6 buy_data">
                <label for="">{{$t('order.Purchasedate')}}  </label>
                <div>
                  <el-date-picker class="form-control"
                  v-model="acceptForm.orderTime"
                  type="datetime"
                  :placeholder="baseInfo.orderTime">
                  </el-date-picker>
                </div>
              </div>
              <div class="form-group col-md-6">
                <label for="">{{$t('order.Color')}}</label>
                <input class="form-control" v-model="baseInfo.color" id="" :placeholder="baseInfo.color" type="text">
              </div>
              <div class="form-group col-md-6">
                <label for="">{{$t('order.Appearance')}} </label>
                    <el-select class="select_list default form-control" v-model="baseInfo.appearance" clearable :placeholder="baseInfo.appearance">
                      <el-option
                        v-for="item in showOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>

                   
								<div class="clearfix"></div>		
              </div>
              
              <div class="form-group col-md-6">
                <label for="">{{$t('order.Appearancedescription')}}</label>
                <input class="form-control" v-model="baseInfo.appearanceInfo" id="" :placeholder="baseInfo.appearanceInfo" type="text">
              </div>               
              <div class="form-group col-md-6">
                <label for="">{{$t('order.Accessories')}}</label>
                  <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> -->

                  <el-checkbox-group v-model="baseInfo.partsStatusArray">
                    <el-checkbox v-for="part in parts" :label="part" :key="part">{{part}}</el-checkbox>
                  </el-checkbox-group>
                
              </div>
              <div class="form-group col-md-6">
                <label for="">{{$t('order.Otheraccessories')}}  </label>
                <input class="form-control" id="" v-model="baseInfo.partsOther" :placeholder="baseInfo.partsOther" type="text">
              </div>        	
              <div class="clearfix"></div>
              <div class="form-group col-md-12">
              	<label for="">{{$t('order.Detail.Note')}}</label>
                <el-input type="textarea" name="remark" v-model="acceptForm.remark"></el-input>
              </div>
              <div class="clearfix"></div>
              <div class="form-group col-md-12">
              	<label for="">{{$t('order.Failuredescription')}}<b>*</b></label>
                <p class="">{{baseInfo.troubleInfo}}</p>
              </div>
              
          </div>
        </div>
        <div class="modal-footer">        	
          <button data-dismiss="modal" class="btn btn-cancel" type="button">{{$t('order.Cancel')}}</button>
          <button id="btnSubmit" class="btn btn-primary" type="button" @click="acceptOrder">{{$t('order.Affirm')}}</button>
        </div>
        
      </div>
    </div>
  </div>
</div>

</dl>	  

  </div>
</template>


<script>

import { updateBaseInfo } from 'api/baseInfo';

// const partOptions = ['包装盒', '数据线', '适配器'];
const progressSTS = ['first_line', 'active', '', 'last_line'];
export default {
  name: 'acceptButtonChild',
  props: {
    baseInfo: {}
  },
  data() {
    return {
      progress: progressSTS[1],
      newBaseInfo: {},
      parts: [this.$t('order.Giftbox'), this.$t('order.USBcable'),this.$t('order.Poweradaptor')], // 配件情况
      checkedParts: [this.$t('order.Poweradaptor')],
      checkAll: false,
      isIndeterminate: true,
      acceptForm: { // 保存Form
        orderNumber: '', // this.$route.params.orderNumber,
        emergencyName: '',
        emergencyPhone: '',
        orderTime: '',
        color: '',
        appearance: '',
        partsStatus: '',
        repairId: '',
        partsOther: '',
        appearanceInfo: '',
        remark: '',
        orderStatus: '',
        userId: ''
      },
        showOptions: [{
          value: '外观完好',
          label: this.$t('order.Detail.Normal')
        }, {
          value: '外观破损',
          label: this.$t('order.Detail.Abnormal')
        }]
    }
  },
  // created() {
  // },
  methods: {
      handleCheckAllChange(event) {
        this.checkedParts = event.target.checked ? this.parts : [];
        this.isIndeterminate = false;
        this.acceptForm.partsStatus = this.checkedParts.toString();
      },
      handleCheckedPartsChange(value) {
        console.log('aaaaabbbbb---->>>' + value);
        // 修改不要
        const checkedCount = value.length;
        this.checkAll = checkedCount === this.parts.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.parts.length;
        this.acceptForm.partsStatus = value.toString();
      },
      acceptOrder() {
        //防止连续点击两次
        $('#btnSubmit').attr('disabled', 'true');
        setTimeout(() => {
            $('#btnSubmit').removeAttr('disabled');
        }, 3000);
        this.acceptForm.orderNumber = this.baseInfo.orderNumber;
        this.acceptForm.repairId = this.baseInfo.repairId;
        this.acceptForm.emergencyName = this.baseInfo.emergencyName;
        this.acceptForm.emergencyPhone = this.baseInfo.emergencyPhone;
        this.acceptForm.color = this.baseInfo.color;
        this.acceptForm.appearance = this.baseInfo.appearance;
        this.acceptForm.appearanceInfo = this.baseInfo.appearanceInfo;        
        this.acceptForm.partsOther = this.baseInfo.partsOther;
        this.acceptForm.partsStatus = this.baseInfo.partsStatusArray.toString();
        this.acceptForm.orderStatus = 12; // 状态更新 待检测已受理
        this.acceptForm.userId = this.$store.getters.uid;
        updateBaseInfo(this.acceptForm).then(response => {
          if (response.data.status === '1') {
            // 异常
            this.$message.error(this.$t('order.Detail.Acceptsfailed') + response.data.message);
          } else if (response.data.status === '0') {
            this.$message.info(this.$t('order.Detail.Acceptedsuccessfully'));
           $('#myModal').modal('hide');
            this.newBaseInfo = response.data.rsltData;
            this.progress = progressSTS[3];
            // 向父组件传值
            this.$emit('listenBaseInfo', this.newBaseInfo);
          }
        });
      }
  }
}
</script>



<style>
  /* .el-input__inner {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    color: #1f2d3d;
    font-size: inherit;
    height: 28px;
    width: 280px;
    line-height: 1;
    outline: 0;
    padding: 3px 10px;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1)
  } */
 .el-date-editor.el-input{
  width:auto;
} 
.el-checkbox, .el-checkbox__input{
    margin-right: 0px;
}
.el-checkbox__label{
  padding-right: 5px;
}
</style>

