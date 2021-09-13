<template>
	<view>
		<Skeleton v-if="showSkeleton" />
		<view v-else class="index-wrapper">
			<user />
			<view @click="toSearch">
				<search-box />
			</view>
			<top-list :list="toplist" />
		</view>
	</view>
</template>

<script>
	import {
		myRequest
	} from "../../api.js";
	import TopList from "../../components/TopList";
	import User from "../../components/User";
	import SearchBox from "../../components/Search/SearchBox";
	import Skeleton from "../../components/Skeleton/Skeleton"

	export default {
		components: {
			TopList,
			User,
			SearchBox,
			Skeleton
		},
		data() {
			return {
				toplist: []
			}
		},
		onLoad() {
			myRequest({
				url: "/toplist/detail"
			}).then(res => {
				const list = res.data.list.slice(0, 4)
				this.toplist = list
			})
		},
		methods: {
			toSearch() {
				uni.navigateTo({
					url: "../SearchPage/SearchPage",
					animationType: "pop-in"
				})
			}
		},
		computed: {
			showSkeleton() {
				return this.toplist.length === 0
			}
		}
	}
</script>

<style lang="scss">
	.index-wrapper {
		padding: 20rpx 40rpx;


	}
</style>
