<template>
<div>
  <div class="modal fade" id="orderInfo">
  <div class="modal-dialog"  style="min-width:758px;">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" @click="closeModal" aria-hidden="true">&times;</button>
        <h5 class="modal-title">{{$t('order.NewWorkOrder')}}</h5></div>
      <div class="modal-body">
        <div class="order_detection main_form_input">          
            <form role="form" ref="orderForm">
              <div class="panel-body">
	              <div class="form-group col-md-4">
	                <label for="">{{$t('order.userName')}}<b>* </b></label>
	                <input class="form-control" placeholder="" id="userName" v-verify-input:nonvoid ="{id:'userName',format:true,title:$t('order.userName')}" type="text" v-model="order.userName">
                  <div v-verify-msg:userName></div>
	              </div>
	              <div class="form-group col-md-4">
	                <label for="">{{$t('order.tel')}}<b>* </b></label>
	                <input class="form-control" placeholder="" id="phone" v-verify-input:reg ="{id:'phone',format:'Phone',title:$t('order.tel')}"  type="text" maxLength='20' v-model="order.phone">
                  <div v-verify-msg:phone></div>
	              </div>
              <div class="form-group col-md-4">
                <label for="">{{$t('order.mail')}}<b>*</b>:</label>
                <input class="form-control" id="email" v-verify-input:reg="{id:'email',format:'Mail',title:$t('order.mail')}" placeholder="" type="text" v-model.trim="order.email">
                <div v-verify-msg:email></div>
              </div>
               <div class="clearfix"></div>	
              <div class="form-group col-md-4">
                <label for="">{{$t('order.country')}} </label>
                    <el-select v-model="countrytmp" id="country" :placeholder="$t('order.choose')" size="small" class="select_list form-control" @change="countyChange">
                        <el-option
                        v-for="item in countryList"
                        :key="item.countrycode"
                        :label="item.countryename"
                        :value="item">
                        </el-option>
                    </el-select>
              </div>               	
              <div class="form-group col-md-4">
                <label for="">{{$t('order.province')}}</label>
                  <el-select v-model="order.province" id="province" :placeholder="$t('order.choose')" size="small" class="select_list form-control">
                        <el-option
                        v-for="item in stateList"
                        :key="item.providerName"
                        :label="item.providerName"
                        :value="item.providerName">
                        </el-option>
                  </el-select>
              </div> 
              <div class="form-group col-md-4">
                <label for="">{{$t('order.city')}} </label>
                    <el-select v-model="order.city" id="city" :placeholder="$t('order.choose')" size="small" class="select_list form-control">
                        <el-option
                        v-for="item in providerOptions"
                        :key="item.providerName"
                        :label="item.providerName"
                        :value="item.providerName">
                        </el-option>
                  </el-select>
              </div> 
              
              <div class="clearfix"></div>  
                     	
                <div class="form-group col-md-4">
                  <label for="">{{$t('order.zipcode')}} </label>
                      <input class="form-control" id="postCode" placeholder="" type="text" v-model="order.postCode" maxLength='15'>									
                </div> 
                <div class="form-group col-md-8">
                  <label for="">{{$t('order.address')}}<b>*</b>:</label>
                  <input class="form-control" id="addressDetail" placeholder="" v-verify-input:nonvoid ="{id:'addressDetail',format:true,title:$t('order.address')}" type="text" maxLength='45' v-model="order.addressDetail">
                  <div v-verify-msg:addressDetail></div>
                </div>
              </div>
              <div class="clearfix"></div>
             <div class="panel-body">    
                  <div class="form-group col-md-4">
                  <label for="">{{$t('order.Alternativecontact')}} </label>
                  <input class="form-control" id="emergencyName" placeholder="" type="text" v-model="order.emergencyName">
                </div>
                <div class="form-group col-md-4">
                  <label for="">{{$t('order.Alternativecontacttel')}} </label>
                  <input class="form-control" id="emergencyPhone" placeholder="" type="text" v-model="order.emergencyPhone">
                </div> 
              </div>
              <div class="clearfix"></div>
               <div class="panel-body">           
	              <div class="form-group col-md-4">
	                <label for="">{{$t('order.AWBNo')}}</label>
	                <input class="form-control" id="trackingNo" placeholder="" type="text" v-model="order.trackingNo">
	              </div>              
	              <div class="form-group col-md-4">
	                <label for="">{{$t('order.Courier')}}</label>
	                <input class="form-control" id="expresscode" placeholder="" type="text" v-model="order.expresscode">
	              </div>
	              <div class="form-group col-md-4">
	                <label for="">{{$t('order.productType')}} <b>* </b></label>
	                <input class="form-control" id="productType" placeholder="" v-verify-input:nonvoid ="{id:'productType',format:true,title:$t('order.productType')}" type="text" v-model="order.productType">
                  <div v-verify-msg:productType></div>
                </div>              
	              <div class="form-group col-md-4">
	                <label for="">{{$t('order.imei')}}<b>* </b></label>
	                <input class="form-control" id="imei" placeholder="" v-verify-input:len ="{id:'imei',format:15,title:$t('order.imei')}" type="text" v-model="order.imei">
                  <div v-verify-msg:imei></div>
	              </div>              
              <div class="form-group col-md-4 buy_data">
                <label for="">{{$t('order.Purchasedate')}}  </label>
                 <el-date-picker
                  v-model="order.orderTime"
                  type="date"
                  id = "orderTime"
                  ref = "orderTime"
                  format = "yyyy-MM-dd"
                  :editable="false"
                  :placeholder="$t('order.choose')"
                  :picker-options="pickerOptions"
                  class="select_list form-control">
          </el-date-picker>               	
              </div>
              <div class="form-group col-md-4">
                <label for="">{{$t('order.Color')}} </label>
                <input class="form-control" id="color" placeholder="" type="text" v-model="order.color">
              </div>
              <div class="form-group col-md-4">
                <label for="">{{$t('order.Accessories')}} </label>
                <p>
                	<!-- <input type="checkbox" v-model="partsStatusArr"><span>包装盒</span>
                	<input type="checkbox" v-model="partsStatusArr"><span>数据线</span>
                	<input type="checkbox" v-model="partsStatusArr"><span>适配器</span> -->
                  <el-checkbox-group v-model="order.partsStatusArr" size="small" id="partsStatusArr">
                      <el-checkbox :label="$t('order.Giftbox')" name="partsStatusArr"></el-checkbox>
                      <el-checkbox :label="$t('order.USBcable')" name="partsStatusArr"></el-checkbox>
                      <el-checkbox :label="$t('order.Poweradaptor')" name="partsStatusArr"></el-checkbox>
                  </el-checkbox-group>
                </p>
              </div>
              <div class="form-group col-md-8">
                <label for="">{{$t('order.Otheraccessories')}}</label>
                <input class="form-control" id="partsother" placeholder="" type="text" v-model="order.partsother">
              </div> 
              <div class="clearfix"></div>	
              <div class="form-group col-md-4">
                <label for="">{{$t('order.Appearance')}} </label>
                    <el-select :placeholder="$t('order.choose')" id="appearance" size="small" class="select_list form-control" v-model="order.appearance">
                        <el-option
                        v-for="item in appearanceOptions"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value">
                        </el-option>
                  </el-select>									
              </div>              
              <div class="form-group col-md-8">
                <label for="">{{$t('order.Appearancedescription')}} </label>
                <input class="form-control" id="appearanceinfo" placeholder="" type="text" v-model="order.appearanceinfo">
              </div> 
              <div class="clearfix"></div>
              <div class="form-group col-md-12">
              	<label for="">{{$t('order.Failuredescription')}}<b>*</b></label>
              	<input class="form-control" id="troubleInfo" placeholder="" v-verify-input:nonvoid ="{id:'troubleInfo',format:true,title:$t('order.Failuredescription')}" type="text" v-model="order.troubleInfo">
                <div v-verify-msg:troubleInfo></div>
              </div>
              <div class="form-group col-md-4">
                <label for="">{{$t('order.facilitatorName')}}<b>*</b> </label>
                    <el-select v-model="order.facilitatorCode" id="facilitatorCode" placeholder="" size="small"  class="select_list form-control" @change="handleChangeProvider">
                        <el-option
                          v-for="item in providerOptions"
                          :key="item.providerCode"
                          :label="item.providerName"
                          :value="item.providerCode">
                        </el-option>
                  </el-select>
                  <div v-verify-msg:facilitatorCode ref="facilitatorCode"></div>
              </div>
              <div class="form-group col-md-8">
                <label for="">{{$t('order.Serviceprovideraddress')}}:</label>
 								<p>{{providerAddress}}</p>
	              <label for="">{{$t('order.Serviceprovidertel')}}:</label>
	              <!-- <p>{{providerPhone}}</p> -->
                <input v-model="providerPhone" style="border:0;" v-verify-input:nonvoid ="{id:'facilitatorCode',format:true,title:$t('order.facilitatorName')}"/>
              </div>
              </div> 
          </form>
        </div>
        <div class="modal-footer">        	
          <button @click="closeModal" class="btn btn-cancel" type="button">{{$t('order.Cancel')}}</button>
          <button class="btn btn-primary" v-verify-final-check:verifyForm type="submit">{{$t('order.Affirm')}}</button>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
