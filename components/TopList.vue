<template>
	<view>
		<view class="list" v-for="item of list">
			<view class="coverImg">
				<view class="updated">{{ item.updateFrequency }}</view>
				<image class="img" :src="item.coverImgUrl" mode="widthFix">

				</image>

			</view>
			<view class="tracks">
				<view v-for="(track, index) of item.tracks" class="track-text">
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
		}
	}
</script>

<style lang="scss">
	.list {
		margin: 20rpx 0;
		display: flex;

		.coverImg {
			position: relative;

			.updated {
				z-index: 2;
				color: white;
				position: absolute;
				left: 10rpx;
				bottom: 18rpx;
				font-size: 28rpx;
			}

			image {
				border-radius: 6px;
				width: 210rpx;
			}
		}

		.tracks {
			overflow: hidden;
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			padding: 20rpx;

			.track-text {
				color: #666666;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}
</style>
