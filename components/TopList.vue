<template>
	<view>
		<view class="toplist" v-for="item of list" @click="toPlaylist(item.id)" :key="item.id" >
			<view class="left">
				<image class="cover" :src="item.coverImgUrl" ></image>
				<text class="text">{{ item.updateFrequency }}</text>
			</view>
			<view class="right">
				<view class="song" v-for="(track, index) of item.tracks" :key="index">
					{{ index+1 }}.{{ track.first }} - {{ track.second}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "TopList",
		data() {
			return {

			};
		},
		props: {
			list: Array
		},
		methods:{
			toPlaylist(id) {
				uni.navigateTo({
					url: `../Playlist/Playlist?id=${id}`,
					animationType: "pop-in"
				})
			}
		}
	}
</script>

<style lang="scss">
	.toplist {
		display: -ms-flexbox;
		display: flex;
	    margin-bottom: 20.835rpx;
	    color: #fff;
	    font-size: 21.5295rpx;
		.left {
		    position: relative;
			.cover {
			    width: 213.906rpx;
			    height: 213.906rpx;
			    border-radius: 8.334rpx;
			}
			.text {
			    position: absolute;
			    bottom: 13.1955rpx;
			    left: 12.501rpx;
			}

		}
		.right {
		    display: -ms-flexbox;
		    display: flex;
			flex-direction: column;
			margin: 25.002rpx 0 24.3075rpx 20.835rpx;
			width: 415.311rpx;
			color: #666;
			font-size: 27.0855rpx;
			.song {
			    overflow: hidden;
			    margin-bottom: 31.947rpx;
			    text-overflow: ellipsis;
			    white-space: nowrap;
				&:last-child {
					margin-bottom: 0;
				}
			}
		}
	}
</style>
