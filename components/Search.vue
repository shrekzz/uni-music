<template>
	<view class="search">
		<text class="ic search-icon">&#xe6e3;</text>
		<input class="search-input" type="text" value="" placeholder="搜索歌曲" v-model="keywords" @input="handleInput" />
		<view class="search-tips" v-if="keywords">搜索“{{ keywords }}”</view>
		<view class="search-result" v-show="resLen !== 0">
			<view class="search-result-list" v-for="item of searchRes" :key="item.id">
				<text class="ic res-icon">&#xe6e3;</text>
				<text class="res-song">{{ item.name }}</text>
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
							const songs = res.data.result.songs
							this.searchRes = songs
							console.log(songs)
						}
					)
				}
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

		.search-icon {
			position: absolute;
			left: 24rpx;
			top: 18.4rpx;
			color: #999999;
			font-size: 34rpx;
		}

		.search-input {
			color: #000;
			font-size: 30rpx;
			padding-left: 80rpx;
			border-radius: 80rpx;
			background: #F7F7F7;
			height: 70rpx;
		}
		.search-tips {
			color: #507DAF;
			margin:44rpx 20rpx 44rpx 22rpx;
		}
		.search-result {
			font-size: 34rpx;
			.search-result-list {
				padding: 22rpx;
				margin: 20rpx 0;
				color: #666666;
				.res-icon {
					color: #999999;
					font-size: 34rpx;
				}
				.res-song {
					margin-left: 20rpx;
				}
			}
		}
	}
</style>
