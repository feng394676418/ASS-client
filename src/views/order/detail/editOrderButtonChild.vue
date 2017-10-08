<!--编辑工单机能 一加-->

<template>
  <div>
<dl class="line">
<dt>&nbsp;</dt>
	</dl>
<dl>
	 <dt class="active"><a href="#myModal99" data-toggle="modal">{{$t('order.EditWorkOrder')}}</a></dt>

    <!--编辑工单-->
		 <!-- <orderDetailInfo></orderDetailInfo>   -->
  <div class="modal fade" id="myModal99">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h5 class="modal-title">{{orderModalTitle}}</h5></div>
      <div class="modal-body">
        <div class="order_detection main_form_input">
          <div class="panel-body">
            <form role="form" ref="orderForm">
	              <div class="form-group col-md-6">
	                <label for="">{{$t('order.userName')}}<b>* </b></label>
	                <input class="form-control" id="userName" placeholder="" v-verify-input:nonvoid ="{id:'userName',format:true,title:$t('order.userName')}" type="text" v-model="baseInfo.userName"></input>
                  <div v-verify-msg:userName></div>
	              </div>
	              <div class="form-group col-md-6">
	                <label for="">{{$t('order.tel')}}<b>* </b></label>
	                <input class="form-control" id="phone" placeholder="" v-verify-input:reg ="{id:'phone',format:'Phone',title:$t('order.tel')}"  type="text" maxLength='20' v-model="baseInfo.userPhone">
                  <div v-verify-msg:phone></div>
	              </div>
	              <div class="clearfix"></div>
              <div class="form-group col-md-12">
                <label for="">{{$t('order.mail')}}<b>*</b>:</label>
                <input class="form-control" id="email" v-verify-input:reg="{id:'email',format:'Mail',title:$t('order.mail')}" placeholder="" type="text" v-model.trim="baseInfo.userEmail">
                <div v-verify-msg:email></div>
              </div>
               <div class="clearfix"></div>	
              <div class="form-group col-md-6">
                <label for="">{{$t('order.country')}} </label>
                    <el-select v-model="baseInfo.userCountry" id="userCountry" :placeholder="$t('order.choose')" size="small" class="select_list form-control">
                        <el-option
                        v-for="item in providerOptions"
                        :key="item.providerName"
                        :label="item.providerName"
                        :value="item.providerName">
                        </el-option>
                    </el-select>
              </div>               	
              <div class="form-group col-md-6">
                <label for="">{{$t('order.province')}} </label>
                  <el-select v-model="baseInfo.userProvince" id="userProvince" :placeholder="$t('order.choose')" size="small" class="select_list form-control">
                        <el-option
                        v-for="item in providerOptions"
                        :key="item.providerName"
                        :label="item.providerName"
                        :value="item.providerName">
                        </el-option>
                  </el-select>
              </div> 
              <div class="form-group col-md-6">
                <label for="">{{$t('order.city')}} </label>
                    <el-select v-model="baseInfo.userCity" id="userCity" :placeholder="$t('order.choose')" size="small" class="select_list form-control">
                        <el-option
                        v-for="item in providerOptions"
                        :key="item.providerName"
                        :label="item.providerName"
                        :value="item.providerName">
                        </el-option>
                  </el-select>
              </div>               	
              <div class="form-group col-md-6">
                <label for="">{{$t('order.zipcode')}}</label>
 										<input class="form-control" id="userPostcode" type="text" v-model="baseInfo.userPostcode" maxLength='15'>									
              </div>              
	              <div class="clearfix"></div>
              <div class="form-group col-md-12">
                <label for="">{{$t('order.address')}}<b>*</b>:</label>
                <input class="form-control" id="userAddress" v-verify-input:nonvoid ="{id:'addressDetail',format:true,title:$t('order.address')}" type="text" maxLength='45' v-model="baseInfo.userAddress">
                <div v-verify-msg:addressDetail></div>
              </div>
                <div class="form-group col-md-6">
                <label for="">{{$t('order.Alternativecontact')}} </label>
                <input class="form-control" id="emergencyName" type="text" v-model="baseInfo.emergencyName">
              </div>
              <div class="form-group col-md-6">
                <label for="">{{$t('order.Alternativecontacttel')}}</label>
                <input class="form-control" id="emergencyPhone" type="text" v-model="baseInfo.emergencyPhone">
              </div>            
	              <div class="form-group col-md-6">
	                <label for="">{{$t('order.AWBNo')}}</label>
	                <input class="form-control" id="trackingNo" type="text" v-model="baseInfo.trackingNo">
	              </div>              
	              <div class="form-group col-md-6">
	                <label for="">{{$t('order.Courier')}}</label>
	                <input class="form-control" id="expressCode" placeholder="ddl" type="text" v-model="baseInfo.expressCode">
	              </div>
	              <div class="form-group col-md-6">
	                <label for="">{{$t('order.productType')}}{{$t('order.userName')}}<b>* </b></label>
	                <input class="form-control" id="productType" placeholder="1+666" v-verify-input:nonvoid ="{id:'productType',format:true,title:$t('order.productType')}" type="text" v-model="baseInfo.productType">
                  <div v-verify-msg:productType></div>
                </div>              
	              <div class="form-group col-md-6">
	                <label for="">{{$t('order.imei')}}<b>* </b></label>
	                <input class="form-control" id="imei" placeholder="" v-verify-input:len ="{id:'imei',format:15,title:$t('order.imei')}" type="text" v-model="baseInfo.imei">
                  <div v-verify-msg:imei></div>
	              </div>              

              <div class="form-group col-md-6 buy_data">
                <label for="">{{$t('order.Purchasedate')}}</label>
                 <el-date-picker
                  v-model="baseInfo.orderTime"
                  type="date"
                  format = "yyyy-MM-dd"
                  id = "orderTime"
                  :editable="false"
                  :placeholder="$t('order.daterange')"
                  :picker-options="pickerOptions"
                  class="select_list form-control">
                 </el-date-picker>               	
              </div>
              <div class="form-group col-md-6">
                <label for="">{{$t('order.Color')}}</label>
                <input class="form-control" id="color" placeholder="" type="text" v-model="baseInfo.color">
              </div>
              <div class="form-group col-md-6">
                <label for="">{{$t('order.Accessories')}}</label>
                <p>
                    <el-checkbox-group v-model="baseInfo.partsStatusArray" id="partsStatusArray">
                    <el-checkbox v-for="tmp in partOptions" :label="tmp" :key="tmp" ></el-checkbox>
                  </el-checkbox-group>
                </p>
              </div>
              <div class="form-group col-md-6">
                <label for="">{{$t('order.Otheraccessories')}}</label>
                <input class="form-control" id="partsOther" placeholder="" type="text" v-model="baseInfo.partsOther">
              </div> 
              <div class="clearfix"></div>	
              <div class="form-group col-md-6">
                <label for="">{{$t('order.Appearance')}}</label>
                    <el-select :placeholder="$t('order.choose')" size="small" id="appearance" class="select_list form-control" v-model="baseInfo.appearance">
                        <el-option
                        v-for="item in appearanceOptions"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value">
                        </el-option>
                  </el-select>									
              </div>              
              <div class="form-group col-md-6">
                <label for="">{{$t('order.Appearancedescription')}}</label>
                <input class="form-control" id="appearanceInfo" placeholder="" type="text" v-model="baseInfo.appearanceInfo">
              </div> 
              <div class="clearfix"></div>
              <div class="form-group col-md-12">
              	<label for="">{{$t('order.Failuredescription')}}<b>*</b></label>
              	<input class="form-control" id="troubleInfo" placeholder="" v-verify-input:nonvoid ="{id:'troubleInfo',format:true,title:$t('order.Failuredescription')}" type="text" v-model="baseInfo.troubleInfo">
                <div v-verify-msg:troubleInfo></div>
              </div>
              <div class="form-group col-md-6">
                <label for="">{{$t('order.facilitatorName')}}<b>*</b> </label>
                    <el-select v-model="baseInfo.providerCode" id="providerCode" placeholder="" size="small"  class="select_list form-control" @change="handleChangeProvider">
                        <el-option
                          v-for="item in providerOptions"
                          :key="item.providerCode"
                          :label="item.providerName"
                          :value="item.providerCode">
                        </el-option>
                  </el-select>
                  <div v-verify-msg:facilitatorCode></div>
              </div>
              <div class="form-group col-md-6">
                <label for="">{{$t('order.Serviceprovideraddress')}}:</label>
 								<p>{{baseInfo.providerAddress}}</p>
	              <label for="">{{$t('order.Serviceprovidertel')}}:</label>
	              <!-- <p>{{baseInfo.providerPhone}}</p> -->
                <input v-model="baseInfo.providerPhone" style="border:0;" v-verify-input:nonvoid ="{id:'facilitatorCode',format:true,title:$t('order.facilitatorName')}"/>
              </div> 
          </form></div>

        </div>
        <div class="modal-footer">        	
          <button data-dismiss="modal" class="btn btn-cancel" type="button">{{$t('order.Cancel')}}</button>
           <button class="btn btn-primary" v-verify-final-check:verifyEditOrderForm type="submit">{{$t('order.Affirm')}}</button>
        </div>
      </div>
    </div>
  </div>
  </div>

    </dl>
  </div>
