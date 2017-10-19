<!--质量检测 质检再确认-->
<template>
  <div>
<dl id="test" class="line">
<dt>&nbsp;</dt>
	</dl>
	<dl>
<!--流程tag-->
	<dt class="active"><a href="#myModal3" data-toggle="modal">{{$t('order.Detail.QC')}}</a></dt>

	<!-- 质检 Modal -->
<div class="modal fade" id="myModal3">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{$t('order.Detail.Inspectionreport')}}</h5></div>
      <div class="modal-body">
        <div class="order_detection main_form_input">
          <div class="panel-body"> 
          	<form>
              <div class="form-group col-md-6">
                <label for="">{{$t('order.Detail.IssuesSolved')}}</label>
                    <el-select class="select_list default form-control" v-model="testReportForm.repairOK" :placeholder="$t('order.choose')">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
								<div class="clearfix"></div>		
              </div>
              <div class="form-group col-md-6">
                <label for="">{{$t('order.Detail.Fullfunctiontestresults')}}</label>
                   <el-select class="select_list default form-control" v-model="testReportForm.confirmOK" :placeholder="$t('order.choose')">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
								<div class="clearfix"></div>		
              </div>
          </form></div>
        </div>
        <div class="modal-footer">        	
          <button data-dismiss="modal" class="btn btn-cancel" type="button">{{$t('order.Cancel')}}</button>
          <button id="btnSubmit" class="btn btn-primary" type="button" @click="confirm()">{{$t('order.Affirm')}}</button>
        </div>
        
      </div>
    </div>
  </div>	            				
	  </div></dl>
</div>
</template>


<script>
import { testOrder } from 'api/report';

export default {
  name: 'testButtonChild',
  props: '',
  data() {
    return {
      testReportForm: {
        orderNumber: this.$route.params.orderNumber,
        repairOK: true,
        confirmOK: true,
        confirmUser: this.$store.getters.uid
      },
      options: [{
          value: true,
          label: this.$t('order.Detail.yes')
           }, {
          value: false,
          label: this.$t('order.Detail.no')
          }]
    }
  },
  methods: {
    confirm() {
      //防止连续点击两次
      $('#btnSubmit').attr('disabled', 'true');
      setTimeout(() => {
          $('#btnSubmit').removeAttr('disabled');
      }, 3000);
      testOrder(this.testReportForm).then(response => {
            if (response.data.status === '0') {
              this.$message.info(this.$t('order.Detail.qualityResult'));
              this.$emit('listenBaseInfo');
              $('#myModal3').modal('hide');
            } else {
              this.$message.error(this.$t('exception') + ':' + response.data.message);
            }
      });
    }
  }
}
</script>
