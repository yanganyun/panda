<template scope="scope">
	<!--//加载动画-->
	<label class="radio_label" :class="{isChecked:getChecked,radio_disabled:isDisabled}">
    <span class="radio_box">
      <i></i>
      <input type="radio" @change="inputChange" :checked="getChecked" :disabled="isDisabled" :value="label">
    </span>
    <span class="radio_content">
      <slot>{{label}}</slot>
    </span>
    
    
  </label>
</template>

<script>
	export default {
    name: "radio",
    props:{
      'label':{},
      'value':{},
      disabled: Boolean,
    },
		data() {
			return {
        thisValue:this.value
			}
    },
    computed:{
      isGroup(){
        return this.$parent.$options.name=='radioGroup'?true:false;
      },
      getChecked(){
        //单个操作
        if(!this.isGroup){
          if(this.thisValue == this.label){
            return true;
          }else{
            return false;
          }
        }

        //group组操作
        if(this.$parent.value == this.label){
          return true;
        }else{
          return false;
        }
      },
      isDisabled(){
        return this.disabled?true:false;
      }
    },
		methods: {
      inputChange(e){
        this.$emit('input', this.label);
      }
		},
		mounted(){
      
    },
    watch:{
      value:function(val){
        this.thisValue = val;
      }
    }
	}
</script>

