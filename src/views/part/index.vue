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
              <input type="text" class="form-control" v-model="listQuery.searchValue" maxlength="" :placeholder="$t('part.entershipper')" name="number" @keydown="handleSerachEnter($event)"></div>
            </div>                 
            <div class="pull-right">
              <div class="top-menu">
                <!--<ul class="nav navbar-nav pull-right" style="position:absolute;right:120px;">
                  <li class="dropdown">
                    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-close-others="true" title="">
                      <i class="icon-add"></i>
                    </a>
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
                  <li><rightButtonChild></rightButtonChild></li>
                </ul>
              </div>                    
            </div>
          </div>
        </div>
      </div>

      <div id="top_menu">
	      <h2 class="">{{$t('part.Sparepartslist')}}</h2>
        <div class="order_list_menu ">
           <div class="pull-right order_list_top">              
              <button class="btn btn-primary btn-lg btn-primary-pd" data-toggle="modal" @click="handleAddPart()">{{$t('part.Newspareparts')}}</button>
              <button class="btn btn-primary btn-lg btn-primary-pd" data-toggle="modal" @click="handleEditPart()">{{$t('part.Modifyspareparts')}}</button>
              <button class="btn btn-primary btn-lg btn-primary-pd" data-toggle="modal" @click="handleValidPart()">{{$t('part.Effective')}}</button>
              <button class="btn btn-primary btn-lg btn-primary-pd" data-toggle="modal" @click="handleInvalidPart()">{{$t('part.Failure')}}</button>
              <!-- <button class="btn btn-primary btn-lg btn-primary-pd"  @click="handleCountPart()">{{$t('part.countPart')}}</button> -->
              <a href="#importPartModel" class="btn btn-primary" data-toggle="modal">{{$t('part.import')}}</a> 
            </div>
        </h2>
	    </div>
      
    <el-table ref="orderTable" :data="list" v-loading.body="listLoading" border fit highlight-current-row style="margin-top:5px;width: 100%" @sort-change="handTableSort" @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>

      <el-table-column  align="center" :label="$t('part.owner')" min-width="8%">
        <template scope="scope">
          <span>{{scope.row.owner}}</span>
        </template>
      </el-table-column>

      <el-table-column  :label="$t('part.coding')" min-width="8%">
        <template scope="scope">
          <span>{{scope.row.sku}}</span>
        </template>
      </el-table-column>

      <el-table-column  align="center" :label="$t('Warehouse.Chinesename')" min-width="8%">
        <template scope="scope">
          <span>{{scope.row.cnName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('Warehouse.Englishname')" min-width="8%">
        <template scope="scope">
          <span>{{scope.row.enName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('part.unit')" min-width="8%">
        <template scope="scope">
          <span>{{scope.row.unit}}</span>
        </template>
      </el-table-column>

       <el-table-column  align="center" :label="$t('part.price')" min-width="8%">
        <template scope="scope">
          <span>{{scope.row.price}}</span>
        </template>
      </el-table-column>

      <el-table-column  align="center" :label="$t('part.outPrice')" min-width="8%">
        <template scope="scope">
          <span>{{scope.row.outPrice}}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column align="center" :label="$t('part.Tagcode')" min-width="8%">
        <template scope="scope">
          <span>{{scope.row.labelCode}}</span>
        </template>
      </el-table-column> -->

      <el-table-column align="center" :label="$t('Warehouse.status')" min-width="8%">
        <template scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status | statusNameFilter}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column  align="center" :label="$t('part.suitModel')" min-width="14%">
        <template scope="scope">
          <span>{{scope.row.suitModel}}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column  align="center" :label="$t('part.description')" width="200">
        <template scope="scope">
          <span>{{scope.row.description}}</span>
        </template>
      </el-table-column> -->

      <el-table-column align="center" :label="$t('Warehouse.Modifypeople')" min-width="10%">
        <template scope="scope">
          <span>{{scope.row.updateUser}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('Warehouse.Changethetime')" prop="createDate" sortable="custom" min-width="10%">
        <template scope="scope">
          <span>{{scope.row.updateDate}}</span>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNum"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next" :total="total">
      </el-pagination>
    </div>  

    <!-- 新增修改 -->
    <div class="modal fade" id="partModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h5 class="modal-title">{{title}}</h5>
          </div>
          <div class="modal-body">
            <div class="order_detection main_form_input">
              <div class="panel-body">
              <form role="form" ref="partInfoForm">
                <div class="form-group col-md-6">
                  <label for="">{{$t('part.owner')}}</label>
                  <el-select v-model="part.owner" placeholder="" class="select_list form-control">
                    <el-option
                      v-for="item in owners"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </div>
                <div class="form-group col-md-6">
                  <label for="">{{$t('part.coding')}}<b>*</b></label>
                  <input class="form-control" id="sku" alt="verifyPartForm" ref="sku" placeholder="" v-verify-input:nonvoid ="{id:'coding',format:true,title:$t('part.coding')}" type="text" v-model="part.sku">
                  <div v-verify-msg:coding></div>
                </div>
                <div class="form-group col-md-6">
                  <label for="">{{$t('Warehouse.Chinesename')}}<b>*</b></label>
                  <input class="form-control" id="cnName" alt="verifyPartForm" placeholder="" v-verify-input:nonvoid ="{id:'cnName',format:true,title:$t('Warehouse.Chinesename')}" type="text" v-model="part.cnName">
                  <div v-verify-msg:cnName></div>
                </div>

                <div class="form-group col-md-6">
                  <label for="">{{$t('Warehouse.Englishname')}}<b>*</b></label>
                  <input class="form-control" id="enName" alt="verifyPartForm" placeholder="" v-verify-input:nonvoid ="{id:'enName',format:true,title:$t('Warehouse.Englishname')}" type="text" v-model="part.enName">
                  <div v-verify-msg:enName></div>
                </div>
                <div class="form-group col-md-12">
                  <label for="">{{$t('part.unit')}}<b>*</b></label>
                  <input class="form-control" id="unit" alt="verifyPartForm" placeholder="" v-verify-input:nonvoid ="{id:'unit',format:true,title:$t('part.unit')}" type="text" v-model="part.unit">
                  <div v-verify-msg:unit></div>
                </div>
                <div class="form-group col-md-6">
                  <label for="">{{$t('part.price')}}<b>*</b></label>
                  <input class="form-control" id="price" alt="verifyPartForm" placeholder="" v-verify-input:nonvoid ="{id:'price',format:true,title:$t('part.price')}" type="text" v-model="part.price">
                  <div v-verify-msg:price></div>
                </div>
                <div class="form-group col-md-6">
                  <label for="">{{$t('part.outPrice')}}<b>*</b></label>
                  <input class="form-control" id="outPrice" alt="verifyPartForm" placeholder="" v-verify-input:nonvoid ="{id:'outPrice',format:true,title:$t('part.outPrice')}" type="text" v-model="part.outPrice">
                  <div v-verify-msg:outPrice></div>
                </div>
                <div class="form-group col-md-12">
                  <label for="">{{$t('part.suitModel')}}<b>*</b></label>
                  <input  class="form-control" id="suitModel" alt="verifyPartForm" placeholder="" v-verify-input:nonvoid ="{id:'suitModel',format:true,title:$t('part.suitModel')}" v-model="part.suitModel"></el-input>
                  <div v-verify-msg:suitModel></div>
                </div>
              </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-cancel"  @click="cancelPartModel">{{$t('order.Cancel')}}</button>
            <button class="btn btn-primary" v-verify-final-check:verifyPartForm type="submit">{{$t('order.Affirm')}}</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 导入备件信息-->
    <div class="modal fade" id="importPartModel">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h5 class="modal-title">{{$t('part.importParts')}}</h5>
          </div>
          <div class="modal-body">
            <div class="order_detection main_form_input">
              <div class="panel-body main_form_input" style="padding-bottom:5px;">
                <div class="col-md-12">
                  <form id="form1" enctype="multipart/form-data" method="post" action="">
                      <input type="file" id="partfile" name="file" @change="selectedFile($event.target)" style/></br>
                      <button type="button" style="width:80px; height:27px;" class="btn btn-info btn-sm" @click="importExcel()">{{$t('part.import')}}</button>
                  </form>
                  {{$t('part.importExplain')}}&nbsp;&nbsp;<a :href="partExcelUrl" style="color:#00AAEE;">{{$t('part.templatesDownload')}}</a><br/>
									{{$t('part.matters')}}：<br/>
									1，<span>{{$t('part.mattersNo1')}}</span><br/>
									2，<span>{{$t('part.mattersNo2')}}</span><br/>
                </div><br/>
                <div id='returnMessage' class="col-md-12" style="color:red;font-size: 10px;padding-top:15px;"></div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button data-dismiss="modal" class="btn btn-cancel" type="button">{{$t('order.Cancel')}}</button>
          </div>
        </div>
      </div>
    </div>

    </div>
  </div>
</template>

<script>
  import bootstrap from 'bootstrap';
  import rightButtonChild from './../layout/rightButtonChild';
  import Vue from 'vue';
  import { getPartList,addPart,getPartById,updatePart,invalidPart,validPart,countPart,getPartExcelUrl } from 'api/partManage';
  import Cookies from 'js-cookie';
  import { getOwnerOutterCodeList } from 'api/providerMgr';
  
  export default {
  components: {rightButtonChild },
  data() {
    return {
      list: null,
      total: null,
      title: '',
      listLoading: true,
      statusENOptions : this.$t('part.statusENOptions'),
      listQuery: {
            pageNum: 1,
            pageSize: 10,
            searchValue: '',
            sortName: 'createDate',
            sortOrder: 'desc'
      },
      part : {
          partId : '',
          owner : '',
          sku : '',
          cnName : '',
          enName : '',
          weight : '',
          labelCode : '',
          price : '',
          outPrice : '',
          unit : '',
          suitModel : '',
          status : '',
          statusName : '',
          description : '',
          createUser : '',
          createDate : '',
          updateUser : '',
          updateDate : '',
          providerCode : this.$store.getters.providerCode
      },
      tempPart : '',
      partDialog : false,
      isEdit : false,
      owners : [],
      partIds : [],
      partExcelUrl: ''
    }
  },
  beforeCreate(){
      let _this = this;
      Vue.filter('statusNameFilter', function(status) {
            let statusname = '';
            _this.statusENOptions.forEach(item => {
            if (item.status.indexOf(status)>-1) {
                statusname = item.name;
            }
          });
            return statusname;
      });
  },
  created() {
        let _this = this;
        _this.tempPart = JSON.parse(JSON.stringify(_this.$data.part));
        _this.getList();
        _this.getExcelUrl();

        _this.$on('verifyPartForm', function() {
          _this.handSavePart();
        });
        this.getOwners();
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
            0 : 'success',
            1 : 'warning'
          };
          return statusMap[status]
        }
  },
  methods: {
    getList() {
          this.listLoading = true;
          getPartList(this.listQuery).then(response => {
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
    handleAddPart(){
      // this.$refs.partInfoForm.resetFields();
      this.title = this.$t('part.Newspareparts');
      this.$refs.sku.readOnly = false;
      $('#partModal').modal('show');
    },
    handleEditPart(){
        if(this.partIds.length!=1){
            this.$message.error(this.$t('part.chooseaccessoryinfo'));
            return;
        }
        this.part.partId = this.partIds[0];
        this.title = this.$t('part.Modifyspareparts');
        this.$refs.sku.readOnly = true;
        getPartById(this.partIds).then(response => {
              if(response.data.status=='0'){
                const partInfo = response.data.partInfo;
                this.part = partInfo;
                $('#partModal').modal('show');
                this.isEdit = response.data.isEdit;
              }else{
                this.$message.error(response.data.message);
              }
          })
        
    },
    handSavePart(val) {
        if(this.isEdit){
            updatePart(this.part).then(response => {
              if(response.data.status=='0'){ 
                this.$message({
                    message: this.$t(response.data.message),
                    type: 'success'
                });
                $('#partModal').modal('hide');
                this.$data.part = Object.assign(this.$data.part, this.tempPart);
                this.getList();
              }else{
                this.$message.error(this.$t(response.data.message));
              }
          })
        }else{
          addPart(this.part).then(response => {
              console.dir(response);
              if(response.data.status=='0'){
                this.$message({
                    message: this.$t(response.data.message),
                    type: 'success'
                });
                $('#partModal').modal('hide');
                this.$data.part = Object.assign(this.$data.part, this.tempPart);
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
          this.partIds = [];
          rows.forEach(row => {
             this.partIds.push(row.partId);
          });
    },
    handleInvalidPart(){
        if(this.partIds.length==0){
            this.$message.error(this.$t('part.selectaccessoriesinfo'));
            return;
        }
        invalidPart(this.partIds).then(response => {
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
    handleValidPart(){
        if(this.partIds.length==0){
            this.$message.error(this.$t('part.selectaccessoriesinfo'));
            return;
        }
        validPart(this.partIds).then(response => {
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
    handleCountPart(){
        // if(this.partIds.length==0){
        //     this.$message.error(this.$t('part.selectaccessoriesinfo'));
        //     return;
        // }
        countPart(this.partIds).then(response => {
              if(response.data.status=='0'){
                this.$message({
                    message: this.$t(response.data.message),
                    type: 'success'
                });
              }else{
                this.$message.error(this.$t(response.data.message));
              }
          })
    },
    selectedFile(obj) {
      if (!obj.files) {
          return;
      }
      let file = obj.files[0],
          types = file.name.split('.')[1],
          fileType = ["xlsx", "xls"].some(item => item === types);
      if (!fileType) {
          this.$message.error(this.$t('格式错误！请重新选择'));
          return;
      }
      console.dir(file);
    },
    importExcel() {
      var that = this;
      let files = document.getElementById('partfile').files;
      console.dir(files);
      if (files && files.length) {
        var fd = new FormData();
        fd.append('file', files[0]);
        fd.append('assLang', Cookies.get('assLang'));
        var reader = new window.FileReader()
        // 文件大小 100KB
        //var fileSize = 100 * 1024
        reader.readAsDataURL(files[0])
        reader.onload = function (e) {
          // if (e.target.result.length > fileSize) {
          //   that.$dispatch('show-alert', 'msg_1016')
          //     document.getElementById('partfile').value = ''
          // } else {
            var xhr = new XMLHttpRequest()
            xhr.addEventListener('load', that.uploadComplete, false)
            xhr.open('POST', 'api/part/importPartClient')
            xhr.send(fd)
          //}
        }
      }
    },
    uploadComplete(evt) {
      //const rtnInfo = evt.target.responseText;
      const rtnObj = $.parseJSON(evt.target.response);
      console.dir(rtnObj);
      if(rtnObj.status=='0'){
        this.$message({ message: rtnObj.message,type: 'success' });
        $('#importPartModel').modal('hide'); 
        this.getList();
      }else{
        //this.$message.error(rtnObj.message);
        console.dir(rtnObj.message);
        $("#returnMessage").html(rtnObj.message);
      }
      $('#partfile').val('');
    },
    getExcelUrl(){
      var language = Cookies.get('assLang');
      getPartExcelUrl(language).then(response => {
        this.partExcelUrl = response.data;
      })
    },
    cancelPartModel(){
      $('#partModal').modal('hide');
    },
    getOwners() {
        getOwnerOutterCodeList(this.$store.getters.providerCode).then(response => {
            this.owners = response.data;
        })
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