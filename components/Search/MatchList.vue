<template>
	<view>
		<view class="search-tips" v-if="keywords" @click="search(keywords)">
			搜索“{{ keywords }}”
		</view>
		<view class="match-result" v-if="showMatch">
			<view
				class="match-result-list"
				v-for="(item, index) of matchList" 
				:key="index"
				@click="search(item.keyword)"
			>
					<view class="res-icon"></view>
					<view class="res-song">{{ item.keyword }}</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: "MatchList",
		props: {
			keywords: String,
			matchList: Array
		},
		computed: {
			showMatch() {
				return this.matchList.length !== 0
			}
		},
		methods: {
			search(key) {
				this.$emit("search", key);
			}
		}
	}
</script>
<style lang="scss" scoped>
	.search-tips {
		color: #507DAF;
		margin: 44rpx 20rpx 44rpx 22rpx;
	}

	.match-result {
		font-size: 30rpx;

		.match-result-list {
			padding: 20rpx;
			margin: 20rpx 0;
			color: #8E8E8E;
			display: flex;

			.res-icon {
				color: #999999;
				width: 40rpx;
				height: 40rpx;
				background-size: 100% 100%;
				background-repeat: no-repeat;
				background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==");
			}

			.res-song {
				margin-left: 20rpx;
			}
		}
	}
</style>
