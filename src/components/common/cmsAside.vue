<template>
  <div class="cms-aside">
      <div class="logo"><a href="/">Localpanda FED</a></div>

      <div class="aside-content">
        <el-menu :default-openeds="activeDown" :default-active="activeTitle" background-color="#333" text-color="#fff" active-text-color="#ffd04b">
          <!-- 内容管理 -->

          <!-- 导航渲染 -->
            <el-submenu :index="''+(titleIndex+1)" :key="item.title" v-for="(item,titleIndex) in cmsNav">
                <template slot="title"><i :class="item.icon"></i>{{item.title}}</template>
                <el-menu-item-group>
                    <el-menu-item  :key="nav.path" v-for="(nav,navIndex) in item.list" :index="(titleIndex+1)+'-'+(navIndex+1)" @click="jump(nav.path)">{{nav.title}}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

          

        </el-menu>
        
      </div>

  </div>
</template>

<script>
//导航配置文件
import cmsNav from '@/router/nav.js';

export default {
  name: 'cmsAside',
  props:{
    activeTitle : ''
  },
  data () {
    return {
      cmsNav : cmsNav,//导航结束
    }
  },
  mounted(){
    
  },
  computed:{
    activeDown(){      
      if(!this.activeTitle){
        return ['0'];
      }
      let downIndex = this.activeTitle.split('-')[0];
      return [downIndex];
    }
  },
  methods:{
    jump(href){
      location.href = href ? href : '/';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css">
  .logo{ font-size: 24px; text-align: center; height: 60px; line-height: 60px; }
  .cms-aside{
    width: 200px; 
    background-color:#333; 
    color:#fff; 
    overflow: hidden; 
    height: 100vh;
    position: fixed; left: 0; top: 0;
  }
  .cms-aside .logo a{ color: #fff;
    display: block;
    width: 100%;
    height: 100%;
  }
  .cms-aside .el-menu{ border: none;}
  .el-menu-item-group{ padding: 0 0 10px;}
  .cms-aside .el-submenu__title,.cms-aside .el-submenu .el-menu-item{ line-height: 40px; height: 40px;}
  .cms-aside .is-opened .el-submenu__title{
    background-color: #222 !important;
  }
  .cms-aside .el-menu-item-group__title{
    display: none;
  }
  .aside-content{
    max-height: calc(100% - 60px);
    overflow-y: auto;
  }
  
 .aside-content>.el-menu>li{
   border-top: #222 solid 1px;
 }
/* .aside-content .el-menu .is-active .el-menu-item:hover{
  background-color: #555 !important;
} */
 /* .el-menu .is-active .el-submenu__title{
   background-color: #555 !important;
 } */
.el-submenu .el-submenu__title i{
  vertical-align: middle;
}
.el-submenu .el-submenu__title i:nth-child(1){
  position: relative;
  top: -2px;
}
.aside-content::-webkit-scrollbar { width: 6px;  }
.aside-content::-webkit-scrollbar-track { background-color: #333;  border-radius: 3px; }
.aside-content::-webkit-scrollbar-thumb { border-radius: 3px;  background-color: #000; }
</style>