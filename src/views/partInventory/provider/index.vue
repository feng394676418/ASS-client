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
                      <input type="text" class="form-control" v-model="listQuery.searchValue" maxlength="" :placeholder="$t('part.entersparepartcode')" name="number" @keydown="handleSerachEnter($event)"></div>
                  </div>                 
                 
                  <div class="pull-right">
                  <div class="top-menu">
                    <!-- <ul class="nav navbar-nav pull-right" style="position:absolute;right:120px;">
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
	            <h2 class="">{{$t('inventory.title')}}</h2>
	            <div class="order_list_menu ">
	            	<div class="pull-right order_list_top">
                        <form>	                 
                            <el-select clearable v-model="listQuery.searchCode" :placeholder="$t('inventory.owner')" @change="handlesearchByProviderCode" size="small">
                                <el-option
                                v-for="item in ownerOptions"
                                :key="item.owner"
                                :label="item.owner"
                                :value="item.owner"
                                >
                                </el-option>
                            </el-select>
                            
                            <el-select clearable v-model="listQuery.inventoryType"  :placeholder="$t('inventory.inventoryType')" @change="handlesearchByInventoryType" size="small">
                                <el-option
                                v-for="item in productTypeOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                >
                                </el-option>
                            </el-select>

                            <a class="btn btn-primary" @click="handleExpPartInventory">{{$t('export')}}</a>
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
      <el-table-column  min-width="15%" align="center" :label="$t('inventory.owner')" prop="owner" sortable="custom">
        <template scope="scope">
          <span>{{scope.row.owner}}</span>
        </template>
      </el-table-column>

       <el-table-column min-width="15%" align="center" :label="$t('inventory.inventoryType')" prop="inventoryType" sortable="custom">
        <template scope="scope">
          <span>{{scope.row.inventoryType | productTypeFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="15%" :label="$t('inventory.sku')" prop="sku" sortable="custom">
        <template scope="scope">
          <span>{{scope.row.sku}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="25%" align="center" :label="$t('inventory.name')">
        <template scope="scope">
          <span>{{scope.row.enName}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="10%" align="center" :label="$t('inventory.unit')">
        <template scope="scope">
          <span>{{scope.row.unit}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="10%" align="center" :label="$t('inventory.qty')">
        <template scope="scope">
          <span>{{scope.row.availableNum}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="15%" align="center" :label="$t('inventory.checkTime')">
        <template scope="scope">
          <span>{{scope.row.createDate}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="10%" align="center" :label="$t('inventory.ViewSerial')">
        <template scope="scope">
          <a  herf="javascript:viod(0);" class="icon_check" @click="handleViewInventoryChange(scope.row.sku,scope.row.providerCode,scope.row.owner,scope.row.inventoryType)"></a>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageNum"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" layout="total,sizes,prev, pager, next" :total="total">
      </el-pagination>
    </div>
</div>
</template>
<script>
import {getPartInventoryList,expPartInventory } from 'api/partInventoryMgr';
import {parseTime} from 'utils/index';
import rightButtonChild from './../../layout/rightButtonChild';
import {getOwnerList} from 'api/providerOwnerMapping';
import Vue from 'vue';

export default {
    name : 'orderMgr',
    components: {rightButtonChild },
    data() {
        return {
        list: null,
        total :null,
        listLoading: true,
        listQuery: {
            pageNum: 1,
            pageSize: 10,
            searchValue: '',
            searchCode : '',
            inventoryType: '',
            sortName: 'createDate',
            sortOrder: 'desc'
      },
      ids :'',
      partInventorys : '',
      productTypeOption :this.$t('stockOrder.productTypeOptions'),
      providerType :'',
      providerOptions: [],
      ownerOptions : []
    }
    },
    beforeCreate(){
        const _this = this;
    },
    created() {
        const _this = this;
        
        _this.getList();
        _this.providerCode = _this.$store.getters.providerCode;
        _this.providerType = _this.providerCode.substr(0, 1);
       // _this.getProviderList();
        _this.getOwnerList(_this.providerCode);

        Vue.filter('productTypeFilter', function(val) {
          var productTypeName  = '';
          _this.productTypeOption.forEach(function (item) {
            if(item.value == val || item.label == val){
              productTypeName =  item.label;
            }
          });
          return productTypeName;
      });
    },
    methods: {
        handleSearch(){
          this.getList();
        },
        handleSerachEnter(ev){
          if(ev.keyCode == 13){
              this.getList();
          }
        },
        getList() {
          this.listLoading = true;
          getPartInventoryList(this.listQuery).then(response => {
              this.list = response.data.list;
              this.total = response.data.total;
              this.listLoading = false;
          })
        },
        getOwnerList(providerCode){
          let params = {};
          params.providerCode = providerCode;
          getOwnerList(params).then(response => {
              this.ownerOptions = response.data;
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
            this.partInventorys = rows;
            this.ids = [];
            rows.forEach(row => {
                this.ids.push(row.orderNumber);
            });
        },
        handlesearchByProviderCode(val){
          this.getList();
        },
        handlesearchByInventoryType(val){
          this.listQuery.inventoryType = val;
          this.getList();
        },
        handleViewInventoryChange(sku,providerCode,owner,inventoryType){
            let inventoryTypeName= '';
            this.productTypeOption.forEach(function (item) {
                    if(item.value == inventoryType){
                        inventoryTypeName =  item.label;
                  }
          　});
            this.$router.push({ path: '/partInventory/provider/change/index/'+sku+"/"+owner+"/"+providerCode+"/"+inventoryType+"/"+inventoryTypeName });
        },
        getProviderList(){
             const providerQuery = {};
            //  if(this.providerType == 'C'){
            //    providerQuery.searchValue = 'B';
            //  }
            //  if(this.providerType == 'B'){
            //    providerQuery.searchValue = 'C';
            //  }
            //  providerQuery.searchValue = 'C';
            //  getOwnerList(providerQuery).then(response => {
            //     this.providerOptions = response.data;
            // })
        },
         handleExpPartInventory(){
          var expList;
          if(this.partInventorys.length>0){
            expList = this.partInventorys;
            this.expPartInventory(expList);
          }else{
            expPartInventory(this.listQuery).then(response => {
              expList = response.data;
              this.expPartInventory(expList);
            })
          }
        },
        expPartInventory(expList){
          expList.map(obj => this.productTypeOption.map(function (item) {
            if(item.value == obj.inventoryType){
                obj.inventoryType =  item.label;
            }
    　　　 }));
            require.ensure([], () => {
                const { export_json_to_excel } = require('vendor/Export2Excel');
                var tHeader;
                var filterVal;

                tHeader = [this.$t('inventory.owner'), this.$t('inventory.inventoryType'),this.$t('inventory.sku'),this.$t('inventory.name'),
                this.$t('inventory.unit'), this.$t('inventory.qty')];
                filterVal = ['owner', 'inventoryType','sku','enName','unit','availableNum'];
                
                const data = this.formatJson(filterVal, expList);
                export_json_to_excel(tHeader, data, this.$t('inventory.title')+'  '+parseTime(new Date()));
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