<template>
	<view class="index-wrapper">
		<user />
		<view class="search">
			
		</view>
		<top-list :list="toplist" />
	</view>
</template>

<script>
	import { myRequest } from "../../api.js";
	import TopList from "../../components/TopList";
	import User from "../../components/User"
	
	export default {
		components:{
			TopList,
			User
		},
		data() {
			return {
				toplist: []
			}
		},
		onLoad() {
			myRequest({url:"/toplist/detail"}).then(res => {
				const list = res.data.list.slice(0,4)
				this.toplist = list
				console.log(list)
			})
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.index-wrapper{
		padding: 20rpx;
		
	}
	
	
</style>