</template>
<script>
import { getProviderList } from 'api/providerMgr';
import { getChannelList } from 'api/channelMgr';
import { addOrder, getOrderByOrderNumber } from 'api/morder';
import { parseTime } from 'utils/index';
import Vue from 'vue';
import { getCountryList, getStateList } from 'api/country_state';
export default {
  name: 'orderDetailInfo',
  data() {
    return {
      countrytmp: '',
      statetmp:'',
      order: {
          orderNumber: '',
          refNumber: '',
          userName: '',
          mobile: '',
          phone: '',
          email: '',
          postCode: '',
          country: '',
          countryCode:'',
          province: '',
          provinceCode:'',
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
          partsStatusArr: [],
          partsother : '',
          troubleInfo: '',
          facilitatorCode: '',
          trackingNo: '',
          expresscode : '',
          productType : ''
      },
      isEdit : false,
      defaultOrder :'',
      providerOptions: [],
      orderModalTitle : this.$t('order.NewWorkOrder'),
      providerAddress : '',
      providerPhone : '',
      providerType : '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      appearanceOptions:this.$t('order.appearanceOptions'),
      channeloptions :[],
      countryList: [],
      stateList: []
      }
    },
  created() {
        const _this = this;
        _this.defaultOrder = JSON.parse(JSON.stringify(_this.$data.order));
        _this.providerType = _this.$store.getters.providerCode.substr(0, 1);
        _this.getProviderList();
        //this.getChannelList();
        _this.$on('verifyForm', function() {
          _this.handleSaveOrder();
        });
        _this.getCountryList();
  },
  methods: {
    closeModal(){
      $('#orderInfo').modal("hide");
       Object.assign(this.$data.order, this.$data.defaultOrder);
    },
    countyChange(val){
      this.order.countryCode = val.countrycode;
      this.order.country = val.countryename;
      console.dir(val);
     // this.getStateList(this.order.countryCode);
    },
    getProviderList(){
             const providerQuery = {};
             if(this.providerType =='C'){
               providerQuery.searchValue = 'B';
             }
             if(this.providerType =='B'){
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
                    this.providerAddress = obj.address;
                    this.providerPhone = obj.phone;
                }
            }, this);
    },
    handleSaveOrder() {
        const _this = this;
        _this.order.orderTime = new Date(_this.order.orderTime).getTime();
        _this.order.partsStatus = _this.order.partsStatusArr.toString();
        if(_this.isEdit){
            updateOrder(_this.order).then(response => {
              if(response.data.status=='0'){
                _this.$message({
                    message: this.$t(response.data.message),
                    type: 'success'
                });
                _this.$data.order = Object.assign(this.$data.order, this.defaultOrder);
                _this.getList();
              }else{
                _this.$message.error(this.$t(response.data.message));
              }
          })
        }else{
          addOrder(_this.order).then(response => {
              if(response.data.status=='0'){
                _this.$message({
                    message: this.$t(response.data.message),
                    type: 'success'
                });
                $('#orderInfo').modal('hide');
                 _this.$data.order = Object.assign(this.$data.order, this.defaultOrder);
                if(!_this.isEdit){
                  _this.$parent.getList();
                  _this.$parent.getOrderNumByStatus();
                  //this.$router.push({ path: '/order/index'});
                  // _this.$emit('refreshList');
                }
              }else{
                _this.$message.error(this.$t(response.data.message));
              }
          })
        }
    },
    handleEditOrderModal(orderNumber){
          this.orderModalTitle = this.$t('order.EditWorkOrder');
          this.order.orderNumber = orderNumber;
          getOrderByOrderNumber(this.order).then(response => {
                if(response.data.status=='0'){
                    this.order = response.data.order;
        
                }else{
                  this.$message.error(response.data.message);
                }
            })
          $('#orderInfo').modal();
    },
    getCountryList() {
      getCountryList().then(response => {
          if (response.data.status === '0') {
              this.countryList = response.data.rsltData;
          } else {
              this.$message.error(response.data.message);
          }
      })
    },
    getStateList(countryCode) {
      getStateList(countryCode).then(response => {
          console.log('@@@@@@#########@@@@@@@@@@@@@@');
          console.dir(response);
          if (response.data.status === '0') {
              this.stateList = response.data.rsltData;
              console.log('--------------------');
              console.dir(this.stateList);
          } else {
              this.$message.error(response.data.message);
          }
      })
    }
  }
}
</script>