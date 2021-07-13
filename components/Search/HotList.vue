<template>
	<view class="hotlist">
		<history-list v-if="showHistory"></history-list>
		<view class="hotlist-title">
			热搜榜
		</view>
		<view class="hotlist-content">
			<view
				class="song-list"
				v-for="(item, index) of hotlist"
				:key="index"
				@tap="Search(item.searchWord)"
			>
				<view class="num" :style="{ color: (index < 3 ? '#FF3A3A' : '#999999') }" >{{ index + 1 }}</view>
				<view class="song">
					<view class="song-details">
						<view class="song-name">
							{{ item.searchWord }}
						</view>
						<view class="song-type">
							<image :src="item.iconUrl" :class="'icon'+item.iconType" ></image>
						</view>
					</view>
					<view class="song-content">
						{{ item.content }}
					</view>
				</view>
				
				<view class="song-score">
					{{ item.score }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import HistoryList from "./HistoryList";
	import { mapState } from "vuex";
	export default {
		name:"HotList",
		data() {
			return {
				hotlist: []
			};
		},
		components: {
			HistoryList
		},
		mounted() {
			this.$MyRequest({
					url: "/search/hot/detail"
				}).then(
					(res, err) => {
						this.hotlist = res.data.data
						console.log(res)
					}
				);
			},
		methods: {
			
		},
		computed: {
			...mapState(["searchHistory"]),
			showHistory() {
				return this.searchHistory.length !== 0
			}
		},
		inject: ["Search"]
	}
</script>

<style lang="scss" scoped>
	.hotlist{
		font-size: 34rpx;
		.hotlist-title{
			margin: 15rpx 0;
			font-size: 30rpx;
		}
		.hotlist-content {
			.song-list{
				display: flex;
				margin-bottom: 46rpx;
				justify-content: space-between;
				align-items: center;
				.num{
					width: 55rpx;
					margin: 0 14rpx;
					font-weight: bold;
				}
				.song{
					width: 70%;
					.song-details{
						width: 100%;
						display: flex;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						.song-name {
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							font-size: 34rpx;
						}
						.song-type {
							margin-left: 10rpx;
							display: flex;
							align-items: center;
							.icon0{
								display: none;
							}
							.icon1, .icon2 {
								width: 54rpx;
								height: 28rpx;
							}
							
							.icon5{
								width: 20rpx;
								height: 26rpx;
							}
						}
					}
					.song-content {
						font-size:26rpx;
						color: #999999;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					
				}
				.song-score {
					color: #cccccc;
					font-size: 26rpx;
					
				}
				&:last-child{
					margin-bottom: 0;
				}
			}
		}
		
	}
	
</style>
