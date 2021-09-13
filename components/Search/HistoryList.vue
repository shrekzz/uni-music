<template>
	<view>
		<view class="title">
			<view class="">
				历史记录
			</view>
			<view class="delete-icon" @click="deleteHis">
			</view>
		</view>
		<view class="content">
			<view
				class="list"
				v-for="(item, index) of searchHistory"
				@click="Search(item)"
				:key="index"
			>
				{{ item }}
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		name:"HistoryList",
		props: {
			list: Array
		},
		data() {
			return {
				
			};
		},
		methods: {
			deleteHis() {
				this.$emit("deleteHis");
			}
		},
		computed: {
			...mapState(["searchHistory"])
		},
		inject: ["Search"]
	}
</script>

<style lang="scss" scoped>
	.title {
		//font-size: 34rpx;
		margin-top: 30rpx;
		font-size: 30rpx;
		display: flex;
		justify-content: space-between;
		.delete-icon {
			width: 27.0855rpx;
			height: 27.0855rpx;
			background-size: 100% 100%;
			background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzlweCIgaGVpZ2h0PSIzOXB4IiB2aWV3Qm94PSIwIDAgMzkgMzkiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjEgKDc4MTM2KSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5Db21iaW5lZCBTaGFwZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtb3BhY2l0eT0iMC4zIj4KICAgICAgICA8ZyBpZD0i5pCc57SiX+WOhuWPsuiusOW9lSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTk5My4wMDAwMDAsIC00MjYuMDAwMDAwKSIgZmlsbD0iIzAwMDAwMCIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPHBhdGggZD0iTTk5Nyw0MzIgTDEwMjgsNDMyIEwxMDI4LDQ1OSBDMTAyOCw0NjIuMzEzNzA4IDEwMjUuMzEzNzEsNDY1IDEwMjIsNDY1IEwxMDAzLDQ2NSBDOTk5LjY4NjI5Miw0NjUgOTk3LDQ2Mi4zMTM3MDggOTk3LDQ1OSBMOTk3LDQzMiBaIE0xMDAwLDQzNSBMMTAwMCw0NTkgQzEwMDAsNDYwLjY1Njg1NCAxMDAxLjM0MzE1LDQ2MiAxMDAzLDQ2MiBMMTAyMiw0NjIgQzEwMjMuNjU2ODUsNDYyIDEwMjUsNDYwLjY1Njg1NCAxMDI1LDQ1OSBMMTAyNSw0MzUgTDEwMDAsNDM1IFogTTEwMjQsNDMyIEwxMDMwLjUsNDMyIEMxMDMxLjMyODQzLDQzMiAxMDMyLDQzMi42NzE1NzMgMTAzMiw0MzMuNSBDMTAzMiw0MzQuMzI4NDI3IDEwMzEuMzI4NDMsNDM1IDEwMzAuNSw0MzUgTDk5NC41LDQzNSBDOTkzLjY3MTU3Myw0MzUgOTkzLDQzNC4zMjg0MjcgOTkzLDQzMy41IEM5OTMsNDMyLjY3MTU3MyA5OTMuNjcxNTczLDQzMiA5OTQuNSw0MzIgTDEwMDEsNDMyIEMxMDAxLDQyOC42ODYyOTIgMTAwMy42ODYyOSw0MjYgMTAwNyw0MjYgTDEwMTgsNDI2IEMxMDIxLjMxMzcxLDQyNiAxMDI0LDQyOC42ODYyOTIgMTAyNCw0MzIgWiBNMTAyMSw0MzIgQzEwMjEsNDMwLjM0MzE0NiAxMDE5LjY1Njg1LDQyOSAxMDE4LDQyOSBMMTAwNyw0MjkgQzEwMDUuMzQzMTUsNDI5IDEwMDQsNDMwLjM0MzE0NiAxMDA0LDQzMiBMMTAyMSw0MzIgWiBNMTAwNy41LDQzOCBDMTAwOC4zMjg0Myw0MzggMTAwOSw0MzguNjcxNTczIDEwMDksNDM5LjUgTDEwMDksNDU3LjUgQzEwMDksNDU4LjMyODQyNyAxMDA4LjMyODQzLDQ1OSAxMDA3LjUsNDU5IEMxMDA2LjY3MTU3LDQ1OSAxMDA2LDQ1OC4zMjg0MjcgMTAwNiw0NTcuNSBMMTAwNiw0MzkuNSBDMTAwNiw0MzguNjcxNTczIDEwMDYuNjcxNTcsNDM4IDEwMDcuNSw0MzggWiBNMTAxNy41LDQzOCBDMTAxOC4zMjg0Myw0MzggMTAxOSw0MzguNjcxNTczIDEwMTksNDM5LjUgTDEwMTksNDU3LjUgQzEwMTksNDU4LjMyODQyNyAxMDE4LjMyODQzLDQ1OSAxMDE3LjUsNDU5IEMxMDE2LjY3MTU3LDQ1OSAxMDE2LDQ1OC4zMjg0MjcgMTAxNiw0NTcuNSBMMTAxNiw0MzkuNSBDMTAxNiw0MzguNjcxNTczIDEwMTYuNjcxNTcsNDM4IDEwMTcuNSw0MzggWiIgaWQ9IkNvbWJpbmVkLVNoYXBlIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=);
		}
	}
	.content {
		margin: 10rpx 0 90rpx 0;
		display: flex;
		flex-wrap: wrap;
		.list {
			display: inline;
			font-size: 30rpx;
			padding: 10rpx 24rpx;
			background: rgba(0,0,0,.03);
			border-radius: 32rpx;
			margin-right: 20rpx;
			margin-top: 26rpx;
		}
	}
	
</style>
