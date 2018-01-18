<!--检测 Examing Order-->
<template>
  <div>
<dl class="line">
<dt>&nbsp;</dt>
	            			</dl>
	            			<dl>
	            				<dt class="active"><a href="#myModal2" data-toggle="modal">{{$t('order.Detail.Examing')}}</a></dt>

<div class="modal fade" id="myModal2">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{$t('order.Detail.Examing')}}</h5></div>
      <div class="modal-body">
        <div class="order_detection main_form_input">

          <div class="panel-body"> 
						<form>
              <div class="form-group col-md-6">
                <label for="">{{$t('order.Detail.Productmodelconfirmation')}} </label>
              <el-select class="select_list default form-control" filterable v-model="checkReportForm.productTypeCfm" @change="productTypeChange()" :placeholder="$t('order.choose')">
              <el-option
                v-for="item in productTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
                   
								<div class="clearfix"></div>		
              </div>              
              <div class="form-group col-md-6">
                <label for="">{{$t('order.productType')}}</label>
                <input class="form-control" id="" v-model="checkReportForm.productType" :readonly="checkReportForm.productTypeCfm" :placeholder="baseInfo.productType" type="text">
              </div>
              <div class="form-group col-md-6">
                <label for="">{{$t('order.Detail.IMEInumberconfirmation')}} </label>
                    <el-select v-model="checkReportForm.imeiCfm" filterable @change="imeiChange()" class="select_list default form-control" :placeholder="$t('order.choose')">
                    <el-option
                      v-for="item in productTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>

								<div class="clearfix"></div>		
              </div>              
              <div class="form-group col-md-6">
                <label for="">{{$t('order.imei')}}</label>
                <input class="form-control" id="" v-model="checkReportForm.imei" :readonly="checkReportForm.imeiCfm" :placeholder="baseInfo.imei" type="text">
              </div>  
              <div class="clearfix"></div>
              <div class="form-group col-md-12">
              	<label for="">{{$t('order.Detail.Causeoffailure')}}</label>
                <input class="form-control" id="" v-model="checkReportForm.causeInfo" :placeholder="baseInfo.troubleInfo" type="text">
              </div>              
              <div class="form-group col-md-6">
                <label for="">{{$t('order.Detail.Servicetype')}} </label>
                    <el-select class="select_list default form-control" filterable v-model="checkReportForm.serviceType" :placeholder="$t('order.choose')" @change="totalCostCalc()">
                    <el-option
                      v-for="item in maintenanceOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>

								<div class="clearfix"></div>		
              </div>
              <div class="form-group col-md-6">
                <label for="">{{$t('order.Detail.RepairLevel')}}</label>
                <el-select class="select_list default form-control choice_leve" filterable v-model="repairLevels" multiple :placeholder="$t('order.choose')">
                  <el-option
                    v-for="item in maintenanceLevelOptions"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>

								<div class="clearfix"></div>		
              </div>
                  <ul class="add_img">
                    <el-upload
                      name="upFile"
                      ref="upFile"
                      action="api/file/upload"
                      list-type="picture-card"
                      :drag="false"
                      :file-list="partImageList"
                      :on-success="uploadSuccess"
                      :on-error="uploadError"
                      :before-upload="beforeAvatarUpload"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                  	<p class="add_text">
                  		{{$t('order.Detail.addtext')}}
                  	</p>
                  </ul>               
          </form></div>
          <div class="panel-body"> 
						<div class="form-group col-md-12 search">
							<label>{{$t('order.Detail.Sparepartsrequesttable')}}</label>
              <el-autocomplete class="select_list default form-control"
                v-model="accessories"
                :fetch-suggestions="querySearchAsync"
                :placeholder="$t('order.Detail.Enterthesparepartcode')"
                @select="handleSelect"
              ></el-autocomplete>
            </div>
 
						<div class="form-group col-md-12 form-inline spare_code">
              <div class="col-md-8" style="padding-left:0;padding-right:0;word-break:break-all;">
                <span class="spare_tit  pull-left">{{$t('order.Detail.Sparepartscodename')}}：</span>
                <!--备件名称-->
                <div class="pull-left" style="line-height:28px;">{{this.showPartName}}</div>
              </div>
							<div class="pull-right spare_right">
								<div class="form-group">
								<div class="input-group count">
                  <!-- <el-input-number  size="small" v-model="tmpPartNumber" class="default form-control"></el-input-number> -->
								   <span class="input-group-addon minus" @click="minus()">-</span>
								  <input class="form-control" v-model="tmpPartNumber" :value="tmpPartNumber" size="3" placeholder="0" type="text">
								  <span class="input-group-addon plus" @click="plus()">+</span> 
								</div>
								</div>
								<!-- <div class="form-group">
								<input class="form-control" id="" size="8" placeholder="价格(币种) " type="text">
								</div> -->
								<div class="form-group">
                <a class="btn btn-default" @click="assPartSelectionAdd()">{{$t('Add')}}</a>
                </div>
              </div>
            </div> 
 						<div class="table-scrollable modal_find">
                    <table class="table">
                 <thead>
                  <tr class="">
                    <th class="" width="20%" style="text-align: center;">{{$t('order.Detail.SKU')}}</th>
                    <th class="" width="27%" style="text-align: center;">{{$t('order.Detail.Sparepartsname')}}</th>
                    <th class="" width="15%" style="text-align: center;">{{$t('order.Detail.Price')}}</th>
                    <th class="" width="15%" style="text-align: center;">{{$t('order.Detail.Quantity')}}</th>
                    <th class="" width="15%" style="text-align: center;">{{$t('order.Detail.Total')}}</th>
                    <th class="" width="8%" style="text-align: center;">{{$t('order.operation')}}</th>
                  </tr>
                </thead>
                      <tbody>
                        <tr class="gray-bg" v-for=" item in orderPartTableData " :key="item.sku">
                          <td class="" style="text-align: center;">
                               	{{item.sku}}
                          </td>
                          <td class="" style="text-align: center;">
                             		{{item.enName}}
                          </td>
                          <template v-if="checkReportForm.serviceType === '保内维修'">
                            <!--保内价格-->
                          <td class="" style="text-align: center;">
                             	<span class="text_yellow">{{item.price}}</span>
                          </td>
                          </template>
                          <template v-else>
                            <!--保外价格-->
                            <td class="" style="text-align: center;">
                             	<span class="text_yellow">{{item.outPrice}}</span>
                          </td>
                          </template>
                          <td class="" style="text-align: center;">
                             		 {{item.tmpPartNumber}}
                          </td>
                          <template v-if="checkReportForm.serviceType === '保内维修'">
                          <td class="" style="text-align: center;">
                             	<span class="text_yellow">{{ item.price * item.tmpPartNumber | money }}</span>
                          </td>
                          </template>
                          <template v-else>
                          <td class="" style="text-align: center;">
                             	<span class="text_yellow">{{ item.outPrice * item.tmpPartNumber | money }}</span>
                          </td>
                          </template>
                          <td class="" style="text-align: center;">
                             	<a href="javascript:viod(0);" class="del" @click="partSelectDelete(item)"></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
          </div>

          <div class="panel-body"> 
								<div class="table-scrollable modal_find">
                    <table class="table">
                      <thead>
                        <tr>
                          <th width="25%"><label>{{$t('order.Detail.Inboundshippingcost')}}</label></th>
                          <th width="25%"><label>{{$t('order.Detail.Servicecost')}}</label></th>
                          <th width="25%"><label>{{$t('order.Detail.OutboundShippingCost')}}</label></th>
                          <th width="25%" style="text-align:right;"><label>{{$t('order.Detail.Totaloffer')}}</label></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="">
                          <td class="">
                             <input class="form-control" v-verify-input:reg="{id:'',format:'Money',title:''}" @blur="totalCostCalc()" id="" v-model="checkReportForm.collectionCost" placeholder="" @keyup="checkMoney()" type="text">
                          </td>
                          <td class="">
                               <input class="form-control" v-verify-input:reg="{id:'',format:'Money',title:''}" @blur="totalCostCalc()" id="" v-model="checkReportForm.repairCost" placeholder="" @keyup="checkMoney()" type="text">
                          </td>
                          <td class="">
                             <input class="form-control" v-verify-input:reg="{id:'',format:'Money',title:''}" @blur="totalCostCalc()" id="" v-model="checkReportForm.mailingCost" placeholder="" @keyup="checkMoney()" type="text">
                          </td>
                          <td class="" style="text-align:right;">
														<span class="text_yellow">€ {{totalCost | money}}</span>
                          </td>
                        </tr>
                     </tbody>
                    </table>
                  </div>
          </div>
          <div class="panel-body"> 
							<p class="text-right">{{$t('order.Detail.VAT')}} <span class="text_yellow" style="margin-left:10px">€{{totalValueAddTax | money}}</span></p>
              <p  class="text-right">{{$t('order.Detail.Totaloffer')}} <span class="text_yellow big_text" style="margin-left:30px">€{{totalCost + totalValueAddTax | money}}</span></p>
          </div>          

        </div>
        <div class="modal-footer">
          <button data-dismiss="modal" class="btn btn-cancel" type="button">{{$t('order.Cancel')}}</button>
          <button id="btnSubmit" class="btn btn-primary" type="button" @click="commit()">{{$t('order.Affirm')}}</button>
        </div>
      </div>
    </div>
  </div>
	</div>


