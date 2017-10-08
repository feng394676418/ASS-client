<template>

<div class="side-menu-sidebar2">
            <div class="scroller">
              <div class="portlet portlet-nav">
                <div class="portlet-title">
                  <div class="caption">
                    <span class="uppercase">库存管理</span>
                    </div>
                  <div class="btn-group pull-right esh-set-btn-group">
<!--                    <a href="javascript:;" class="" data-toggle="dropdown" aria-expanded="false">
                      <i class="icon-arrow-down2"></i>
                    </a>-->
  
                  </div>
                </div>
              </div>
              <div class="portlet-body side-menu-project-list-content" id="lst1">
                <div class="side-menu-project-list" data-always-visible="1" data-rail-visible1="1">
                   <ul class="nav nav-pills nav-stacked esh-nav-pills">
                    <li class="">
                      <a href="#">
                        <span>备件库存</span>
                      </a>
                    </li>
                    <li class="">
                      <a href="#">
                        <span>备件出入库单</span>
                      </a>
                    </li>
                    <li class="cap_title">
                        <span class="caption">备件调拨</span>
                    </li>
                    <li class="active">
                      <a href="#">
                        <span>服务商申请备件</span>
                      </a>
                    </li>
                    <li class="">
                      <a href="#">
                        <span>坏件返厂</span>
                      </a>
                    </li>

                  </ul>
                </div>
              </div>
            </div>
          </div>

</template>

<script>
export default {
  name: 'SideMenuBar',
  props: {},
  data() {
    return {

    }
  }
}
</script>


<style>

</style>
