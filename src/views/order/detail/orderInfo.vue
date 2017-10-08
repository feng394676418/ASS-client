<template>
<div>
<el-card width='680px'> 
        <div style="width:300px;">
        <el-input
          placeholder="请输入工单号"
          icon="search"
          v-model="searchValue"
          :on-icon-click="handleSearch">
        </el-input>
      </div>

  <h2>工单编号：{{baseInfo.refNumber}}</h2>
  </el-card>
<el-card class="box-card">

<el-collapse v-model="activeName">
  <el-collapse-item title="客户信息" name="1">
    
	<div class="text item">
    客户姓名：{{baseInfo.userName}}
  </div>
		<div class="text item">
    电话: {{baseInfo.userPhone}}
  </div>
		<div class="text item">
    邮箱：{{baseInfo.userEmail}}
  </div>
		<div class="text item">
    详细地址: {{baseInfo.userAddress}}
  </div>
		<div class="text item">
    城市：{{baseInfo.userCity}}
  </div>
		<div class="text item">
    州/省：{{baseInfo.userProvince}}
  </div>
	<div class="text item">
    国家：{{baseInfo.userCountry}}
  </div>
	<div class="text item">
    州/省：{{baseInfo.userProvince}}
  </div>
	<div class="text item">
    邮编：{{baseInfo.userPostcode}}
  </div>
	<div class="text item">
    相关联系人：{{baseInfo.emergencyName}}
  </div>
	<div class="text item">
    相关联系人电话：{{baseInfo.emergencyPhone}}
  </div>
	<div class="text item">
    寄送运单号：{{baseInfo.trackingNo}}
  </div>
	<div class="text item">
    快递公司：{{baseInfo.expressCode}}
  </div>

  </el-collapse-item>
  <el-collapse-item title="产品信息" name="2">

	<div class="text item">
   	产品型号：{{baseInfo.productType}}
  </div>
		<div class="text item">
   	产品IMEI: {{baseInfo.imei}}
  </div>
		<div class="text item">
   	购买日期：{{baseInfo.orderTime}}
  </div>
		<div class="text item">
   	产品型号：{{baseInfo.productType}}
  </div>
		<div class="text item">
   	颜色：{{baseInfo.color}}
  </div>
		<div class="text item">
   	外观情况：{{baseInfo.appearance}}
  </div>
		<div class="text item">
   	配件情况：{{baseInfo.partsStatus}}
  </div>
			<div class="text item">
   	客户故障描述：{{baseInfo.troubleInfo}}
  </div>

  </el-collapse-item>

  <el-collapse-item title="服务商信息" name="3">
    
	<div class="text item">
   	服务商: {{baseInfo.providerCode}}
  </div>
		<div class="text item">
   	电话: {{baseInfo.providerPhone}}
  </div>
		<div class="text item">
   	邮箱: {{baseInfo.providerEmail}}
  </div>
		<div class="text item">
   	详细地址：{{baseInfo.providerAddress}}
  </div>
		<div class="text item">
   	城市：{{baseInfo.providerCity}}
  </div>
		<div class="text item">
   	州/省：{{baseInfo.providerProvince}}
  </div>
		<div class="text item">
   	国家：{{baseInfo.providerCountry}}
  </div>
			<div class="text item">
   	邮编：{{baseInfo.providerPostcode}}
  </div>
  </el-collapse-item>

</el-collapse>
</el-card>
	<div class="box-card2">

<el-steps :space="200" :active="stepActive">
  <el-step title="建单" icon="plus"></el-step>
  <el-step title="编辑" icon="edit"></el-step>
  <el-step title="受理" icon="upload2" @click.native="toAccept()"></el-step>
	<el-step title="检测" icon="share" @click.native="toCheck()"></el-step>
  <el-step title="质检" icon="view"></el-step>
  <el-step title="发货" icon="message"></el-step>
</el-steps>

