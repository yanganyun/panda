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


      


      <h3>组件介绍</h3>

      <p class="red2"><span>*</span> 注意组件内部<span class="code2">~/plugins/panda/radio/radio.vue</span>引入的样式，如果是PC端引入pc.scss，移动端引入mobile.scss</p>


      
      <!-- 代码示例1  -->
      <h3>Demo1<span>大日历多选（范围选取和反选）</span></h3>
      <p class="mb10">当前选中日期：{{changeDate}}</p>
      
      <calendar type="multi2" size="big" showMonth="2" maxMonths="6" v-model="changeDate" @change="selectDate"></calendar>


      <h3>Demo2<span>小日历单选</span></h3>
      <p class="mb10">当前选中日期：<input class="input js_time" v-model="changeDate2" type="text"></p>
      <calendar bindDom="js_time" size="min" oldDate="true" maxMonths="6" v-model="changeDate2"></calendar>

      

      <h3>Demo3<span>小日历多选（单击选取）</span></h3>
      <p class="mb10">当前选中日期：<input class="input js_time2" v-model="changeDate4" type="text"></p>
      <calendar bindDom="js_time2" type="multi" size="min" oldDate="true" maxMonths="6" v-model="changeDate4"></calendar>

      <h3>Demo4<span>小日历多选（范围选取）</span></h3>
      <p class="mb10">当前选中日期：<input class="input js_time3" v-model="changeDate5" type="text"></p>
      <calendar bindDom="js_time3" type="multi2" size="min" oldDate="true" maxMonths="6" v-model="changeDate5"></calendar>

      <br><br><br><br><br><br><br><br><br><br><br>
      
      



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
      changeDate: ['2018-08-26','2018-08-28'],
      changeDate2: '2018-09-08',
      changeDate3: '2018-09-08',
      changeDate4: ['2018-08-08'],
      changeDate5: ['2018-08-08']
    }
  },
  mounted(){
    
  },
  methods:{
    selectDate(data){
      //console.log(data);
    }
  }
}

</script>

<style lang="scss">
  .input{
    outline: none;
  }
</style>
