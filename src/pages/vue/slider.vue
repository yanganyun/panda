<template>
  <div class="cms-page">
    <cmsAside :activeTitle="'2-5'"></cmsAside>

    <div class="cms-main">

      <h2 class="cms-page-title">Slider / 滑块</h2>

      <h3>引入组件</h3>

      
      
      <script class="preCode" type="text/plain" maxHeight="300" brush="html">
      <slider v-model="sliderValue" max="300"></slider>
      </script>
      <script class="preCode" type="text/plain" maxHeight="300" brush="js">
      import slider from "~/plugins/panda/slider/"
      
      export default {
        components: {
          slider
        },
        data () {
          return {
            sliderValue: [50]
          }
        },
      }
      </script>
      <h4>支持属性：</h4>
      
    <p><span class="red2">v-model</span>：滑块的值，必须是一个数组。一个值就是单个滑块，两个值就是两个滑块。例如：[50] 或 [20,60]</p>
      <p><span class="red2">min</span>：最小值，默认0。</p>
      <p><span class="red2">max</span>：最大值，默认100。</p>
      <p><span class="red2">step</span>：滑动间距值，默认1。例如：案例1默认间距值是5。</p>
      <p><span class="red2">maxTipValue</span>：滑块上方提示的内容最大值的显示内容。例如：<span class="code2">maxTipValue="300+"</span>，显示效果如下面第一个案例。默认为最大值。</p>
      <p><span class="red2">tipValueTpl</span>：滑块上方提示的内容模版, <span class="code2">$1</span> 代表value值。例如：<span class="code2">tipValueTpl="占比$1%"</span>，显示效果如下面第二个案例。默认为$1。</p>
      


      <h3>Demo1 单个滑块</h3>
      
      <slider v-model="sliderValue" max="305" maxTipValue="300+" step="5"></slider>
      <div class="slider_valuebox"><span>300+</span>0</div>
      <div class="slider_valuebox">当前值：{{sliderValue[0]}}</div>

      <slider v-model="sliderValue2" max="100" tipValueTpl="占比$1%"></slider>
      <div class="slider_valuebox"><span>100%</span>0</div>
      <div class="slider_valuebox">当前值：{{sliderValue2[0]}}%</div>
      
      <h3>Demo2 两个滑块</h3>
      <slider v-model="sliderValue3" min="20" max="100"></slider>
      <div class="slider_valuebox"><span>100</span>20</div>
      <div class="slider_valuebox">当前值：{{sliderValue3[0]}} - {{sliderValue3[1]}}</div>
      
      <slider v-model="sliderValue4" max="500"></slider>
      <div class="slider_valuebox"><span>500</span>0</div>
      <div class="slider_valuebox">当前值：{{sliderValue4[0]}} - {{sliderValue4[1]}}</div>


    </div>
  </div>
</template>

<script>
import cmsAside from '@/components/common/cmsAside.vue';
import slider from "@/panda/vue/slider/"
import headBack from "@/panda/vue/header/back"


export default {
  name: 'index',
  components: {
    cmsAside,
    slider
  },
  data () {
    return {
      sliderValue: [50],
      sliderValue2: [60],
      sliderValue3: [30,82],
      sliderValue4: [0,500]
    }
  },
  mounted(){

  },
  methods:{
    
  }
}

</script>
<style lang="scss">
.slider_box{
  width: 500px;
  margin-top: 20px;
  p{
    margin: 0 !important;
  }
}
.slider_valuebox{
  margin-top: 5px;
  width: 510px;
  font-size: 14px;
  span{
    float: right;
  }
}
</style>
