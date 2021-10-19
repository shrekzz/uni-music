<template>
	<view class="m-skeleton-playlist">
	    <!-- <view class="empty"></view> -->
	    <view class="intro">
	        <view class="intro-cover"></view>
	        <view class="intro-content">
	            <view class="content-title"></view>
	            <view class="content-avatar">
	                <view class="avatar-img"></view>
	                <view class="avatar-name"></view>
	            </view>
	            <view class="content-description"></view>
	        </view>
	    </view>
	    <view class="play-all">
	        <view class="play-icon"></view>
	        <view class="title"></view>
	    </view>
	    <view class="playlist-wrap">
	        <view class="list-item" v-for="item of [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]"  :key="item">
	            <view class="order"></view>
	            <view class="content"></view>
	            <view class="play-icon"></view>
	        </view>
	    </view>
	</view>
</template>

<script>
	
</script>

<style lang="scss" scoped>
	.m-skeleton-playlist {
	    padding: 0 33.336rpx;
		.empty {
		    height: 170.847rpx;
		}
		.intro {
		    margin-top: 27.78rpx;
		    margin-bottom: 47.9205rpx;
		    height: 262.521rpx;
			.intro-cover {
			    display: inline-block;
			    margin-right: 41.67rpx;
			    width: 262.521rpx;
			    height: 100%;
			    background: rgba(0,0,0,.03);
			}
			.intro-content {
			    display: inline-block;
			    width: 379.197rpx;
			    height: 100%;
			    vertical-align: top;
				.content-title {
				    height: 34.725rpx;
				    background: rgba(0,0,0,.03);
				}
				.content-avatar {
				    margin-top: 25.002rpx;
				    margin-bottom: 25.002rpx;
				    height: 54.171rpx;
					.avatar-img {
					    display: inline-block;
					    margin-right: 12.501rpx;
					    width: 54.171rpx;
					    height: 100%;
					    border-radius: 50%;
					    background: rgba(0,0,0,.03);
					}
					.avatar-name{
						display: inline-block;
						width: 120.1485rpx;
						height: 100%;
						background: rgba(0,0,0,.03);
					}
				}
				.content-description {
				    height: 90.285rpx;
				    background: rgba(0,0,0,.03);
				}
				
				
			}
		}
		.play-all {
			padding-top: 31.2525rpx;
			padding-bottom: 31.2525rpx;
			height: 50.004rpx;
			.play-icon {
			    display: inline-block;
			    width: 120.1485rpx;
			    height: 100%;
			    background: rgba(0,0,0,.03);
				width: 50.004rpx;
				border-radius: 50%;
			}
			.title {
			    display: inline-block;
			    margin-left: 54.171rpx;
			    width: 69.45rpx;
			    height: 100%;
			    background: rgba(0,0,0,.03);
			}
		}
		.playlist-wrap .list-item {
		    display: -ms-flexbox;
		    display: flex;
		    -ms-flex-pack: justify;
		    justify-content: space-between;
		    box-sizing: border-box;
		    padding-top: 29.169rpx;
		    padding-bottom: 32.6415rpx;
		    height: 125.01rpx;
			.order {
			    width: 61.8105rpx;
			    height: 61.8105rpx;
			    background: rgba(0,0,0,.03);
			}
			.content {
			    width: 70%;
			    height: 100%;
			    background: rgba(0,0,0,.03);
			}
			.play-icon {
			    width: 61.8105rpx;
			    height: 61.8105rpx;
			    background: rgba(0,0,0,.03);
			}
		}
		
	}

</style>
