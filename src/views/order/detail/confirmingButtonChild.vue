<!--确认报价组件-->

<template>
  <div>
<dl class="line">
<dt>&nbsp;</dt>
	</dl>
<dl>
	 <dt class="active"><a href="#myModal6" data-toggle="modal">{{$t('order.Detail.Confirmtheoffer')}}</a></dt>
	            				
<div class="modal fade" id="myModal6">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{$t('order.Detail.Confirmtheoffer')}}</h5></div>
      <div class="modal-body">
        <div class="order_detection main_form_input">
          <div class="panel-body">
            <form role="form">
              <div class="col-md-12">
	              <div class="form-group">	                
	                <p>{{$t('order.Detail.Quotationdescription')}}</p>
	              </div>
              </div>
          </form></div>
        </div>
        <div class="modal-footer">        	
          <button data-dismiss="modal" class="btn btn-cancel" type="button">{{$t('order.Cancel')}}</button>
          <button class="btn btn-primary" type="button" @click="confirm()" >{{$t('order.Affirm')}}</button>
        </div>
        
      </div>
    </div>
  </div>
</div></dl>

  </div>
</template>


<script>

import { confirmQuotesUpdate } from 'api/report';

export default {
  name: 'confirmingButtonChild',
  props: '',
  data() {
    return {
      orderNumber: this.$route.params.orderNumber,
      uid: this.$store.getters.uid
    }
  },
  methods: {
    confirm() {
      confirmQuotesUpdate(this.orderNumber, this.uid).then(response => {
          if (response.data.status === '0') {
              this.$message.info(this.$t('order.Detail.Quoteconfirmedfinished'));
              this.$emit('listenBaseInfo');
              $('#myModal6').modal('hide');
          } else {
              this.$message.info(this.$t('order.Detail.Quoteconfirmationfailed'));
          }
      });
    }
  }
}
</script>
