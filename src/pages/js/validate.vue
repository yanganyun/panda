<template>
  <div class="cms-page">
    <cmsAside :activeTitle="'3-2'"></cmsAside>

    <div class="cms-main">

      <h2 class="cms-page-title">表单校验</h2>

      <h3>引入组件</h3>
      
      <script class="preCode" type="text/plain" maxHeight="300" brush="js">
      import Validate from "~/plugins/panda/validate/";
      </script>



      <h3>调用方法</h3>

      <h4>绑定类型</h4>
      <p><span class="red2">vType</span>：绑定校验类型。<span class="code2">text</span>(所有非空字符串/文本内容等)，<span class="code2">enName</span>(英文姓名)，<span class="code2">cnName</span>(中文姓名)，<span class="code2">email</span>(邮箱)，<span class="code2">phone</span>(电话号码和手机)</p>
      <script class="preCode" type="text/plain" brush="html">
      <input class="js_validate" type="text" vType="enName" placeholder="First name">
      </script>

      <h4>调用组件</h4>
      <script class="preCode" type="text/plain" brush="js">
      var fromValidate = new Validate({
        inputClassName:'js_validate', //需要校验的input的className
        errorClassName:'valError'  //报错时，会自动在input上添加的className
      });
      </script>

      <h4>检测是否全部填写正确</h4>
      <script class="preCode" type="text/plain" brush="js">
      if(fromValidate.validate()){
        alert('全部校验通过！');
      }
      </script>


      <h3>校验 Demo</h3>

      <ul class="search_info">
				<li class="user_name">
					<input class="input js_validate" type="text" vType="enName" v-model="firstName" placeholder="First name">
					<input class="input js_validate" type="text" vType="enName" v-model="lastName" placeholder="Last name">
				</li>
				<li>
					<input class="input js_validate" type="text" vType="email" v-model="email" placeholder="Email">
				</li>
				<li>
					<span class="btn" @click="submit">Submit</span>
				</li>
			</ul>
      
      <h3>校验 Demo源码</h3>
      <script class="preCode" type="text/plain" brush="js">
<ul class="search_info">
  <li class="user_name">
    <input class="input js_validate" type="text" vType="enName" v-model="firstName" placeholder="First name">
    <input class="input js_validate" type="text" vType="enName" v-model="lastName" placeholder="Last name">
  </li>
  <li>
    <input class="input js_validate" type="text" vType="email" v-model="email" placeholder="Email">
  </li>
  <li>
    <span class="btn" @click="submit">Submit</span>
  </li>
</ul>

import Validate from "~/plugins/panda/validate/";

export default {
  name: 'from',
  data () {
    return {
      firstName:'',
      lastName:'',
      email:''
    }
  },
  methods: {
    submit(){
      //校验
      if(this.validate.validate()){
        alert('全部校验通过！');
      }
    }
  },
  mounted(){

    //调用校验组件
    this.validate = new Validate({
      inputClassName:'js_validate', //需要校验的input的className
      errorClassName:'valError'  //报错时，input上添加的className
    });
    
  }
}

      </script>

    </div>
  </div>
</template>

<script>
import cmsAside from '@/components/common/cmsAside.vue';
import Validate from '@/panda/js/validate/';


export default {
  name: 'index',
  components: {
    cmsAside
  },
  data () {
    return {
      firstName:'',
      lastName:'',
      email:''
    }
  },
  mounted(){
    //调用校验组件
    this.validate = new Validate({
      inputClassName:'js_validate', //需要校验的className
      errorClassName:'valError'  //报错时，input上添加的className
    });
  },
  methods:{
    submit(){
      //校验
      if(this.validate.validate()){
        alert('全部校验通过！');
      }
    }
  }
}

</script>
<style lang="scss">
.search_info{
  margin-top: 0.08rem;
  li{
    margin-top: 0.28rem;
    overflow: hidden;
    input{
      outline: none;
    }
  }
  .user_name{
    
  }
  .valError{
    border-color: #e14f3f;
    position: relative;
    z-index: 2;
  }
}
</style>
