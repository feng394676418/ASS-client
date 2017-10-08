<!--输入工单编号组件  备用-->

<template>
  <div>

 <form action="/manufacturer/workorder/search" class="search-form search-form-expanded" method="get">
                    <div class="input-group">
                      <span class="input-group-btn">
                        <a href="javascript:;" class="btn submit">
                          <i class="icon-search"></i>
                        </a>
                      </span>
                      <input type="text" class="form-control" maxlength="50" placeholder="输入工单编号..." name="number"></div>
                  </form>

  </div>
</template>


<script>
export default {
  name: 'searchOrderChild',
  props: '',
  data() {
    return {

    }
  }
}
</script>
