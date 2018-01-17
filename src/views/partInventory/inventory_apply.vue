<template>
  <div class="page-content">
<!--head below-->
            <div class="Sharing_head">
              <!-- BEGIN HEADER -->
              <div class="page-header navbar">
                <!-- BEGIN HEADER INNER -->
                <div class="page-header-inner">
                  <!-- END RESPONSIVE MENU TOGGLER -->
                  <div class="search-form search-form-expanded">
                    <div class="input-group">
                      <span class="input-group-btn">
                        <a href="javascript:;" class="btn submit">
                          <i class="icon-search" @click="searchOrderInfo()"></i>
                        </a>
                      </span>
                      <input type="text" class="form-control" v-model="queryInfo.odrNumber" maxlength="" :placeholder="$t('stockOrder.searchplaceholder')" name="number" @keydown="handleSerachEnter($event)">
                    </div>
                  </div>

                  <div class="pull-right">
                    <!-- BEGIN HEADER SEARCH BOX -->
                    <!-- END HEADER SEARCH BOX -->
                    <!-- BEGIN TOP NAVIGATION MENU -->
                  <div class="top-menu">
                    <ul class="nav navbar-nav">
                      <li class="dropdown">
                        <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-close-others="true" title="">
                          <i class="icon-add"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-default">
                          <li>
                            <a href="#myModal" data-toggle="modal">
                              <i class="icon-doc"></i>{{$t('part.Newpartsapplication')}}</a>
                          </li>
                        </ul>
                      </li>

                      <!--<li class="dropdown dropdown-extended dropdown-notification" id="header_notification_bar">                         
                        <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-close-others="true" :title="$t('Unreadmessage')">
                          <i class="icon-bell"></i>
                          <span class="badge bg-important"></span>
                        </a>						
                        <ul class="dropdown-menu dropdown_msg">
                          <li>
                            <ul class="dropdown-menu-list" tabindex="5001" style="overflow: hidden; outline: none;">
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
                      </li>-->

                      <li>
                        <rightButtonChild></rightButtonChild>
                      </li>
                    </ul>

                  </div>                    <!-- END TOP NAVIGATION MENU --></div>
                </div>
                <!-- END HEADER INNER --></div>
              <!-- END HEADER --></div>
            <div class="clearfix"></div>
