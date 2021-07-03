<template>
	<view class="search">
		<view class="search-box">
			<view class="search-icon"></view>
			<input class="search-input" type="text" value="" placeholder="搜索歌曲" v-model="keywords" @input="handleInput" />
			<view class="close-icon" v-show="keywords !== ''" @click="cleanKeywords">
			</view>
		</view>
		<view class="search-tips" v-if="keywords">搜索“{{ keywords }}”</view>
		<view class="search-result" v-show="resLen !== 0">
			<view class="search-result-list" v-for="item of searchRes" :key="item.id">
				<view class="res-icon"></view>
				<view class="res-song">{{ item.name }}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		myRequest
	} from "../api.js";
	import HotList from "./HotList"
	import HistoryList from "./HistoryList"
	export default {
		name: "Search",
		data() {
			return {
				keywords: "",
				searchRes: [],
				fisrtSearch: false,
				hot: false
			};
		},
		components: {
			HotList,
			HistoryList
		},
		methods: {
			handleInput() {
				if (this.keywords.length !== 0) {
					myRequest({
						url: "/cloudsearch",
						data: {
							keywords: this.keywords,
							limit: 6
						}
					}).then(
						(res, err) => {
							const songs = res.data.result.songs;
							this.searchRes = songs;
						}
					);
					this.fisrtSearch = true;
				}
			},
			cleanKeywords() {
				this.keywords = ""
			}
		},
		computed: {
			resLen() {
				return this.searchRes.length
			}
		},
		watch: {
			keywords(newValue) {
				if (newValue == "") {
					this.searchRes = []
					this.hot = true
				} else {
					this.hot = false
				}
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
				right: 20rpx;
				top: 20rpx;
				color: #999999;
				width: 40rpx;
				height: 40rpx;
				background-size: 100% 100%;
				background-repeat: no-repeat;
				background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOCAyOCI+PGcgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjYmNiZGJkIiBkPSJNMTQgMGM3LjczMiAwIDE0IDYuMjY4IDE0IDE0cy02LjI2OCAxNC0xNCAxNFMwIDIxLjczMiAwIDE0IDYuMjY4IDAgMTQgMHoiLz48cGF0aCBkPSJNMTkgOUw5IDE5TTkgOWwxMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZWJlY2ViIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PC9nPjwvc3ZnPg==");		
			}
		}
		
		.search-tips {
			color: #507DAF;
			margin:44rpx 20rpx 44rpx 22rpx;
		}
		.search-result {
			font-size: 30rpx;
			.search-result-list {
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
