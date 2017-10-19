<!--发货 组件-->

<template>
<div>
    <dl class="line">
<dt>&nbsp;</dt>
	</dl>
	  	
<dl><dt class="active"><a href="#myModal4" data-toggle="modal">{{$t('order.Detail.Shipping')}}</a></dt>
	   <!-- 发货 Modal -->
<div class="modal fade" id="myModal4" style="display: none;">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{$t('order.Detail.ShipmentInfo')}}</h5></div>
      <div class="modal-body">
        <div class="order_detection main_form_input">
          <div class="panel-body">
            <form role="form">
              <div class="col-md-6">
	              <div class="form-group">
	                <label for="">{{$t('order.Detail.Sendername')}}<b>* </b></label>
	                <p>{{baseInfo.providerName}}</p>
	              </div>
	              <div class="form-group">
	                <label for="">{{$t('order.tel')}}<b>* </b></label>
	                <p>{{baseInfo.providerPhone}}</p>
	              </div>
	              <div class="form-group">
	                <label for="">{{$t('order.mail')}}<b>* </b> </label>
	                <p>{{baseInfo.providerEmail}}</p>
	              </div>
              </div>
              <div class="form-group col-md-2">
                <label for="">{{$t('order.address')}}<b>*</b></label>
                <p>{{baseInfo.providerAddress}}</p>
              </div>
          </form></div>
          <div class="panel-body">
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
                
              </div>
          </div>

          <div class="panel-body"> 
              <div class="form-group col-md-6">
                <label for="">{{$t('order.country')}} </label>
                  <el-select class="select_list default form-control" filterable v-model="countrytmp" :placeholder="baseInfo.userCountry" @change="countyChange">
                    <el-option
                      v-for="item in countryList"
                      :key="item.sortname"
                      :label="item.name"
                      :value="item">
                    </el-option>
                  </el-select>

								<div class="clearfix"></div>		
              </div>
              <div class="form-group col-md-6">
                <label for="">{{$t('order.province')}}</label>
                  <el-select class="select_list default form-control" v-model="statetmp" :placeholder="baseInfo.userProvince" @change="stateChange">
                    <el-option
                      v-for="item in stateList"
                      :key="item.sortname"
                      :label="item.name"
                      :value="item">
                    </el-option>
                  </el-select>
								<div class="clearfix"></div>		
              </div>
              <div class="form-group col-md-6">
                <label for="">{{$t('order.city')}}</label>
                  <el-autocomplete v-model="orderAddrForm.city" :placeholder="citytmp" id="userCity" :fetch-suggestions="querySearchCity" class="select_list form-control" @select="citySelect" @keyup.native="citySelect"></el-autocomplete>
                  <!--<el-select class="select_list default form-control" clearable v-model="baseInfo.userCity" :placeholder="$t('order.choose')" @change="cityChange">
                    <el-option
                      v-for="item in cityList"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                  </el-select>-->
								<div class="clearfix"></div>		
              </div>
              
              <div class="form-group col-md-6">
                <label for="">{{$t('order.zipcode')}}</label>
                <input class="form-control" v-model="orderAddrForm.postcode" :placeholder="baseInfo.userPostcode" id="" type="text" />
              </div>	
              <div class="clearfix"></div>
              <div class="form-group col-md-12">
              	<label for="">{{$t('order.address')}}</label>
                <input class="form-control" id="" v-model="orderAddrForm.addressDetail" :placeholder="baseInfo.userAddress" type="text" />
              </div>
          </div>
					<div class="panel-body">
              <div class="form-group col-md-6">
                <label for="">{{$t('order.Detail.Courier')}}</label>
                  <el-select class="select_list default form-control" v-model="orderAddrForm.sendExpresscode" :placeholder="$t('order.choose')">
                    <el-option
                      v-for="item in sendExpresscodeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
								<div class="clearfix"></div>		
              </div>              

					</div>
        
        
        </div>
        <div class="modal-footer">        	
          <button data-dismiss="modal" class="btn btn-cancel" type="button">{{$t('order.Cancel')}}</button>
          <button id="btnSubmit" class="btn btn-primary" type="button" v-loading.fullscreen.lock="loading" @click="confirm()">{{$t('order.Affirm')}}</button>
        </div>
        
      </div>
    </div>
  </div>	            				
	</div></dl>

</div>
</template>


<script>

import { getChannelCodeList } from 'api/channelMgr';
import { sendOrder } from 'api/baseInfo';
import { getCountryList, getStateList, getCityList } from 'api/country_state';

