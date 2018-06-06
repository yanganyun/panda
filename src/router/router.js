//**  导航配置文件：路由,文件名,页面title  */
let routers = {

  //非导航路由写在这里
  pageList: [
    //首页
    {'title':'localpanda前端组件库','path':'/'}
  ],

  //导航路由写在这里
  navList: [
    {
      title:'开发文档',
      icon: 'el-icon-tickets',
      list:[
        {'title':'指南','path':'/criterion/guide'},
        {'title':'规范','path':'/criterion/criterion'},
        {'title':'流程','path':'/criterion/procedure'}
      ]
    },
    {
      title:'VUE',
      icon: 'el-icon-menu',
      list:[
        {'title':'H5公共头部','path':'/vue/h5_header'}
      ]
    },
    {
      title:'JS',
      icon: 'el-icon-star-on',
      list:[
        {'title':'Facebook 登录','path':'/js/FBLogin'},
        {'title':'表单校验','path':'/js/validate'},
        {'title':'日历 / 时间价格表','path':'/js/calendar'}
      ]
    },
    {
      title:'CSS',
      icon: 'el-icon-document',
      list:[
        {'title':'icon/字体','path':'/css/iconFont'},
        {'title':'按钮','path':'/css/button'}
      ]
    }
  ]
}

export default routers;