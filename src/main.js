// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引入公共样式
import './assets/css/base.css'

//引入UI框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

// import highlight from 'highlight.js'
// Vue.use(highlight);
// Vue-cli生成的工程文件的src/main.js
// import hljs from 'highlight.js'
// import 'highlight.js/styles/googlecode.css' //样式文件
// Vue.directive('highlight',function (el) {
//   let blocks = el.querySelectorAll('pre code');
//   blocks.forEach((block)=>{
//     hljs.highlightBlock(block)
//   })
// })



//引入js组件
import $ from "jquery";



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


//语法高亮
SyntaxHighlighter.all();
$('.preCode').each(function(index,item){
  var $this = $(this);
  var thisDom = $this.text().replace(/</g, '&lt;');
  $this.after('<pre class="brush:js;">'+thisDom+'</pre>');
  //<pre class="brush:js; html-script:true;">
});