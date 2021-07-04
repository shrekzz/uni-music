<template>
	<view>
		<view class="title">
			<view class="">
				历史记录
			</view>
			<view class="" @click="deleteHis">
				icon
			</view>
		</view>
		<view class="content">
			<view class="list" v-for="(item, index) of list" >
				{{ item }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"HistoryList",
		props: {
			list: Array
		},
		data() {
			return {
				
			};
		},
		methods: {
			deleteHis() {
				this.$emit("deleteHis");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		//font-size: 34rpx;
		margin-top: 30rpx;
		font-size: 30rpx;
		display: flex;
		justify-content: space-between;

	}
	.content {
		margin: 10rpx 0 90rpx 0;
		display: flex;
		flex-wrap: wrap;
		.list {
			display: inline;
			font-size: 30rpx;
			padding: 10rpx 24rpx;
			background: #f6f6f6;
			border-radius: 32rpx;
			margin-right: 20rpx;
			margin-top: 26rpx;
		}
	}
	
</style>
