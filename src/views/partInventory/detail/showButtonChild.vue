<template>
<div>

<dl>
      <dt :class="logInfo.className"><a>{{logInfo.logStatus | logStatusName}}</a></dt>
      <dd>
        <p><img alt="" class="img-circle" :src="logInfo.imageSrc"><strong>{{logInfo.userName}}</strong></p>
        <p class="description">{{logInfo.organization}}</p>
        <p><i class="icon_data"></i>{{logInfo.createDate}}</p>
      </dd>
    </dl>
    <dl class="line" :style="logInfo.cssStyle">
	    <dt>&nbsp;</dt>
</dl>
</div>

</template>



<script>
import Vue from 'vue';

export default {
  name: 'showButtonChild',
  props: {
    logInfo: {}
  },
  data() {
    return {
      logStatusNameArray: this.$t('part.logStatusArray')
    }
  },
  beforeCreate() {
      console.log('!!!!!!!!!!!!!!!!!!!');
      console.dir(this.logStatusNameArray);
      const this_ = this;
      Vue.filter('logStatusName', status => {
      console.dir(this_.logStatusNameArray);
      let name = '';
      this_.logStatusNameArray.forEach(item => {
        if (item.status === status) {
          name = item.name;
          return item.name;
        }
      });
      return name;
      });
  }
}

</script>



<style>

</style>