</dl>	 

<el-dialog v-model="dialogVisible" size="tiny">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>

  </div>
</template>
<script>

import { getPartInfoList, getPartInfoListByPO } from 'api/partManage';
import { checkReportUpdate } from 'api/report';
// import Cookies from 'js-cookie';

export default {
  name: 'checkButtonChild',
  props: {
    baseInfo: {}
  },
  data() {
    return {
      tmpPartNumber: 1, // 配件数量手动可调
      showPartName: '', // 配件名称
      partList: [],
      totalCost: 0, // 合计价格
      totalValueAddTax: 0, // 合计增值税
      orderPartTableData: [], // 工单配件
      accessories: '', // 配件查询key
      assSelectPart: {},
      PartInfoList: [{}], // 配件一览表
      assPartsdialogVisible: false,
      dialogImageUrl: '',
      dialogVisible: false,
      partImageList: [], // 配件图像列表初始利用
      repairLevels: ['L0'],
      maintenanceOptions: [{
        value: '保内维修',
        label: this.$t('order.Detail.Inwarranty')
      }, {
        value: '保外维修',
        label: this.$t('order.Detail.Outwarranty')
      }],
      maintenanceLevelOptions: ['L0', 'L1', 'L2', 'L3'],
      productTypeOptions: [{
        value: true,
        label: this.$t('order.Detail.Match')
      }, {
        value: false,
        label: this.$t('order.Detail.Mismatch')
      }],
      checkReportForm: { // 保存Form
        productType: '',
        productTypeCfm: true,
        imei: '',
        imeiCfm: true,
        causeInfo: '',
        serviceType: '保外维修',
        repairLevel: [],
        collectionCost: 0,
        partsCost: 0,
        mailingCost: 0,
        repairCost: 0,
        valueAddTax: 0, // 增值税 20180117 追加 dbsix.liu
        photoGrpurl: [], // 图片url
        updateUser: '',
        createUser: this.$store.getters.uid,
        orderNumber: this.$route.params.orderNumber,
        // 配件列表
        orderPartList: []
      }
    }
  },
  created() {
      this.imageUploadCompute();
  },
  // 过滤器
  filters: {
        money(val) {
        val = val.toString().replace(/\$|,/g, '');
        if (isNaN(val)) {
          val = '0';
        }
        const sign = val === (val = Math.abs(val));
        val = Math.floor(val * 100 + 0.50000000001);
        let cents = val % 100;
        val = Math.floor(val / 100).toString();
        if (cents < 10) {
          cents = '0' + cents;
        }
        for (let i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
            val = val.substring(0, val.length - (4 * i + 3)) + ',' + val.substring(val.length - (4 * i + 3));
        }

        return sign ? '' : val + '.' + cents;
        }
  },
  methods: {
    imageUploadCompute() {
      // 既存url保存
      let imageUploadItem;
      for (imageUploadItem of this.partImageList) {
          this.checkReportForm.photoGrpurl.push(imageUploadItem.url);
      }
    },
    uploadError(err, file, fileList) {
    },
    uploadSuccess(response, file) {
        if (response.status === '0') {
            this.checkReportForm.photoGrpurl.push(response.url);
        }
      },
      beforeAvatarUpload(file) {
        if(this.$refs.upFile.uploadFiles.length>=5){
            this.$refs.upFile.disabled = true;
        }
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
        const isLt2M = file.size / 1024 / 1024 < 5;
        const isCanUpload = this.checkReportForm.photoGrpurl.length < 6;
        if (!isCanUpload) {
          this.$message.error(this.$t('order.Detail.Canuploadimages'));
        }
        if (!isJPG) {
          this.$message.error(this.$t('order.Detail.imagesformatincorrect'));
        }
        if (!isLt2M) {
          this.$message.error(this.$t('order.Detail.Maximumimage'));
        }
        return isJPG && isLt2M && isCanUpload;
      },
         handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
        handleRemove(file, fileList) {
        this.$refs.upFile.disabled = false;
        this.checkReportForm.photoGrpurl = [];
        // console.dir(file);
        console.dir(fileList);
        // 一旦涉及删除,url全部变化
        console.dir(this.partImageList);
        let fileItem;
        for (fileItem of fileList) {
            if (fileItem.response) {
              // 新上传图片
              if (fileItem.response.status === '0') {
                  this.checkReportForm.photoGrpurl.push(fileItem.response.url);
              }
            } else {
              // 旧上传图片
              this.checkReportForm.photoGrpurl.push(fileItem.url);
              }
        }
        console.dir(this.checkReportForm.photoGrpurl);
      },
        handleIconClick() { // 配件查询
        this.searchPartInfoList();
        this.assPartsdialogVisible = true;
    },
      searchPartInfoList() {
        getPartInfoList(this.accessories).then(response => { // 配件信息获取
          this.PartInfoList = response.data;
      })
    },
        toggleSelection(rows) { // 配件选择
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
    },
      assPartSelectionAdd() {
        if (this.accessories.trim() === '' || Number.parseInt(this.tmpPartNumber) <= 0 || this.assSelectPart.value === undefined) {
          this.$message.error(this.$t('order.Detail.worryaboutyourIQ'));
          return;
        }
        // 追加配件
        let orderPart;
        for (orderPart of this.orderPartTableData) {
            if (this.assSelectPart.owner === orderPart.owner && this.assSelectPart.sku === orderPart.sku) {
              this.$message.error(this.$t('order.Detail.Accessoriesadded'));
              this.assSelectPart = {};
              return;
          }
        }

        this.$set(this.assSelectPart, 'tmpPartNumber', this.tmpPartNumber);
        this.tmpPartNumber = 1; // 临时配件数量清空
        // Array.prototype.push.apply(this.orderPartTableData, this.assPartsSelectArray); //刷新触发不能
        this.orderPartTableData = [...this.orderPartTableData, this.assSelectPart];
        this.totalCostCalc();
        this.assSelectPart = {};
        this.accessories = ''; // clear
        this.showPartName = ''; // clear
    },
      totalCostCalc() {
        // 配件总价计算(追加)
        this.checkMoney()
        let priceCountItem;
        let partPriceSumTmp = 0;
        for (priceCountItem of this.orderPartTableData) {
          // 保内保外 计算价格不同
          if (this.checkReportForm.serviceType === '保内维修') {
              partPriceSumTmp += Number.parseFloat(priceCountItem.price) * Number.parseInt(priceCountItem.tmpPartNumber);
          } else {
            // 保外维修
              partPriceSumTmp += Number.parseFloat(priceCountItem.outPrice) * Number.parseInt(priceCountItem.tmpPartNumber);
          }
        }
        // TOOD VAT总价计算预留接口
        this.checkReportForm.partsCost = partPriceSumTmp;
        this.totalCost = Number.parseFloat(this.checkReportForm.partsCost) + Number.parseFloat(this.checkReportForm.collectionCost) + Number.parseFloat(this.checkReportForm.mailingCost) + Number.parseFloat(this.checkReportForm.repairCost);
        // 增值税计算 波兰税率暂时固定23% TODO
        this.totalValueAddTax = this.totalCost * 0.23;
        this.checkReportForm.valueAddTax = this.totalValueAddTax; // 增值税持久化准备
      },
      // 删除特定配件
      partSelectDelete(item) {
        console.dir(item);
        const rtnArray = this.orderPartTableData;
        let tmpDelTotalCost = 0;
        this.orderPartTableData.forEach((element, index) => {
            if (element.owner === item.owner && element.sku === item.sku) {
                rtnArray.splice(index, 1);
                if (this.checkReportForm.serviceType === '保内维修') {
                  tmpDelTotalCost = Number.parseFloat(element.price) * Number.parseInt(element.tmpPartNumber);
                } else {
                  tmpDelTotalCost = Number.parseFloat(element.outPrice) * Number.parseInt(element.tmpPartNumber);
                }
            }
        });
        // 重新覆盖
        this.orderPartTableData = rtnArray;
        this.checkReportForm.partsCost -= tmpDelTotalCost;
        this.totalCostCalc();
        this.accessories = ''; // clear
        this.showPartName = ''; // clear
      },
      loadAll() {
        // 获取信息
        const partOwner = this.$store.getters.owner; // 废弃不用
        const partProviderCode = this.$store.getters.providerCode;
        const orderNumber = this.$route.params.orderNumber;

        getPartInfoListByPO(partProviderCode, orderNumber).then(response => {
            if (response.data.status === '0') {
            const list = response.data.rsltData;
            //var language = Cookies.get('assLang');
            list.forEach(element => {
              //if(language == 'en'){
                this.$set(element, 'value', element.enName);
              //}else{
                //this.$set(element, 'value', element.cnName);
              //}
            });
                this.partlist = list;
            }
        });
      },
      querySearchAsync(queryString, cb) {
        const tmpPartlist = this.partlist;
        const results = queryString ? tmpPartlist.filter(this.createStateFilter(queryString)) : tmpPartlist;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return state => {
          return state.enName.toLowerCase().indexOf(queryString.toLowerCase()) > -1 || state.cnName.toLowerCase().indexOf(queryString.toLowerCase()) > -1 || state.sku.indexOf(queryString.toLowerCase()) > -1;
        };
      },
      handleSelect(item) {
        this.showPartName = item.enName;
        this.assSelectPart = item;
      },
      plus() {
        this.tmpPartNumber++;
      },
      minus() {
        if (this.tmpPartNumber >= 2) {
        this.tmpPartNumber--;
        }
      },
      productTypeChange() {
        this.checkReportForm.productType = '';
      },
      imeiChange() {
        this.checkReportForm.imei = '';
      },
      commit() {
        this.totalCostCalc();
        this.checkReportForm.repairLevel = this.repairLevels;

        // 产品型号不匹配 型号必须填入
        if (!this.checkReportForm.productTypeCfm && this.checkReportForm.productType === '') {
              this.$message.error(this.$t('order.modalNotInput'));
              return;
        }

        // IMEI不匹配 IMEI必须填入
        if (!this.checkReportForm.imeiCfm && this.checkReportForm.imei === '') {
              this.$message.error(this.$t('order.imeiNoNotInput'));
              return;
        }

        // this.checkReportForm.orderPartList = this.orderPartTableData;
        // 局部属性调整
        const tmpList = this.orderPartTableData;
        tmpList.forEach(element => {
          this.$set(element, 'partCnt', element.tmpPartNumber);
          this.$set(element, 'partCode', element.sku);
          this.$set(element, 'orderNumber', this.$route.params.orderNumber)
          this.$set(element, 'providerCode', this.$store.getters.providerCode);
          this.$set(element, 'partEName', element.enName);
          this.$set(element, 'partCName', element.cnName);
          this.$set(element, 'partCntTotalPrice', (this.checkReportForm.serviceType === '保内维修' ? element.price : element.outPrice) * element.tmpPartNumber);
        });
        this.checkReportForm.orderPartList = tmpList;
        this.checkReportForm.imei = this.checkReportForm.imei === '' ? this.baseInfo.imei : this.checkReportForm.imei;
        this.checkReportForm.causeInfo = this.checkReportForm.causeInfo === '' ? this.baseInfo.troubleInfo : this.checkReportForm.causeInfo;
        // 防止连续点击两次
        $('#btnSubmit').attr('disabled', 'true');
        setTimeout(() => {
            $('#btnSubmit').removeAttr('disabled');
        }, 3000);

        checkReportUpdate(this.checkReportForm).then(response => {
            console.dir(response);
            if (response.data.status === '0') {
                this.$message.info(this.$t('order.Detail.Examingfinish'));
                this.$emit('listenBaseInfo');
                $('#myModal2').modal('hide');
            } else {
                this.$message.error('Error! ' + response.data.message);
            }
        });
      },
      checkMoney() {
        // 收件运费  客户寄给服务商
        if (!/^([1-9]\d*|0|\d*(\.\d*))$/.test(this.checkReportForm.collectionCost)) {
            this.checkReportForm.collectionCost = '';
        } else if ((this.checkReportForm.collectionCost + '').indexOf(".") >= 0) {
            this.checkReportForm.collectionCost = this.checkReportForm.collectionCost.substring(0,this.checkReportForm.collectionCost.indexOf(".") + 3); 
        }
        // 服务费
        if (!/^([1-9]\d*|0|\d*(\.\d*))$/.test(this.checkReportForm.repairCost)) {
            this.checkReportForm.repairCost = '';
        } else if ((this.checkReportForm.repairCost + '').indexOf(".") >= 0) {
            this.checkReportForm.repairCost = this.checkReportForm.repairCost.substring(0, this.checkReportForm.repairCost.indexOf(".") + 3); 
        }
        // 寄件运费   服务商寄给客户
        if (!/^([1-9]\d*|0|\d*(\.\d*))$/.test(this.checkReportForm.mailingCost)) {
            this.checkReportForm.mailingCost = '';
        } else if ((this.checkReportForm.mailingCost + '').indexOf(".") >= 0){
            this.checkReportForm.mailingCost = this.checkReportForm.mailingCost.substring(0,this.checkReportForm.mailingCost.indexOf(".") + 3); 
        }
      }
      // checkRepair(){
      //   if(!/^([1-9]\d*|0|\d*(\.\d*))$/.test(this.checkReportForm.repairCost)){
      //       this.checkReportForm.repairCost= '';
      //   }else if (this.checkReportForm.repairCost.indexOf(".") >= 0){
      //       this.checkReportForm.repairCost = this.checkReportForm.repairCost.substring(0,this.checkReportForm.repairCost.indexOf(".") + 3); 
      //   }
      // },
      // checkMailing(){
      //   if(!/^([1-9]\d*|0|\d*(\.\d*))$/.test(this.checkReportForm.mailingCost)){
      //       this.checkReportForm.mailingCost= '';
      //   }else if (this.checkReportForm.mailingCost.indexOf(".") >= 0){
      //       this.checkReportForm.mailingCost = this.checkReportForm.mailingCost.substring(0,this.checkReportForm.mailingCost.indexOf(".") + 3); 
      //   }
      // }
  },
  //监听文本框的值
  watch:{
    tmpPartNumber(){
      this.tmpPartNumber=this.tmpPartNumber.replace(/\D/g,'','');
    }
  },
  mounted() {
    this.loadAll();
  }
}
</script>



<style>
.el-upload-list--picture-card .el-upload-list__item{
  width: 54px;
  height: 54px;
}
.el-upload--picture-card{
  width: 54px;
  height: 54px;  
  line-height: 58px;
  }
.el-upload-list--picture-card .el-upload-list__item-actions{
  font-size: 15px;
}
.choice_leve .el-input__inner{
 height: 28px!important;
}
.modal_find td{
  word-break: break-all;
}
</style>
