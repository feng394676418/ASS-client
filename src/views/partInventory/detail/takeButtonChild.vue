<template>
<div>
<dl class="line">
<dt>&nbsp;</dt>
	</dl>
<dl>
	 <dt class="active"><a href="#myModal8" data-toggle="modal">{{$t('part.Receipt')}}</a></dt>
</dl>

<div class="modal fade" id="myModal8" style="display: none;">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{$t('part.Receipt')}}</h5></div>
      <div class="modal-body">
        <div class="order_detection main_form_input">
          <div class="panel-body">
            <form role="form">
              <div class="col-md-12">
	              <div class="form-group">
	                <p>{{$t('part.Confirmreceipt')}}</p>
	              </div>
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
</div>
</div>
</template>

<script>
import { takeOrder } from 'api/applyStockIn';

export default {
  name: 'takeButtonChild',
  props: {},
  data() {
    return {
      inStockOrderForm: {
        stockOrderNumber: this.$route.params.stockOrderNumber,
        uid: this.$store.getters.uid
      }
    }
  },
  methods: {
    confirm() {
      //防止连续点击两次
      $('#btnSubmit').attr('disabled', 'true');
      setTimeout(() => {
          $('#btnSubmit').removeAttr('disabled');
      }, 3000);
      takeOrder(this.inStockOrderForm).then(response => {
          if (response.data.status === '0') {
              this.$message.info(this.$t('part.Receiptisfinished'));
              $('#myModal8').modal('hide');
              this.$emit('listenBaseInfo');
         } else {
              this.$message.error(response.data.message);
          }
      });
    }
  }
}
</script>

<style>

</style>