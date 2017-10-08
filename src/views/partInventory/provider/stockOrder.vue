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
                      <input type="text" class="form-control" v-model="listQuery.stockOrderNumber" maxlength="" :placeholder="$t('stockOrder.searchplaceholder')" name="number" @keydown="handleSerachEnter($event)"></div>
                  </div>                 
                 
                  <div class="pull-right">
                  <div class="top-menu">
                    <!--<ul class="nav navbar-nav pull-right" style="position:absolute;right:120px;">
                      <li class="dropdown">
                          <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-close-others="true" title="">
                            <i class="icon-add"></i>
                          </a>
                          <ul class="dropdown-menu dropdown-menu-default dropdown_add">
                            <li>
                              <a href="javascript:;"><i class="icon-doc"></i>新建备件申请</a>
                              <a class="icon-doc" href="#orderInfo" data-toggle="modal" v-if="providerType == 'B'"><i class="icon-doc"></i>{{$t('order.NewWorkOrder')}}</a>
                            </li>
                          </ul>
                      </li>
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
	            <h2 class="">{{$t('stockOrder.title')}}</h2>
	            <div class="order_list_menu ">
	            	<div class="pull-right order_list_top">
                        <form>	                 
                            <el-select clearable v-model="listQuery.searchValue" :placeholder="$t('stockOrder.owner')" @change="handlesearchByOwner" size="small">
                                <el-option
                                v-for="item in ownerOptions"
                                :key="item.owner"
                                :label="item.owner"
                                :value="item.owner"
                                >
                                </el-option>
                            </el-select>
                             <el-select clearable v-model="listQuery.productType"  :placeholder="$t('inventory.inventoryType')" @change="handlesearchByProviderCode" size="small">
                                <el-option
                                v-for="item in productTypeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                >
                                </el-option>
                            </el-select> 
                            <el-select clearable v-model="listQuery.orderType" :placeholder="$t('stockOrder.orderType')" @change="handlesearchByOrderType" size="small">
                                <el-option
                                v-for="item in orderTypeOptions"
                                :key="item.name"
                                :label="item.name"
                                :value="item.name"
                                >
                                </el-option>
                            </el-select>
                            <el-select clearable v-model="listQuery.inOutType" :placeholder="$t('stockOrder.inOutType')" @change="handlesearchByInOutType" size="small">
                                <el-option
                                v-for="item in inOutTypeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                >
                                </el-option>
                            </el-select>
                            <el-date-picker
                                v-model="listQuery.createDate"
                                type="daterange"
                                size="small"
                                :placeholder="$t('order.daterange')"
                                @change="handlesearchByCreateDate"
                              >
                              </el-date-picker>
                            <a class="btn btn-primary" @click="handleExpStockOrder">{{$t('export')}}</a>
                            <!-- <a class="btn btn-primary">新建</a> -->
                        </form>
	                </div>
	            </div>
	</div>
    <el-table ref="partInventoryTable"  :data="list" v-loading.body="listLoading"  style="margin-top:5px;width: 100%" @sort-change="handTableSort" @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="35">
      </el-table-column>
      <el-table-column  min-width="10%" align="center" :label="$t('stockOrder.odrNumber')" prop="owner" >
        <template scope="scope">
          <span>{{scope.row.odrNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column  min-width="10%" align="center" :label="$t('stockOrder.owner')" prop="owner" >
        <template scope="scope">
          <span>{{scope.row.owner}}</span>
        </template>
      </el-table-column>

        <el-table-column min-width="10%" align="center" :label="$t('stockOrder.productType')" >
        <template scope="scope">
          <span>{{scope.row.productType | productTypeFilter}}</span>
        </template>
      </el-table-column> 

      <el-table-column min-width="10%" :label="$t('stockOrder.orderType')" >
        <template scope="scope">
          <span>{{scope.row.orderType}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="10%" align="center" :label="$t('stockOrder.inOutType')">
        <template scope="scope">
          <span>{{scope.row.inOutType | inOutTypeFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="10%" align="center" :label="$t('stockOrder.shippingFrom')">
        <template scope="scope">
          <span>{{scope.row.shippingFrom}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="10%" align="center" :label="$t('stockOrder.shippingTo')">
        <template scope="scope">
          <span>{{scope.row.shippingToName}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="14%" align="center" :label="$t('stockOrder.createDate')">
        <template scope="scope">
          <span>{{scope.row.createDate}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="8%" align="center" :label="$t('stockOrder.createUserName')">
        <template scope="scope">
          <span>{{scope.row.createUserName}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="8%" align="center" :label="$t('stockOrder.viewDetail')">
        <template scope="scope">
          <a  herf="javascript:viod(0);" class="icon_check" @click="handleViewStockOrderDetail(scope.row.stockOrderNumber)"></a>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageNum"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" layout="total,sizes,prev, pager, next" :total="total">
      </el-pagination>
    </div>
    <stockOrderDetail ref="stockOrderDetail"> </stockOrderDetail>
</div>
</template>
<script>
import {parseTime} from 'utils/index';
import {getOwnerList} from 'api/providerOwnerMapping';
import { getStockOrderList ,expStockOrder} from 'api/stockOrderMgr';
import rightButtonChild from './../../layout/rightButtonChild';
import stockOrderDetail from './stockOrderDetail';
import Vue from 'vue';

export default {
    name : 'orderMgr',
    components: {rightButtonChild ,stockOrderDetail},
    data() {
        return {
        list: null,
        total :null,
        listLoading: true,
        listQuery: {
            pageNum: 1,
            pageSize: 10,
            stockOrderNumber : '',
            searchValue : '',
            orderType : '',
            productType : '',
            inOutType : '',
            createDate : [],
            sortName: 'createDate',
            sortOrder: 'desc'
      },
      ids :'',
      stockOrders : [],
      productTypeOptions :this.$t('stockOrder.productTypeOptions'),
      inOutTypeOptions : this.$t('stockOrder.inOutTypeOptions'),
      orderTypeOptions : this.$t('stockOrder.orderTypeOptions'),
      providerType :'',
      ownerOptions: [],
      stockOrderNumber : ''
    }
    },
    beforeCreate(){
    const _this = this;
     Vue.filter('productTypeFilter', function(val) {
            var productTypeName  = '';
            _this.productTypeOptions.forEach(function (item) {
                    if(item.value == val){
                        productTypeName =  item.label;
                  }
          　　　});
                  return productTypeName;
      });
      Vue.filter('inOutTypeFilter', function(val) {
            var inOutTypeName  = '';
            _this.inOutTypeOptions.forEach(function (item) {
                    if(item.value == val){
                        inOutTypeName =  item.label;
                  }
          　　　});
                  return inOutTypeName;
      });
  },
    created() {
        const _this = this;
        _this.getList();
        _this.getOwnerList();

    },
    methods: {
        getList() {
          this.listLoading = true;
          getStockOrderList(this.listQuery).then(response => {
              this.list = response.data.list;
              this.total = response.data.total;
              this.listLoading = false;
          })
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
            this.stockOrders = rows;
            this.ids = [];
            rows.forEach(row => {
                this.ids.push(row.orderNumber);
            });
        },
        handleSearch(){
            this.getList();
        },
        handleSerachEnter(ev){
          if(ev.keyCode == 13){
              this.getList();
          }
        },
        handlesearchByProviderCode(val){
          this.listQuery.productType = val;
          this.getList();
        },
        handlesearchByOwner(val){
          this.listQuery.owner = val;
          this.getList();
        },
        handlesearchByOrderType(val){
          this.listQuery.orderType = val;
          this.getList();
        },
        handlesearchByInOutType(val){
          this.listQuery.inOutType = val;
          this.getList();
        },
        handlesearchByCreateDate(val){
          if(this.listQuery.createDate[0] == null || this.listQuery.createDate[0] == ''){
            this.listQuery.createStartDate ='';
          }else{
            this.listQuery.createStartDate = parseTime(this.listQuery.createDate[0],'{y}-{m}-{d}');
          }
          if(this.listQuery.createDate[1] == null || this.listQuery.createDate[1] == ''){
            this.listQuery.createEndDate = '';
          }else{
            this.listQuery.createEndDate = parseTime(this.listQuery.createDate[1],'{y}-{m}-{d}');
          }
          this.getList();
        },
        handleViewStockOrderDetail(stockOrderNumber){
            // console.dir(sku+"    "+providerCode+"            "+owner);
           // this.$router.push({ path: '/partInventory/provider/stockOrderDetail/'+stockOrderNumber});
          this.$refs.stockOrderDetail.dialogStockOrderDetail = true;
          this.$refs.stockOrderDetail.listQuery.stockOrderNumber = stockOrderNumber;
          this.$refs.stockOrderDetail.getList();
        },
        getOwnerList(){
             let params = {};
             params.providerCode = this.$store.getters.providerCode
             getOwnerList(params).then(response => {
                this.ownerOptions = response.data;
            });
        },
        handleExpPartInventory(){
            console.dir('handleExpPartInventory')
        },
        handleExpStockOrder(){
          let expList ;
         if(this.stockOrders.length>0){
            expList = this.stockOrders;
            this.expStockOrder(expList);
          }else{
            expStockOrder(this.listQuery).then(response => {
              expList = response.data;
              this.expStockOrder(expList);
            })
          }
        },
        expStockOrder(expList){
            expList.map(obj => this.productTypeOptions.map(function (item) {
                          if(item.value == obj.productType){
                            obj.productType =  item.label;
                          }
        　　　       }));
                  require.ensure([], () => {
                    const { export_json_to_excel } = require('vendor/Export2Excel');
                    var tHeader;
                    var filterVal;

                        tHeader = [this.$t('stockOrder.odrNumber'), this.$t('stockOrder.owner'),this.$t('stockOrder.productType'),this.$t('stockOrder.orderType'),
                        this.$t('stockOrder.inOutType'), this.$t('stockOrder.shippingFrom'), this.$t('stockOrder.shippingTo'), this.$t('stockOrder.createDate'), this.$t('stockOrder.createUserName')];
                        filterVal = ['odrNumber', 'owner','productType','orderType','inOutType','shippingFrom','shippingTo','createDate','createUserName'];
                    
                    const data = this.formatJson(filterVal, expList);
                    export_json_to_excel(tHeader, data, this.$t('stockOrder.title')+'  '+parseTime(new Date()));
                  })
        },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
    }
}


</script>

<style>

.el-input__inner {
    border: 1px solid #d4d8ec;
    border-radius: 10px!important;
    color: #555;
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
</style>
<style scoped>
  @import '/static/css/bootstrap.min.css';
  @import '/static/css/layout.css';
  @import '/static/css/custom.css';
  @import '/static/css/default.css';
  @import '/static/css/style.css';
</style>