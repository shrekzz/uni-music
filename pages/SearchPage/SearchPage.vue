<template>
	<view class="search-wrapper">
		<search></search>
	</view>
</template>

<script>
	import Search from "../../components/Search.vue"
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		components:{
			Search
		}
	}
</script>

<style lang="scss" scoped>
.search-wrapper{
		padding: 20rpx 40rpx;	
}
</style>
