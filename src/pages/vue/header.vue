<template>
  <div class="cms-page">
    <cmsAside :activeTitle="'2-1'"></cmsAside>

    <div class="cms-main">

      <h2 class="cms-page-title">公共头部</h2>

      <h3>H5公共头部</h3>
      <h4>头部类型1 <span>带导航和搜索的头部</span> </h4>
      <div class="mobile_box">
        <Head></Head>
      </div>
      <script class="preCode" type="text/plain" maxHeight="300" brush="html">
      <Head></Head>
      </script>
      <script class="preCode" type="text/plain" maxHeight="300" brush="js">
      import Head from "~/components/header/index";
      
      export default {
        components: {
          Head
        }
      }
      </script>

      <h4>头部类型2 <span>带返回、关闭、标题、操作按钮</span> </h4>
      <div class="mobile_box_min">
        <headBack title="Filter" type="close" :close="filterClose">
          <span class="filter_clear">Clear</span>
        </headBack>
      </div>
      <script class="preCode" type="text/plain" maxHeight="300" brush="html">
      <headBack title="Filter" type="close" :close="filterClose">
        <span class="filter_clear">Clear</span>
      </headBack>
      </script>
      <p><span class="red2">type</span>：close和back。设置close显示关闭按钮，设置back显示返回。默认不设置显示back</p>
      <p><span class="red2">close</span>：type为close时，关闭时的回调事件。</p>
      <p><span class="red2">headBack内部插槽</span>：写在插槽里的内容，将会显示在右上角，一般用于设置功能菜单。</p>
      <script class="preCode" type="text/plain" maxHeight="300" brush="js">
      import headBack from "~/components/header/back";
      
      export default {
        components: {
          headBack
        }
      }
      </script>

    </div>
  </div>
</template>

<script>
import cmsAside from '@/components/common/cmsAside.vue';
import Head from "@/panda/vue/header/index"
import headBack from "@/panda/vue/header/back"


export default {
  name: 'index',
  components: {
    cmsAside,
    Head,
    headBack
  },
  data () {
    return {
      
    }
  },
  mounted(){

  },
  methods:{
    filterClose(){

    }
  }
}

</script>
