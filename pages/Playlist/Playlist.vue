<template>
	<view>
		<view class="playlist-bg">
			<image class="playlist-bg-img" :src="coverImgUrl" ></image>
			<view class="playlist-bg-mask"></view>
		</view>
		<p-header :descriptions="playlist" :creator="creator" />
		<!-- <view style="{{anonymousState__temp2}}"></view>
		<view class="header-wrap">
			<header compid="{{$compid__92}}"></header>
		</view>
		<view class="btn-list">
			<view class="btn-wrap" wx:if="{{canWakeApp}}">
				<button class="btn" openType="share" plain="{{true}}">
					<image class="btn-icon" src="{{share}}"></image>
					<text>分享</text>
				</button>
				<button appParameter="{{orpheus}}" bindtap="anonymousFunc0" class="btn" openType="launchApp" plain="{{true}}">
					<image class="btn-icon" src="{{subscribe}}"></image>
					<text>收藏</text>
					<text>{{anonymousState__temp4}}</text>
				</button>
			</view>
			<button class="btn" openType="share" plain="{{true}}" wx:else>
				<image class="btn-icon" src="{{share}}"></image>
				<text class="btn-msg">分享给微信好友</text>
			</button>
		</view> -->
	</view>
</template>

<script>
	import PHeader from "../../components/Playlist/PHeader"
	export default {
		name: "Palylist",
		data() {
			return {
				coverImgUrl: "",
				playlist: [],
				creator: []
			}
		},
		components: {
			PHeader
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
			})
			uni.setBack
		}
	}
</script>

<style lang="scss" >
	// page{
	// 	background: url("https://p1.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg");
	// }
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
		    background-color: rgba(0,0,0,.15);
		}
		.playlist-wrap {
		    overflow: hidden;
		    width: 100%;
		    border-radius: 41.67rpx;
		    background-color: #fff;
		}
	}
</style>
