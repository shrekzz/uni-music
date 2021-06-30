<template>
	<view class="user-header">
		<view class="user-status">
			<text class="ic user-icon">&#xe60a;</text>
			<text class="user-status-text">未登录</text>
		</view>
		<view class="login-btn">
			立即登录
		</view>
	</view>
</template>

<script>
	export default {
		name:"User",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.user-header{
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: center;
	color: #999999;
	.user-status{
		display: flex;
		align-items: center;
		.user-status-text{
			margin-left: 20rpx;
			font-size: 30rpx;
		}
		.user-icon{
			font-size: 70rpx;
		}
	}
	.login-btn{
		border: 1rpx solid #e5e5e5;
		border-radius: 44rpx;
		padding: 5rpx 20rpx;
		color: #333333;
		height: 44rpx;
		font-size: 28rpx;
	}
}
</style>
