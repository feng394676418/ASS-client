<template>
  
<div class="page-content">
<!--head below-->
            <div class="Sharing_head">
              <!-- BEGIN HEADER -->
              <div class="page-header navbar">
                <!-- BEGIN HEADER INNER -->
                <div class="page-header-inner">
                  
                  <!-- END RESPONSIVE MENU TOGGLER -->
                  <form action="/manufacturer/workorder/search" class="search-form search-form-expanded" method="get">
                    <div class="input-group">
                      <span class="input-group-btn">
                        <a href="javascript:;" class="btn submit">
                          <i class="icon-search" @click="searchOrderInfo()"></i>
                        </a>
                      </span>
                      <input type="text" class="form-control" v-model="searchValue" maxlength="50" :placeholder="$t('order.Detail.workordernumber')" name="number"></div>
                  </form>
                  <div class="pull-right">
                    <!-- BEGIN HEADER SEARCH BOX -->
                    <!-- END HEADER SEARCH BOX -->
                    <!-- BEGIN TOP NAVIGATION MENU -->
                  <div class="top-menu">
                    <ul class="nav navbar-nav">
                      <!--<li class="dropdown">
                        <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-close-others="true" title="">
                          <i class="icon-add"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-default">
                          <li>
                            <a href="javascript:;">
                            <i class="icon-doc"></i>新建备件申请</a>
                          </li>
                        </ul>
                      </li>
											<li class="dropdown dropdown-extended dropdown-notification" id="header_notification_bar">                         
												<a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-close-others="true" :title="$t('Unreadmessage')">
													<i class="icon-bell"></i>
													<span class="badge bg-important"></span>
												</a>						
												<ul class="dropdown-menu dropdown_msg">
													<li>
														<ul class="dropdown-menu-list" tabindex="5001" style="overflow: hidden; outline: none;">
															<li class="esh-menu-list-no-msg">
																厂商一加备件申请单PP17062700001于2017/06/27 10:50:30<span class="yellow">通过审核</span>。
															</li>
															<li class="esh-menu-list-no-msg">
																工单AS170627000001于2017/06/27 10:50:30<span class="yellow">已确认报价</span>，待维修。
															</li>
															<li class="esh-menu-list-no-msg">
																工单AS170627000001于2017/06/27 10:50:30<span class="yellow">已确认报价</span>，待维修。
															</li>
															<li class="esh-menu-list-no-msg">
																厂商一加于2017/06/27 10:50:30<span class="yellow">发起坏件返厂</span>单RT17062700001，待发货。
															</li>
														</ul>
													</li>
												</ul>
											</li>-->
                        
											<li>
                        <rightButtonChild></rightButtonChild>
											</li>
										
										</ul>

                  </div>                    <!-- END TOP NAVIGATION MENU --></div>
                </div>
                <!-- END HEADER INNER --></div>
              <!-- END HEADER --></div>
            <div class="clearfix"></div>
<!--head upper-->

<h2 class="title_shadow">{{$t('stockOrder.odrNumber')}}{{baseInfo.inOutStockOrder.odrnumber}}
	            <div class="pull-right">
            		<a class="btn btn-warning" href="#/partInventory/inventory_apply">{{$t('BACK')}}</a>
            	</div>
	            </h2>

