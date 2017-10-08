<template>
  <div>
    <dl class="line">
<dt>&nbsp;</dt>
	</dl>
<dl>
<dt class="active"><a href="#myModal8" data-toggle="modal">{{$t('order.Detail.Payment')}}</a></dt>
<div class="modal fade" id="myModal8" style="display: none;">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{$t('order.Detail.Payment')}}</h5></div>
      <div class="modal-body">
        <div class="order_detection main_form_input">
          <div class="panel-body">
            <form role="form">
             <div class="form-group col-md-12">
              	<label for="">{{$t('order.Detail.TransactionNo')}}</label>
                <input class="form-control" id="" v-model="tradeNumber" placeholder="" type="text"></input>
              </div>
          </form></div>
        </div>
        <div class="modal-footer">        	
          <button data-dismiss="modal" class="btn btn-cancel" type="button">{{$t('order.Cancel')}}</button>
          <button class="btn btn-primary" type="button" @click="confirm()">{{$t('order.Affirm')}}</button>
        </div>
        
      </div>
    </div>
  </div>
	  </div></dl>
    </div>
</template>


<script>
import { updateTradeNumber } from 'api/baseInfo';

export default {
  name: 'canculationButtonChild',
  props: '',
  data() {
    return {
      orderNumber: this.$route.params.orderNumber,
      tradeNumber: '',
      uid: this.$store.getters.uid
    }
  },
  methods: {
    confirm() {
      if (this.tradeNumber === '' || this.tradeNumber.trim().length === 0) {
            this.$message.error(this.$t('order.Detail.TransactionNoNOTNULL'));
            return;
      }
      // 确认
      updateTradeNumber(this.orderNumber, this.uid, this.tradeNumber).then(response => {
          if (response.data.status === '0') {
            this.$message.info(this.$t('order.Detail.settlementover'));
            this.$emit('listenBaseInfo');
            $('#myModal8').modal('hide');
          } else {
            this.$message.error(this.$t('order.Detail.Billingupdatefailed') + response.data.message);
          }
      });
    }
  }
}
</script>
