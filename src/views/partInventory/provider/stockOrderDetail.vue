<<template>
<div class="app-container calendar-list-container page-content">
  <el-dialog
      :title="$t('stockOrder.detail.inventoryDetails')"
      :visible.sync="dialogStockOrderDetail"
      size="tiny"
      >
    <el-table ref="partInventoryTable"  :data="list" v-loading.body="listLoading"  style="margin-top:5px;width: 100%">
       <el-table-column min-width="10%" align="center" :label="$t('stockOrder.detail.serialNo')">
        <template scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column  min-width="10%" align="center" :label="$t('stockOrder.productType')">
        <template scope="scope">
          <span>{{scope.row.producttype | productTypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column  min-width="10%" align="center" :label="$t('stockOrder.detail.sku')">
        <template scope="scope">
          <span>{{scope.row.sku}}</span>
        </template>
      </el-table-column>

       <el-table-column min-width="10%" align="center" :label="$t('stockOrder.detail.name')">
        <template scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="10%" :label="$t('stockOrder.detail.unit')">
        <template scope="scope">
          <span>{{scope.row.unit}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="10%" align="center" :label="$t('stockOrder.detail.qty')">
        <template scope="scope">
          <span>{{scope.row.qty}}</span>
        </template>
      </el-table-column>

    </el-table>
    <!-- <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageNum"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" layout="total,sizes,prev, pager, next" :total="total">
      </el-pagination>
    </div> -->
    </el-dialog>
</div>
</template>
<script>
import { getProviderList } from 'api/providerMgr';
import { getStockOrderDetail } from 'api/stockOrderMgr';
import Vue from 'vue';

export default {
    name : 'stockOrderDetail',
    data() {
        return {
        list : null,
        dialogStockOrderDetail : false,
        productTypes :this.$t('stockOrder.productTypeOptions'),
        listQuery: {
            stockOrderNumber: '',
      }
    }
    },
    beforeCreate(){
        const _this = this;
        Vue.filter('productTypeFilter', function(val) {
                var productTypeName  = '';
                _this.productTypes.forEach(function (item) {
                        if(item.value == val){
                            productTypeName =  item.label;
                      }
              　　　});
                      return productTypeName;
          });
  },
    created() {
        const _this = this;
        _this.getList();
    },
    methods: {
        getList() {
          this.listLoading = true;
          getStockOrderDetail(this.listQuery).then(response => {
              this.list = response.data;
             // this.total = response.data.total;
              this.listLoading = false;
          })
        },
        aa(bb){
          console.dir(bb);
        }
    }
}


</script>

<style>
.el-dialog--tiny {
    width: 50%;
}
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