<div class="details_inner">
	            		<template v-if="lastLogStatus === 11">
	            		<p class="right_top_tips" style="padding-top: 20px;"><i class="icon_tips"></i>{{$t('part.orderpendingreview')}}</p>
									</template>
								  <template v-if="lastLogStatus === 12">
	            		<p class="right_top_tips" style="padding-top: 20px;"><i class="icon_tips"></i>{{$t('part.approvedpendingshipment')}}</p>
									</template>
									<template v-if="lastLogStatus === 13">
	            		<p class="right_top_tips" style="padding-top: 20px;"><i class="icon_tips"></i>{{$t('part.shippedpendingreceival')}}</p>
									</template>
									<template v-if="lastLogStatus === 14">
	            		<p class="right_top_tips" style="padding-top: 20px;"><i class="icon_tips"></i>{{$t('part.receivedorderfinished')}}</p>
									</template>
									<template v-if="lastLogStatus === 1">
	            		<p class="right_top_tips" style="padding-top: 20px;"><i class="icon_tips"></i>{{$t('part.Unapprovedorderclosed')}}</p>
									</template>
	            		<div class="scroll-bar" tabindex="5000" style="overflow: hidden; outline: none;">
	            			<div class="scroll-box">
	            			
									<!--日志记录-->
									<template v-for="(logInfo,index) in logInfoList">
										<showButtonChild :logInfo="logInfo" :key="index"></showButtonChild>
									</template>

										<!--服务商收货-->
										<template v-if="lastLogStatus === 13">
										<takeButtonChild v-on:listenBaseInfo="refreshBaseInfo"></takeButtonChild>
										</template>
          			</div>
	            		</div>
	            		<div class="right_main_con">
	            			<h3>{{$t('part.Sparepartsappform')}}</h3>
	            			<div class="right_inner_con">
													<div class="table-scrollable modal_find inv_table">
                    <table class="table pd_table">
                 <thead>
                  <tr class="">
                    <th class="" width="20%">{{$t('stockOrder.detail.serialNo')}}</th>
                    <th class="" width="20%">{{$t('order.Detail.SKU')}}</th>
                    <th class="" width="20%">{{$t('order.Detail.Sparepartsname')}}</th>
                    <th class="" width="20%">{{$t('part.Numberofapplications')}}</th>
                    <th class="" width="20%">{{$t('part.Serviceproexistinginventory')}}</th>
                  </tr>
                </thead>
                      <tbody>
                        <tr class="gray-bg" v-for="(item,index) in baseInfo.detailList" :key="item.sku">
                          <td class="">
                            {{index + 1}}
                          </td>
                          <td class="">
                             {{item.sku}}
                          </td>
                          <td class="">
                             {{item.cnName}}
                          </td>
                          <td class="">
                             {{item.qty}}
                          </td>
                          <td class="">
                             {{item.remnant}}
                          </td>
                        </tr>
                     </tbody>
                    </table>
                  </div>
	            			</div>
	            			<div class="clearfix"></div>	
										<template v-if="lastLogStatus === 1 || lastLogStatus >= 12">
	            			<h3>{{$t('part.Review')}}<span :class="baseInfo.inOutStockOrder.review?'fail qualified':'fail'">{{baseInfo.inOutStockOrder.review ? $t('part.pass') : $t('part.Fail')}}</span>

											<template v-if="baseInfo.inOutStockOrder.review">
	            				<div class="pull-right col-md-2">
	            					<div class="pull-left">
	            						{{$t('part.Deliverywarehouse')}}:<span>{{baseInfo.inOutStockOrder.warehouseCode}}</span>
	            					</div>
	            				</div>
										</template>
										<template v-else>
											<div class="pull-right col-md-2">
	            					<div class="pull-left">
	            						{{$t('part.reason')}}:<span>{{baseInfo.inOutStockOrder.rejectInfo}}</span>
	            					</div>
	            				</div>
										</template>

	            			</h3>
										</template>
										<template v-if="lastLogStatus >=13 ">
	            			<h3>{{$t('order.Detail.ShipmentInfo')}}</h3>
	            			<div class="right_inner_con no_border">
	            			<div class="col-md-3  col-sm-6 col-xs-6">
	            					{{$t('order.Detail.Courier')}}:<span>{{baseInfo.inOutStockOrder.logisticsCode}}</span>
	            			</div>
	            			<div class="col-md-3  col-sm-6 col-xs-6">
	            					{{$t('order.Detail.AWBNo')}}:<span>{{baseInfo.inOutStockOrder.trackingNumber}}</span>
	            			</div>
	            			<div class="col-md-6  col-sm-12 col-xs-12">
	            					 {{$t('order.Detail.RecipientAddress')}}:<span>{{baseInfo.receiveAddress}}</span>
	            			</div>
	            		</div>
									</template>
	            		<div class="clearfix"></div>
	            		</div>
	            	</div>

 </div>

</template>



<script>
import rightButtonChild from './../../layout/rightButtonChild';
import showButtonChild from './showButtonChild';
import takeButtonChild from './takeButtonChild';
import { getLogDetail } from 'api/logInfo';
import { getBaseInfo } from 'api/applyStockIn';


const progressSTS = ['first_line', 'active', '', 'last_line', 'no_line'];



export default {
  name: 'inventory_apply_details',
  props: {},
  components: { rightButtonChild, showButtonChild, takeButtonChild },
  data() {
      return {
				baseInfo: {},
				searchValue: '',
				stockOrderNumber: this.$route.params.stockOrderNumber,
				logInfoList: [],
				lastLogStatus: ''
      }
  },
  methods: {
		refreshBaseInfo() {
			this.getBaseInfo();
			this.searchLogInfoList();
		},
		searchLogInfoList() {
			// 日志记录
			getLogDetail(this.stockOrderNumber).then(response => {
					if (response.data.status === '0') {
						this.logInfoList = response.data.rsltData;
						// 项目设定
						this.logInfoList.forEach((item, index) => {
									if (index === 0 && this.logInfoList.length === 1) {
											this.$set(item, 'className', progressSTS[4]);
											this.$set(item, 'cssStyle', 'visibility:hidden');
									} else if (index === 0) {
											this.$set(item, 'className', progressSTS[0]);
									}

									if (index === this.logInfoList.length - 1 && item.logStatus !== 13 && this.logInfoList.length > 1) {
										this.lastLogStatus = item.logStatus;
										this.$set(item, 'className', progressSTS[3]);
										this.$set(item, 'cssStyle', 'visibility:hidden');
									} else if (index === this.logInfoList.length - 1 && item.logStatus === 13) {
										this.lastLogStatus = item.logStatus;
									}
						});
					}
			});
		},
    searchOrderInfo() {
			// 查询订单
		getBaseInfo(this.searchValue).then(response => {
				console.dir(response);
				if (response.data.status === '0') {
						this.baseInfo = response.data.rsltData;
				} else {
					// doNothing
				}
			});
		},
		getBaseInfo() {
			getBaseInfo(this.stockOrderNumber).then(response => {
				console.dir(response);
				if (response.data.status === '0') {
					console.log('!!!!!!!!!!!!!!!!!!!!!!!!');
						this.baseInfo = response.data.rsltData;
						console.dir(this.baseInfo.inOutStockOrder.review);
				} else {
					// doNothing
					this.$message.error(this.$t('part.Communicationabnormality'));
				}
			})
		}
  },
	created() {
		this.searchLogInfoList();
		this.getBaseInfo();
	}
}
</script>


<style scoped>
  @import '/static/css/bootstrap.min.css';
  @import '/static/css/layout.css';
  @import '/static/css/custom.css';
  @import '/static/css/default.css';
  @import '/static/css/style.css';
  @import '/static/css/style-responsive.css';

</style>
