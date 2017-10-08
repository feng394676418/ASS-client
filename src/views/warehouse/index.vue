<template>
  <div class="app-container calendar-list-container page-content">
    <div class="Sharing_head">
      <div class="page-header navbar">
        <div class="page-header-inner">
          <div class="search-form search-form-expanded">
            <div class="input-group">
              <span class="input-group-btn">
                <a href="javascript:;" class="btn submit">
                  <i class="icon-search" @click="handleSearch()"></i>
                </a>
              </span>
              <input type="text" class="form-control" v-model="listQuery.searchValue" maxlength="" :placeholder="$t('Warehouse.enterwarehousecode')" name="number" @keydown="handleSerachEnter($event)"></div>
            </div>                 
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
                  <li><rightButtonChild></rightButtonChild></li>
                </ul>
              </div>                    
            </div>
          </div>
        </div>
      </div>

      <div id="top_menu">
	      <h2 class="order_list_menu">{{$t('Warehouse.WarehouseList')}}</h2>
        <!--<div class="order_list_menu ">
          <div class="pull-right order_list_top">              
              <button class="btn btn-primary btn-lg" data-toggle="modal" @click="handleAddWarehouse()">新建仓库</button>
              <button class="btn btn-primary btn-lg" data-toggle="modal" @click="handleEditWarehouse()">修改仓库</button>
              <button class="btn btn-primary btn-lg" data-toggle="modal" @click="handleEnable()">启用</button>
              <button class="btn btn-primary btn-lg" data-toggle="modal" @click="handleDisable()">禁用</button>
            </div>
        </div>-->
	    </div>
    
    <el-table ref="orderTable" :data="list" v-loading.body="listLoading" border fit highlight-current-row style="margin-top:5px;width: 100%" @sort-change="handTableSort" @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="35">
      </el-table-column>
      <el-table-column align="center" :label="$t('stockOrder.detail.serialNo')" min-width = "8%">
        <template scope="scope">
          <span>{{scope.$index+1+(listQuery.pageNum-1)*listQuery.pageSize}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('Warehouse.Warehousecode')" prop="refNumber" min-width = "12%">
        <template scope="scope">
          <span>{{scope.row.code}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('Warehouse.Englishname')" min-width = "13%">
        <template scope="scope">
          <span>{{scope.row.enname}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('Warehouse.Chinesename')" min-width = "15%">
        <template scope="scope">
          <span>{{scope.row.cnname}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('Warehouse.Shipper')" min-width = "10%">
        <template scope="scope">
          <span>{{scope.row.owner}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('order.tel')" min-width = "10%">
        <template scope="scope">
          <span>{{scope.row.phone}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('order.country')" prop="imei" min-width = "10%">
        <template scope="scope">
          <span>{{scope.row.country}}</span> 
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('order.province')" min-width = "10%">
        <template scope="scope">
          <span>{{scope.row.province}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('order.city')" min-width = "12%">
        <template scope="scope">
          <span>{{scope.row.city}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('order.address')" min-width = "15%">
        <template scope="scope">
          <span>{{scope.row.address}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('Warehouse.status')" prop="createDate" min-width = "8%">
        <template scope="scope">
          <el-tag :type="scope.row.enable | statusTagFilter">{{scope.row.enable  | statusFilter}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('Warehouse.Modifypeople')" prop="createDate" min-width = "10%">
        <template scope="scope">
          <span>{{scope.row.updateuser}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('Warehouse.Changethetime')" prop="createDate" sortable="custom" min-width = "15%">
        <template scope="scope">
          <span>{{scope.row.updatedate}}</span>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNum"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next" :total="total">
      </el-pagination>
    </div>  

    <div class="modal fade" id="warehouseModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="cancelMyModal()">&times;</button>
            <h5 class="modal-title">{{$t('Warehouse.NewWarehouse')}}</h5>
          </div>
          <div class="modal-body">
            <div class="order_detection main_form_input">
              <div class="panel-body">
              <form role="form" ref="orderForm">
                <div class="form-group col-md-6">
                  <label for="">{{$t('Warehouse.Warehousecode')}}</label>
                  <input class="form-control" id="code" alt='verifyWarehouseForm' placeholder="" type="text" v-verify-input:nonvoid ="{id:'code',format:true,title:$t('Warehouse.Warehousecode')}" v-model="warehouse.code" >
                  <div v-verify-msg:code></div>
                </div>
                <div class="form-group col-md-6">
                  <label for="">{{$t('Warehouse.WarehouseShortCode')}}</label>
                  <input class="form-control" id="shortcode" alt='verifyWarehouseForm' maxLength='2' placeholder="" type="text" v-verify-input:nonvoid ="{id:'shortcode',format:true,title:$t('Warehouse.WarehouseShortCode')}" v-model="warehouse.shortcode" >
                  <div v-verify-msg:shortcode></div>
                </div>
                <div class="form-group col-md-6">
                  <label for="">{{$t('Warehouse.Englishname')}}</label>
                  <input class="form-control" id="" placeholder="" type="text" v-model="warehouse.enname">
                </div>
                <div class="form-group col-md-6">
                  <label for="">{{$t('Warehouse.Chinesename')}}</label>
                  <input class="form-control" id="" placeholder="" type="text" v-model="warehouse.cnname">
                </div>
                <div class="form-group col-md-6">
                  <label for="">{{$t('order.country')}}</label>
                  <el-select v-model="warehouse.country" id="country" :placeholder="$t('order.choose')" size="small" class="select_list form-control" @change="countyChange">
                    <el-option v-for="item in countryList" :key="item.sortname" :label="item.name" :value="item">
                    </el-option>
                  </el-select>
                </div>
                <div class="form-group col-md-6">
                  <label for="">{{$t('order.province')}}</label>
                  <el-select v-model="warehouse.province" id="province" :placeholder="$t('order.choose')" size="small" class="select_list form-control" @change="stateChange">
                    <el-option v-for="item in stateList" :key="item.sortname" :label="item.name" :value="item">
                    </el-option>
                  </el-select>
                </div>
                <div class="form-group col-md-6">
                  <label for="">{{$t('order.city')}}</label>
                  <el-select v-model="warehouse.city" id="city" :placeholder="$t('order.choose')" size="small" class="select_list form-control">
                    <el-option v-for="item in cityList" :key="item.name" :label="item.name" :value="item.name">
                    </el-option>
                  </el-select>
                </div>
                <div class="form-group col-md-6">
                  <label for="">{{$t('Warehouse.Shipper')}}</label>
                  <el-select v-model="warehouse.owner" :placeholder="$t('Warehouse.selectshipper')" size="small" class="select_list form-control">
                    <el-option v-for="item in owners" :key="item.providerCode" :label="item.providerName" :value="item.providerCode">
                    </el-option>
                  </el-select>
                </div>
                <div class="form-group col-md-6">
                  <label for="">{{$t('order.tel')}}</label>
                  <input class="form-control" id="" placeholder="" type="text" v-model="warehouse.phone">
                </div>
                <div class="form-group col-md-6">
                  <label for="">{{$t('Warehouse.Overallintroduction')}}</label>
                  <input class="form-control" id="" placeholder="" type="text" v-model="warehouse.content">
                </div>
                <div class="form-group col-md-6">
                  <label for="">{{$t('Warehouse.SystemCODE')}}</label>
                  <input class="form-control" id="" placeholder="" type="text" v-model="warehouse.syscode">
                </div>
                <div class="form-group col-md-6">
                  <label for="">{{$t('order.address')}}</label>
                  <input class="form-control" id="" placeholder="" type="text" v-model="warehouse.address">
                </div>
                <div class="form-group col-md-12">
                  <label for="">{{$t('order.Detail.Note')}}</label>
                  <el-input type="textarea" id="remark" :rows="3" v-model="warehouse.remark"></el-input>
                </div>
              </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-cancel" @click="cancelMyModal">{{$t('order.Cancel')}}</button>
            <button class="btn btn-primary" v-verify-final-check:verifyWarehouseForm type="submit">{{$t('order.Affirm')}}</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import bootstrap from 'bootstrap';
  import { getOwnerList } from 'api/providerMgr';
  import rightButtonChild from './../layout/rightButtonChild';
  import Vue from 'vue';
  import { getWareHouseList, getCountryList, getStateList, getCityList, addWarehouse, getWarehouseByCode, updateWarehouse, handleEnable, handleDisable } from 'api/warehouseManage';
  export default {
  components: {rightButtonChild },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      statusOptions : this.$t('Warehouse.statusOptions'),
      listQuery: {
            pageNum: 1,
            pageSize: 10,
            searchValue: '',
            sortName: 'createDate',
            sortOrder: 'desc'
      },
      warehouse : {
        code : '',
        shortcode : '',
        enname : '',
        cnname : '',
        country : '',
        countrycode : '',
        province : '',
        provincecode : '',
        city : '',
        address : '',
        phone : '',
        owner : '',
        content : '',
        syscode : '',
        enable : '',
        remark : ''
      },
      countryList: [],
      stateList: [],
      cityList: [],
      isEdit : false,
      owners : [],
      warehouseCodes : [],
      updatestate: {
            codes: [],
            state: 0
      },
    }
  },
    beforeCreate(){
      let _this = this;
      Vue.filter('statusFilter', function(status) {
            let statusname = '';
            _this.statusOptions.forEach(item => {
            if (item.status.indexOf(status)>-1) {
                statusname = item.name;
            }
          });
            return statusname;
      });
  },
  created() {
        this.getList();
        this.getOwners();
        this.getCountry();
        this.$on('verifyWarehouseForm', function() {
          this.handSaveWarehouse();
        });
  },
  filters: {
    // statusFilter(enable) {
    //   const statusMap = {
    //         0: '禁用',
    //         1: '启用'
    //       };
    //       return statusMap[enable]
    //     },
    statusTagFilter(enable) {
      const statusMap = {
            0: 'success',
            1: 'gray'
          };
          return statusMap[enable]
        }
  },
  methods: {
    getList() {
          this.listLoading = true;
          getWareHouseList(this.listQuery).then(response => {
              this.list = response.data.list;
              this.total = response.data.total;
              this.listLoading = false;
          })
    },
    getCountry() {
          getCountryList().then(response => {
            if (response.data.status === '0') {
              this.countryList = response.data.rsltData;
            } else {
              this.$message.error(response.data.message);
            }
          })
    },
    countyChange(val){
      if(typeof(val)=='string'){
        return ;
      }
      this.warehouse.country = val.name;
      this.warehouse.countrycode = val.sortname;
      console.dir("countrycode="+this.warehouse.countrycode);
      getStateList(val.id).then(response => {
          this.warehouse.province = '';
          this.warehouse.provincecode = '';
          if (response.data.status === '0') {
              this.stateList = response.data.rsltData;
          } else {
              this.$message.error(response.data.message);
          }
      })
    },
    stateChange(val){
      if(typeof(val)=='string'){
        return ;
      }
      this.warehouse.province = val.name;
      this.warehouse.provincecode = val.sortname;
      console.dir("provincecode="+this.warehouse.provincecode);
      getCityList(val.id).then(response => {
          this.warehouse.city = '';
          if (response.data.status === '0') {
              this.cityList = response.data.rsltData;
          } else {
              this.$message.error(response.data.message);
          }
      })
    },
    handleSearch(val) {
          this.getList();
    },
    handleSerachEnter(ev){
          if(ev.keyCode == 13){
              this.getList();
          }
    },
    handleAddWarehouse(){
      $('#warehouseModal').modal('show');
    },
    handleEditWarehouse(){
        if(this.warehouseCodes.length!=1){
            this.$message.error(this.$t('Warehouse.awarehouseinformation'));
            return;
        }
        const code = this.warehouseCodes[0];
        getWarehouseByCode(code).then(response => {
              if(response.data.status=='0'){
                this.warehouse = response.data.wareHouseInfo;
                $('#warehouseModal').modal('show');
                this.isEdit = response.data.isEdit;
              }else{
                this.$message.error(response.data.message);
              }
          })
    },
    handSaveWarehouse() {
        if(this.isEdit){
            updateWarehouse(this.warehouse).then(response => {
              if(response.data.status=='0'){
                this.$message({
                    message: response.data.message,
                    type: 'success'
                });
                this.getList();
                $('#warehouseModal').modal('hide');
              }else{
                this.$message.error(response.data.message);
              }
          })
        }else{
          console.dir(this.warehouse);
          addWarehouse(this.warehouse).then(response => {
              if(response.data.status=='0'){
                this.$message({
                    message: response.data.message,
                    type: 'success'
                });
                $('#warehouseModal').modal('hide');
                this.getList();
              }else{
                this.$message.error(response.data.message);
              }
          })
        }
    },
    handleSizeChange(val) {
          this.listQuery.pageSize = val;
          this.getList();
    },
    handleCurrentChange(val) {
          this.listQuery.pageNum = val;
          this.getList();
    },
    handTableSort(val) {
          this.listQuery.sortName = val.prop;
          this.listQuery.sortOrder = val.order == "ascending" ? "asc" : "desc";
          this.getList();
    },
    handleSelectionChange(rows) {
          this.warehouseCodes = [];
          rows.forEach(row => {
             this.warehouseCodes.push(row.code);
          });
    },
    handleEnable(){
        if(this.warehouseCodes.length==0){
            this.$message.error(this.$t('Warehouse.warehouseinformation'));
            return;
        }
        handleEnable(this.warehouseCodes).then(response => {
              if(response.data.status=='0'){
                this.$message({
                    message: response.data.message,
                    type: 'success'
                });
                this.getList();
              }else{
                this.$message.error(response.data.message);
              }
          })
    },
    handleDisable(){
        if(this.warehouseCodes.length==0){
            this.$message.error(this.$t('Warehouse.warehouseinformation'));
            return;
        }
        handleDisable(this.warehouseCodes).then(response => {
              if(response.data.status=='0'){
                this.$message({
                    message: response.data.message,
                    type: 'success'
                });
                this.getList();
              }else{
                this.$message.error(response.data.message);
              }
          })
    },
    getOwners() {
      getOwnerList(this.$store.getters.providerCode).then(response => {
          this.owners = response.data;
      })
    },
    cancelMyModal(){
      $('#warehouseModal').modal("hide");
      this.warehouse.code = '';
      this.warehouse.shortcode = '';
      this.warehouse.enname = '';
      this.warehouse.cnname = '';
      this.warehouse.country = '';
      this.warehouse.countrycode = '';
      this.warehouse.province = '';
      this.warehouse.provincecode = '';
      this.warehouse.city = '';
      this.warehouse.owner = '';
      this.warehouse.phone = '';
      this.warehouse.content = '';
      this.warehouse.syscode = '';
      this.warehouse.address = '';
      this.warehouse.remark = '';
    }
  }
}
</script>


<style>
.el-date-editor--daterange.el-input{
 width: 190px
}
.el-input__inner {
    border: 1px solid #d4d8ec;
    border-radius: 10px!important;
    color: #555;
    line-height: 28px;
    font-size: 12px;
}
.el-input__icon{
  width: 30px;
}
.el-input__icon + .el-input__inner{
  padding-right: 28px;
}
.el-picker-panel{
  border-radius: 10px;
}
.el-select-dropdown{
  border-radius: 10px;
}
.navbar {
    margin-bottom: 0px!important;
}
.el-table th{
  background: #f7f8fd;
}

.el-table__footer-wrapper thead div, .el-table__header-wrapper thead div{
  background: none;
}
.el-table td, .el-table th.is-leaf{
  border: none;
}
.el-table td, .el-table th{
  height: 45px;
}
.el-table{
  border:none!important;
}
.el-pager li,.el-pagination .btn-next,.el-pagination .btn-prev,.el-pagination button.disabled{
  border-radius: 10px;
  border: 1px solid #e8ebfa;
  margin-right: 8px;  
}
.el-pager li.active + li{
  border-left: 1px solid #e8ebfa;
}
.el-pager li:last-child{
  border-right: 1px solid #e8ebfa;
}
.pagination-container{
  margin: 20px auto;
}
.el-pagination{
  width: 29%;
  margin: 0 auto;
}
.order_list_top .el-select input{
  width: 114px;
  margin-left: 8px;
}
.el-pagination .el-select .el-input input{
  line-height: 28px;
}
.el-table .cell{
  white-space:nowrap;
}
</style>
<style scoped>
  @import '/static/css/bootstrap.min.css';
  @import '/static/css/layout.css';
  @import '/static/css/custom.css';
  @import '/static/css/default.css';
  @import '/static/css/style.css';
</style>
