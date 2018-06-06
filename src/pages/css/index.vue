<template>
  <div class="cms-page">
    <cmsAside></cmsAside>

    <div class="cms-main">

      <h2 class="cms-page-title">CMS管理系统</h2>

      

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
      title : 'Localpanda CMS 管理系统',
      keywords: 'Localpanda CMS 管理系统',
      description: 'Localpanda CMS 管理系统'
    }
  },
  head(){
    return {
      title: this.title,
      meta: [{
        name: "keywords",
        content: this.keywords
      },
      {
        name: "description",
        content: this.description
      }]
    }
  },
  mounted(){

  },
  methods:{
    
  }
}

</script>
