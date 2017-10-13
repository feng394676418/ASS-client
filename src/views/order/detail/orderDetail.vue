<template>
<div class="page-content">
        <!-- BEGIN PAGE CONTENT-->
        <div class="">
          <div class="side-menu-content">
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
                        <!-- <li class="dropdown">
                          <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-close-others="true" title="">
                            <i class="icon-add"></i>
                          </a>
                          <ul class="dropdown-menu dropdown-menu-default">
                            <li>
                               <a href="javascript:;">
                                <i class="icon-doc"></i>新建备件申请</a> 
                            </li>
                          </ul>
                        </li> -->

											<!--<li class="dropdown dropdown-extended dropdown-notification" id="header_notification_bar">                          
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

	            <h2 class="title_shadow">{{$t('order.refNumber')}}{{baseInfo.refNumber}}
	            <div class="pull-right">
								<!--下载运单 子组件-->
								<template v-if="logInfoStatus >= 18">
											<downWaybillButtonChild :baseInfo = "baseInfo"></downWaybillButtonChild>
								</template>
            		<a class="btn btn-warning" href="#/order/index">{{$t('BACK')}}</a>
                <!--角色子组件-->
                <!-- <editOrderButtonChild></editOrderButtonChild>

                <editOrderButtonChildDisabled></editOrderButtonChildDisabled> -->
                <!--角色子组件-->
            	</div>
	            </h2>
	            <div class="order_det">
	            	<div class="side-menu-sidebar" id="float">
	            		<h4><i class="h4_client"></i>{{$t('order.userInfo')}}</h4>
	            		<div class="side_content">
										<div class="clearfix">
											<div class="col-md-5 col-sm-3 col-xs-4">
												{{$t('order.userName')}}：
											</div>
											<div class="col-md-7 col-sm-9 col-xs-8">
												{{baseInfo.userName}}
											</div>
										</div>
										<div class="clearfix">	
											<div class="col-md-5 col-sm-3 col-xs-4">
												{{$t('order.tel')}}:
											</div>
											<div class="col-md-7 col-sm-9 col-xs-8">
												{{baseInfo.userPhone}}
											</div>
										</div>
										<div class="clearfix">	
											<div class="col-md-5 col-sm-3 col-xs-4">
												{{$t('order.mail')}}: 
											</div>
											<div class="col-md-7 col-sm-9 col-xs-8">
												{{baseInfo.userEmail}}
											</div>
										</div>
										<div class="clearfix">
											<div class="col-md-5 col-sm-3 col-xs-4">
												{{$t('order.address')}}: 
											</div>
											<div class="col-md-7 col-sm-9 col-xs-8">
												{{baseInfo.userAddress}}
											</div>
										</div>
										<div class="clearfix">
											<div class="col-md-5 col-sm-3 col-xs-4">
												{{$t('order.city')}}: 
											</div>
											<div class="col-md-7 col-sm-9 col-xs-8">
												{{baseInfo.userCity}}
											</div>
										</div>
										<div class="clearfix">
											<div class="col-md-5 col-sm-3 col-xs-4">
												{{$t('order.province')}}:  
											</div>
											<div class="col-md-7 col-sm-9 col-xs-8">
												{{baseInfo.userProvince}}
											</div>
										</div>
										<div class="clearfix">
											<div class="col-md-5 col-sm-3 col-xs-4">
												{{$t('order.country')}}: 
											</div>
											<div class="col-md-7 col-sm-9 col-xs-8">
												{{baseInfo.userCountry}}
											</div>
										</div>
										<div class="clearfix">
											<div class="col-md-5 col-sm-3 col-xs-4">
												{{$t('order.zipcode')}}: 
											</div>
											<div class="col-md-7 col-sm-9 col-xs-8">
												{{baseInfo.userPostcode}}
											</div>
										</div>
										<div class="clearfix">
											<div class="col-md-5 col-sm-3 col-xs-4">
												{{$t('order.Alternativecontact')}}: 
											</div>
											<div class="col-md-7 col-sm-9 col-xs-8">
												{{baseInfo.emergencyName}}
											</div>
										</div>
										<div class="clearfix">	
											<div class="col-md-5 col-sm-3 col-xs-4">
												{{$t('order.Alternativecontacttel')}}:  
											</div>
											<div class="col-md-7 col-sm-9 col-xs-8">
												{{baseInfo.emergencyPhone}}
											</div>
										</div>
										<div class="clearfix">
											<div class="col-md-5 col-sm-3 col-xs-4">
												{{$t('order.AWBNo')}}: 
											</div>
											<div class="col-md-7 col-sm-9 col-xs-8">
												{{baseInfo.trackingNo}}
											</div>
										</div>
										<div class="clearfix">
											<div class="col-md-5 col-sm-3 col-xs-4">
												{{$t('order.Courier')}}: 
											</div>
											<div class="col-md-7 col-sm-9 col-xs-8">
												{{baseInfo.expressCode}}
											</div>
										</div>	
	            		</div>
	            		<h4><i class="h4_product"></i>	{{$t('order.Detail.productinformation')}}</h4>
	            		<div class="side_content">
										<div class="clearfix">
											<div class="col-md-5 col-sm-3 col-xs-4">
												{{$t('order.productType')}}: 
											</div>
											<div class="col-md-7 col-sm-9 col-xs-8">
												{{baseInfo.productType}}
											</div>
										</div>
										<div class="clearfix">	
											<div class="col-md-5 col-sm-3 col-xs-4">
											{{$t('order.imei')}}: 
											</div>
											<div class="col-md-7 col-sm-9 col-xs-8">
												{{baseInfo.imei}}
											</div>
										</div>
										<div class="clearfix">	
											<div class="col-md-5 col-sm-3 col-xs-4">
												{{$t('order.Purchasedate')}}: 
											</div>
											<div class="col-md-7 col-sm-9 col-xs-8">
												{{baseInfo.orderTime}}
											</div>
										</div>
										<div class="clearfix">													
											<div class="col-md-5 col-sm-3 col-xs-4">
											{{$t('order.Color')}}: 
											</div>
											<div class="col-md-7 col-sm-9 col-xs-8">
												{{baseInfo.color}}
											</div>
										</div>
										<div class="clearfix">		          
											<div class="col-md-5 col-sm-3 col-xs-4">
												{{$t('order.Appearance')}}: 
											</div>
											<div class="col-md-7 col-sm-9 col-xs-8">
												{{baseInfo.appearance}}
											</div>
										</div>
										<div class="clearfix">
											<div class="col-md-5 col-sm-3 col-xs-4">
												{{$t('order.Accessories')}}: 
											</div>
											<div class="col-md-7 col-sm-9 col-xs-8">
												{{baseInfo.partsStatus}}
											</div>
										</div>
										<div class="clearfix">
											<div class="col-md-5 col-sm-3 col-xs-4">
												{{$t('order.Failuredescription')}}: 
											</div>
											<div class="col-md-7 col-sm-9 col-xs-8">
													{{baseInfo.troubleInfo}}
											</div>	
										</div>
		            	</div>
	            		<h4><i class="h4_provider"></i>{{$t('order.Detail.Serviceproviderinfo')}}</h4>
	            			<div class="side_content white_bg">
											<div class="clearfix">
												<div class="col-md-5 col-sm-3 col-xs-4">
													{{$t('order.facilitatorName')}}: 
												</div>
												<div class="col-md-7 col-sm-9 col-xs-8">
													{{baseInfo.providerCode}} <!--facilitatorCode 服务商CODE-->
												</div>
											</div>
											<div class="clearfix">
												<div class="col-md-5 col-sm-3 col-xs-4">
													{{$t('order.tel')}}: 
												</div>
												<div class="col-md-7 col-sm-9 col-xs-8">
													{{baseInfo.providerPhone}}
												</div>
											</div>
											<div class="clearfix">
												<div class="col-md-5 col-sm-3 col-xs-4">
													{{$t('order.mail')}}: 
												</div>
												<div class="col-md-7 col-sm-9 col-xs-8">
													{{baseInfo.providerEmail}}
												</div>
											</div>
											<div class="clearfix">
												<div class="col-md-5 col-sm-3 col-xs-4">
													{{$t('order.address')}}: 
												</div>
												<div class="col-md-7 col-sm-9 col-xs-8">
													{{baseInfo.providerAddress}}
												</div>
											</div>
											<div class="clearfix">
												<div class="col-md-5 col-sm-3 col-xs-4">
													{{$t('order.city')}}: 
												</div>
												<div class="col-md-7 col-sm-9 col-xs-8">
													{{baseInfo.providerCity}}
												</div>
											</div>
											<div class="clearfix">
												<div class="col-md-5 col-sm-3 col-xs-4">
													{{$t('order.province')}}: 
												</div>
												<div class="col-md-7 col-sm-9 col-xs-8">
													{{baseInfo.providerProvince}}
												</div>
											</div>
											<div class="clearfix">
												<div class="col-md-5 col-sm-3 col-xs-4">
													{{$t('order.country')}}: 
												</div>
												<div class="col-md-7 col-sm-9 col-xs-8">
													{{baseInfo.providerCountry}}
												</div>
											</div>
											<div class="clearfix">
												<div class="col-md-5 col-sm-3 col-xs-4">
													{{$t('order.zipcode')}}: 
												</div>
												<div class="col-md-7 col-sm-9 col-xs-8">
													{{baseInfo.providerPostcode}}
												</div>
											</div>
		            		</div>
	            	</div>
	            	<div class="side-menu-content2">
	            		<p class="right_top_tips"><i class="icon_tips"></i>
									<template v-if="logInfoStatus === 11">
									{{$t('order.Detail.establishmentworkorder')}}
									</template>
									<template v-if="logInfoStatus === 1">
									{{$t('order.Detail.workorderaccepted')}}
									</template>
									<template v-if="logInfoStatus === 12">
									{{$t('order.Detail.workordertested')}}
									</template>
									<template v-if="logInfoStatus === 13">
									{{$t('order.Detail.Workorderconfirmed')}}
									</template>
									<template v-if="logInfoStatus === 14">
									{{$t('order.Detail.workorderrepaired')}}
									</template>
									<template v-if="logInfoStatus === 15">
									{{$t('order.Detail.Workorderqualityinspection')}}
									</template>
									<template v-if="logInfoStatus === 16 && baseInfo.checkServiceType === '保内维修' ">
									{{$t('order.Detail.workorderdelivered')}}
                  </template>
                  <template v-if="logInfoStatus === 16 && baseInfo.checkServiceType === '保外维修'">
									{{$t('order.Detail.workordersettled')}}
                  </template>
									<template v-if="logInfoStatus === 17">
									{{$t('order.Detail.workordershipped')}}
									</template>
									<template v-if="logInfoStatus === 18">
									{{$t('order.Detail.workorderreceived')}}
									</template>
									<template v-if="logInfoStatus === 19">
									{{$t('order.Detail.endworkorder')}}
									</template>
									</p>
	            		<div class="scroll-bar">
	            			<div class="scroll-box">
                    <div>
                    </div>
                    <!--显示组件-->
                    <!--日志 循环显示-->
                    <template v-for="(detailValue,index) in detailValueList">
                         <showButtonChild :detailValue="detailValue" :key="index"></showButtonChild>
                    </template>
                    <!--show button component-->

										<!--编辑工单 按钮显示-->
										<!--一加厂商权限-->
										<template v-if="providerCode.substr(0,1) === 'B' && ( logInfoStatus === 11 || logInfoStatus === 1 )">
											<editOrderButtonChild :baseInfo="baseInfo" v-on:listenBaseInfo="refreshBaseInfo"></editOrderButtonChild>
										</template>

                    <!--受理 子组件 维修显示--> 
                    <!--角色权限追加 判断条件status role authorization-->
                      <template v-if="providerCode.substr(0,1) === 'C' && (logInfoStatus === 11 || logInfoStatus === 1)">
                        <acceptButtonChild :baseInfo="baseInfo" v-on:listenBaseInfo="refreshBaseInfo"></acceptButtonChild> 
                      </template>
                      
                     <!--检测 子组件 维修显示-->
                     <template v-if="providerCode.substr(0,1) === 'C' && logInfoStatus === 12 ">
                       <checkButtonChild :baseInfo="baseInfo" v-on:listenBaseInfo="refreshBaseInfo"></checkButtonChild>
                     </template>

                    <!--确认报价 子组件 货主显示-->
                    <template v-if="providerCode.substr(0,1) === 'B' && logInfoStatus === 13">
                      <confirmingButtonChild v-on:listenBaseInfo="refreshBaseInfo"></confirmingButtonChild>
                    </template>
                    <!--维修 子组件 服务商显示-->
									  <template v-if="providerCode.substr(0,1) === 'C' && ( logInfoStatus === 14 || ( logInfoStatus === 16 && logInfoRemark === 'reject' ) )">
											<maintenanceButtonChild :baseInfo="baseInfo" v-on:listenBaseInfo="refreshBaseInfo"></maintenanceButtonChild>
										</template>

                    <!--质检 子组件显示 服务商显示-->
										<template v-if="providerCode.substr(0,1) === 'C' && logInfoStatus === 15">
                    <testButtonChild v-on:listenBaseInfo="refreshBaseInfo"></testButtonChild>
										</template>

										<!--保内不结算 不显示-->
                    <!--结算 子组件 服务商-->
										<template v-if="providerCode.substr(0,1) === 'C' && logInfoStatus === 16 && logInfoRemark !== 'reject' && baseInfo.checkServiceType === '保外维修'">
                    <canculationButtonChild v-on:listenBaseInfo="refreshBaseInfo"></canculationButtonChild>
										</template>

                    <!--发货 子组件 服务商-->
										<template v-if="providerCode.substr(0,1) === 'C' && logInfoStatus === 17 || ( providerCode.substr(0,1) === 'C' && logInfoStatus === 16 && logInfoRemark !== 'reject' && baseInfo.checkServiceType === '保内维修' )">
                    <sendGoods :baseInfo="baseInfo" v-on:listenBaseInfo="refreshBaseInfo"></sendGoods>
										</template>

                    <!--已收货 子组件-->
										<template v-if="providerCode.substr(0,1) === 'C' && logInfoStatus === 18">
                    <takingButtonChild v-on:listenBaseInfo="refreshBaseInfo"></takingButtonChild>
										</template>

										<input style="width:0;height:0;border:none;background:none;" v-focus/> 
	            			</div>
	            		</div>

									<div class="right_main_con">
           				 <!--产品流程内容-->
									
									<template v-if="logInfoStatus >= 13">

	            			<h3>{{$t('order.Detail.Producttesting')}}</h3>
	            			<div class="right_inner_con">
	            				<div class="col-md-3 col-sm-6 col-xs-6">
	            					{{$t('order.Detail.Physicalmodel')}}:<span>{{baseInfo.checkProductTypeCFM ? baseInfo.productType : baseInfo.checkProductType}}</span><span :class="baseInfo.checkImeiCFM ? 'text_blue' : 'text_yellow'">{{baseInfo.checkProductTypeCFM ? '('+$t('order.Detail.Match')+')':'('+$t('order.Detail.Mismatch')+')'}}</span>
	            				</div>
	            				<div class="col-md-3  col-sm-6 col-xs-6">
	            					{{$t('order.Detail.PhysicalIMEI')}}:<span>{{baseInfo.checkImeiCFM ? baseInfo.imei : baseInfo.checkImei}}</span><span :class="baseInfo.checkImeiCFM ? 'text_blue' : 'text_yellow'">{{baseInfo.checkImeiCFM ? '('+$t('order.Detail.Match')+')':'('+$t('order.Detail.Mismatch')+')'}}</span>
	            				</div>
	            				<div class="col-md-3  col-sm-6 col-xs-6">
	            					{{$t('order.Detail.Servicetype')}}:<span>{{baseInfo.checkServiceType === '保外维修' ? this.$t('order.Detail.Outwarranty') : this.$t('order.Detail.Inwarranty') }} </span>
	            				</div>
	            				<div class="col-md-3  col-sm-6 col-xs-6">
	            					{{$t('order.Detail.RepairLevel')}}:<span>{{baseInfo.checkRepairLevel}}</span>
	            				</div>
	            				<div class="clearfix"></div>
	            				<div class="col-md-12">
	            					{{$t('order.Detail.IdentifiedFailure')}}:<span>{{baseInfo.checkCauseInfo}}</span>
	            				</div>
	            				<div class="clearfix"></div>

	            				<div class="grey_bg">
												<div v-for=" item in baseInfo.orderPartList" :key="item.partCode">
													<div class="col-md-3  col-sm-6 col-xs-6">
														{{$t('order.Detail.SKU')}}：<span>{{item.partCode}}</span>
													</div>
													<div class="col-md-3  col-sm-6 col-xs-6">
														{{$t('order.Detail.Sparepartsname')}}：<span>{{item.partEName}}</span>
													</div>
													<div class="col-md-3  col-sm-6 col-xs-6">
														{{$t('order.Detail.Quantity')}}：<span>{{item.partCnt}}</span>
													</div>
													<div class="col-md-3  col-sm-6 col-xs-6">
														{{$t('order.Detail.Price')}}：<span></span><span class="text_yellow">€ {{item.partCntTotalPrice | money}}</span>
													</div>
												</div>
	            				<div class="clearfix"></div>
	            				</div>


	            				<div class="clearfix"></div>
	            				<div class="grey_bg">		            			
		            				<div class="col-md-3  col-sm-6 col-xs-6">
		            					{{$t('order.Detail.Inboundshippingcost')}}:<span></span><span class="text_yellow">€ {{baseInfo.collectionCost | money}}</span>
		            				</div>
		            				<div class="col-md-3  col-sm-6 col-xs-6">
		            					{{$t('order.Detail.OutboundShippingCost')}}:<span></span><span class="text_yellow">€ {{baseInfo.mailingCost | money}}</span>
		            				</div>
		            				<div class="col-md-3  col-sm-6 col-xs-6">
		            					{{$t('order.Detail.Servicecost')}}:<span></span><span class="text_yellow">€ {{baseInfo.repairCost | money}}</span>
		            				</div>
		            				<div class="col-md-3  col-sm-6 col-xs-6">
		            					{{$t('order.Detail.Total')}}:<span class="text_yellow big_text">€ {{baseInfo.collectionCost + baseInfo.mailingCost + baseInfo.repairCost + baseInfo.partsCost | money}}</span><span></span>
		            				</div>	
	            				<div class="clearfix"></div>
	            				</div>
	            				<div class="order_img col-md-12" id="layer-photos-demo">
												<div v-for="addr in baseInfo.checkPhotoGrpurl.split(',')" :key="addr">
	            					<a @click="handleView(addr)"><img :layer-src="addr" :src="addr" layer-index="0"></a>
												</div>
	            				</div>
	            			</div>
	            			<div class="clearfix"></div>

										</template>


								<!--实际维修结果 已经维修待质检 维修结果出-->
										<template v-if="logInfoStatus >= 15">
											<h3>{{$t('order.Detail.partActuralUseTitle')}}</h3>
											<div class="right_inner_con">
	            				<div class="grey_bg"><!--实际维修用备件信息-->
												<div class="clearfix"></div>
												<div v-for=" item in baseInfo.orderPartActualList" :key="item.partCode">
													<template v-if="item.partCnt > 0">
													<div class="col-md-3  col-sm-6 col-xs-6">
														{{$t('order.Detail.SKU')}}：<span>{{item.partCode}}</span>
													</div>
													<div class="col-md-3  col-sm-6 col-xs-6">
														{{$t('order.Detail.Sparepartsname')}}：<span>{{item.enName}}</span>
													</div>
													<div class="col-md-3  col-sm-6 col-xs-6">
														{{$t('order.Detail.Quantity')}}：<span>{{item.partCnt}}</span>
													</div>
													<div class="clearfix"></div>
													</template>
												</div>
	            				</div>
											</div>
											<div class="clearfix"></div>
									</template>

										<template v-if="logInfoStatus >= 16">
											<div v-for="testReport in baseInfo.testReportList" :key="testReport.confirmrptId">
	            			<h3>{{$t('order.Detail.QCreport')}}({{testReport.confirmrptId}})<span :class="testReport.repairOK&&testReport.confirmOK?'fail qualified':'fail'">{{testReport.repairOK&&testReport.confirmOK?$t('order.Detail.QCPass'):$t('order.Detail.QCFail')}}</span>
	            				<div class="pull-right">
	            					<div class="pull-left h3_right">
	            						{{$t('order.Detail.malfunction')}}:<span>{{testReport.repairOK ? $t('order.Detail.solved'):$t('order.Detail.unsolved')}} </span>
	            					</div>
	            					<div class="pull-left">
	            						{{$t('order.Detail.FullFunctionReport')}}:<span>{{testReport.confirmOK? $t('order.Detail.solved'):$t('order.Detail.unsolved')}} </span>
	            					</div>
	            				</div>
	            			</h3>
										</div>
									</template>


									<template v-if="logInfoStatus >= 17 && baseInfo.checkServiceType === '保外维修'">
	            			<h3>{{$t('order.Detail.Payment')}} 
	            				<div class="pull-right">
	            					<div class="">
	            						{{$t('order.Detail.TransactionNo')}}:<span>{{baseInfo.tradeNumber}} </span>
	            					</div>
	            				</div>
	            			</h3>
										</template>


									<template v-if="logInfoStatus >= 18">
	            			<h3>{{$t('order.Detail.ShipmentInfo')}} </h3>
	            			<div class="right_inner_con no_border">
	            			<div class="col-md-3  col-sm-6 col-xs-6">
	            					{{$t('order.Detail.Courier')}}:<span>{{baseInfo.sendExpresscode}}</span>
	            			</div>
	            			<div class="col-md-3  col-sm-6 col-xs-6">
	            					{{$t('order.Detail.AWBNo')}}:<span>{{baseInfo.sendTrackingNo}}</span>
	            			</div>
	            			<div class="col-md-6  col-sm-12 col-xs-12">
	            					 {{$t('order.Detail.RecipientAddress')}}:<span>{{baseInfo.userAddress}}</span>
	            			</div>
	            		</div>
	            		
									</template>

										<div class="clearfix"></div>
									
	            		</div>     
	            	</div>
	            </div>
         </div>
				 <!-- <el-dialog v-model="dialogVisible" size="tiny">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog> -->

        </div>
        <!-- END PAGE CONTEN --></div>

