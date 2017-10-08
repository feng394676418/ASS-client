<template>
    <div class="dashboard-editor-container">
        <div class="page-header navbar" style="position: absolute; right: 30px; top: 10px; height: 30px;">
        <!-- BEGIN HEADER INNER -->
        <div class="page-header-inner">
            <div class="pull-right">
            <!-- BEGIN HEADER SEARCH BOX -->
            <div class="top-menu">
                <ul class="nav navbar-nav">
                <li>
                    <rightButtonChild></rightButtonChild>
                </li>
                </ul>
            </div>
            <!-- END TOP NAVIGATION MENU --></div>
        </div>
        </div>

        <div class=" clearfix" style="padding-top:65px;">
            <PanThumb style="float: left" :image="avatar"> 你的权限:
                <span class="pan-info-roles" v-for="item in roles" :key="item">{{item}}</span>
            </PanThumb>
            <div class="info-container">
                <span class="display_name">{{name}}</span>
                <div class="info-wrapper">
                    <div class="info-item" :to="'/article/wscnlist?uid='+uid">
                         <countTo class="info-item-num" :startVal='0' :endVal='statisticsData.article_count' :duration='3400'></countTo>
                        <span class="info-item-text">工单</span>
                        <wscn-icon-svg icon-class="a" class="dashboard-editor-icon"/>
                    </div>
                    <div class="info-item" style="cursor: auto">
                        <countTo class="info-item-num"  :startVal='0' :endVal='statisticsData.pageviews_count' :duration='3600'></countTo>
                        <span class="info-item-text">已处理</span>
                        <wscn-icon-svg icon-class="b" class="dashboard-editor-icon"/>
                    </div>
                    <div class="info-item" :to="'/comment/commentslist?res_author_id='+uid">
                         <countTo class="info-item-num" ref='countTo3' :startVal='0' :endVal='statisticsData.comment_count' :duration='3800'></countTo>
                        <span class="info-item-text">剩余</span>
                        <wscn-icon-svg icon-class="c" class="dashboard-editor-icon"/>
                    </div>
                </div>
            </div>
        </div>

        <div style="margin:150px 0 60px 0">
             <!-- <router-link class="pan-btn pink-btn" to="/excel/index">导出excel</router-link>
             <router-link class="pan-btn light-blue-btn" to="/charts/index">图表</router-link> -->
             <!-- <router-link class="pan-btn red-btn" to="/errorpage/404">错误页面</router-link> -->
        </div>
        <!-- <div class="btn-group">
            <router-link class="pan-btn blue-btn" to="/components/index">组件</router-link>
            <router-link class="pan-btn light-blue-btn" to="/charts/<in></in>dex">图表</router-link>
            <router-link class="pan-btn red-btn" to="/errorpage/404">错误页面</router-link>
            <router-link class="pan-btn pink-btn" to="/excel/download">导出excel</router-link>
            <router-link class="pan-btn green-btn" to="/example/table/table">Table</router-link>
            <router-link class="pan-btn tiffany-btn" to="/example/form/edit">Form</router-link>
        </div> -->

        <div class="clearfix main-dashboard-container">
            <div class="chart-container">
                <MonthKpi style="border-bottom: 1px solid #DEE1E2;"
                          :articlesComplete='statisticsData.month_article_count'></MonthKpi>

                <!--子组件引用-->
                <ArticlesChart :listData='statisticsData.week_article'></ArticlesChart>
            </div>
            <div class="recent-morder-container">
                <div class="recent-morder-title">{{$t('order.toDo_tasks')}}</div>
                <div class="recent-morder-wrapper">
                    <template v-if="morders.length!=0">
                        <div class="recent-morder-item" v-for="item in morders" :key="item.orderNumber">
                            <span class="recent-morder-status">{{item.status | statusName}}</span>
                             <router-link class="recent-morder-content" :to="'/baseInfo/detail/'+item.orderNumber">
                                {{item.refNumber}}
                             </router-link>
                            <span class="recent-morder-content" style="margin-left:20px">{{item.createUser}}</span>
                            <span class="recent-morder-time">{{item.createDate}}</span>
                        </div>
                    </template>
                    <template v-else>
                        <div class="recent-morder-emptyTitle">{{$t('order.noData')}}</div>
                    </template>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import PanThumb from 'components/PanThumb';
    import MonthKpi from './monthKpi';
    import ArticlesChart from './articlesChart';
    import { getList } from 'api/morder';
    import countTo from 'vue-count-to';
    import Vue from 'vue';
    import Cookies from 'js-cookie';
    import rightButtonChild from './../../layout/rightButtonChild';

    export default {
      name: 'dashboard-editor',
      components: { PanThumb, MonthKpi, ArticlesChart, countTo, rightButtonChild },
      data() {
        return {
          statusNameArray: this.$t('order.statusItems'),
          chart: null,
          statisticsData: {
            article_count: 1024,
            comment_count: 102400,
            latest_article: [],
            month_article_count: 28,
            pageviews_count: 1024,
            week_article: [
               { count: 30, week: '201716' },
                { count: 26, week: '201715' },
                { count: 31, week: '201714' },
                { count: 28, week: '201713' },
                { count: 40, week: '201712' },
                { count: 41, week: '201711' },
                { count: 50, week: '201710' },
                { count: 42, week: '201709' },
                { count: 36, week: '201708' },
                { count: 32, week: '201707' },
                { count: 40, week: '201706' },
                { count: 41, week: '201705' }
            ]
          },
          list: []
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
        ]),
        morders() {
          return this.list.slice(0, 7)
        }
      },
      methods: {
        fetchData() {
          getList(this.$store.getters.providerCode).then(response => {
            this.list = response.data;
          })
        },
        changeAssLang(lang) {
            // 转换全局语言
            //this.$i18n.locale = 'zh';
            Cookies.set('assLang', lang);
            location.reload();
        }
      },
      // 过滤器
      filters: {
        // statusFilter(status) {
        // //   const statusMap = {
        // //     11: '待受理',
        // //     12: '待检测',
        // //     13: '待确认',
        // //     14: '待维修'
        // //   };
        // //   return statusMap[status];
        // console.log('aaaaaaaaaaaaaaaaa');
        // console.log(status);
        // console.dir(this.statusNameArray);
        // }
      },
      beforeCreate() {
          const _this = this;
          let statusName;
          Vue.filter('statusName', status => {
              _this.statusNameArray.forEach(item => {
                  if (item.status === status + '') {
                    statusName = item.name;
                    return;
                  }
              });
              return statusName;
          })
      }
    }
