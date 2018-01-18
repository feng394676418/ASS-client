import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow
// so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout';

/* login */
const Login = _import('login/index');
const authRedirect = _import('login/authredirect');
const sendPWD = _import('login/sendpwd');
const reset = _import('login/reset');

/* dashboard */
const dashboard = _import('dashboard/index');

const OrderIndex = _import('order/index');

const providerPartInventory = _import('partInventory/provider/index');
const providerStockOrder = _import('partInventory/provider/stockOrder');
const providerStockOrderDetail = _import('partInventory/provider/stockOrderDetail');
const providerPartInventoryChange = _import('partInventory/provider/change/index');


const inventory_apply = _import('partInventory/inventory_apply');
const inventory_apply_details = _import('partInventory/detail/Inventory_apply_details');
// const inventory_bad_back = _import('partInventory/inventory_bad_back');

const PartIndex = _import('part/index');
const warehouse_index = _import('warehouse/index');
const ModelInfoIndex = _import('model/index');
const SetIndex = _import('set/index');

/* components */
// const componentsIndex = _import('components/index');
// const Tinymce = _import('components/tinymce');
// const Markdown = _import('components/markdown');
// const JsonEditor = _import('components/jsoneditor');
// const DndList = _import('components/dndlist');
// const AvatarUpload = _import('components/avatarUpload');
// const Dropzone = _import('components/dropzone');
// const Sticky = _import('components/sticky');
// const SplitPane = _import('components/splitpane');
// const CountTo = _import('components/countTo');
// const Mixin = _import('components/mixin');


/* charts */
// const chartIndex = _import('charts/index');
// const KeyboardChart = _import('charts/keyboard');
// const KeyboardChart2 = _import('charts/keyboard2');
// const LineMarker = _import('charts/line');
// const MixChart = _import('charts/mixchart');

/* error page */
const Err404 = _import('error/404');
const Err401 = _import('error/401');

/* error log */
// const ErrorLog = _import('errlog/index');

/* excel */
// const ExcelDownload = _import('excel/index');

/* theme  */
// const Theme = _import('theme/index');

/* example*/
// const TableLayout = _import('example/table/index');
// const DynamicTable = _import('example/table/dynamictable');
// const Table = _import('example/table/table');
// const DragTable = _import('example/table/dragTable');
// const InlineEditTable = _import('example/table/inlineEditTable');

const Form = _import('example/form');
const Tab = _import('example/tab/index');
const Search = _import('example/search');

/* permission */
const Permission = _import('permission/index');
const orderInfoDetail = _import('order/detail/orderInfo');
const orderDetail = _import('order/detail/orderDetail');
// const bootstrapT = _import('order/detail/bootstrapT');

Vue.use(Router);

/**
 * icon : the icon show in the sidebar
 * hidden : if hidden:true will not show in the sidebar
 * redirect : if redirect:noredirect will not redirct in the levelbar
 * noDropdown : if noDropdown:true will not has submenu
 * meta : { role: ['admin'] }  will control the page role
 **/

export const constantRouterMap = [
    { path: '/login', component: Login, hidden: true },
    { path: '/authredirect', component: authRedirect, hidden: true },
    { path: '/sendpwd', component: sendPWD, hidden: true },
    { path: '/reset', component: reset, hidden: true },
    { path: '/404', component: Err404, hidden: true },
    { path: '/401', component: Err401, hidden: true }
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});
export const asyncRouterMap_ZH_CN = [{
        path: '',
        component: Layout,
        redirect: '/dashboard',
        name: 'Home',
        icon: 'homes',
        hidden: false,
        noDropdown: true,
        children: [{ path: 'dashboard', component: dashboard, name: '首页', hidden: true }]
    },
    {
        path: '/permission',
        component: Layout,
        redirect: '/permission/index',
        name: '权限测试',
        icon: 'quanxian',
        meta: { role: ['admin'] },
        hidden: true,
        noDropdown: true,
        children: [{ path: 'index', component: Permission, name: '权限测试页', meta: { role: ['admin'] } }]
    },
    {
        path: '/baseInfo',
        redirect: '/baseInfo/detail',
        component: Layout,
        hidden: true,
        children: [{ path: 'detail/:orderNumber', component: orderDetail, hidden: true, name: '详细信息' }]
    },
    {
        path: '/order',
        component: Layout,
        redirect: '/order/index',
        icon: 'order',
        noDropdown: true,
        name: '工单管理',
        children: [{ path: 'index', component: OrderIndex, name: '工单管理' }]

    },
    {
        path: '/partInventory',
        component: Layout,
        redirect: '/partInventory/index',
        icon: 'inventory',
        name: '备件管理',
        noDropdown: false,
        children: [
            { path: 'provider/index', component: providerPartInventory, icon: 'i', name: '备件库存' },
            { path: 'provider/stockOrder', component: providerStockOrder, icon: 's', name: '备件出入库单' },
            { path: 'provider/stockOrderDetail/:stockOrderNumber', component: providerStockOrderDetail, hidden: true, name: '备件出入库单明细' },
            { path: 'provider/change/index/:sku/:owner/:providerCode/:inventoryType/:inventoryTypeName', hidden: true, component: providerPartInventoryChange, name: '库存流水' },
            { path: 'inventory_apply', component: inventory_apply, icon: 'a', name: '申请备件', meta: { role: ['engineer'] } },
            { path: 'detail/:stockOrderNumber', component: inventory_apply_details, hidden: true, name: '申请备件', meta: { role: ['engineer'] } }
            // { path: 'badback', component: inventory_bad_back, name: '坏件返厂', meta: { role: ['engineer'] } }
        ]

    },
    {
        path: '/components',
        component: Layout,
        redirect: '/components/index',
        name: '系统设置',
        icon: 'set',
        children: [
            { path: 'index', component: PartIndex, icon: 's', name: '备件设置' },
            { path: 'warehouseIndex', component: warehouse_index, icon: 'w', name: '仓库管理' },
            { path: 'set_index', icon: 'p', component: SetIndex, name: '修改密码' }
            // { path: 'model_index', component: ModelInfoIndex, name: '机型管理' } 三期启用
            // { path: 'tinymce', component: Tinymce, name: '备件库存' },
            // { path: 'markdown', component: Markdown, name: '备件出入库单' }
            // { path: 'jsoneditor', component: bootstrapT, name: '测试' }
            // { path: 'dndlist', component: DndList, name: '服务商出入库单' },
            // { path: 'splitpane', component: SplitPane, name: '备件调拨' },
            // { path: 'avatarupload', component: AvatarUpload, name: '服务商申请备件' },
            // { path: 'dropzone', component: Dropzone, name: '坏件返厂' },
            // { path: 'sticky', component: Sticky, name: 'Sticky' },
            // { path: 'countto', component: CountTo, name: 'CountTo' },
            // { path: 'mixin', component: Mixin, name: '小组件' }
        ]
    }
];