<template>
  <div class="cms-page">
    <cmsAside :activeTitle="'2-4'"></cmsAside>

    <div class="cms-main">

      <h2 class="cms-page-title">calendar / 日历</h2>

      <h3>引入组件</h3>
      <p>組件位置根据不同的平台而定，这里引入的是H5和PC项目的路径。</p>
      <p class="red2"><span>*</span> 注意组件内部<span class="code2">~/plugins/panda/calendar/index.vue</span>引入的样式，如果是PC端引入pc.scss，移动端引入mobile.scss</p>
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
      
      <script class="preCode" type="text/plain" maxHeight="300" brush="html">
        <calendar v-model="changeDate" bindDom="js_time" type="multi2" size="big" showDouble="2" maxMonths="6" @change="selectDate"></calendar>
      </script>

      
      <p><span class="red2">v-model</span>：绑定选中的日期，如果是单选默认值为字符串<span class="code2">"2019-08-12"</span>，多选默认值为数组<span class="code2">["2019-08-12"]</span>。</p>
      <p><span class="red2">bindDom</span>：绑定的输入框的className，含有这个class的输入框focus的时候就会唤起日历。</p>
      <p><span class="red2">type</span>：日期选择的方式，默认为单选。<span class="code2">multi1</span>为多选（点击选择），<span class="code2">multi2</span>为多选（范围选择）。</p>
      <p><span class="red2">size</span>：日历的尺寸，可设置为<span class="code2">mini</span>和<span class="code2">big</span>，默认为<span class="code2">mini</span>。</p>
      <p><span class="red2">showDouble</span>：是否为双日历。</p>
      <p><span class="red2">maxMonths</span>：限制日历的最大显示月数。默认不限制。</p>
      <p><span class="red2">@change</span>：选择日期后的回调。</p>
      
      
      
      




      


      
      <!-- 代码示例1  -->
      <h3>Demo1<span>大日历多选（范围选取和反选）</span></h3>
      <p class="mb10">当前选中日期：{{changeDate}}</p>
      
      <calendar type="multi2" size="big" showDouble="true" maxMonths="6" v-model="changeDate" @change="selectDate"></calendar>


      <h3>Demo2<span>小日历单选</span></h3>
      <p class="mb10">当前选中日期：<input class="input js_time" v-model="changeDate2" type="text"></p>
      <calendar bindDom="js_time" size="mini" oldDate="true" maxMonths="6" v-model="changeDate2" @change="selectDate"></calendar>

      

      <h3>Demo3<span>小日历多选（单击选取）</span></h3>
      <p class="mb10">当前选中日期：<input class="input js_time2" v-model="changeDate4" type="text"></p>
      <calendar bindDom="js_time2" type="multi" size="mini" maxMonths="6" v-model="changeDate4" @change="selectDate"></calendar>

      <h3>Demo4<span>小日历多选（范围选取）</span></h3>
      <p class="mb10">当前选中日期：<input class="input js_time3" v-model="changeDate5" type="text"></p>
      <calendar bindDom="js_time3" type="multi2" size="mini" showDouble="true" maxMonths="3" v-model="changeDate5" @change="selectDate"></calendar>

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
      priceData: [
        {'date':'2018-08-26','sale':true,'stock':12},
        {'date':'2018-08-27','sale':true,'stock':6},
        {'date':'2018-08-28','sale':true,'stock':2}
      ],

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

      

      if(data.el.querySelectorAll('.calendar_big').length || data.el.querySelectorAll('.calendar_big_double').length){
        
        //清除所有可售字段
        var $list = data.el.querySelectorAll('.day_list .is_sale');
        for(var i=0;i<$list.length;i++){
          $list[i].remove();
        }
        
        //根据选择添加可售字段
        var $active = data.el.querySelectorAll('.active');
        for(var i=0;i<$active.length;i++){
          var tipDom = document.createElement('div');
          tipDom.className='is_sale';
          tipDom.innerHTML = '可售';
          $active[i].appendChild(tipDom);
        }
      }
      
      
    }
  }
}

</script>

<style lang="scss">
  .input{
    outline: none;
  }
  
</style>
