
///*********** Facebook登录组件 *********** */

/*

//faceBook登录,调用方法
new FBLogin({
	logout:true,
	logoutCallBack:function(){
		
	}
	//登录回调方法
	loginCallBack:function(){
		window.location.href="/user/myBookings?menu=0&flag=1";
	}
});

*/


var FBLogin = (function(){

	//默认参数
	var defaultOpt = {
		loginCallBack: null,
		logout:false,
		logoutCallBack: null
	};

	function FBLogin(options){
		//合并自定义参数
		for(var key in options){
			defaultOpt[key] = options[key];
		}
		this.options = defaultOpt || {};
		this.loadJs = false;
		this.init();
	}


	FBLogin.prototype = {
		construction: FBLogin,
		init:function(){
			var self = this;
			//加载登录依赖，如果存在则不加载
			if(!document.getElementById('facebookAPI')){
				var script = document.createElement("script");    
				script.src = 'https://connect.facebook.net/en_US/sdk.js';
				document.body.appendChild(script);
				script.id="facebookAPI";
				script.onload = function(){
					self.jsLoadInit();
				}
			}else{

				self.jsLoadInit();
				
			}
		},
		jsLoadInit(){
			var self = this;
			//初始化调用
			FB.init({
				appId: '487179281653793',
				cookie: true,
				xfbml: true,
				version: 'v2.10'
			});
			
			//调用登录或登出
			if(self.options.logout){
				self.logout();
			}else{
				self.login();
			}
		},
		login:function(){
			var self = this;
			//检测登录状态
			FB.getLoginStatus(function(response) {
				if(response.status=='connected'){
					var logInfo = response.authResponse;
					//登录成功回调
					self.logOk(logInfo);
				}else{
					FB.login(function(response){
						var logInfo = response.authResponse;
						self.logOk(logInfo);
					});
				}
			});	
		},
		getPostQuery(obj){
			var newStr = '';
			for(var key in obj){
				newStr += '&'+key + '=' + obj[key];
			}
			return newStr.substring(1);
		},
		logOk:function(logInfo){
			var self = this;
			//获取用户信息
			FB.api('/me?fields=name,picture', function(response) {
				
				//存储用户头像
				localStorage.setItem("user_photo", response.picture.data.url);
				//存储登录状态
				localStorage.setItem("logstate", 1);
				//存储登录token
				localStorage.setItem("fbToken", logInfo.accessToken);

				//登录回调
				self.logCall();

			});

			
			//再localpanda登录
			let postData = JSON.stringify({
				accessToken: logInfo.accessToken,
				userId: logInfo.userID
			});
			this.lpLogin(postData);
		},
		lpLogin:function(postData){
			//localpanda服务器登录
			var xhr = new XMLHttpRequest();
			xhr.open('POST', 'https://api.localpanda.com/api/user/login/facebook', true);
			xhr.setRequestHeader('Content-Type','application/json');
			xhr.send(postData);
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) { // readyState == 4说明请求已完成
					var data = JSON.parse(xhr.responseText);
					if(data.succeed){
						var userid = data.response;
						localStorage.setItem('userid',userid);
					}
				}
			}
		},
		logCall:function(){
			//登录回调
			if(typeof this.options.loginCallBack == 'function'){
				this.options.loginCallBack();
			}else{
				location.reload();
			}
		},
		logout:function() {

			localStorage.removeItem("logstate")
			localStorage.removeItem("fbToken")
			localStorage.removeItem("user_photo")
			localStorage.removeItem("userid")

			FB.logout(function(response) {
				//刷新页面
				location.reload();
			});

			if(typeof this.options.logoutCallBack == 'function'){
				this.options.logoutCallBack();
			}else{
				location.reload();
			}
			
		}
	}
	

	

	return FBLogin;

})();

export default FBLogin;