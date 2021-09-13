<template>
	<view class="">
		
	
	<view class="m-skeleton-index">
	    <!-- <view class="empty"></view> -->
	    <view class="search-box"></view>
	    <view class="toplist" v-for="item of [1,2,3,4]" :key="item">
	        <view class="left"></view>
	        <view class="right">
	            <view class="song" v-for="item of [1,2,3]" :key="item"></view>
	        </view>
	    </view>
	</view>
	</view>
</template>

<script>
	export default {
		name: "skeleton"
	}
</script>

<style lang="scss">
	.m-skeleton-index {
	    margin: 0 33.336rpx;
		.empty {
		    height: 181.2645rpx;
		}
		.search-box {
		    margin: 20.835rpx 0 31.2525rpx;
		    height: 72.9225rpx;
		    background: rgba(0,0,0,.03);
		}
		.toplist {
		    display: -ms-flexbox;
		    display: flex;
		    margin-bottom: 20.835rpx;
			.left {
			    width: 213.906rpx;
			    height: 213.906rpx;
			    background: rgba(0,0,0,.03);
			}
			.right {
			    display: -ms-flexbox;
			    display: flex;
			    flex-direction: column;
			    margin: 25.002rpx 0 24.3075rpx 20.835rpx;
			    width: 415.311rpx;
				.song {
				    margin-bottom: 31.947rpx;
				    height: 27.0855rpx;
				    background: rgba(0,0,0,.03);
					&:last-child {
						margin-bottom: 0;
					}
				}
			}
		}
	}

</style>