</template>

<script>

import { updateOrder } from 'api/morder';
import { getProviderList } from 'api/providerMgr';
import { getChannelList } from 'api/channelMgr';
import moment from 'moment';

// const partOptions123 = ['彩盒', '数据线', '适配器'];
export default {
  name: 'editOrderButtonChild',
  props: {
    baseInfo: {}
  },
  data() {
    return {
      orderTmp: {
          userId: this.$store.getters.uid,
          orderNumber: this.$route.params.orderNumber,
          refNumber: '',
          userName: '',
          phone: '',
          mobile: '',
          email: '',
          postCode: '',
          country: '',
          province: '',
          city: '',
          street: '',
          addressDetail: '',
          addressDetail1: '',
          emergencyName: '',
          emergencyPhone: '',
          imei: '',
          orderTime: '',
          color: '',
          appearance: '',
          appearanceinfo: '',
          partsStatus: '',
          // partsStatusArr: [], // this.partsStatusArray,
          partsother: '',
          troubleInfo: '',
          facilitatorCode: '',
          trackingNo: '',
          expresscode: '',
          productType: '',
          repairId: ''
      },
      tempOrder: '',
      providerOptions: [],
      orderModalTitle: this.$t('order.EditWorkOrder'),
      providerType: '',
      partOptions: [this.$t('order.Giftbox'), this.$t('order.USBcable'),this.$t('order.Poweradaptor')],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      appearanceOptions: [
        { value: '外观完好' },
        { value: '外观破损' }
      ],
      channeloptions: []
    }
  },
  mounted() {
      console.log('mounted--------------->');
      console.dir(this.baseInfo);
  },
  created() {
        const _this = this;
        _this.providerType = _this.$store.getters.providerCode.substr(0, 1);
        _this.getProviderList();
        // this.getChannelList();
        _this.$on('verifyEditOrderForm', function() {
          _this.handleSaveOrder();
        });
  },
  // computed: {
  //   partsStatusArrayTmp: partsStatusArray
  // },
  methods: {
     getProviderList() {
             const providerQuery = {};
             if (this.providerType === 'C') {
               providerQuery.searchValue = 'B';
             }
             if (this.providerType === 'B') {
               providerQuery.searchValue = 'C';
             }
             getProviderList(providerQuery).then(response => {
                this.providerOptions = response.data;
            })
        },
    getChannelList(){
            getChannelList().then(response => {
                this.channeloptions = response.data;
            })
    },
    handleChangeProvider(val){
            if(val != ''){
                this.$refs.facilitatorCode.style.display = "none";
            }
            this.providerOptions.forEach(function(obj) {
                if(obj.providerCode == val){
                    this.baseInfo.providerAddress = obj.address;
                    this.baseInfo.providerPhone = obj.phone;
                }
            }, this);
    },
    handleSaveOrder() {
            console.log('handle------------save----------------order------------');
            // this.orderTmp.orderTime = new Date(this.orderTmp.orderTime).getTime();
            this.orderTmp.partsStatus = this.baseInfo.partsStatusArray.toString();
            this.orderTmp.refNumber = this.baseInfo.refNumber;
            this.orderTmp.userName = this.baseInfo.userName;
            this.orderTmp.phone = this.baseInfo.userPhone;
            this.orderTmp.mobile = '';
            this.orderTmp.email = this.baseInfo.userEmail;
            this.orderTmp.postCode = this.baseInfo.userPostcode;
            this.orderTmp.country = this.baseInfo.userCountry;
            this.orderTmp.province = this.baseInfo.userProvince;
            this.orderTmp.city = this.baseInfo.userCity;
            this.orderTmp.street = this.baseInfo.userStreet;
            this.orderTmp.addressDetail = this.baseInfo.userAddress;
            this.orderTmp.addressDetail1 = '';
            this.orderTmp.emergencyName = this.baseInfo.emergencyName;
            this.orderTmp.emergencyPhone = this.baseInfo.emergencyPhone;
            this.orderTmp.imei = this.baseInfo.imei;
            this.orderTmp.orderTime = this.baseInfo.orderTime === '' ? '' : moment(this.baseInfo.orderTime).format('YYYY-MM-DD HH:mm:ss')
            this.orderTmp.color = this.baseInfo.color;
            this.orderTmp.appearance = this.baseInfo.appearance;
            this.orderTmp.appearanceinfo = this.baseInfo.appearanceInfo;
            this.orderTmp.partsother = this.baseInfo.partsOther;
            this.orderTmp.troubleInfo = this.baseInfo.troubleInfo;
            this.orderTmp.facilitatorCode = this.baseInfo.providerCode;
            this.orderTmp.trackingNo = this.baseInfo.trackingNo;
            this.orderTmp.expresscode = this.baseInfo.expressCode;
            this.orderTmp.productType = this.baseInfo.productType;
            this.orderTmp.repairId = this.baseInfo.repairId;
            console.dir(this.orderTmp);
                updateOrder(this.orderTmp).then(response => {
                  if (response.data.status === '0') {
                      this.$message.info('Order updated!');
                      this.$emit('listenBaseInfo');
                      console.log('emitemitemitemitemitemitemitemitemit');
                       $('#myModal99').modal('hide');
                  } else {
                    this.$message.error(response.data.message);
                  }
              })
        }
    //     handleEditOrderModal(orderNumber) {
    //       this.orderModalTitle = '编辑工单';
    //       this.orderTmp.orderNumber = orderNumber;
    //       console.log('----@@@@@@@@@@@@@------------@@@@@@@@@@@');
    //       console.dir(this.orderTmp);
    //       getOrderByOrderNumber(this.orderTmp).then(response => {
    //             if (response.data.status === '0') {
    //                 this.orderTmp = response.data.order;

    //                 console.log('---------!!!!!!!!!!!!!!______---');
    //                 console.dir(this.orderTmp);
    //                 console.log(this.orderTmp.partsStatus);
    //                 if (this.orderTmp.partsStatus !== null && this.orderTmp.partsStatus.trim().length > 0) {
    //                     this.orderTmp.partsStatusArr = this.orderTmp.partsStatus.split(',');
    //                     console.dir(this.orderTmp.partsStatusArr);
    //                 }
    //                 this.isEdit = response.data.isEdit;
    //             } else {
    //               this.$message.error(response.data.message);
    //             }
    //         })
    //       $('#orderInfoEdit').modal();
    // }
  }
}
</script>

