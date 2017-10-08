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
              <input type="text" class="form-control" v-model="listQuery.searchValue" maxlength="" :placeholder="$t('phonemodel.entermodelcode')" name="number" @keydown="handleSerachEnter($event)"></div>
            </div>                 
            <div class="pull-right">
              <div class="top-menu">
                <ul>
                  <li><rightButtonChild></rightButtonChild></li>
                </ul>
              </div>                    
            </div>
          </div>
        </div>
      </div>

      <div id="top_menu">
	      <h2 class="">{{$t('phonemodel.modelList')}}</h2>
        <!--<div class="order_list_menu ">
          <div class="pull-right order_list_top">
              <button class="btn btn-primary btn-lg btn-primary-pd" data-toggle="modal" @click="handleAddModel()">{{$t('phonemodel.newmodel')}}</button>
              <button class="btn btn-primary btn-lg btn-primary-pd" data-toggle="modal" @click="handleEditModel()">{{$t('phonemodel.modifymodel')}}</button>
              <button class="btn btn-primary btn-lg btn-primary-pd" data-toggle="modal" @click="handleEffect()">{{$t('phonemodel.effect')}}</button>
              <button class="btn btn-primary btn-lg btn-primary-pd" data-toggle="modal" @click="handleInvalid()">{{$t('phonemodel.invalid')}}</button>
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
      <el-table-column align="center" :label="$t('phonemodel.modelcode')" prop="refNumber" min-width = "10%">
        <template scope="scope">
          <span>{{scope.row.model}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('phonemodel.shipper')" min-width = "10%">
        <template scope="scope">
          <span>{{scope.row.owner}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('phonemodel.chinesename')" min-width = "15%">
        <template scope="scope">
          <span>{{scope.row.cnname}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('phonemodel.englishname')" min-width = "15%">
        <template scope="scope">
          <span>{{scope.row.enname}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('phonemodel.status')" prop="createDate" min-width = "9%">
        <template scope="scope">
          <el-tag :type="scope.row.flag | statusTagFilter ">{{scope.row.flag  | statusFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('phonemodel.remark')" prop="imei" min-width = "15%">
        <template scope="scope">
          <span>{{scope.row.remark}}</span> 
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('phonemodel.modifypeople')" prop="createDate" min-width = "10%">
        <template scope="scope">
          <span>{{scope.row.updateuser}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('phonemodel.changethetime')" prop="createDate" sortable="custom" min-width = "10%">
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

    <div class="modal fade" id="phoneModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="cancelMyModal()">&times;</button>
            <h5 class="modal-title">{{title}}</h5>
          </div>
          <div class="modal-body">
            <div class="order_detection main_form_input">
              <div class="panel-body">
              <form role="form" ref="orderForm">
                <div class="form-group col-md-6">
                  <label for="">{{$t('phonemodel.modelcode')}}<b>*</b></label>
                  <input class="form-control" id="model" alt='verifyModelForm' placeholder="" type="text" v-verify-input:nonvoid ="{id:'modelcode',format:true,title:$t('phonemodel.modelcode')}" v-model="phonemodel.model" >
                  <div v-verify-msg:modelcode></div>
                </div>
                <div class="form-group col-md-6">
                  <label for="">{{$t('phonemodel.shipper')}}</label>
                  <input class="form-control" id="owner" alt='verifyModelForm' maxLength='2' placeholder="" type="text" disabled v-model="phonemodel.owner" >
                </div>
                <div class="form-group col-md-6">
                  <label for="">{{$t('phonemodel.englishname')}}</label>
                  <input class="form-control" id="enname" alt='verifyModelForm' placeholder="" type="text" v-model="phonemodel.enname">
                </div>
                <div class="form-group col-md-6">
                  <label for="">{{$t('phonemodel.chinesename')}}</label>
                  <input class="form-control" id="cnname" alt='verifyModelForm' placeholder="" type="text" v-model="phonemodel.cnname">
                </div>
                <div class="form-group col-md-12">
                  <label for="">{{$t('phonemodel.remark')}}</label>
                  <el-input type="textarea" id="remark" alt='verifyModelForm' :rows="3" v-model="phonemodel.remark"></el-input>
                </div>
              </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-cancel" @click="cancelMyModal">{{$t('order.Cancel')}}</button>
            <button class="btn btn-primary" v-verify-final-check:verifyModelForm type="submit">{{$t('order.Affirm')}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import bootstrap from 'bootstrap';
  import { getProviderList } from 'api/providerMgr';
  import rightButtonChild from './../layout/rightButtonChild';
  import Vue from 'vue';
  import { getModelList, queryOwner, queryModelByCode, addModel, updateModel, modelEffect, modelInvalid } from 'api/modelManage';
  export default {
  components: {rightButtonChild },
  data() {
    return {
      title: '',
      list: null,
      total: null,
      listLoading: true,
      statusOptions : this.$t('phonemodel.statusOptions'),
      listQuery: {
            pageNum: 1,
            pageSize: 10,
            searchValue: '',
            sortName: 'createDate',
            sortOrder: 'desc'
      },
      phonemodel : {
        model : '',
        owner : '',
        cnname : '',
        enname : '',
        remark : ''
      },
      isEdit : false,
      modelCodes : [],
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
        //this.getOwner();
        this.$on('verifyModelForm', function() {
          this.handSaveModel();
        });
  },
  filters: {
    statusTagFilter(enable) {
      const statusMap = {
        0: 'success',
        1: 'gray'
      };
      return statusMap[enable]
    }
  },
  methods: {
    getOwner(){
      this.listLoading = true;
      queryOwner().then(response => {
        this.phonemodel.owner = response.data;
      })
    },
    getList() {
      this.listLoading = true;
      getModelList(this.listQuery).then(response => {
          this.list = response.data.list;
          this.total = response.data.total;
          this.listLoading = false;
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
    handleAddModel(){
      this.title = this.$t('phonemodel.newmodel');
      $('#phoneModal').modal('show');
    },
    handleEditModel(){
        if(this.modelCodes.length!=1){
            this.$message.error(this.$t('phonemodel.amodelinfo'));
            return;
        }
        this.title = this.$t('phonemodel.modifymodel');
        const code = this.modelCodes[0];
        queryModelByCode(code).then(response => {
              if(response.data.status=='0'){
                this.phonemodel = response.data.modelInfo;
                $('#phoneModal').modal('show');
                $('#model').attr("disabled","disabled");
                this.isEdit = response.data.isEdit;
              }else{
                this.$message.error(response.data.message);
              }
          })
    },
    handSaveModel() {
        if(this.isEdit){
            updateModel(this.phonemodel).then(response => {
              if(response.data.status=='0'){
                this.$message({
                    message: this.$t(response.data.message),
                    type: 'success'
                });
                this.getList();
                this.isEdit = false;
                this.cancelMyModal();
              }else{
                this.$message.error(this.$t(response.data.message));
              }
          })
        }else{
          addModel(this.phonemodel).then(response => {
              if(response.data.status=='0'){
                this.$message({
                    message: this.$t(response.data.message),
                    type: 'success'
                });
                this.cancelMyModal();
                this.getList();
              }else{
                this.$message.error(this.$t(response.data.message));
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
      this.modelCodes = [];
      rows.forEach(row => {
          this.modelCodes.push(row.model);
      });
    },
    handleEffect(){
        if(this.modelCodes.length==0){
            this.$message.error(this.$t('phonemodel.modelinfo'));
            return;
        }
        modelEffect(this.modelCodes).then(response => {
              if(response.data.status=='0'){
                this.$message({
                    message: this.$t(response.data.message),
                    type: 'success'
                });
                this.getList();
              }else{
                this.$message.error(this.$t(response.data.message));
              }
          })
    },
    handleInvalid(){
        if(this.modelCodes.length==0){
            this.$message.error(this.$t('phonemodel.modelinfo'));
            return;
        }
        modelInvalid(this.modelCodes).then(response => {
              if(response.data.status=='0'){
                this.$message({
                    message: this.$t(response.data.message),
                    type: 'success'
                });
                this.getList();
              }else{
                this.$message.error(this.$t(response.data.message));
              }
          })
    },
    cancelMyModal(){
      $("#model").removeAttr("disabled");
      $('#phoneModal').modal("hide");
      this.phonemodel.model = '';
      //this.phonemodel.owner = '';
      this.phonemodel.enname = '';
      this.phonemodel.cnname = '';
      this.phonemodel.remark = '';
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