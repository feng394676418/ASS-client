<!--下载运单组件-->

<template>
  <div class="pull-left" style="margin-right:15px;">
	 <div class="btn btn-primary2"><a @click="open()" data-toggle="modal">{{$t('order.Detail.downloadWaybill')}}</a></div>
    <!--{{baseInfo.surfaceUrl}}-->
  </div>
</template>

<script>

export default {
  name: 'downWaybillButtonChild',
  props: {
      baseInfo: {}
  },
  data() {
    return {

    }
  },
  methods: {
    open() {
      window.open(this.baseInfo.surfaceUrl);
    }
  }
}
</script>
