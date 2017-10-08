<template>
  <div class="page-content">
    <div id="top_menu">
	            <h2 class="">坏件返厂</h2>
	            <div class="order_list_menu ">
	            	  <div class="pull-right order_list_top">
	                <form>
	                  <div class="dk_container dk_theme_default form-control default" id="dk_container_country-nofake" tabindex="0" aria-hidden="true" style="display: block;"><a class="dk_toggle dk_label icon-arrow-down3" style="width: 114px;">厂商</a><div class="dk_options"><ul class="dk_options_inner" role="main" aria-hidden="true"><li class="dk_option_current"><a data-dk-dropdown-value="厂商">厂商</a></li><li class=""><a data-dk-dropdown-value="test-1">test-1</a></li><li class=""><a data-dk-dropdown-value="test-2">test-2</a></li><li class=""><a data-dk-dropdown-value="test-3">test-3</a></li></ul></div><select class="form-control default" name="country-nofake">
	                    <option>厂商</option>
	                    <option>test-1</option>
	                    <option>test-2</option>
	                    <option>test-3</option>
	                  </select></div>
	                  
	                  <div class="dk_container dk_theme_default form-control default" id="dk_container_country-nofake" tabindex="0" aria-hidden="true" style="display: block;"><a class="dk_toggle dk_label icon-arrow-down3" style="width: 114px;">返回仓库</a><div class="dk_options"><ul class="dk_options_inner" role="main" aria-hidden="true"><li class="dk_option_current"><a data-dk-dropdown-value="返回仓库">返回仓库</a></li><li class=""><a data-dk-dropdown-value="test-1">test-1</a></li><li class=""><a data-dk-dropdown-value="test-2">test-2</a></li><li class=""><a data-dk-dropdown-value="test-3">test-3</a></li></ul></div><select class="form-control default" name="country-nofake">
	                    <option>返回仓库</option>
	                    <option>test-1</option>
	                    <option>test-2</option>
	                    <option>test-3</option>
	                  </select></div>
	                  
	                  <div class="dk_container dk_theme_default form-control default" id="dk_container_country-nofake" tabindex="0" aria-hidden="true" style="display: block;"><a class="dk_toggle dk_label icon-arrow-down3" style="width: 114px;">状态</a><div class="dk_options"><ul class="dk_options_inner" role="main" aria-hidden="true"><li class="dk_option_current"><a data-dk-dropdown-value="状态">状态</a></li><li class=""><a data-dk-dropdown-value="test-1">test-1</a></li><li class=""><a data-dk-dropdown-value="test-2">test-2</a></li><li class=""><a data-dk-dropdown-value="test-3">test-3</a></li></ul></div><select class="form-control default" name="country-nofake">
	                    <option>状态</option>
	                    <option>test-1</option>
	                    <option>test-2</option>
	                    <option>test-3</option>
	                  </select></div>
	                  
								<input readonly="readonly" name="reservation" id="reservation" class="form-control so_time" placeholder="创建时间" type="text" style="width: 195px;">
								<a class="btn btn-primary">Excel导出</a>                 
	                </form>
	              </div>
	            </div>
						</div>
      
      <div class="table-scrollable">
              <table class="table table-striped table-hover main_table">
                <thead>
                  <tr class="th_bg" role="row">
                    <th class="check_input" width="4%"><input class="" type="checkbox"></th>
                    <th class="" width="">订单编号  </th>
                    <th class="" width="">厂商  </th>
                    <th class="" width="" style="text-align: center;">返回仓库</th>
                    <th class="" width="" style="text-align: center;">状态</th>
                    <th class="" width="" style="text-align: center;">创建时间</th>
                    <th class="" width="" style="text-align: center;">创建人员</th>
                    <th class="" width="" style="text-align: center;">详情</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="">
                    <td class="check_input"><input class="" type="checkbox"></td>
                    <td class="">mmm12345678</td>
                    <td class=" ">oneplus</td>
                    <td class="" align="center">仓库PL</td>
                    <td class=" " align="center">已收货</td>
                    <td class="" align="center">2017/06/29 10:50:30</td>
                    <td class="" align="center">aaa</td>
                    <td class="" align="center"><a href="javascript:viod(0);" class="icon_check"></a></td>
             </tr></tbody>
              </table>
            </div>


            <div class="page">
              	<div class="col-md-6  all_record">
              		1-<span>50</span>条记录    共<span>16</span>条
              	</div>
              	<div class="col-md-6">
	              	<div class="page_num">
	              		<a class="disabled" href="">&lt;&lt;</a>
	              		<a class="disabled" href="">&lt;</a>
										<a class="active" href="">1</a>
										<a href="">2</a>
										<a href="">3</a>
										<a href="">......</a>
										<a href="">9</a>
										<a href="">&gt;</a>
										<a href="">&gt;&gt;</a>
	              	</div>
              	</div>
              </div>


    </div>
</template>

<script>
export default {
  name: 'inventory_bad_back',
  props: {},
  data() {
    return {

    }
  }
}
</script>

<style>
  @import '/static/css/bootstrap.min.css';
  @import '/static/css/layout.css';
  @import '/static/css/custom.css';
  @import '/static/css/default.css';
  @import '/static/css/style.css';
  @import '/static/css/style-responsive.css';
</style>
