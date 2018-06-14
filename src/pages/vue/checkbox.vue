<template>
  <div class="cms-page">
    <cmsAside :activeTitle="'2-2'"></cmsAside>

    <div class="cms-main">

      <h2 class="cms-page-title">Checkbox / 复选框</h2>

      <h3>引入组件</h3>
      <p>組件位置根据不同的平台而定，这里引入的是H5和PC项目的路径。</p>
      <script class="preCode" type="text/plain">
      import {checkboxGroup,checkbox} from "~/plugins/panda/checkbox/"

      export default {
        name: 'demo',
        components: {
          checkboxGroup,
          checkbox
        }
        ......
      }
      </script>




      <h3>组件介绍</h3>
      
      <script class="preCode" type="text/plain" maxHeight="300" brush="html">
        <checkbox-group v-model="checkboxData">
          <checkbox :key="index" v-for="(item,index) in checkboxList" :label="item">{.{item}}</checkbox>
        </checkbox-group>
      </script>
      <p><span class="red2">checkbox-group</span>：复选框组，用于挂载当前选中的数据。</p>
      <p><span class="red2">checkbox</span>：用于渲染checkbox结构和数据。</p>
      <script class="preCode" type="text/plain" maxHeight="300" brush="html">
      <checkbox :key="index" v-for="(item,index) in checkboxList" :change="changeFn" v-model="true" :label="item">{.{item}}</checkbox>
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
      
      <p class="red2"><span>*</span> 注意组件内部<span class="code2">~/plugins/panda/checkbox/checkbox.vue</span>引入的样式，如果是PC端引入pc.scss，移动端引入mobile.scss</p>


      <h3>Demo1</h3>
      <p>
        <checkbox  v-model="checkedAll" :change="changeFn" :label="'全选'">全选</checkbox>
        <checkbox-group v-model="checkboxData" class="mt10">
          <checkbox :key="index" v-for="(item,index) in checkboxList" :label="item">{{item}}</checkbox>
        </checkbox-group>
      </p>
      <p class="mt10">您已选：<span class="red2">{{checkboxData.join('，')}}</span></p>
      
      <!-- 代码示例1  -->
      <script class="preCode" type="text/plain" maxHeight="300">
<checkbox v-model="checkedAll" :change="changeFn" :label="'全选'">全选</checkbox>

<checkbox-group v-model="checkboxData" class="mt10">

  <checkbox :key="index" v-for="(item,index) in checkboxList" :label="item">{.{item}}</checkbox>

</checkbox-group>

<p class="mt10">您已选：<span class="red2">{.{checkboxData.join('，')}}</span></p>


//JS部分
import {checkboxGroup,checkbox} from "~/plugins/panda/checkbox/"

export default {
  name: 'index',
  components: {
    checkboxGroup,
    checkbox
  },
  data () {
    return {
      checkboxData:['上海', '北京'],  //已选数据
      checkboxList:['上海', '北京', '广州', '深圳', '杭州'],   //城市列表
      checkedAll:false, //全选状态
    }
  },
  methods: {
    changeFn(e){
      console.log(e.target.value);
      console.log(e.target.checked);
    }
  },
  watch:{
    checkedAll:function(){
      if(this.checkedAll){
        this.checkboxData = this.checkboxList.concat();
      }else{
        this.checkboxData = [];
      }
    }
  }
}
      </script><!-- 代码示例1  -->

      
      <h3>Demo2</h3>
      <p>
        <checkbox-group v-model="checkboxData2">
          <checkbox :key="index" v-for="(item,index) in checkboxList2" :label="item" :disabled="index>2">{{item}}</checkbox>
        </checkbox-group>
      </p>
      <p>您已选：<span class="red2">{{checkboxData2.join('，')}}</span></p>


      <!-- 代码示例2  -->
      <script class="preCode" type="text/plain" maxHeight="300">
<checkbox-group v-model="checkboxData2">
  <checkbox :key="index" v-for="(item,index) in checkboxList2" :label="item" :disabled="index>2">{.{item}}</checkbox>
</checkbox-group>
<p>您已选：<span class="red2">{.{checkboxData2.join('，')}}</span></p>
      
//JS部分
import {checkboxGroup,checkbox} from "~/plugins/panda/checkbox/"

export default {
  name: 'index',
  components: {
    checkboxGroup,
    checkbox
  },
  data () {
    return {
      checkboxData2:[],
      checkboxList2:['上海', '北京', '广州', '深圳', '杭州']
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
import {checkboxGroup,checkbox} from "@/panda/vue/checkbox/"

export default {
  name: 'index',
  components: {
    cmsAside,
    checkboxGroup,
    checkbox
  },
  data () {
    return {
      checkboxData:['上海', '北京'],
      checkboxList:['上海', '北京', '广州', '深圳', '杭州'],
      checkedAll:false,

      checkboxData2:[],
      checkboxList2:['上海', '北京', '广州', '深圳', '杭州'],
      
    }
  },
  methods: {
    changeFn(e){
      console.log(e.target.value);
      console.log(e.target.checked);
    }
  },
  watch:{
    checkedAll:function(){
      if(this.checkedAll){
        this.checkboxData = this.checkboxList.concat();
      }else{
        this.checkboxData = [];
      }
    }
  }
}

</script>
