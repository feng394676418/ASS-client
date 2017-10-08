<<template>
      <div class="app-container calendar-list-container page-content">
        <div class="Sharing_head">
          <div class="page-header navbar">
            <div class="page-header-inner">
              <div class="pull-right">
                <div class="top-menu">
                  <ul class="nav navbar-nav">
                    <li>
                      <rightButtonChild></rightButtonChild>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="clearfix"></div>


    <div id="top_menu">
	            <h2 class="">{{inventoryChangeTitle+" : "+listQuery.owner+" "+listQuery.inventoryTypeName}}  </h2>
	            <div class="order_list_menu ">
	            	<div class="pull-right order_list_top">
                        <form>	                 
                            <el-date-picker
                              v-model="listQuery.createDate"
                              type="daterange"
                              size="small"
                              :placeholder="$t('order.daterange')"
                              @change="handlesearchByCreateDate"
                            >
                            </el-date-picker>

                            <a class="btn btn-primary" @click="handleExpChange">{{$t('export')}}</a>
                            <a class="btn btn-warning" @click="handleReturnList">{{$t('BACK')}}</a>
                        </form>
	                </div>
	            </div>
	</div>
    <el-table ref="partInventoryTable"  :data="list" v-loading.body="listLoading"  style="margin-top:5px;width: 100%" @sort-change="handTableSort" @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="35">
      </el-table-column>
      <el-table-column  min-width="15%" align="center" :label="$t('inventory.change.createDate')">
        <template scope="scope">
          <span>{{scope.row.createDate}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="15%" :label="$t('inventory.change.sku')">
        <template scope="scope">
          <span>{{scope.row.sku}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="15%" align="center" :label="$t('inventory.change.cnName')">
        <template scope="scope">
          <span>{{scope.row.enName}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="15%" align="center" :label="$t('inventory.change.orderNumber')">
        <template scope="scope">
          <span>{{scope.row.orderNumber}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="10%" align="center" :label="$t('inventory.change.changeType')">
        <template scope="scope">
          <span>{{scope.row.changeType}}</span>
        </template>
      </el-table-column>

       <el-table-column min-width="10%" align="center" :label="$t('inventory.change.qty')">
        <template scope="scope">
          <span>{{scope.row.qty}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="10%" align="center" :label="$t('inventory.change.oldQty')">
        <template scope="scope">
          <span>{{scope.row.oldQty}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="10%" align="center" :label="$t('inventory.change.newQty')">
        <template scope="scope">
          <span>{{scope.row.newQty}}</span>
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
import {getPartInventoryChangeList,expPartInventoryChange } from 'api/partInventoryMgr';
import {parseTime} from 'utils/index';
import rightButtonChild from './../../../layout/rightButtonChild';


export default {
    name : 'orderMgr',
    components: {rightButtonChild},
    data() {
        return {
        list: null,
        total :null,
        inventoryChangeTitle : this.$t('inventory.change.inventoryChangeTitle'),
        listLoading: true,
        listQuery: {
            pageNum: 1,
            pageSize: 10,
            searchValue: '',
            inventoryType: '',
            createDate : '',
            sku : this.$route.params.sku,
            owner : this.$route.params.owner,
            providerCode :this.$route.params.providerCode,
            inventoryType : this.$route.params.inventoryType,
            inventoryTypeName : this.$route.params.inventoryTypeName,
            sortName: 'createDate',
            sortOrder: 'desc'
      },
      ids :'',
      partChanges :'',
      providerType :'',
      providerOptions: []
    }
    },
    created() {
        const _this = this;
        _this.getList();
        _this.providerCode = _this.$store.getters.providerCode;
        _this.providerType = _this.providerCode.substr(0, 1);
    },
    methods: {
        getList() {
          this.listLoading = true;
          getPartInventoryChangeList(this.listQuery).then(response => {
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
            this.partChanges = rows;
            this.ids = [];
            rows.forEach(row => {
                this.ids.push(row.orderNumber);
            });
        },
        handlesearchByProviderCode(val){
            console.dir(val);
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
      handleExpChange(){
         let expList ;
         if(this.partChanges.length>0){
            expList = this.partChanges;
            this.expChange(expList);
          }else{
            expPartInventoryChange(this.listQuery).then(response => {
              expList = response.data;
              this.expChange(expList);
            })
          }
      },
      expChange(expList){
          require.ensure([], () => {
                const { export_json_to_excel } = require('vendor/Export2Excel');
                var tHeader;
                var filterVal;

                    tHeader = [this.$t('inventory.change.createDate'), this.$t('inventory.change.sku'),this.$t('inventory.change.cnName'),
                    this.$t('inventory.change.orderNumber'),this.$t('inventory.change.changeType'),this.$t('inventory.change.qty'),
                    this.$t('inventory.change.oldQty'), this.$t('inventory.change.newQty')];
                    filterVal = ['createDate', 'sku','cnName','orderNumber','changeType','qty','oldQty','newQty'];
                
                const data = this.formatJson(filterVal, expList);
                export_json_to_excel(tHeader, data, this.inventoryChangeTitle+" : "+this.listQuery.owner+" "+this.listQuery.inventoryType+parseTime(new Date()));
              })
      },
      formatJson(filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => v[j]))
      },
      handleReturnList(){
         this.$router.push({ path: '/partInventory/provider/index' });
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
  @import '/static/css/style-responsive.css';

</style>