<el-dialog title="受理工单" v-model="acceptDialog" style="margin-top:-20px">
  <span>客户姓名:</span>
  <span>{{baseInfo.userName}}</span><br/>
  <span>电话:</span>
  <span>{{baseInfo.userPhone}}</span><br/>
  <span>邮箱:</span>
  <span>{{baseInfo.userEmail}}</span><br/>
  <span>地址:</span>
  <span>{{baseInfo.userAddress}}</span><br/>
<el-form :model="acceptForm" ref="acceptForm">
<el-form-item label="相关联系人姓名:">
  <el-input name="emergencyName" v-model="acceptForm.emergencyName" :placeholder="baseInfo.emergencyName"></el-input>
</el-form-item>
<el-form-item label="相关联系人电话:">
  <el-input name="emergencyPhone" v-model="acceptForm.emergencyPhone" :placeholder="baseInfo.emergencyPhone"></el-input>
</el-form-item>
<span>快递公司:</span>
<span>{{baseInfo.expressCode}}</span><br/>
<span>产品型号:</span>
<span>{{baseInfo.productType}}</span><br/>
<span>寄送运单号:</span>
<span>{{baseInfo.trackingNo}}</span><br/>
<span>IMEI号码:</span>
<span>{{baseInfo.imei}}</span><br/>
 
 <div class="block">
    <span>购买日期:</span><br/>
    <el-date-picker
      v-model="orderTime"
      :placeholder="this.baseInfo.orderTime"
      type="date"
      :picker-options="pickerOptions0">
    </el-date-picker>
  </div>
    <el-form-item label="颜色">
    <el-input name="color" v-model="acceptForm.color" :placeholder="baseInfo.color"></el-input>
    </el-form-item>
    <span>外观情况:</span><br/>
   <el-select v-model="acceptForm.appearance" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-form-item label="外观详细描述:">
  <el-input name="appearanceInfo" v-model="acceptForm.appearanceInfo" :placeholder="baseInfo.apperanceInfo"></el-input>
</el-form-item>
 <div style="margin: 15px 0;"></div>
  <span>配件:</span><br/>

<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>

  <el-checkbox-group v-model="checkedParts" @change="handleCheckedPartsChange">
    <el-checkbox v-for="part in parts" :label="part" :key="part">{{part}}</el-checkbox>
  </el-checkbox-group>
  <el-form-item label="其他配件:">
  <el-input name="partsother" v-model="acceptForm.partsOther" :placeholder="baseInfo.partsOther"></el-input>
</el-form-item>

<el-form-item label="备注:">
  <el-input type="textarea" name="remark" v-model="acceptForm.remark"></el-input>
</el-form-item>

<span>客户故障描述:</span><div style="margin: 15px 0"></div>
<span class="left-margin" :v-model="baseInfo.troubleInfo" >{{baseInfo.troubleInfo}}</span>

</el-form>
<div slot="footer" >
<el-button @click="acceptDialog=false">取消</el-button>
<el-button type="primary" @click="accept">确定</el-button>
</div>
</el-dialog>

<el-dialog title="检测报告" v-model="orderCheckDialog" style="margin-top:-20px">
  <el-form :model="checkReportForm" ref="checkReportForm">
 <span>产品型号确认:</span>
  <el-select v-model="checkReportForm.productTypeCfm" placeholder="请选择">
    <el-option
      v-for="item in productTypeOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
 

<el-form-item label="产品型号:">
  <el-input name="productType" v-model="checkReportForm.productType" :placeholder="baseInfo.productType"></el-input>
</el-form-item>

<span>唯一码(IMEI)确认:</span>
  <el-select v-model="checkReportForm.imeiCfm" placeholder="请选择">
    <el-option
      v-for="item in imeiCfmOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>


<el-form-item label="IMEI号码:">
  <el-input name="imei" v-model="checkReportForm.imei" :placeholder="baseInfo.imei"></el-input>
</el-form-item>
<el-form-item label="故障原因确认：">
  <el-input name="causeInfo" v-model="checkReportForm.causeInfo" :placeholder="baseInfo.troubleInfo"></el-input>