</template>

<script>
import { mapGetters } from 'vuex';
import { getBaseInfo } from 'api/baseInfo';
import { getLogDetail } from 'api/logInfo';
import { checkOrderExist } from 'api/morder';
import bootstrap from 'bootstrap';


// 子组件引入
import showButtonChild from './showButtonChild';
import acceptButtonChild from './acceptButtonChild';
import checkButtonChild from './checkButtonChild';
import testButtonChild from './testButtonChild';
import sendGoods from './sendGoods';
import editOrderButtonChild from './editOrderButtonChild';
import editOrderButtonChildDisabled from './editOrderButtonChildDisabled';
import confirmingButtonChild from './confirmingButtonChild';
import maintenanceButtonChild from './maintenanceButtonChild';
import canculationButtonChild from './canculationButtonChild';
import takingButtonChild from './takingButtonChild';
import downWaybillButtonChild from './downWaybillButtonChild';
import rightButtonChild from './../../layout/rightButtonChild';

// const partOptions = ['包装盒', '数据线', '适配器'];
const progressSTS = ['first_line', 'active', '', 'last_line', 'no_line'];
export default {
  name: 'orderDetail',
  components: { showButtonChild, acceptButtonChild, checkButtonChild, testButtonChild, downWaybillButtonChild, rightButtonChild,
   sendGoods, editOrderButtonChild, editOrderButtonChildDisabled, confirmingButtonChild, maintenanceButtonChild, canculationButtonChild, takingButtonChild },
  data() {
		return {
			partsStatusArray: [],
      providerCode: '', // 所属组织CODE
			logInfoStatus: 99,
			logInfoRemark: '',
      detailValueList: [],
      // orderPartNum: 0,
      sendGood: { visibility: 'hidden' },
      test: '',
      partImageList: [{ name: '1.jpg', url: 'http://localhost:8000/20170726150509512.jpg' }, { name: '2.jpg', url: 'http://localhost:8000/20170726150509512.jpg' }], // 配件图像列表初始利用
      assPartsSelectArray: [],
      uploadFileCnt: 1,
      // dialogImageUrl: '',
      dialogVisibledialogVisible: false,
      assPartsdialogVisible: false,
      repairLevels: ['L0'], // 维修服务选择
      orderTime: '',
      accessories: '', // 配件查询key
      pickerOptions0: {
        // 无效时间限定
        // disabledDate(time) {
        //   return time.getTime() < Date.now() - 8.64e7;
        // }
      },
      searchValue: '',
      stepActive: 2,
      acceptDialog: true, // 受理工单
      orderCheckDialog: false, // 检测工单
			activeName: ['1', '2', '3'],
			baseInfo: {},
      // PartInfoList: [{}], // 配件一览表
      orderNumber: this.$route.params.orderNumber,
      options: [{
          value: '外观完好',
          label: this.$t('order.Detail.Normal')
        }, {
          value: '外观破损',
          label: this.$t('order.Detail.Abnormal')
        }],
    // value: '外观完好',
      checkAll: true,
      checkedParts: [],
      parts: [this.$t('order.Giftbox'), this.$t('order.USBcable'),this.$t('order.Poweradaptor')],
      isIndeterminate: true
		}
	},
	created() {
		this.fetchData();
	},
	computed: {
		...mapGetters([
          'name',
          'avatar',
          'email',
          'uid',
          'introduction',
          'roles'
		])
	},
	filters: {
        money(val) {
        val = val==undefined?'':val.toString().replace(/\$|,/g, '');
        if (isNaN(val)) {
          val = '0';
        }
        const sign = val === (val = Math.abs(val));
        val = Math.floor(val * 100 + 0.50000000001);
        let cents = val % 100;
        val = Math.floor(val / 100).toString();
        if (cents < 10) {
          cents = '0' + cents;
        }
        for (let i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
            val = val.substring(0, val.length - (4 * i + 3)) + ',' + val.substring(val.length - (4 * i + 3));
        }

        return sign ? '' : val + '.' + cents;
				},
				actualUseFilter(orderPartActualList) {
					orderPartActualList.forEach(item => {
					});
					return orderPartActualList;
				}
	},
	// directives: {
	// 		focus: {
  //       inserted: el => {
  //          el.focus();
  //       }
  //   }
	// },
	methods: {
		handleView(addr) {
			// this.dialogVisible = true;
			// this.dialogImageUrl = addr;
			// 图片点击放大
			layer.photos({
				photos: '#layer-photos-demo'
				,anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
			});			
		},
		searchOrderInfo() {
			// 查询
			if (this.searchValue === '' || this.searchValue.trim().length === 0) {
				this.$message.error(this.$t('order.Detail.enterworkorderno'));
			}

			checkOrderExist(this.searchValue, this.$store.getters.providerCode).then(response => {
						if (response.data.status === '0') {
							this.$router.push({ path: '/baseInfo/detail/' + response.data.rsltData });
						} else {
							this.$message.error('Exception:' + response.data.message);
						}
			});
		},
		fetchData() {
        this.providerCode = this.$store.getters.providerCode;

				getBaseInfo(this.orderNumber).then(response => {
					this.baseInfo = response.data;
					console.dir(this.baseInfo);
					if(this.getAppLanguage()=='en' && this.baseInfo.partsStatus != '' && this.baseInfo.partsStatus != null){
	
							this.baseInfo.partsStatus = this.baseInfo.partsStatus.replace('包装盒','Giftbox').replace('数据线','USB cable').replace('适配器','Power adaptor');
        	}
					this.partsStatusArray = this.baseInfo.partsStatus === '' || this.baseInfo.partsStatus === null ? [] : this.baseInfo.partsStatus.split(',');

					if(this.getAppLanguage()=='en' && this.baseInfo.appearance != '' && this.baseInfo.appearance != null){
                this.baseInfo.appearance = this.baseInfo.appearance.replace('外观完好','Normal').replace('外观破损','Abnormal');
          }
					this.$set(this.baseInfo, 'partsStatusArray', this.partsStatusArray);
        });

        getLogDetail(this.orderNumber).then(response => {
					this.detailValueList = response.data.rsltData;
          const towner = this;
          this.detailValueList.forEach((element, index, array) => {
              if (index === 0 && array.length !== 1) {
                towner.$set(element, 'className', progressSTS[0]);
              } else if (index === 0 && array.length === 1) {
								if (towner.providerCode.substr(0, 1) === 'B') {
									towner.$set(element, 'className', progressSTS[0]);
									towner.logInfoStatus = element.logStatus;
								} else {
									// 服务商  受理按钮有
									towner.logInfoStatus = element.logStatus;
									towner.$set(element, 'className', progressSTS[0]);
									towner.$set(element, 'styleValue', '');
								}
							} else if (index === array.length - 1) {
								towner.$set(element, 'className', progressSTS[3]);
								towner.$set(element, 'styleValue', 'visibility:hidden');
								towner.logInfoStatus = element.logStatus;
								towner.logInfoRemark = element.remark;
                if (towner.providerCode.substr(0, 1) === 'B') {
                    // 货主
                    if (element.logStatus === 1 || element.logStatus === 13) {
                      // 确认报价按钮
											towner.$set(element, 'className', progressSTS[2]);
											towner.$set(element, 'styleValue', '');
                    }
                } else if (towner.providerCode.substr(0, 1) === 'C') {
                    // 维修商
										if (element.logStatus === 11 || element.logStatus === 1 || element.logStatus === 12 || element.logStatus === 14 ||
										element.logStatus === 15 || (element.logStatus === 16) || element.logStatus === 17 || element.logStatus === 18) {
                        // 受理按钮||检测按钮||维修按钮||质检按钮 ||维修按钮 有
                        // towner.$delete(element, 'className');
												towner.$set(element, 'className', progressSTS[2]);
												towner.$set(element, 'styleValue', '');
                    }
                }
              } else {
                towner.$set(element, 'className', progressSTS[2]);
              }
					});
        });
    },
      // get info from the chile component!
      refreshBaseInfo(data) {
        this.baseInfo = data;
        this.fetchData();
      }
	}
}
</script>

<style scoped>
@import '/static/css/bootstrap.min.css';
@import '/static/css/layout.css';
@import '/static/css/custom.css';
@import '/static/css/default.css';
@import '/static/css/style.css';
@import '/static/layer/skin/default/layer.css';

  .el-input__inner {
    height: 28px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }

  .box-card {
		width: 20%;
		float: left;
	}
	
	.box-card2 {
		padding-top: 20px;
		padding-left: 2%;
		width: 80%;
		float: left;
		height: 50%;
	}
		.box-card3 {
		padding-top: 20px;
		padding-left: 2%;
		width: 80%;
		float: left;
		height: 50%;
  }
   .left-margin{
     margin-left: 15px;
   }


   .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
	}


</style>