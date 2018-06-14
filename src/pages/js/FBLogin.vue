<template>
  <div class="cms-page">
    <cmsAside :activeTitle="'3-1'"></cmsAside>

    <div class="cms-main">

      <h2 class="cms-page-title">Facebook 登录</h2>

      <h3>引入组件</h3>
      
      <script class="preCode" type="text/plain" maxHeight="300" brush="js">
      import FBLogin from "~/plugins/panda/FBLogin/";
      </script>

      <h3>调用方法</h3>

      <h4>登录</h4>
      
      <script class="preCode" type="text/plain" brush="js">
      //登录，登录成功后默认刷新页面
      new FBLogin();

      //登录加回调
      new FBLogin({
        loginCallBack:function(){
          window.location.href="/";
        }
      });

      </script>

      <h4>退出登录</h4>
      
      <script class="preCode" type="text/plain" brush="js">
      
      //退出登录，退出成功后默认刷新页面
      new FBLogin({
        logout:true
      });

      //退出加回调
      new FBLogin({
        logout:true,
        logoutCallBack:function(){
          window.location.href="/";
	      }
      });

      </script>

    </div>
  </div>
</template>

<script>
import cmsAside from '@/components/common/cmsAside.vue';


export default {
  name: 'index',
  components: {
    cmsAside
  },
  data () {
    return {
      
    }
  },
  mounted(){

  },
  methods:{
    
  }
}

</script>
