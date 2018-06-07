<style lang="scss" scoped>


</style>

<template>
	<div class="checkbox-group" @change="setChange">
    <slot></slot>
  </div>
</template>

<script>
	export default {
    name: "checkboxGroup",
    props:[
      'value'
		],
		data() {
			return {

			}
		},
		computed:{
			
		},
		methods: {
			setChange(e){
				var thisValue = this.value;
				var changeValue = e.target.value;
				var hasValue = false;
				for(var i=0;i<thisValue.length;i++){
					if(thisValue[i]==changeValue){
						hasValue = true;
						thisValue.splice(i,1);
					}
				}
				if(!hasValue){
					thisValue.push(changeValue);
				}
			}
		},
		mounted(){
			
		}
	}
</script>

