<template>
  <dl>
	            				<dt class="active"><a href="#myModal7" data-toggle="modal">{{$t('order.Detail.Repair')}}</a></dt>
	            				  <!-- 受理 Modal -->
<div class="modal fade" id="myModal7" style="display: none;">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{$t('order.Detail.usingspareparts')}}</h5></div>
      <div class="modal-body">
        <div class="order_detection main_form_input">
          <form role="form">
                      <div class="panel-body"> 
						<div class="form-group col-md-12 search">
							<label>{{$t('order.Detail.Sparepartsrequesttable')}}</label>
              <el-autocomplete class="select_list default form-control"
                v-model="accessories"
                :fetch-suggestions="querySearchAsync"
                :placeholder="$t('order.Detail.Enterthesparepartcode')"
                @select="handleSelect"
              ></el-autocomplete>
            </div>
 
						<div class="form-group col-md-12 form-inline spare_code">
              <div class="col-md-8" style="padding-left:0;padding-right:0;word-break:break-all;">
                <span class="spare_tit  pull-left">{{$t('order.Detail.Sparepartscodename')}}：</span>
                <!--备件名称-->
                <div class="pull-left" style="line-height:28px;">{{this.showPartName}}</div>
              </div>
							<div class="pull-right spare_right">
								<div class="form-group">
								<div class="input-group count">
                  <!-- <el-input-number  size="small" v-model="tmpPartNumber" class="default form-control"></el-input-number> -->
								   <span class="input-group-addon minus" @click="minus()">-</span>
								  <input class="form-control" v-model="tmpPartNumber" :value="tmpPartNumber" size="3" placeholder="0" type="text">
								  <span class="input-group-addon plus" @click="plus()">+</span> 
								</div>
								</div>
								<!-- <div class="form-group">
								<input class="form-control" id="" size="8" placeholder="价格(币种) " type="text">
								</div> -->
								<div class="form-group">
                <a class="btn btn-default" @click="assPartSelectionAdd()">{{$t('Add')}}</a>
                </div>
              </div>
            </div>  



 						<div class="table-scrollable modal_find">
                    <table class="table">
                 <thead>
                  <tr class="">
                    <th class="" width="20%" style="text-align: center;">{{$t('order.Detail.SKU')}}</th>
                    <th class="" width="25%" style="text-align: center;">{{$t('order.Detail.Sparepartsname')}}</th>
                    <th class="" width="17%" style="text-align: center;">{{$t('order.Detail.Quantity')}}</th>
                    <th class="" width="8%" style="text-align: center;">{{$t('order.operation')}}</th>
                  </tr>
                </thead>
                      <tbody>
                        <tr class="gray-bg" v-for=" item in orderPartTableData " :key="item.sku">
                          <td class="" style="text-align: center;">
                               	{{item.sku}}
                          </td>
                          <td class="" style="text-align: center;">
                             		{{item.enName}}
                          </td>
                          <td class="" style="text-align: center;">
                            <div class="input-group count spare_code">
                              <!-- <el-input-number  size="small" v-model="tmpPartNumber" class="default form-control"></el-input-number> -->
                              <span class="input-group-addon minus" @click="minusItem(item)">-</span>
                              <input class="form-control" v-model="item.tmpPartNumber" size="3" placeholder="0" type="text">
                              <span class="input-group-addon plus" @click="plusItem(item)">+</span> 
                            </div>
                          </td>                                             

                          <td class="" style="text-align: center;">
                             	<a href="javascript:viod(0);" class="del" @click="partSelectDelete(item)"></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
          </div>
          </form>
        </div>
        <div class="modal-footer">
          <button data-dismiss="modal" class="btn btn-cancel" type="button">{{$t('order.Cancel')}}</button>
          <button id="btnSubmit" class="btn btn-primary" type="button" @click="confirm()">{{$t('order.Affirm')}}</button>
        </div>
        
      </div>
    </div>
  </div>
	            			</div></dl>
</template>


<script>
import { getPartInfoListByPO } from 'api/partManage';
import { repair } from 'api/report';

