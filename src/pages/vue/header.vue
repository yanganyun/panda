<template>
  <div class="cms-page">
    <cmsAside :activeTitle="'2-1'"></cmsAside>

    <div class="cms-main">

      <h2 class="cms-page-title">公共头部</h2>

      <h3>H5公共头部</h3>
      <p>头部改版中....</p>

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
