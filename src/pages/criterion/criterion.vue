<template>
  <div class="cms-page">
    <cmsAside :activeTitle="'1-2'"></cmsAside>

    <div class="cms-main">

      <h2 class="cms-page-title">开发规范</h2>

      <h3>JS书写规范</h3>

      <h4>1.1 命名规范</h4>
      <p><span class="red2 mr10">变量名</span>采用驼峰写法，首字母小写。例如：<span class="code2">camelName</span></p>
      <p><span class="red2 mr10">类名</span>采用驼峰写法，首字母大写。例如：<span class="code2">CamelName</span></p>
      <p><span class="red2 mr10">常量</span>全部大写，多词用下划线分割。例如：<span class="code2">UPPERCASE_WORD</span></p>


      <h4>1.2 申明多个变量</h4>
      <script class="preCode" type="text/plain">
      //不好的写法
      var count = 10;
      var name = "John.Chen";
      var email = "123456@qq.com";

      //好的写法
      var count = 10,
        name = "John.Chen",
        email = "123456@qq.com";
      </script>

      <h4>1.3 函数</h4>
      <script class="preCode" type="text/plain">
      // 不好的写法：函数名后面不恰当的空格
      function doSomething (arg1, arg2) {
        return arg1 + arg2;
      }

      // 不好的写法： 左侧的花括号位置不对
      function doSomething(arg1, arg2)
      {
        return arg1 + arg2;
      }

      //好的写法
      function doSomething(arg1, arg2) {
        return arg1 + arg2;
      }
      </script>

      <h4>1.4 三木运算符</h4>
      <script class="preCode" type="text/plain">
      //不好的写法
      
      a+b>10?'安云'+'大神':'前端开发'+'机器人';


      //好的写法，1、条件较多或有运算符，则用括号包起来。2、三木运算符左右需用空格隔开。

      (a+b>10) ? ('安云'+'大神') : ('前端开发'+'机器人');
      </script>


      <h4>1.5 避免重复查找深层对象</h4>
      <script class="preCode" type="text/plain">
      var test = {
        list: {
          list1: {a: 1, b: 4, c: 5},
          list2: {a: 2, b: 5, c: 5},
          list3: {a: 3, b: 6, c: 5}
        }
      }

      //不好的写法
      test.list.list1.a;
      test.list.list1.b;
      test.list.list1.c;


      //好的写法，将公用的对象申明为一个变量，下次读取则只用读取一层数据。特别是在for循环里操作大量数据时，性能就很差了。
      var list1 = test.list.list1;
      list1.a;
      list1.b;
      list1.c;

      </script>


      <h4>1.6 for循环性能</h4>
      <script class="preCode" type="text/plain">
      var test = {
        list: [
          {a: 1, b: 4},
          {a: 2, b: 5},
          {a: 3, b: 6}
        ]
      }

      //不好的写法
      for(var i=0; i<test.list.length; i++){
        test.list[i].a;
        test.list[i].b;
      }


      //好的写法
      var list = test.list;
      for(var i=0; i<list.length; i++){
        var thisList = list[i];
        thisList.a;
        thisList.b;
      }

      </script>


      <h4>1.7 功能模块提取</h4>
      <script class="preCode" type="text/plain">
      //已知一组数字，对小于10的数字前面补上0
      var number = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

      //不好的写法，复用逻辑操作写在程序内部，容易造成逻辑干扰，影响下次阅读。
      for(var i=0; i<number.length; i++){
        var numTest = number[i]>9 ? number[i] : ('0' + number[i]);
        number[i] = numTest;
      }


      //好的写法，将复用功能写成公共函数，在逻辑内容调用即可。
      var numTest = function(num){
        return num>9 ? num : ('0' + num);
      };
      for(var i=0; i<number.length; i++){
        number[i] = numTest(number[i]);
      }

      </script>


      

      <h3>CSS书写规范</h3>
      <h4>1.1 命名规范</h4>
      <p><span class="red2 mr10">class名称</span>采用下划线连接，便于维护时选中操作。例如：<span class="code2">camel_name</span></p>

      <h4>1.1 H5 rem比例，1rem = 100px（基于PC设计稿的像素）</h4>
      <p><span class="red2 mr10">1rem</span>目前设置的1rem比例为50px，而PC的尺寸是手机的两倍。相当于1rem等于PC设计稿100px。如果设计稿测量<span class="code2">30px=0.3rem</span> ，<span class="code2">120px=1.2rem</span>，<span class="code2">5px=0.05rem</span>，开发起来十分方便，不需要额外计算。</p>


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
