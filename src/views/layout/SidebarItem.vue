<template>
    <div>
        <!--展开折叠开关-->
        <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
        <template v-for="item in routes">
            <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path+'/'+item.children[0].path">
                <el-menu-item :index="item.path+'/'+item.children[0].path">
                    <wscn-icon-svg v-if='item.icon' :icon-class="item.icon" /> {{item.children[0].name}}
                </el-menu-item>
            </router-link>
            <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden">
                <template slot="title">
                    <wscn-icon-svg v-if='item.icon' :icon-class="item.icon" /> {{item.name}}
                </template>
                <template v-for="child in item.children" v-if='!child.hidden'>
                    <sidebar-item class='menu-indent' v-if='child.children&&child.children.length>0' :routes='[child]'> </sidebar-item>
                    <router-link v-else class="menu-indent" :to="item.path+'/'+child.path">
                        <el-menu-item :index="item.path+'/'+child.path">
                            {{child.name}}
                        </el-menu-item>
                    </router-link>
                </template>
            </el-submenu>
        </template>
    </div>
</template>

<script>
import Hamburger from 'components/Hamburger';
export default {
    components: {
        Hamburger,
      },
    name: 'SidebarItem',
    props: {
        routes: {
            type: Array
        }
    },
    computed: {
        sidebar() {
            return this.$store.state.app.sidebar;
        }
    },
    methods: {
        toggleSideBar() {
            this.$store.dispatch('ToggleSideBar')
        },
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wscn-icon {
    margin-right: 10px;
}

.hideSidebar .menu-indent {
    display: block;
    text-indent: 10px;
}
</style>

<style>
.el-menu--dark {
    background: #3c3c48!important;
}

.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active,
.el-menu-item.is-active {
    background: #7757f6!important;
    color: #fff!important;
}

.el-menu--dark .el-menu-item:hover,
.el-menu--dark .el-submenu__title:hover {
    background-color: #000!important;
}

.el-menu--dark .el-menu-item,
.el-menu--dark .el-submenu__title {
    color: #9b9a9b;
}

.el-menu-item,
.el-submenu__title {
    height: 60px;
    line-height: 60px;
}
</style>