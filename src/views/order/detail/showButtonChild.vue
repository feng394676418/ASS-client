<!--子组件 LIU-->
<template>
                      <div>
	            			<dl>
	            				<dt :class="detailValue.className"><a>{{detailValue.logStatus | logStatusName}}</a></dt>
	            				<dd>
	            					<p><img alt="" class="img-circle" onerror="" :src="detailValue.imageSrc"><strong>{{detailValue.userName}}</strong></p>
	            					<p class="description">{{detailValue.providerName}}</p>
	            					<p><i class="icon_data"></i>{{detailValue.createDate}}</p>
	            				</dd>
	            			</dl>
										 <dl id="show" class="line" :style="detailValue.styleValue">
	            				<dt>&nbsp;</dt>
	            			</dl> 
                    </div>
</template>


<script>
import Vue from 'vue';

export default {
	name: 'showButtonChild',
	props: {
		detailValue: {
			logStatus: '',
			statusName: '',
			imageSrc: '',
			userName: '',
			providerName: '',
			createDate: '',
			className: '',
			styleValue: ''
		}
	},
  data() {
    return {
			logStatusNameArray: this.$t('order.logStatusNameArray')
    }
	},
		beforeCreate() {
		const this_ = this;
		let logStatusName;
		Vue.filter('logStatusName', status => {
			this_.logStatusNameArray.forEach(item => {
				if (item.status === status) {
					logStatusName = item.name;
					return;
				}
			});
			return logStatusName;
		});
	}
}
</script>

