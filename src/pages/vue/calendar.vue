<template>
  <div class="cms-page">
    <cmsAside :activeTitle="'2-4'"></cmsAside>

    <div class="cms-main">

      <h2 class="cms-page-title">calendar / 日历</h2>

      <h3>引入组件</h3>
      <p>組件位置根据不同的平台而定，这里引入的是H5和PC项目的路径。</p>
      <script class="preCode" type="text/plain">
      import calendar from "~/plugins/panda/calendar/"

      export default {
        name: 'demo',
        components: {
          calendar
        }
        ......
      }
      </script>


      <calendar type="min"></calendar>


      <h3>组件介绍</h3>

      <p class="red2"><span>*</span> 注意组件内部<span class="code2">~/plugins/panda/radio/radio.vue</span>引入的样式，如果是PC端引入pc.scss，移动端引入mobile.scss</p>


      <h3>Demo1<span></span></h3>
      <!-- 代码示例1  -->

      
      <h3>Demo2<span>radio-group</span></h3>



    </div>
  </div>
</template>

<script>
import cmsAside from '@/components/common/cmsAside.vue';
import calendar from "@/panda/vue/calendar/"

export default {
  name: 'index',
  components: {
    cmsAside,
    calendar
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
