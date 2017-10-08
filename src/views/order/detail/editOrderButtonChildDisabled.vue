<template>
  
  <div style="float:left;">
<a class="btn btn-unable popovers" data-original-title=""  data-placement="bottom" :data-content="$t('order.Detail.notallowedtoedit')" data-trigger="hover" href="javascript:viod(0);" >{{$t('order.EditWorkOrder')}}</a>
  </div>

</template>





<script>
export default {
  name: 'editOrderButtonChildDisabled',
  data() {
    return {

    }
  }
}
</script>