<!--head upper-->


      <div id="top_menu">
        <h2 class="">{{$t('part.Sparepartsform')}}</h2>
        <div class="order_list_menu ">
          <div class="pull-right order_list_top">
            <el-select clearable v-model="queryInfo.owner" :placeholder="$t('order.owner')" @change="statusChange" size="small">
              <el-option
                v-for="item in ownerCodeList"
                :key="item"
                :label="item"
                :value="item"
                >
              </el-option>
            </el-select>
            <el-select clearable v-model="queryInfo.review" :placeholder="$t('part.Auditresults')" @change="statusChange" size="small">
              <el-option
                v-for="item in reviewArray"
                :key="item"
                :label="item | review"
                :value="item"
                >
              </el-option>
            </el-select>
            <el-select clearable v-model="queryInfo.status" :placeholder="$t('Warehouse.status')" @change="statusChange" size="small">
              <el-option
                v-for="item in statusArray"
                :key="item"
                :label="item | statusName"
                :value="item"
                >
              </el-option>
            </el-select>
            <el-date-picker
              v-model="queryInfo.createDateRange"
              type="daterange"
              :placeholder="$t('order.daterange')" size="small" @change="showDatePickerValue">
            </el-date-picker>
            <a class="btn btn-primary" @click="handleExpInventoryApply">{{$t('export')}}</a>                 
          </div>
        </div>
      </div>


 <el-table ref="orderTable"  :data="list" v-loading.body="listLoading" @sort-change="handTableSort" style="margin-top:5px;width: 100%" @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="35">
      </el-table-column>
      <el-table-column  min-width="10%" align="center" :label="$t('stockOrder.odrNumber')" prop="odrnumber" sortable="custom">
        <template scope="scope">
          <span>{{scope.row.odrnumber}}</span>
        </template>
      </el-table-column>

       <el-table-column min-width="10%" align="center" :label="$t('order.owner')" prop="owner" sortable="custom">
        <template scope="scope">
          <span>{{scope.row.owner}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="10%" :label="$t('part.Auditresults')" prop="status"  sortable="custom">
        <template scope="scope">
          <span>{{scope.row.status === 11 ? "" : scope.row.status | review}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="10%" align="center" :label="$t('Warehouse.status')" prop="status" sortable="custom">
        <template scope="scope">
          <el-tag :type="scope.row.status | statusTagFilter ">{{scope.row.status  | statusName}}</el-tag>
          </span>
        </template>
      </el-table-column>

      <el-table-column min-width="10%" align="center" :label="$t('order.createDate')" prop="createdate" sortable="custom">
        <template scope="scope">
          <span>{{scope.row.createDate}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="10%" align="center" :label="$t('stockOrder.createUserName')" prop="createusername" sortable="custom">
        <template scope="scope">
          <span>{{scope.row.createUserName}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="5%" align="center" :label="$t('stockOrder.viewDetail')"  >
        <template scope="scope">
          <a  herf="javascript:viod(0);" class="icon_check" @click="handleViewOrder(scope.row.stockOrderNumber)">
          </a>
        </template>
      </el-table-column>

    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum"
        :page-sizes="[10,20,30, 50]" :page-size="queryInfo.pageSize" layout="total,sizes,prev, pager, next" :total="total">
      </el-pagination>
    </div> 
  <!--弹出框-->



<div class="modal fade" id="myModal">
  <div class="modal-dialog">
<div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{$t('part.Newpartsapplication')}}</h5></div>


      <div class="modal-body">
        <div class="order_detection main_form_input">


      <div class="panel-body main_form_input" style="padding-bottom:15px;">
      <div class="col-md-6">
          <el-select v-model="searchInfo.searchOwner" :placeholder="$t('order.selectowner')" filterable @change="handlesearchByProviderCode" size="small" class="form-control">
                    <el-option
                      v-for="item in ownerCodeList"
                      :key="item"
                      :label="item"
                      :value="item"
                      >
                    </el-option>
                  </el-select>
                  </div>
                  <div class="form-group  search col-md-6">
							<div class="">


              <el-select class="select_list default form-control "
                  v-model="partSearchValue"
                  filterable
                  remote
                  :placeholder="$t('part.entersparepartcode')"
                  :remote-method="remotePartSearch"
                  @change="changeItem"
                  :loading="loading">
                  <el-option
                    v-for="item in partOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item">
                  </el-option>
                </el-select>
							</div>
           </div>
  </div>
          <div class="clearfix"></div>
        	<div class="panel-body">

          	<form role="form">
            <div class="form-group col-md-12 form-inline spare_code">
              <div class="col-md-8" style="padding-left:0;padding-right:0;word-break:break-all;">
                <span class="spare_tit pull-left">{{$t('order.Detail.Sparepartscodename')}}：</span>
                <div class="pull-left" style="line-height:28px;">{{partName}}</div>
              </div>
							<div class="pull-right spare_right" style="position:relative;">
								<div class="form-group">
								<div class="input-group count">
								  <span class="input-group-addon minus" @click="partCntMinus()">-</span>
								  <input id="partCnt" class="form-control" v-model="partCnt" size="3" placeholder="0" type="text">
                  <span class="input-group-addon plus" @click="partCntAdd()">+</span>
								</div>
								</div>
								<div class="form-group">
                <a class="btn btn-default" @click="partItemPush()">{{$t('Add')}}</a>
                </div>
              </div>
            </div>
        	</form></div>
        	
          <div class="panel-body inv_table">
 						<div class="table-scrollable modal_find">
                    <table class="table">
                 <thead>
                  <tr class="">
                    <th class="" width="7%" style="text-align: center;">{{$t('stockOrder.detail.serialNo')}}</th>
                    <th class="" width="15%" style="text-align: center;">{{$t('stockOrder.detail.sku')}}</th>
                    <th class="" width="22%" style="text-align: center;">{{$t('stockOrder.detail.name')}}</th>
                    <th class="" width="30%" style="text-align: center;">{{$t('stockOrder.detail.qty')}} </th>
                    <th class="" width="11%" style="text-align: center;">{{$t('part.Serviceproviderinventory')}}</th>
                    <th class="" width="15%" style="text-align: center;">{{$t('order.operation')}}</th>
                  </tr>
                </thead>
                      <tbody>
                        <tr class="gray-bg" v-for="(item,index) in this.partSelectItemList" :key="item.sku">
                          <td class="" style="text-align: center; ">
                             		{{index + 1}}
                          </td>
                          <td class="" style="text-align: center;">
                               	{{item.sku}}
                          </td>
                          <td class="" style="text-align: center;">
                             		{{item.enName}}
                          </td>
                          <td class="" style="text-align: center;">
								              <input class="form-control" v-model="item.qty" size="6" placeholder="0" type="text" @keyup="checkqty(item)"   >
                          </td>
                          <td class="" style="text-align: center;">
                             		 {{item.remnantQty}} 
                          </td>
                          <td class="" style="text-align: center;">
                             		<a href="javascript:viod(0);" class="del" @click="itemDel(item.sku)"></a> 
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
          </div>
        </div>
        
      </div>
        <div class="modal-footer">        	
          <button data-dismiss="modal" class="btn btn-cancel" type="button">{{$t('order.Cancel')}}</button>
          <button id="btnSubmit" class="btn btn-primary" type="button" @click="confirmApply()">{{$t('order.Affirm')}}</button>
        </div>
    </div>

    </div>
  </div>
</div>
</template>

<script>
import rightButtonChild from './../layout/rightButtonChild'
import { getOwnerOutterCodeList } from 'api/providerMgr';
import { getAllSkuName } from 'api/partManage';
import { getSkuRemnant } from 'api/partInventoryMgr';
import { createApplyStockOrder, listApplyInStockOrder, applyStockOrderListByOdrNumber } from 'api/applyStockIn';
import moment from 'moment';
import { parseTime } from 'utils/index';
import Vue from 'vue';

export default {
  name: 'inventory_apply',
  props: {},
  components: { rightButtonChild },
  data() {
    return {
        listLoading: false,
        total: null,
        queryInfo: {
          pageNum: 1,
          pageSize: 10,
          createDateStart: '',
          createDateEnd: '',
          owner: '', // 厂商选定值
          review: '',
          status: '',
          createDateRange: '',
          sortName: 'createDate',
          sortOrder: 'desc',
          providerCode: this.$store.getters.providerCode, // 服务商内部CODE
          odrNumber:''
        },
        list: [],

        statusArray: [11, 12, 13, 14],
        reviewArray: [11, 12],
        partSelectItem: {
            sku: '',
            cnName: '', // 中文名
            enName: '', // 英文名
            qty: 1,
            remnantQty: 0
        },
        partSelectItemList: [], // 备件申请界面列表
        partSelectItemListTmp: [],
        ownerCodeList: [],
        searchInfo: {
          cnname: '',
          enname: '',
          searchSku: '',
          searchOwner: '',
          searchProviderCode: this.$store.getters.providerCode
        },
        requestPartInfo: {},
        searchValue: '',
        multipleSelection: [],
        partInfoShowList: [],
        partCnt: '1',
        partName: '',
        partSearchValue: '',
        partOptions: [],
        partList: [],
        loading: false,
        partSelectList: ['Alba', 'Blba', 'Clba'],
        ownerList: [],
        statusNameOptions: this.$t('part.statusNameOptions'),
        passOptions: this.$t('part.passOptions'),
        stockOrderForm: {
        owner: '',
        providercode: this.$store.getters.providerCode,
        warehousecode: '',
        logisticscode: '',
        //createuser: this.$store.getters.uid,
        stockDetailList: []
      }
    }
  },
  created() {
      // 获取备件必要信息 库存等
      // 货主list获取
      this.getOwnerOutterCodeList();
      this.searchBaseInfoList();
      $('#nav10').next().children().find('li').eq(2).addClass('is-active');
  },
	beforeDestroy() {
		$('#nav10').next().children().find('li').eq(2).removeClass('is-active');
	},
beforeCreate() {
      const _this = this;
      Vue.filter('review', function(status) {
            let statusname = '';
            _this.passOptions.forEach(item => {
            if (item.status === status + '') {
                statusname = item.name;
                return;
            }
          });
            return statusname;
      });

      Vue.filter('statusName', function(status) {
          let statusname = '';
            _this.statusNameOptions.forEach(item => {
            if (item.status === status) {
                statusname = item.name;
            }
          });
            return statusname;
        });
  },
    filters: {
    statusTagFilter(status) {
      const statusMap = {
            11: 'primary',
            12: 'warning',
            13: 'warning',
            14: 'gray', 
            1: 'gray',
          };
          return statusMap[status]
        }
  },  
  methods: {
    statusChange(val) {
      console.log(val);
      this.searchBaseInfoList();
    },
    handTableSort(val) {
          this.queryInfo.sortName = val.prop;
          this.queryInfo.sortOrder = val.order === 'ascending' ? 'desc' : 'asc';
          this.searchBaseInfoList();
    },
    handleCurrentChange(val) {
          this.queryInfo.pageNum = val;
          this.searchBaseInfoList();
    },
    handleSizeChange(val) {
          this.queryInfo.pageSize = val;
          this.searchBaseInfoList();
    },
    showDatePickerValue(value) {
      if(this.queryInfo.createDateRange[0] == null || this.queryInfo.createDateRange[0] == ''){
        this.queryInfo.createDateStart ='';
      }else{
        this.queryInfo.createDateStart = moment(this.queryInfo.createDateRange[0]).format('YYYY-MM-DD');
      }
      if(this.queryInfo.createDateRange[1] == null || this.queryInfo.createDateRange[1] == ''){
        this.queryInfo.createDateEnd = '';
      }else{
        this.queryInfo.createDateEnd = moment(this.queryInfo.createDateRange[1]).format('YYYY-MM-DD');
      }
      this.searchBaseInfoList();
    },
    searchBaseInfoList() {
      // 获取页面列表信息
      this.listLoading = true;
      listApplyInStockOrder(this.queryInfo).then(response => {
          console.dir(response);
          this.list = response.data.list;
          this.total = response.data.total;
          this.listLoading = false;
      });
    },
    confirmApply() {
      if (this.partSelectItemList.length === 0) {
        this.$message.error(this.$t('part.selectaccessories'));
        return;
      }
      //防止连续点击两次
      $('#btnSubmit').attr('disabled', 'true');
      setTimeout(() => {
          $('#btnSubmit').removeAttr('disabled');
      }, 3000);
      // 申请备件确认
      this.stockOrderForm.owner = this.searchInfo.searchOwner;
      this.stockOrderForm.stockDetailList = this.partSelectItemList;
      createApplyStockOrder(this.stockOrderForm).then(response => {
          if (response.data.status === '0') {
              this.$message.info(this.$t('part.partsapplicationsuccessful'));
              this.searchBaseInfoList();
              this.partSearchValue = '';
              $('#myModal').modal('hide');
          } else {
              this.$message.error('Exception:' + response.data.message);
          }
      });
    },
    itemDel(sku) {
      this.partSelectItemListTmp = this.partSelectItemList;
      this.partSelectItemList.forEach((item, index) => {
          if (item.sku === sku) {
              this.partSelectItemListTmp.splice(index, 1);
          }
      });
      this.partSelectItemList = this.partSelectItemListTmp;
    },
    itemPlus(sku) {
      // TODO
      console.log(sku);
      // this.partSelectItemListTmp = this.partSelectItemList;
      // this.partSelectItemListTmp.forEach(item => {
      //     if (item.sku === sku) {
      //       // this.partSelectItemList[index].qty++;
      //       console.dir(item);
      //       item.qty = ++item.qty;
      //     }
      // });
      // this.partSelectItemList = this.partSelectItemListTmp;
    },
    itemMinus(sku) {
      // TODO
      console.log(sku);
      // this.partSelectItemListTmp = this.partSelectItemList;
      // this.partSelectItemList.forEach((item, index) => {
      //     if (item.sku === sku) {
      //       if (this.partSelectItemListTmp[index].qty > 1) {
      //           this.partSelectItemListTmp[index].qty--;
      //       }
      //     } else {
      //       this.partSelectItemListTmp[index].qty = item.qty;
      //     }
      // });
      // this.partSelectItemList = this.partSelectItemListTmp;
    },
    getOwnerOutterCodeList() {
        getOwnerOutterCodeList(this.$store.getters.providerCode).then(response => {
            this.ownerCodeList = response.data;
        })
    },
    handlesearchByProviderCode(value) {
        // 数据清空
        this.partSelectList = [];
        this.partList = [];
        this.partName = '';
        this.partSearchValue = '';
        this.searchInfo.searchSku = '';

        getAllSkuName(this.$store.getters.providerCode, value).then(response => {
            if (response.data.status === '0') {
                this.partSelectList = response.data.rsltData;
                this.partList = this.partSelectList.map(item => {
                    return { value: item.sku, label: item.enname, cnname: item.cnname };
                });
                console.dir(this.partList);
            }
        });
    },
    searchOrderInfo() {
      this.searchBaseInfoList();
      // applyStockOrderListByOdrNumber(this.searchValue, this.$store.getters.providerCode).then(response => {
      //     this.list = response.data;
      // });
    },
    changeItem(item) {
      // 前台显示
      this.partName = item.label;
      this.searchInfo.searchSku = item.value;
      this.searchInfo.cnname = item.cnname;
      this.searchInfo.enname = item.label;
    },
    partItemPush() {
        // 相关信息查询
        if (this.searchInfo.searchSku === '' || this.searchInfo.searchSku === undefined) {
          this.$message.error(this.$t('part.partcannotbeempty'));
          return;
        }
        getSkuRemnant(this.searchInfo.searchSku, this.searchInfo.searchProviderCode, this.searchInfo.searchOwner).then(response => {
          console.log(this.searchInfo.searchSku + '-------------------------库存----------------------' + this.searchInfo.searchProviderCode + '-----' + this.searchInfo.searchOwner);
          console.dir(response);
            if (response.data.status === '0') {
              this.partSelectItem.remnantQty = response.data.rsltData;
              let runningFlg = 0;
              this.partSelectItem.sku = this.searchInfo.searchSku;
              this.partSelectItem.cnName = this.searchInfo.cnname;
              this.partSelectItem.enName = this.searchInfo.enname;
              this.partSelectItem.qty = this.partCnt;
              this.partSelectItemList.forEach(item => {
                  if (item.sku === this.partSelectItem.sku) {
                      this.$message.error(this.$t('part.partshavebeenadd'));
                      runningFlg = 1;
                      return runningFlg;
                  }
              });
              console.log('runningFlg:' + runningFlg);
              if (runningFlg === 1) {
                  return;
              }
            this.partSelectItemList.push(this.partSelectItem);
            this.partSelectItem = {};
            this.partName = '';
            this.partSearchValue = '';
            } else {
              this.$message.error(response.data.message);
              return;
            }
        });
    },
    partCntAdd() {
        this.partCnt++;
    },
    partCntMinus() {
      if (this.partCnt > 1) {
        this.partCnt--;
      }
    },
    handleViewOrder(stockOrderNumber) {
      //
      console.log(stockOrderNumber);
      
      this.$router.push('/partInventory/detail/' + stockOrderNumber);
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    remotePartSearch(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.partOptions = this.partList.filter(item => {
              return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1 || item.cnname.toLowerCase().indexOf(query.toLowerCase()) > -1 || item.value.toLowerCase().indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.partOptions = [];
        }
    },
    handleExpInventoryApply(){
      var expList;
          if(this.multipleSelection.length>0){
            expList = this.multipleSelection;
            console.dir(expList);
            this.expInventoryApply(expList);
          }else{
           listApplyInStockOrder(this.queryInfo).then(response => {
              expList = response.data.list;            
              this.expInventoryApply(expList);
            })
          }
    },
    expInventoryApply(expList){
      console.dir(expList);
        expList.forEach(obj => {
                this.statusNameOptions.map(function (item) {
                  if(item.status == obj.status){
                      obj.statusName =  item.name;
                  }
                })
                this.passOptions.map(function (item) {
                  if (item.status.indexOf(obj.status)>-1) {
                      obj.passName =  item.name;
                  }
                })
          })
            require.ensure([], () => {
                const { export_json_to_excel } = require('vendor/Export2Excel');
                var tHeader;
                var filterVal;

                    tHeader = [this.$t('stockOrder.odrNumber'), this.$t('order.owner'),this.$t('part.Auditresults'),this.$t('Warehouse.status'),
                    this.$t('order.createDate'), this.$t('stockOrder.createUserName')];
                     filterVal = ['odrnumber', 'owner','passName','statusName','createDate','createUserName'];
                
                const data = this.formatJson(filterVal, expList);
                export_json_to_excel(tHeader, data, this.$t('part.Sparepartsform')+'  '+parseTime(new Date()));
              })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    handleSerachEnter(ev){
      if(ev.keyCode == 13){
        this.searchBaseInfoList();
      }
    },
    checkqty(item){
      item.qty=item.qty.replace(/\D/g,'','');
    }
  },
  //监听文本框的值
  watch:{
    partCnt(){
      this.partCnt=this.partCnt.replace(/\D/g,'','');
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
.modal-body .modal_find td{
  word-break: break-all;
}

</style>
<style scoped>
  @import '/static/css/bootstrap.min.css';
  @import '/static/css/layout.css';
  @import '/static/css/custom.css';
  @import '/static/css/default.css';
  @import '/static/css/style.css';
  @import '/static/css/style-responsive.css';
</style>
