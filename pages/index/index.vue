<template>
	<view class="index-wrapper">
		<user />
		<view @click="toSearch">
			<search-box />
		</view>
		<top-list :list="toplist" />
	</view>
</template>

<script>
	import {
		myRequest
	} from "../../api.js";
	import TopList from "../../components/TopList";
	import User from "../../components/User";
	import SearchBox from "../../components/Search/SearchBox"

	export default {
		components: {
			TopList,
			User,
			SearchBox
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
				console.log(list)
			})
		},
		methods: {
			toSearch() {
				uni.navigateTo({
					url: "../SearchPage/SearchPage",
					animationType: "pop-in"
				})
			}
		}
	}
</script>

<style lang="scss">
	.index-wrapper {
		padding: 20rpx 40rpx;


	}
</style>
