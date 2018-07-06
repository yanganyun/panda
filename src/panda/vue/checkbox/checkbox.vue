<style lang="scss">
//样式类型，pc.scss 和 mobile.scss
@import "./pc.scss";
</style>

<template>
	<!--//加载动画-->
	<label class="checkbox_label" :class="{isChecked:getChecked,checkbox_disabled:isDisabled}">
    <span class="checkbox_box">
      <input type="checkbox" @change="inputChange" :checked="getChecked" :disabled="isDisabled" :value="label">
      <i class="iconfont">&#xe654;</i>
    </span>
    <span :title="label" class="checkbox_content">
      <slot>{{label}}</slot>
    </span>
    
    
  </label>
</template>

<script>
	export default {
    name: "checkbox",
    props:{
      'label':{},
      'value':{},
      disabled: Boolean,
      change:{}
    },
		data() {
			return {
        thisValue:this.value
			}
    },
    computed:{
      isGroup(){
        return this.$parent.$options.name=='checkboxGroup'?true:false;
      },
      getChecked(){
        //单个复选框操作
        if(!this.isGroup){
          return this.thisValue?true:false;
        }
        //复选组
        var changeAll = this.$parent.value;
        if(!changeAll){
          return false;
        }
        for(var i=0;i<changeAll.length;i++){
          if(changeAll[i] == this.label){
            return true;
          }
        }
        return false;
      },
      isDisabled(){
        return this.disabled?true:false;
      }
    },
		methods: {
      inputChange(e){
        this.$emit('input',!this.value);
        if(typeof this.change =='function'){
          this.change(e);
        }
      }
		},
    watch:{
      value:function(val){
        this.thisValue = val;
      }
    }
	}
</script>
