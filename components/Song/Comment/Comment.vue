<template>
	<view class="">
		 <view class="song-comment">
			<text class="title">精彩评论</text>
			<view >
				<!-- <item compid="{{item[$compid__57]}}" wx:for="{{loopArray30}}" wx:for-index="_anonIdx2" wx:key="commentId"></item> -->
				<comment-list v-for="item in comments" :key="item.commentId" :list="item"></comment-list>
			</view>
		</view>
	</view>
</template>

<script>
	import CommentList from "./CommentList.vue";
	export default {
		name: "Comment",
		props:{
			comments: Array
		},
		components: {
			CommentList
		}
		
	}
</script>

<style lang="scss" scoped>
	.song-comment {
	    position: relative;
	    margin-top: 69.45rpx;
	    padding: 0 32.6415rpx;
	    color: #fff;
		.title {
		    font-weight: 500;
		    font-size: 35.4195rpx;
		    line-height: 1.5;
		}
	}
</style>