export default {
  name: 'sendGoods',
  props: {
    baseInfo: {}
  },
  created() {
    this.getExpressCodeList(this.orderAddrForm.orderNumber, this.providerCode);
    this.getCountryList();
  },
  data() {
    return {
      loading: false,
      countrytmp: '',
      statetmp: '',
      citytmp: this.baseInfo.userCity,
      providerCode: this.$store.getters.providerCode,
      orderAddrForm: {
          uid: this.$store.getters.uid,
          orderNumber: this.$route.params.orderNumber,
          country: '',
          countryCode: '',
          province: '',
          provinceCode: '',
          city: '',
          postcode: '',
          addressDetail: '',
          sendExpresscode: ''
      },
      countryOptions: [{
          value: this.$t('order.Detail.China'),
          label: this.$t('order.Detail.China')
        }],
       provinceOptions: [{
          value: this.$t('order.Detail.Guangdong'),
          label: this.$t('order.Detail.Guangdong')
        }],
      cityOptions: [{
          value: this.$t('order.Detail.Shenzhen'),
          label: this.$t('order.Detail.Shenzhen')
        }],
      sendExpresscodeOptions: [],
      sendGood: {
        visibility: '' // hidden
      },
      countryList: [],
      stateList: [],
      cityList: []
    }
  },
  methods: {
    confirm() {
      if (this.orderAddrForm.sendExpresscode === '') {
          this.$message.error(this.$t('order.Detail.ShippingExpressCode'));
          return;
      }
      $('#btnSubmit').attr('disabled', 'true');
      setTimeout(() => {
          $('#btnSubmit').removeAttr('disabled');
      }, 3000);
      // 确认
      this.loading = true;
     // setTimeout(() => {
    sendOrder(this.orderAddrForm).then(response => {
      if (response.data.status === '0') {
          this.loading = false;
          this.$message.info(this.$t('order.Detail.Deliveryfinished'));
          this.$emit('listenBaseInfo');
          $('#myModal4').modal('hide');
      } else {
          this.loading = false;
          this.$message.error(this.$t('order.Detail.Exceptional') + response.data.message);
      }
    });
      //  this.loading = false;
      // }, 20000);
    },
    getExpressCodeList(orderNumber, providerCode) {
      //
      getChannelCodeList(orderNumber, providerCode).then(response => {
          if (response.data.status === '0') {
              const codeList = response.data.rsltData;
              codeList.forEach(element => {
                  this.$set(element, 'value', element.expresscode)
                  this.$set(element, 'label', element.expresscode);
              });
              this.sendExpresscodeOptions = codeList;
          } else {
              this.$message.error(this.$t('order.Detail.Getexception') + response.data.message);
          }
      });
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
    countyChange(val) {
      this.orderAddrForm.country = val.name;
      this.orderAddrForm.countryCode = val.sortname;
      getStateList(val.id).then(response => {
          if (response.data.status === '0') {
              this.baseInfo.userProvince = '';
              this.citytmp = '';
              this.orderAddrForm.city = '';
              this.baseInfo.userPostcode = '';
              this.orderAddrForm.postcode = '';
              this.baseInfo.userAddress = '';
              this.orderAddrForm.addressDetail = '';
              this.stateList = response.data.rsltData;
          } else {
              this.$message.error(response.data.message);
          }
      })
    },
    stateChange(val) {
      if(val =='' || val == undefined){
         return ;
      }
      this.orderAddrForm.province = val.name;
      this.orderAddrForm.provinceCode = val.sortname === null || val.sortname === undefined ? '' : val.sortname;
      getCityList(val.id).then(response => {
          if (response.data.status === '0') {
              this.citytmp = '';
              this.orderAddrForm.city = '';
              this.baseInfo.userPostcode = '';
              this.orderAddrForm.postcode = '';
              this.baseInfo.userAddress = '';
              this.orderAddrForm.addressDetail = '';
              this.cityList = response.data.rsltData;
              this.cityList.forEach(item => {
                this.$set(item,'value',item.name);
              });
          } else {
              this.$message.error(response.data.message);
          }
      })
    },
    querySearchCity(queryString, cb) {
      var restaurants = this.cityList;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
      };
    },
    citySelect(){
      //清空邮编和详细地址
      this.baseInfo.userPostcode = '';
      this.orderAddrForm.postcode = '';
      this.baseInfo.userAddress = '';
      this.orderAddrForm.addressDetail = '';
    }
    
  }
}
</script>
<<style>
  .el-loading-mask {
    background-color: hsla(0, 0%, 100%, 0.3);
  }
</style>
