<!--已收货 子组件-->

<template>
<div>
      <dl id="taking" class="line">
<dt>&nbsp;</dt>
	</dl>
  <dl>
<dt class="active"><a href="#myModa21" data-toggle="modal">{{$t('order.Detail.received')}}</a></dt>
<div class="modal fade" id="myModa21" style="display: none;">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{$t('order.Detail.Confirmreceipt')}}</h5></div>
      <div class="modal-body">
        <div class="order_detection main_form_input">
          <div class="panel-body">
            <form role="form">
              <div class="col-md-12">
	              <div class="form-group">	                
	                <p>{{$t('order.Detail.Confirmreceiptdescription')}}</p>
	              </div>
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

import { orderOver } from 'api/baseInfo';

export default {
  name: 'takingButtonChild',
  props: '',
  data() {
    return {
      orderNumber: this.$route.params.orderNumber,
      uid: this.$store.getters.uid
    }
  },
  methods: {
    confirm() {
      orderOver(this.orderNumber, this.uid).then(response => {
          if (response.data.status === '0') {
                this.$message.info(this.$t('order.Detail.receiptFinished'));
                this.$emit('listenBaseInfo');
                $('#myModa21').modal('hide');
          } else {
                this.$message.error(this.$t('exception') + ':' + response.data.message);
          }
      });
    }
  }
}
</script>
