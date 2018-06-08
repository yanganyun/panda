<template>
	<div class="radio-group" @change="setChange">
    <slot></slot>
  </div>
</template>

<script>
	export default {
    name: "radioGroup",
    props:[
      'value'
		],
		methods: {
			setChange(e){
				var thisValue = this.value;
				var changeValue = e.target.value;
				this.$emit('input', changeValue);
			}
		}
	}
</script>

