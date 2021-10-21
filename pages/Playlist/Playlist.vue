<template>
	<view>
		<!-- 沉浸式占位 -->
		<view class="status_bar"></view>
		<view class="navBar">
			<view class="uni-page-head-hd">
				<view class="uni-page-head-btn">
					<i @click="back" class="uni-btn-icon" style="color: rgb(255, 255, 255); font-size: 27px;"></i>
				</view>
			</view>
			<view class="uni-page-head-bd">
				<view class="uni-page-head__title">
					歌单
				</view>
			</view>
			<view class="uni-page-head-ft"></view>
		</view>
		<!-- 占位 -->
		<view class="temp"></view>
		<playlist v-if="playlist.length === 0" />
		<view v-else>
			<view class="playlist-bg">
				<image class="playlist-bg-img" :src="coverImgUrl"></image>
				<view class="playlist-bg-mask"></view>
			</view>
			<!-- <view style="{{anonymousState__temp2}}"></view> -->
			<scroll-view class="scroll-y" scroll-y="false" lower-threshold="150" show-scrollbar="false">
				<view class="header-wrap">
					<p-header :descriptions="playlist" />
				</view>
				<view class="playlist-wrap">
					<!-- <view> -->
					<view class="list-item">
						<image class="play-icon" :src="playIconAll"></image>
						<text class="title">播放全部</text>
						<text class="info">(共{{ playlist.trackCount }}首)</text>
					</view>
					<p-list :searchResult="tracks" type="toplist"></p-list>
					<!-- <play-list compid="{{$compid__93}}"></play-list> -->
					<!-- </view> -->
					<!-- <view class="no-song" v-else>暂无歌曲</view> -->
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import PHeader from "../../components/Playlist/PHeader"
	import PList from "../../components/Playlist/PList"
	import SearchResult from "../../components/Search/SearchResult.vue"
	import playlist from "../../components/Skeleton/playlist/index.vue"
	export default {
		name: "Palylist",
		data() {
			return {
				coverImgUrl: "",
				playlist: [],
				creator: [],
				tracks: [],
				playIconAll: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNjBweCIgaGVpZ2h0PSI2MHB4IiB2aWV3Qm94PSIwIDAgNjAgNjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU5LjEgKDg2MTQ0KSAtIGh0dHBzOi8vc2tldGNoLmNvbSAtLT4KICAgIDx0aXRsZT5wbGF5aWNvbl81NHB4PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbC1vcGFjaXR5PSIwLjgiPgogICAgICAgIDxnIGlkPSLmrYzljZXor6bmg4Vf5peg5oyJ6ZKuIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDguMDAwMDAwLCAtNzgzLjAwMDAwMCkiIGZpbGw9IiMwMDAwMDAiPgogICAgICAgICAgICA8ZyBpZD0iR3JvdXAtNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDczOC4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSLmkq3mlL7lhajpg6giPgogICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQ4LjAwMDAwMCwgNDUuMDAwMDAwKSIgaWQ9InBsYXlpY29uXzU0cHgiPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMzAsMCBDNDYuNTY4ODg4OSwwIDYwLDEzLjQzMTExMTEgNjAsMzAgQzYwLDQ2LjU2ODg4ODkgNDYuNTY4ODg4OSw2MCAzMCw2MCBDMTMuNDMxMTExMSw2MCAwLDQ2LjU2ODg4ODkgMCwzMCBDMCwxMy40MzExMTExIDEzLjQzMTExMTEsMCAzMCwwIFogTTMwLDQgQzE1LjY0MDQxNjcsNCA0LDE1LjY0MDQxNjcgNCwzMCBDNCw0NC4zNTk1ODMzIDE1LjY0MDQxNjcsNTYgMzAsNTYgQzQ0LjM1OTU4MzMsNTYgNTYsNDQuMzU5NTgzMyA1NiwzMCBDNTYsMTUuNjQwNDE2NyA0NC4zNTk1ODMzLDQgMzAsNCBaIE0yMy4wMDA5NTA5LDIwLjk2MDUzODQgQzIzLjAxMzk0NjMsMjAuNjExODI4NSAyMy4yMDQ1NDU1LDE4LjEwMjI3MjcgMjYsMTkuNSBMMjYsMTkuNSBMMzkuNSwyOC41IEMzOS41LDI4LjUgNDIuNSwzMCAzOS41LDMxLjUgTDM5LjUsMzEuNSBMMjYsNDAuNSBDMjYsNDAuNSAyMyw0MiAyMywzOSBMMjMsMzkgWiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"
			}
		},
		components: {
			PHeader,
			PList,
			SearchResult,
			playlist
		},
		onLoad(params) {
			this.$MyRequest({
				url: "/playlist/detail",
				data: {
					id: params.id
				}
			}).then(res => {
				console.log(res)
				this.coverImgUrl = res.data.playlist.coverImgUrl
				this.playlist = res.data.playlist
				this.creator = res.data.creator
				const privileges = res.data.privileges
				const resultList = res.data.playlist.tracks
				privileges.forEach((item, index) => {
					resultList[index].privilege = item
				})
				this.tracks = {
					keywords: "",
					resultList
				}
			})
		},
		methods: {
			back() {
				uni.navigateBack({
					animationType: "pop-out",
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: transparent;
	}

	.navBar {
		position: fixed;
		left: var(--window-left);
		right: var(--window-right);
		height: 44px;
		height: calc(44px + constant(safe-area-inset-top));
		height: calc(44px + env(safe-area-inset-top));
		padding: 7px 3px;
		padding-top: calc(7px + constant(safe-area-inset-top));
		padding-top: calc(7px + env(safe-area-inset-top));
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		overflow: hidden;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		box-sizing: border-box;
		z-index: 998;
		color: #fff;
		background-color: rgba(0, 0, 0, 0);
		-webkit-transition-property: all;
		transition-property: all;

		.uni-page-head-hd {
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-align: center;
			-webkit-align-items: center;
			align-items: center;
			font-size: 16px;

			.uni-page-head-btn {
				position: relative;
				width: auto;
				margin: 0 2px;
				word-break: keep-all;
				white-space: pre;
				cursor: pointer;
			}
		}

		.uni-page-head-bd {
			text-align: center;
			position: absolute;
			left: 70px;
			right: 70px;
			min-width: 0;
			-webkit-user-select: auto;
			user-select: auto;

			.uni-page-head__title {
				font-weight: 700;
				font-size: 16px;
				line-height: 30px;
				text-align: center;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}


	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.temp {
		width: 100%;
		height: 44px;
		height: calc(44px + constant(safe-area-inset-top));
		height: calc(44px + env(safe-area-inset-top));
	}

	.playlist-bg {
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
		width: 100%;
		height: 100%;

		.playlist-bg-img {
			position: absolute;
			width: 100%;
			height: 100%;
			filter: blur(27.78rpx);
			transform: scale(1.5);
			transform-origin: center top;
		}

		.playlist-bg-mask {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background-color: rgba(0, 0, 0, .15);
		}

	}

	.scroll-y {
		height: 100vh;
	}

	.playlist-wrap {
		overflow: hidden;
		width: 100%;
		border-radius: 41.67rpx;
		background-color: #fff;

		.list-item {
			display: -ms-flexbox;
			display: flex;
			position: relative;
			-ms-flex-align: center;
			align-items: center;
			padding: 31.2525rpx 33.336rpx;
			color: #333;

			.play-icon {
				margin-right: 29.169rpx;
				width: 41.67rpx;
				height: 41.67rpx;
			}

			.title {
				margin-right: 7.6395rpx;
				font-size: 33.336rpx;
			}

			.info {
				color: rgba(0, 0, 0, .3);
				font-size: 27.0855rpx;
			}
		}

	}
</style>
