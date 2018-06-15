<template>
	<div class="header">
		<div class="nav_bg" :class="{'show_nav':showWinBg}"  @click="hideDialog"></div>

		<div class="header_box" :class="{'background-nomal':isExpats}">
			<!-- 导航展开按钮 -->
			<div class="header_btn" @click="showNav">
				<span v-for="item in 3" :class="{'color-white':isExpats}"></span>
				<!--<span></span>
				<span></span>-->
			</div>

			<!-- logo -->
			<div class="logo" v-if="isExpats">
				<svg aria-hidden="true" @click="goHome">
						<use xlink:href="#icon-logo_2"></use>
				</svg>
			</div>
			<div class="logo" v-else>
				<svg aria-hidden="true" @click="goHome">
						<use xlink:href="#icon-logo_"></use>
				</svg>
			</div>
			
		</div>
		

		<!-- 导航展开内容 -->
		<nav class="header_nav" :class="{show_nav:navIsShow}">
			<a href="/">Home</a>
			<a href="javascript:;" @click="showLoginPage" v-if="!islogIn">Log in</a>
			<a href="/user/profile?menu=1&flag=1" v-else>My Profile</a>
			<a :href="islogIn?'/user/myBookings?menu=0&flag=1':'/user/bookings/entry'">My Bookings</a>
			<a href="/travel/customize/step1">Customize Your Trip</a>
			<a href="/info/feedback/">Contact Us</a>
			<a href="/info/about-us">About Us</a>
			<a href="javascript:;" @click="logout" v-if="islogIn">Log Out</a>
		</nav>

		<!-- 弹出登录 -->
		<div class="login_box" v-show="showLogin">
			<!-- 返回上一页，可以设置title属性,标签内有插槽可以写右上角的按钮等 -->
			<headBack :type="'close'" :close="pageClose" title=""></headBack>

			<div class="login_content">
				<h2>Login</h2>
				<p>You can use your Facebook account to log into www.localpanda.com and access our platform’s services. Your login will be directed to Facebook. Local Panda does not track or own your personal information e.g. Facebook account or password. Please be assured to use our platform.</p>
				<span class="btn" @click="facebookLogin"><i class="iconfont">&#xe613;</i>Log in with Facebook</span>
			</div>
		</div>
	</div>
</template>

<script>
	import headBack from "./back";
	import FBLogin from "@/panda/js/FBLogin/";

	export default {
		props:["isExpats"],
		name:'M-head',
		data(){
			return {
				navIsShow: false,
				showWinBg: false,
				showLogin: false,
				islogIn: false
			}
		},
		components: {
			headBack
		},
		methods: {
			goHome(){
				location.href = '/';
			},
			showNav(){
				this.navIsShow = !this.navIsShow;
				this.showWinBg = !this.showWinBg;
			},
			hideDialog(){
				this.showWinBg = false;
				this.navIsShow = false;
				this.showLogin = false;
			},
			showLoginPage(){
				//弹出登录
				this.showLogin = true;
				//隐藏导航
				this.navIsShow = false;
			},
			pageClose(){
				//头部关闭回调
				this.showLogin = false;
				//隐藏背景
				this.showWinBg = false;
			},
			setBodyHidden(type){
				if(type){
					document.body.style.overflowY = 'hidden';
				}else{
					document.body.style.overflowY = 'inherit';
				}
				
			},
			facebookLogin(){
				//faceBook登录,默认调用方法，其它调用参数，见js文件顶部
				new FBLogin();
			},
			logout(){

				//faceBook退出登录,默认调用方法，其它调用参数，见js文件顶部
				new FBLogin({
					logout:true
				});
			}

		},
		watch:{
			showWinBg:function(val){
				this.setBodyHidden(val);
			}
		},
		mounted: function() {
			
			var logstate = localStorage.getItem("logstate");
			this.islogIn = logstate?true:false;
			
		}
	}
</script>

<style lang="scss" scoped>
.background-nomal{
		background: transparent!important;
		border: none!important;
	}
.color-white{
	background: #fff!important;
}
.header{
	height: 0.99rem;
	position: relative;
	z-index: 100;
	
	.header_box{
		position: relative;
		z-index: 2;
		background: #fff;
		border-bottom: #dde0e0 solid 1px;
		.logo{
			margin-left: 0.4rem;
			width: 2.2rem;
			height:0.99rem;
			overflow: hidden;
			svg{
				width: 100%;
				height: 100%;
			}
			
		}
		.header_btn{
			float: right;
			width: 1.15rem;
			height: 0.99rem;
			padding: 0.32rem 0.4rem;
			span{
				width: 100%;
				height: 0.04rem;
				display: block;
				background: #1bbc9d;
				margin-bottom: 0.11rem;
				&:nth-last-child(1){
					margin-bottom: 0;
				}
			}
		}
	}
	
	.nav_bg{
		width: 100%;
		height: 100vh;
		position: absolute;
		left: 0;
		top: 0;
		background-color: rgba(0,0,0,0.4);
		visibility: hidden;
		opacity: 0;
		-webkit-transition:all 0.4s ease-out 0s; 
  	transition:all 0.4s ease-out 0s; 
	}
	.header_nav{
		visibility: hidden;
		opacity: 0;
		-webkit-transition:all 0.4s ease-out 0s; 
  	transition:all 0.4s ease-out 0s; 
		position: relative;
		z-index: 2;
		background-color: #fff;
		a{
			border-bottom: #ebebeb solid 1px;
			display: block;
			-webkit-transition:all 0.4s ease-out 0s; 
  		transition:all 0.4s ease-out 0s; 
			height: 0;
			line-height: 0;
			margin: 0 0.38rem;
			color: #353a3f;
			font-size: 0.26rem;
			overflow: hidden;
			
			&:nth-last-child(1){
				margin-bottom: 0;
			}
			&:focus{
				color: #1bbc9d;
			}
		}
	}
	.show_nav{
		visibility: inherit;
		opacity: 1;
		a{
			height: 1.18rem;
			line-height: 1.18rem;
		}
	}
	.login_box{
		position: fixed;
		left: 0;
		top: 0;
		z-index: 3;
		width: 100%;
		background-color: #fff;
		padding-bottom: 0.8rem;
		.login_content{
			padding: 0 0.4rem;
		
			h2{
				font-size: 0.38rem;
				color: #353a3f;
				text-align: center;
			}
			p{
				color: #353a3f;
				font-size: 0.26rem;
				line-height: 0.3rem;
				margin-top: 0.3rem;
			}
			.btn{
				background: #4361b3;
				margin-top: 0.36rem;
				i{
					font-size: 0.36rem;
					vertical-align: top;
					margin-right: 0.1rem;
				}
			}
		}
	}
}
</style>