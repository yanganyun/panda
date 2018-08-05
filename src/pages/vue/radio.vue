<template>
  <div class="cms-page">
    <cmsAside :activeTitle="'2-3'"></cmsAside>

    <div class="cms-main">

      <h2 class="cms-page-title">Radio / 单选框</h2>

      <h3>引入组件</h3>
      <p>組件位置根据不同的平台而定，这里引入的是H5和PC项目的路径。</p>
      <script class="preCode" type="text/plain">
      import {radioGroup,radio} from "~/plugins/panda/radio/"

      export default {
        name: 'demo',
        components: {
          radioGroup,
          radio
        }
        ......
      }
      </script>

      <p class="red2"><span>*</span> 注意组件内部<span class="code2">~/plugins/panda/radio/radio.vue</span>引入的样式，如果是PC端引入pc.scss，移动端引入mobile.scss</p>




      <h3>组件介绍</h3>
      
      <script class="preCode" type="text/plain" maxHeight="300" brush="html">
        <radio-group v-model="radioValue2">
          <radio v-for="(item,index) in radioList2" :key="index" :disabled="index>1" :label="item">{.{item}}</radio>
        </radio-group>
      </script>
      <p><span class="red2">radio-group</span>：复选框组，用于挂载当前选中的数据。</p>
      <p><span class="red2">radio</span>：用于渲染checkbox结构和数据。</p>
      <script class="preCode" type="text/plain" maxHeight="300" brush="html">
      <radio v-for="(item,index) in radioList" :key="index" v-model="radioValue" :change="changeFn" :label="item">{.{item}}</radio>
      </script>
      <p><span class="red2">label</span>：用于填充和标记内容。</p>
      <p><span class="red2">v-model</span>：用于设置选中状态。</p>
      <p><span class="red2">change</span>：选中时的回调事件。</p>
      <script class="preCode" type="text/plain" maxHeight="300" brush="js">
      export default {
        methods: {
          changeFn(e){
            console.log(e.target.value);  //当前的checkbox值
            console.log(e.target.checked);  //选中状态
          }
        }
      }
      </script>

      


      <h3>Demo1<span>radio</span></h3>
      <p>
        <radio v-model="radioValue" v-for="(item,index) in radioList" :key="index" :change="changeFn" :label="item">{{item}}</radio>
      </p>
      <p class="mt10">您已选：<span class="red2">{{radioValue}}</span></p>
      
      <!-- 代码示例1  -->
      <script class="preCode" type="text/plain" maxHeight="300">
      <radio v-model="radioValue" v-for="(item,index) in radioList" :key="index" :change="changeFn" :label="item">{.{item}}</radio>
      <p class="mt10">您已选：<span class="red2">{.{radioValue}}</span></p>

      import {radioGroup,radio} from "~/plugins/panda/radio/"

      export default {
        name: 'index',
        components: {
          radioGroup,
          radio
        },
        data () {
          return {
            radioValue:'男',
            radioList:['男', '女', '人妖']
          }
        }
      }
      </script><!-- 代码示例1  -->

      
      <h3>Demo2<span>radio-group</span></h3>
      <p>
        <radio-group v-model="radioValue2">
          <radio v-for="(item,index) in radioList2" :key="index" :disabled="index>1" :label="item">{{item}}</radio>
        </radio-group>
      </p>
      <p>您已选：<span class="red2">{{radioValue2}}</span></p>


      <!-- 代码示例2  -->
      <script class="preCode" type="text/plain" maxHeight="300">
      <radio-group v-model="radioValue2">
        <radio v-for="(item,index) in radioList2" :key="index" :disabled="index>1" :label="item">{.{item}}</radio>
      </radio-group>
      <p>您已选：<span class="red2">{.{radioValue2}}</span></p>

      import {radioGroup,radio} from "~/plugins/panda/radio/"

      export default {
        name: 'index',
        components: {
          radioGroup,
          radio
        },
        data () {
          return {
            radioValue2:'',
            radioList2:['男', '女', '人妖'],
          }
        }
      }
      </script><!-- 代码示例2  -->
      <br>

    </div>
  </div>
</template>

<script>
import cmsAside from '@/components/common/cmsAside.vue';
import {radioGroup,radio} from "@/panda/vue/radio/"

export default {
  name: 'index',
  components: {
    cmsAside,
    radioGroup,
    radio
  },
  data () {
    return {
      radioValue:'男',
      radioList:['男', '女', '人妖'],

      radioValue2:'',
      radioList2:['男', '女', '人妖'],
    }
  },
  mounted(){
    
  },
  methods:{
    changeFn(e){
      console.log(e.target.value);  //当前的checkbox值
      console.log(e.target.checked);  //选中状态
    }
  }
}

</script>
