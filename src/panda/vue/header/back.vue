<template>
	<div class="head_back">
		<div class="btn_back" @click="pageBack" v-if="type!='close'">
			<i class="iconfont">&#xe615;</i>
		</div>
		<div class="btn_back" @click="close" v-else>
			<i class="iconfont">&#xe606;</i>
		</div>

		<div class="head_title">{{title?title:''}}</div>
		
		<div class="head_tool">
			<!-- 设置功能插槽 -->
			<slot></slot>
		</div>
	</div>
</template>

<script>
	
	export default {
		name: "head_return",
		props:[
			'title',
			'type',
			'close'
		],
		data(){
			return{
				
			}
		},
		components: {
			
		},
		methods: {
			pageBack(){
				history.back()
			}
		},
		mounted: function() {
			
		}
	}
</script>

<style lang="scss" scoped>
.head_back{
	height: 1rem;
	line-height: 1rem;
	color: #353a3f;
	position: relative;
	.btn_back{
		position: absolute;
		left: 0;
		top: 0;
		padding: 0 0.4rem;
		font-size: 0.44rem;
		height: 1rem;
		line-height: 0.94rem;
		overflow: hidden;
		z-index: 2;
	}
	.head_title{
		height: 1rem;
		line-height: 1rem;
		font-size: 0.28rem;
		font-weight: bold;
		text-align: center;
		max-width: 70%;
		margin: 0 auto;
	}
	.head_tool{
		position: absolute;
		right: 0.4rem;
		top: 0;
		height: 1rem;
		line-height: 1rem;
		font-size: 0.24rem;
		z-index: 2;
	}
}
</style>