</el-form-item>
 
  <span>服务类型判定:</span>
  <el-select v-model="checkReportForm.serviceType" placeholder="请选择">
    <el-option
      v-for="item in maintenanceOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>

  <div style="margin: 15px 0;"></div>
  <span>维修等级确认:</span>


  <el-checkbox-group v-model="repairLevels">
    <el-checkbox-button v-for="repairLevel in maintenanceLevelOptions" :label="repairLevel" :key="repairLevel">{{repairLevel}}</el-checkbox-button>
  </el-checkbox-group>

<div style="margin-top:20px"></div>
<!--图片上传-->
<span>上传照片大小不得超过5Mb，支持JPEG、PNG、GIF。最多上传五张。</span>
<div style="margin-top:10px"></div>

<el-upload
  name="upFile"
  action="/api/file/upload"
  list-type="picture-card"
  :drag="false"
  :file-list="partImageList"
  :on-success="uploadSuccess"
  :before-upload="beforeAvatarUpload"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<div style="margin-top:10px"></div>
<span>添加配件:</span>
<el-input
  placeholder="查询配件名称/编码"
  icon="search"
  v-model="accessories"
  :on-icon-click="handleIconClick">
</el-input>
<!--显示工单配件一览-->

<el-table
    :data="orderPartTableData"
    border
    style="width: 100%"
    @cell-mouse-leave="partNumCellClick"
    @cell-click="partNumCellClick">
    <el-table-column
      label="配件编码"
      width="180">
      <template scope="scope">
        <span style="margin-left: 10px">{{ scope.row.sku }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="货主"
      width="180">
      <template scope="scope">
        <span style="margin-left: 10px">{{ scope.row.owner }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="name"
      prop="enName"
      width="180">
    </el-table-column>
    <el-table-column
      label="数量"
      width="180">
    <template scope="scope">
        <el-input-number size="small" v-model="scope.row.orderPartNum" @change="orderPartNumChange"></el-input-number>
      </template>
    </el-table-column>
    <el-table-column
      label="价格"
      prop="price"
      width="180">
    </el-table-column>
    <el-table-column label="操作">
      <template scope="scope">
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-form-item label="收件运费:">
    <el-input v-model="checkReportForm.collectionCost"></el-input>
  </el-form-item>
    <el-form-item label="服务费用:">
    <el-input v-model="checkReportForm.repairCost"></el-input>
  </el-form-item>
    <el-form-item label="配件费用:">
    <el-input v-model="checkReportForm.partsCost" :disabled="true"></el-input>
  </el-form-item>
    <el-form-item label="寄件运费:">
    <el-input v-model="checkReportForm.mailingCost"></el-input>
  </el-form-item>

</el-form>
<div slot="footer" >
<el-button @click="orderCheckDialog=false">取消</el-button>
<el-button type="primary" @click="orderCheckCfm">确定</el-button>
</div>
</el-dialog>

<el-dialog title="质检报告" v-model="confirmReportDialog">
<el-form>


</el-form>
<div slot="footer" >
<el-button @click="confirmReportDialog=false">取消</el-button>
<el-button type="primary" @click="confirmReportSubmit">确定</el-button>
</div>
</el-dialog>

<el-dialog v-model="dialogVisible" size="tiny">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>

<el-dialog v-model="assPartsdialogVisible" size="small"><!--配件选取一览表-->
  <el-table
    ref="multipleTable"
    :data="PartInfoList"
    border
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="partHandleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="货主"
      width="120">
      <template scope="scope">{{ scope.row.owner }}</template>
    </el-table-column>
    <el-table-column
      prop="sku"
      label="配件编码"
      width="120">
    </el-table-column>
    <el-table-column
      prop="enName"
      label="name"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="cnName"
      label="配件名称"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="price"
      label="配件价格"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection()">取消选择</el-button>
    <el-button @click="assPartSelection()">确定</el-button>
  </div>
</el-dialog>

<el-collapse v-model="activeName" class="box-card3">
  <el-collapse-item title="产品检测" name="4">
    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
  </el-collapse-item>
  <el-collapse-item title="产品质检" name="5">
    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
  </el-collapse-item>
  <el-collapse-item title="结算" name="6">
    <div>简化流程：设计简洁直观的操作流程；</div>
    <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
    <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
  </el-collapse-item>
  <el-collapse-item title="发货信息" name="7">
    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
  </el-collapse-item>
</el-collapse>

</div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getBaseInfo, updateBaseInfo } from 'api/baseInfo';
import { getPartInfoList } from 'api/partManage';
import { checkReportUpdate } from 'api/report';
import moment from 'moment';
// import bootstrap from 'bootstrap';

const partOptions = ['包装盒', '数据线', '适配器'];

export default {
  data() {
		return {
      // orderPartNum: 0,
      partImageList: [{ name: '1.jpg', url: 'http://localhost:8000/20170726150509512.jpg' }, { name: '2.jpg', url: 'http://localhost:8000/20170726150509512.jpg' }], // 配件图像列表初始利用
      assPartsSelectArray: [],
      uploadFileCnt: 1,
      dialogImageUrl: '',
      dialogVisible: false,
      assPartsdialogVisible: false,
      repairLevels: ['L0'], // 维修服务选择
      orderTime: '',
      accessories: '', // 配件查询key
      acceptForm: { // 保存Form
        orderNumber: this.$route.params.orderNumber,
        emergencyName: '',
        emergencyPhone: '',
        orderTime: '',
        color: '',
        appearance: '',
        partsStatus: '',
        repairId: '',
        partsOther: '',
        appearanceInfo: '',
        remark: ''
      },
      checkReportForm: { // 保存Form
        productType: '',
        productTypeCfm: 'true',
        imei: '',
        imeiCfm: 'true',
        causeInfo: '',
        serviceType: '',
        repairLevel: [],
        collectionCost: 0,
        partsCost: 0,
        mailingCost: 0,
        repairCost: 0,
        photoGrpurl: [], // 图片url
        updateUser: '',
        createUser: '',
        orderNumber: this.$route.params.orderNumber,
        // 配件列表
        orderPartList: []
      },
      orderPartTableData: [], // 工单配件
      pickerOptions0: {
        // 无效时间限定
        // disabledDate(time) {
        //   return time.getTime() < Date.now() - 8.64e7;
        // }
      },
      searchValue: '',
      stepActive: 2,
      acceptDialog: true, // 受理工单
      orderCheckDialog: false, // 检测工单
			activeName: ['1', '2', '3'],
			baseInfo: {},
      PartInfoList: [{}], // 配件一览表
      orderNumber: this.$route.params.orderNumber,
      maintenanceOptions: [{
        value: '保内维修',
        label: '保外维修'
      }, {
        value: '保外维修',
        label: '保外维修'
      }],
     productTypeOptions: [{
        value: 'true',
        label: '型号匹配'
      }, {
        value: 'false',
        label: '型号不匹配'
      }],
      maintenanceLevelOptions: ['L0', 'L1', 'L2', 'L3'],
      imeiCfmOptions: [{
        value: 'true',
        label: '一致'
      }, {
        value: 'false',
        label: '不一致'
      }],
      options: [{
          value: '外观完好',
          label: '外观完好'
        }, {
          value: '外观破损',
          label: '外观破损'
        }],
    // value: '外观完好',
      checkAll: true,
      checkedParts: [],
      parts: partOptions,
      isIndeterminate: true
		}
	},
	created() {
    this.fetchData();
    this.imageUploadCompute();
	},
	computed: {
		...mapGetters([
          'name',
          'avatar',
          'email',
          'uid',
          'introduction',
          'roles'
		])
	},
	methods: {
		fetchData() {
				getBaseInfo(this.orderNumber).then(response => {
					this.baseInfo = response.data;
        })
    },
    imageUploadCompute() {
      this.uploadFileCnt = this.partImageList.length + 1;
      console.log('uploadFileCnt------------->' + this.uploadFileCnt);
      // 既存url保存
      let imageUploadItem;
      for (imageUploadItem of this.partImageList) {
          this.checkReportForm.photoGrpurl.push(imageUploadItem.url);
      }
    },
    searchPartInfoList() {
      getPartInfoList(this.accessories).then(response => { // 配件信息获取
          this.PartInfoList = response.data;
      })
    },
    handleIconClick() { // 配件查询
        this.searchPartInfoList();
        this.assPartsdialogVisible = true;
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
    assPartSelection() {
        // 默认数量追加

        let orderPart;
        for (orderPart of this.orderPartTableData) {
          let assPartSelect;
          for (assPartSelect of this.assPartsSelectArray) {
            if (assPartSelect.owner === orderPart.owner && assPartSelect.sku === orderPart.sku) {
              this.$message.error('选中的配件已追加,请直接修改数量!');
              this.assPartsSelectArray = [];
              return;
            }
          }
        }

        // Array.prototype.push.apply(this.orderPartTableData, this.assPartsSelectArray); //刷新触发不能
        this.orderPartTableData = [...this.orderPartTableData, ...this.assPartsSelectArray];

        // 配件总价计算(追加)
        let priceCountItem;
        let partPriceSumTmp = 0;
        for (priceCountItem of this.orderPartTableData) {
            partPriceSumTmp += Number.parseFloat(priceCountItem.price) * Number.parseInt(priceCountItem.orderPartNum);
        }
        this.checkReportForm.partsCost = partPriceSumTmp;

        this.assPartsdialogVisible = false;
        console.log('-------confirm--------');
    },
    partHandleSelectionChange(val) {
        console.log('---------part----------');
        console.dir(val);

        let item;
        for (item of val) {
            this.$set(item, 'orderPartNum', 1);
            console.log(item.orderPartNum);
        }

        this.assPartsSelectArray = val;
    },
    handleDelete(index, row) {
        this.orderPartTableData.splice(index, 1);

        // 配件总价计算(删除)
        let priceCountItem;
        let partPriceSumTmp = 0;
        for (priceCountItem of this.orderPartTableData) {
            partPriceSumTmp += Number.parseFloat(priceCountItem.price) * Number.parseInt(priceCountItem.orderPartNum);
        }
        this.checkReportForm.partsCost = partPriceSumTmp;

        console.log(index, row);
      },
    orderCheckCfm() {
        console.log('配件数目!!!');
        // let item;
        // for (item of this.orderPartTableData) {
        //     console.log(item.orderPartNum);
        // }

        // array.forEach(this.orderPartTableData => {
        //   this.checkReportForm.orderPartList.add();
        //   });
        // 赋值清空
        this.checkReportForm.orderPartList = [];
        this.orderPartTableData.forEach(function(element) {
          const orderPartItem = { partCode: '', partCnt: 0, orderNumber: '', owner: '' };
          orderPartItem.partCode = element.sku;
          orderPartItem.partCnt = element.orderPartNum;
          orderPartItem.orderNumber = this.$route.params.orderNumber;
          orderPartItem.owner = element.owner;
          this.checkReportForm.orderPartList.push(orderPartItem);
        }, this);
        this.checkReportForm.repairLevel = this.repairLevels;
        console.dir(this.checkReportForm.orderPartList);

        // 提交 checkeForm
        checkReportUpdate(this.checkReportForm).then(response => {
          if (response.data.status === '0') {
              this.$message.info('保存成功!');
              this.stepActive = 4;
              this.orderCheckDialog = false;
          } else {
              this.$message.error(response.data.message);
          }
          console.dir(response);
        })
      },
      orderPartNumChange(val, index) {
        // console.log('orderPartNumChangeorderPartNumChangeorderPartNumChangeorderPartNumChange');
        // console.log(val);
         console.log('index:->' + index);
        //  // 配件总价计算(变化)
        // let priceCountItem;
        // let partPriceSumTmp = 0;
        // for (priceCountItem of this.orderPartTableData) {
        //     console.log('orderPartNum---->' + priceCountItem.orderPartNum);
        //     partPriceSumTmp += Number.parseFloat(priceCountItem.price) * Number.parseInt(priceCountItem.orderPartNum);
        // }
        // this.checkReportForm.partsCost = partPriceSumTmp;
      },
      partNumCellClick(row) {
        console.log('rowrowrowrowrowrow');
        console.dir(row);

        // 遍历配件数量赋值
        // 配件总价计算(变化)
        let priceCountItem;
        let partPriceSumTmp = 0;
        for (priceCountItem of this.orderPartTableData) {
            console.log('orderPartNum---->' + priceCountItem.orderPartNum);
            // 价格在赋值
            if (priceCountItem.sku === row.sku && priceCountItem.owner === row.owner) {
                  priceCountItem.orderPartNum = row.orderPartNum;
            }
            partPriceSumTmp += Number.parseFloat(priceCountItem.price) * Number.parseInt(priceCountItem.orderPartNum);
        }
        this.checkReportForm.partsCost = partPriceSumTmp;
      },
      confirmReportSubmit() {
        // TODO
      },
       f() {
         alert('hello');
         // 设置value
         this.$set(this.checkReportForm.orderPartList, 'partCode', '00001');
         // console.log('aaaaaabbbbbbbbb');
    },
      handleRemove(file, fileList) {
        this.uploadFileCnt--;
        this.checkReportForm.photoGrpurl = [];
        console.log('handleRemovehandleRemove1111111111111');
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
        console.log('handleRemovehandleRemove2222222222222');
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      uploadSuccess(response, file) {
        if (response.status === '0') {
          console.log(this.uploadFileCnt);
            this.uploadFileCnt++;
            this.checkReportForm.photoGrpurl.push(response.url);
        }
        console.log('aaaaaaaa');
        console.dir(response);
        console.dir(this.checkReportForm.photoGrpurl);
        console.dir(file);
        console.log('bbbbbbbb');
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 5;
        const isCanUpload = this.uploadFileCnt <= 5;
        if (!isCanUpload) {
          this.$message.error('最多只能上传5张图片!');
        }
        if (!isJPG) {
          this.$message.error('上传图片格式不正确!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 5MB!');
        }
        return isJPG && isLt2M && isCanUpload;
      },
     handleCheckAllChange(event) {
        this.checkedParts = event.target.checked ? partOptions : [];
        this.isIndeterminate = false;
        this.acceptForm.partsStatus = this.checkedParts.toString();
      },
      handleCheckedPartsChange(value) {
        console.log('aaaaabbbbb---->>>' + value);
        // 修改不要
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.parts.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.parts.length;
        this.acceptForm.partsStatus = value.toString();
      },
      toAccept() {
        if (this.stepActive >= 2) {
          this.acceptDialog = true;
        }
      },
      toCheck() {
        if (this.stepActive >= 3) {
          this.orderCheckDialog = true;
        }
      },
      accept() {
        this.acceptForm.orderTime = moment(this.orderTime).format('YYYY-MM-DD HH:mm:ss');
        this.acceptForm.repairId = this.baseInfo.repairId;
        updateBaseInfo(this.acceptForm).then(response => {
          console.dir(this.acceptForm);
          if (response.data.status === '1') {
            // 异常
            this.$message.error('受理失败!异常信息:' + response.data.message);
          } else if (response.data.status === '0') {
            this.$message.info('受理成功');
            this.stepActive = 3;
          }
          console.dir(response);
          this.baseInfo = response.data.rsltData;
        });
        this.acceptDialog = false;
      },
      handleSearch() {
        console.log(this.searchValue);
      }
	}
}
</script>

<style>
.text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }

  .box-card {
		width: 20%;
		float: left;
	}
	
	.box-card2 {
		padding-top: 20px;
		padding-left: 2%;
		width: 80%;
		float: left;
		height: 50%;
	}
		.box-card3 {
		padding-top: 20px;
		padding-left: 2%;
		width: 80%;
		float: left;
		height: 50%;
  }
   .left-margin{
     margin-left: 15px;
   }


   .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