export default {
  name: 'maintenanceButtonChild',
  props: {
    baseInfo: {}
  },
  data() {
    return {
      dialogDismiss: 'modal',
      tmpPartNumber: 1, // 配件数量手动可调
      showPartName: '', // 配件名称
      partList: [],
      totalCost: 0,
      orderPartTableData: [], // 工单配件
      accessories: '', // 配件查询key
      assSelectPart: {},
      PartInfoList: [{}], // 配件一览表
      assPartsdialogVisible: false,
      dialogVisible: false,
      repairForm: {
        orderNumber: this.$route.params.orderNumber,
        serviceType: this.baseInfo.checkServiceType, // 服务类型 保内维修/保外维修
        createUser: this.$store.getters.uid,
        actualOrderPartList: []
      }

    }
  },
  created() {
    console.log('-----------ssssssssssssss-------------');
    console.dir(this.baseInfo);
    const list = this.baseInfo.orderPartList;
    const listActual = this.baseInfo.orderPartActualList;
    if (listActual.length > 0) {
      this.orderPartTableData = listActual;
        this.orderPartTableData.forEach(element => {
          this.$set(element, 'sku', element.partCode);
          this.$set(element, 'enName', element.enName);
          this.$set(element, 'tmpPartNumber', element.partCnt);
        });
    } else {
      this.orderPartTableData = list;
        this.orderPartTableData.forEach(element => {
          this.$set(element, 'sku', element.partCode);
          this.$set(element, 'enName', element.partEName);
          this.$set(element, 'tmpPartNumber', element.partCnt);
        });
    }
  },
  methods: {
      assPartSelectionAdd() {
        if (this.accessories.trim() === '' || Number.parseInt(this.tmpPartNumber) <= 0 || this.assSelectPart.value === undefined) {
          this.$message.error(this.$t('order.Detail.worryaboutyourIQ'));
          return;
        }
        // 追加配件
        let orderPart;
        // 配件是否已追加 确认
        for (orderPart of this.orderPartTableData) {
            if (this.assSelectPart.owner === orderPart.owner && this.assSelectPart.sku === orderPart.sku) {
              this.$message.error(this.$t('order.Detail.Accessoriesadded'));
              this.assSelectPart = {};
              return;
          }
        }

        this.$set(this.assSelectPart, 'tmpPartNumber', this.tmpPartNumber);
        this.tmpPartNumber = 1; // 临时配件数量清空
        // Array.prototype.push.apply(this.orderPartTableData, this.assPartsSelectArray); //刷新触发不能
        this.orderPartTableData = [...this.orderPartTableData, this.assSelectPart];
        console.log('#########################');
        console.dir(this.assSelectPart);
        this.accessories = ''; // clear
        this.showPartName = ''; // clear
        this.assSelectPart = {};
    },
      // 删除特定配件
      partSelectDelete(item) {
        console.dir(item);
        const rtnArray = this.orderPartTableData;
        this.orderPartTableData.forEach((element, index) => {
            if (element.owner === item.owner && element.sku === item.sku) {
                rtnArray.splice(index, 1);
            }
        });
        // 重新覆盖
        this.orderPartTableData = rtnArray;
        this.accessories = ''; // clear
        this.showPartName = ''; // clear
      },
      loadAll() {
        // 获取信息
        const partProviderCode = this.$store.getters.providerCode;
        const orderNumber = this.$route.params.orderNumber;

        // 获取特定所有备件信息
        getPartInfoListByPO(partProviderCode, orderNumber).then(response => {
          console.dir(response);
            if (response.data.status === '0') {
            const list = response.data.rsltData;
            list.forEach(element => {
             this.$set(element, 'value', element.enName);
            });
                this.partlist = list;
            }
        });
      },
      querySearchAsync(queryString, cb) {
        const tmpPartlist = this.partlist;
        const results = queryString ? tmpPartlist.filter(this.createStateFilter(queryString)) : tmpPartlist;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return state => {
          return state.value.indexOf(queryString.toLowerCase()) > -1 || state.cnName.indexOf(queryString.toLowerCase()) > -1 || state.sku.indexOf(queryString.toLowerCase()) > -1;
        };
      },
      handleSelect(item) {
        console.log('---->item---->------------------->');
        console.log(item);
        this.showPartName = item.enName;
        this.assSelectPart = item;
      },
      plus() {
        this.tmpPartNumber++;
      },
      minus() {
        if (this.tmpPartNumber >= 2) {
        this.tmpPartNumber--;
        }
      },
      plusItem(item) {
        item.tmpPartNumber++;
      },
      minusItem(item) {
        if (item.tmpPartNumber >= 2) {
        item.tmpPartNumber--;
        }
      },
      confirm() {
        // this.checkReportForm.orderPartList = this.orderPartTableData;
        // 局部属性调整
        const tmpList = this.orderPartTableData;
        tmpList.forEach(element => {
          this.$set(element, 'partCnt', element.tmpPartNumber);
          this.$set(element, 'partCode', element.sku);
          this.$set(element, 'orderNumber', this.$route.params.orderNumber)
          this.$set(element, 'providerCode', this.$store.getters.providerCode);
          this.$set(element, 'createUser', this.$store.getters.uid);
        });
        this.repairForm.actualOrderPartList = tmpList;
        //防止连续点击两次
        $('#btnSubmit').attr('disabled', 'true');
        setTimeout(() => {
            $('#btnSubmit').removeAttr('disabled');
        }, 3000);
        repair(this.repairForm).then(response => {
            console.dir(response);
            if (response.data.status === '0') {
                this.$message.info(this.$t('order.Detail.Repairfinish'));
                this.$emit('listenBaseInfo');
                $('#myModal7').modal('hide');
            } else {
                // 异常信息
                const rsltList = response.data.rsltData;
                if (rsltList !== 'undefined' && rsltList.length > 0) {
                    let errorMsg = '';
                    rsltList.forEach(element => {
                      // 库存校验失败信息
                        errorMsg += 'sku:' + element.sku + ' need ' + element.actualNeedNum + ' but available is ' + element.availableNum + '! ';
                    });
                    this.$message.error(errorMsg);
                } else {
                    this.$message.error('Error! ' + response.data.message);
                }
                // $('#myModal7').modal();
            }
        });
      }
  },
  mounted() {
    this.loadAll();
  }
}
</script>
<style>
  .modal-body .modal_find td{
    word-break: break-all;
  }
</style>