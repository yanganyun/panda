import Vue from 'vue'
import Router from 'vue-router'
import routersData from './router'

Vue.use(Router)

//根据导航文件自动生成路由文件
var routers = [];

//其它页面路由
var pageList = routersData.pageList;
for(var j=0;j<pageList.length;j++){
  var thisRouter = pageList[j];
  var thisPath = thisRouter.path,
    thisName = thisPath.replace(/.+\/(.*)$/g,'$1');
  routers.push({path: thisPath, name: (thisName&&thisName!='/')?thisName:'index', title: thisRouter.title});
}

//导航路由
var navList = routersData.navList;
for(var i=0;i<navList.length;i++){
  var thisList = navList[i].list;
  for(var j=0;j<thisList.length;j++){
    var thisRouter = thisList[j];
    var thisPath = thisRouter.path,
      thisName = thisPath.replace(/.+\/(.*)$/g,'$1');
    routers.push({path: thisPath, name: thisName?thisName:'index', title: thisRouter.title});
  }
}


//根据路由文件自动加载依赖文件
let routesArr = [];
for(var i=0;i<routers.length;i++){
  var thisR = routers[i];
  var thisPath = thisR.path.replace(/(.+\/).*$/g,'$1');
  var component = require('@/pages' + thisPath + thisR.name + '.vue');
  routesArr.push({
    path: thisR.path,
    name: thisR.name,
    meta:{
      title: thisR.title
    },
    component: component.default
  });
};



//设置路由
const newRouter = new Router({
  mode: 'history', //启用history模式
  base: __dirname,
  routes: routesArr
});

//设置页面title
newRouter.afterEach((transition) => {
  let title = transition.meta.title;
  if(title){
    document.title = title;
  }
})

export default newRouter;

