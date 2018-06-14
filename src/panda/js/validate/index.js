
///*********** 校验组件 *********** */
var Validate = (function(){
	//默认参数
	var defaultOpt = {
		inputClassName:'validate',
		errorClassName:'error'
	};
	function Validate(options){
		//合并自定义参数
		for(var key in options){
			defaultOpt[key] = options[key];
		}
		this.options = defaultOpt || {};

		//检测是否手机端
		this.isMobile = /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent);
		//初始化事件
		this.init();
	}
	//原型对象
	var _proto = Validate.prototype;

	_proto.init = function(){
		var self = this;
		//获取所有input
		var options = this.options;
		var inputClass = options.inputClassName;
		var allInput = document.querySelectorAll('.'+inputClass);
		this.allInput = allInput;
		//绑定所有blur事件
		for(var i=0;i<allInput.length;i++){
			var thisInput = allInput[i];
			thisInput.onblur = function(){
				var isTrue = self.check(this.value,this.getAttribute('vType'));
				//失去焦点后如果正确则移除错误class
				if(isTrue){
					this.className = this.className.replace(options.errorClassName,'');
				}else{
					if(!(new RegExp(options.errorClassName,'g')).test(this.className)){
						this.className = this.className + ' ' + options.errorClassName;
					}
				}
			}
		}
	}

	//校验单个
	_proto.check = function(value,type){
		if(type=='enName'){
			return /^[a-zA-Z\s]+$/.test(value);
		}else if(type=='cnName'){
			return /^[\u4e00-\u9fa5]+$/.test(value);
		}else if(type=='email'){
			return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
		}else if(type=='phone'){
			return /^((\d{2,8}-\d{4,13})|(\d{4,13})|(\d{1,5}\+\d{4,13}))$/.test(value);
		}else if(type=='text'){
			return value.length>0;
		}
		return false;
	}

	//整体校验
	_proto.validate = function(value,type){
		var options = this.options;
		var allInput = this.allInput;
		var focus = true;
		var isOk = true;
		//循环所有校验对象
		for(var i=0;i<allInput.length;i++){
			var thisInput = allInput[i];
			//只校验显示的元素
			if(thisInput.style.display != 'none'){
				var thisClass = thisInput.className;
				var isTrue = this.check(thisInput.value,thisInput.getAttribute('vType'));
				//不正确
				if(!isTrue){
					//记录错误数量
					isOk = false;
					//添加错误class
					if(!(new RegExp(options.errorClassName,'g')).test(thisClass)){
						thisInput.className = thisClass + ' ' + options.errorClassName;
					}
					//PC端获取焦点，移动端不做
					if(focus && !this.isMobile){
						thisInput.focus();
						focus = false;
					}else if(focus){
						document.getElementsByTagName('html')[0].scrollTop = document.body.scrollTop = thisInput.offsetTop - 30;
						focus = false;
					}
				}else{//正确移除class
					thisInput.className = thisClass.replace(options.errorClassName,'')
				}
			}
			
			
		}
		return isOk;
	}
	return Validate;
})();

export default Validate;