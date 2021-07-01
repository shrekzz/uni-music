<template>
	<view class="index-wrapper">
		<user />
		<view @click="toSearch">
			<search />
		</view>
		<view class="text">

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
	import Search from "../../components/Search.vue"

	export default {
		components: {
			TopList,
			User,
			Search
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

		.test {
			background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2Iv
bj0iMS4wliBlbmNvZGluZzOiVVRGLTgiPz4KPHN2ZyB3aWROaDOiNDJweClgaGVpz2h0PSIOM3B4liB2aWV3Qm94PSlwlDAgnDigNDMilHZIcnNpb249jEuMSIgeG1 bnM9lmhodha6ly93d3cudzMub 3JnLzlwMDAvc3Zn B4bWxuczp4b GluazoiaHROcdovL3d3dy 53My5vcmcv MTk50S94b Gluayl +-CiAgICA8ISOtlEdlbmVyYXRvcjogU 2tldGNolDU1LjEgKDC4MTM2KSAtIGhOdHBZOi8vc2tld GNoYXBWLmNvbSAtLT4KICAgIDXOaXRSZT5Hcm91c CAzPC90aXRSZT4KICAglDXkZXNjPkNyZWFOZWQgd2 lOaCBTa2VOY2guPC9kZXNjPgogICAgPGcgaWQ9lIBh Z2UtMSlgc3 Ryb2tlPSJub25lliBzdHJva2Utd2lkdGg9ljE ilGZpbGw 9Im 5vbmUilGZpb GwtcnVsZTOizXZlbm9kZC b 3 BhY2l0e ToiMC4ZMDAWMDAWMTliPgoglcaglcag DxnlGIkPSLmkJzntKJf5Y6G5Y+y6K6w5b2VliBOcmFu c2Zvcm09In RyYW5ZbGFOZSatoTEuMDAWMDAWLCA MjkzLjAWMDAWMCkilHNOcm9rZTOilZMZMZMzMylgc 3Ryb2tlLXdpZHRoPSIOlj4KICAgICAgICAgICAgPGcga WQ9lkdyb 3VwLTQilHRy YW5ZZm9ybTOidHJhbnNsYXR lKDQ4LjAWMDAWMCWgMjYXLjAWMDAWMCkiPgogIC AglCAgICAgICAgICAgPGcgaWQ9lkdyb 3VwLTMilHRyY W5ZZm9yb TOidHJhbnNsYXRIKDM5LjAWMDAWMCwg MjkuMDAWMDAwKSI-+ CiAgICAgICAgICAgICAgICAgIC AgPGNpcmNsZSBpZDOiT3ZhbClgY3g9ljlyLjUilGN5PS MS41 iByPSIXNi41j48 L2NpcmNsZT4KICAgICAgICA gICAgICAgICAgICA8cGFOaCBkPSJNMzQuMZC1 NZC4 OSwZMy4ONDIOMDMOIEWOMy43ODlyMjYsNDMUMDY WNTkw MSIgaWQ9llBhdGgtNClgc3 Ryb2tILWxpbmVjJY XA9InJvdW5kliBzdHJva2UtbGluZWpvaW49InJvdW5kI j48 L3 BhdGg+ CiAgICAgICAgICAgICAgICA8L2C+-CiAgIC AgICAgICAglDWVZz4KICAgICAgICA8L2C+ CiAgICA8L2 C+Cjwvc3ZnPg=="

		}

	}
</style>
