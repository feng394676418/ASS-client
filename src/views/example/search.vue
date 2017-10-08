<template>
  <div class="app-container calendar-list-container">
      <div style="width:300px;">
        <el-input
          placeholder="请输入工单号/订单编号/运单号..."
          icon="search"
          v-model="listQuery.searchValue"
          :on-icon-click="handleSearch">
        </el-input>
      </div>
    <el-table  :data="list" v-loading.body="listLoading" border fit highlight-current-row style="margin-top:20px;width: 100%">

      <el-table-column width="60px" align="center" label="序号" >
        <template scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="工单编号">
        <template scope="scope">
          <span>{{scope.row.orderNumber}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="180px" label="寄运单号">
        <template scope="scope">
          <span>{{scope.row.createUser}}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="产品型号">
        <template scope="scope">
          <span>{{scope.row.createUser}}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px"  align="center" label="产品IMEI">
        <template scope="scope">
          <span>{{scope.row.createUser}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="厂商">
        <template scope="scope">
          <span>{{scope.row.createUser}}</span>
        </template>
      </el-table-column>

      <el-table-column width="95px" align="center" label="工单状态" >
        <template scope="scope">
          <span>{{scope.row.status}}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" label="创建时间" >
        <template scope="scope">
          <span>{{scope.row.createDate}}</span>
        </template>
      </el-table-column>

      <el-table-column width="90px" align="center" label="操作" >
        <template scope="scope">
          <el-button  size="small" type="success" @click="handleModifyStatus(scope.row,'published')">查看
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>  
  </div>
</template>

<script>

  import { getList } from 'api/morder';

  export default {
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
            page: 1,
            limit: 20,
            searchValue: undefined,
            sort: '+id'
      }
    }
  },
  created() {
        this.getList();
  },
  methods: {
    getList() {
          this.listLoading = true;
          getList().then(response => {
            this.list = response.data;
            console.dir(this.list);
           // this.total = response.data.total;
            this.listLoading = false;
          })
    },
    handleSearch(ev) {
      console.dir("handleSearch");
      console.log(ev);
    },
    handleSizeChange(val) {
          this.listQuery.limit = val;
          this.getList();
    },
    handleCurrentChange(val) {
          this.listQuery.page = val;
          this.getList();
    }
  }
}
</script>