</script>

<style>
@import '/static/css/bootstrap.min.css';
@import '/static/css/layout.css';
@import '/static/css/custom.css';
@import '/static/css/default.css';
@import '/static/css/style.css';
</style>

<style rel="stylesheet/scss" lang="scss">   
    .recent-morder-emptyTitle {
        font-size: 16px;
        color: #95A5A6;
        padding-top: 20px;
        text-align: center;
    }
    .language_down{padding-top:2px!important;} 
    .dashboard-editor-container {
        padding: 30px 50px;
        .pan-info-roles {
            font-size: 12px;
            font-weight: 700;
            color: #333;
            display: block;
        }
        .info-container {
            position: relative;
            margin-left: 190px;
            height: 150px;
            line-height: 200px;
            .display_name {
                font-size: 48px;
                line-height: 48px;
                color: #212121;
                position: absolute;
                top: 25px;
            }
            .info-wrapper {
                line-height: 40px;
                position: absolute;
                bottom: 0px;
                .info-item {
                    cursor: pointer;
                    display: inline-block;
                    margin-right: 95px;
                    .info-item-num {
                        color: #212121;
                        font-size: 24px;
                        display: inline-block;
                        padding-right: 5px;
                    }
                    .info-item-text {
                        color: #727272;
                        font-size: 14px;
                        padding-right: 5px;
                        display: inline-block;
                    }
                }
            }
            .dashboard-editor-icon {
                width: 22px;
                height: 22px;
            }
        }

        .btn-group {
            margin: 30px 36px 30px 0;
        }
        .main-dashboard-container {
            width: 100%;
            position: relative;
            border: 1px solid #DEE1E2;
            padding: 0 10px;
        }
        .chart-container {
            float: left;
            position: relative;
            padding-right: 10px;
            width: 40%;
            border-right: 1px solid #DEE1E2;
        }
        .recent-morder-container {
            padding: 12px 12px 0px;
            float: left;
            width: 60%;
            position: relative;
            .recent-morder- {
                &title {
                    font-size: 16px;
                    color: #95A5A6;
                    letter-spacing: 1px;
                    padding-left: 15px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #DEE1E2;
                }
                &more {
                    color: #2C3E50;
                    font-size: 12px;
                    float: right;
                    margin-right: 25px;
                    line-height: 40px;
                    &:hover {
                        color: #3A71A8;
                    }
                }
                &wrapper {
                    padding: 0 20px 0 22px;
                    .recent-morder- {
                        &item {
                            cursor: pointer;
                            padding: 16px 100px 16px 16px;
                            border-bottom: 1px solid #DEE1E2;
                            position: relative;
                            &:before {
                                content: "";
                                height: 104%;
                                width: 0px;
                                background: #30B08F;
                                display: inline-block;
                                position: absolute;
                                opacity: 0;
                                left: 0px;
                                top: -2px;
                                transition: 0.3s ease all;
                            }
                            &:hover {
                                &:before {
                                    opacity: 1;
                                    width: 3px;
                                }
                            }
                        }
                        &status {
                            font-size: 12px;
                            display: inline-block;
                            color: #9B9B9B;
                            padding-right: 6px;
                        }
                        &content {
                            font-size: 13px;
                            color: #2C3E50;
                            &:hover {
                                color: #3A71A8;
                            }
                        }
                        &time {
                            position: absolute;
                            right: 16px;
                            top: 16px;
                            color: #9B9B9B;
                        }
                    }
                }
            }

        }
    }
</style>
