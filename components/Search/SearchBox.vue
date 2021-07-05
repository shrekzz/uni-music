<template>
	<view class="search">
		<view class="search-box">
			<view class="search-icon"></view>
			<input
				class="search-input"
				type="text" 
				placeholder="搜索歌曲"
				v-model.trim="keywords"
				@input="handleInput"
				@confirm="handleInput"
			/>
			<view class="close-icon" v-show="cleanBtn" @click="cleanKeywords">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "SearchBox",
		data() {
			return {
				keywords: "",
				cleanBtn: false
			}
		},
		methods: {
			handleInput() {
				this.cleanBtn = this.keywords == "" ?  false : true;
				this.$emit("handleInput", this.keywords);
			},
			cleanKeywords() {
				this.keywords = "";
				this.cleanBtn = false;
				this.handleInput()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search {
		position: relative;
		margin: 15rpx 0 30rpx 0;
		.search-box{
			position: relative;
			.search-icon {
				position: absolute;
				left: 20rpx;
				top: 20rpx;
				color: #999999;
				width: 40rpx;
				height: 40rpx;
				background-size: 100% 100%;
				background-repeat: no-repeat;
				background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==");
			}
			
			.search-input {
				
				font-size: 28rpx;
				padding: 0 80rpx;
				border-radius: 80rpx;
				background: #F7F7F7;
				height: 80rpx;
			}
			
			.close-icon{
				position: absolute;
				right: 26rpx;
				top: 26rpx;
				color: #999999;
				width: 28rpx;
				height: 28rpx;
				background-size: 100% 100%;
				background-repeat: no-repeat;
				background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4=");
			}
		}
		
		.search-tips {
			color: #507DAF;
			margin:44rpx 20rpx 44rpx 22rpx;
		}
		.match-result {
			font-size: 30rpx;
			.match-result-list {
				padding: 20rpx;
				margin: 20rpx 0;
				color: #8E8E8E;
				display: flex;
				.res-icon {
					color: #999999;
					width: 40rpx;
					height: 40rpx;
					background-size: 100% 100%;
					background-repeat: no-repeat;
					background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==");
				}
				.res-song {
					margin-left: 20rpx;
				}
			}
		}
	}
</style>
