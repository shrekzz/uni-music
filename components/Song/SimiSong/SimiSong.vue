<template>
	<view class="simi-song">
		<view class="simi-header">
			<text class="title">喜欢这首歌的人也听</text>
			<view class="play-all-recommend">
				<view class="play-simi" ></view>
				<text class="btn-txt">一键收听</text>
			</view>
		</view>
		<view class="">
			<simi-list v-for="item in simi"  :list="item"></simi-list>
		</view>
	</view>
</template>

<script>
	import SimiList from "./SimiList.vue"
	
	export default {
		name: "SimiSong",
		props: {
			simi: Array
		},
		components: {
			SimiList
		}
	}
</script>

<style lang="scss" scoped>
	.simi-song {
	    position: relative;
	    padding: 0 33.336rpx;
	    color: #fff;
		.simi-header {
			display: -ms-flexbox;
			display: flex;
			-ms-flex-pack: justify;
			justify-content: space-between;
			.title {
				font-weight: 500;
				font-size: 35.4195rpx;
				line-height: 1.5;
			}
			.play-all-recommend {
				display: -ms-flexbox;
				display: flex;
				-ms-flex-align: center;
				align-items: center;
				-ms-flex-pack: center;
				justify-content: center;
				padding: 12.501rpx 20.835rpx;
				border: 0.6945rpx solid rgba(216,216,216,.2);
				border-radius: 50.004rpx;
				font-size: 25.002rpx;
				.play-simi {
					background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzZweCIgaGVpZ2h0PSIzNnB4IiB2aWV3Qm94PSIwIDAgMzYgMzYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU5LjEgKDg2MTQ0KSAtIGh0dHBzOi8vc2tldGNoLmNvbSAtLT4KICAgIDx0aXRsZT5Hcm91cCAxMjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLmkq3mlL7pobVf5LiL6L29YXBw5oyJ6ZKuIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtODE2LjAwMDAwMCwgLTIxMTAuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTE1LUNvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDc4Ni4wMDAwMDAsIDIwOTIuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMwLjAwMDAwMCwgMTguMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE4LDAgQzI3Ljk0MTEyNTUsMCAzNiw4LjA1ODg3NDUgMzYsMTggQzM2LDI3Ljk0MTEyNTUgMjcuOTQxMTI1NSwzNiAxOCwzNiBDOC4wNTg4NzQ1LDM2IDAsMjcuOTQxMTI1NSAwLDE4IEMwLDguMDU4ODc0NSA4LjA1ODg3NDUsMCAxOCwwIFogTTE4LDMgQzkuNzE1NzI4NzUsMyAzLDkuNzE1NzI4NzUgMywxOCBDMywyNi4yODQyNzEyIDkuNzE1NzI4NzUsMzMgMTgsMzMgQzI2LjI4NDI3MTIsMzMgMzMsMjYuMjg0MjcxMiAzMywxOCBDMzMsOS43MTU3Mjg3NSAyNi4yODQyNzEyLDMgMTgsMyBaIE0xNi40MzYyNTgxLDEyLjI1MjM1MTQgTDIzLjMwMDcxNzgsMTYuNzU1MjgzMSBDMjQuMjAzNzIzNCwxNy4zNDc2MzQ1IDI0LjIwMzcyMzQsMTguNjcxMzg4OCAyMy4zMDA3MTc4LDE5LjI2Mzc0MDMgTDE2LjQzNjI1ODEsMjMuNzY2NjcyIEMxNS40Mzg3MzE1LDI0LjQyMTAyNzEgMTQuMTEzNTEyMywyMy43MDU0Mzk1IDE0LjExMzUxMjMsMjIuNTEyNDQzNCBMMTQuMTEzNTEyMywxMy41MDY1Nzk5IEMxNC4xMTM1MTIzLDEyLjMxMzU4MzggMTUuNDM4NzMxNSwxMS41OTc5OTYzIDE2LjQzNjI1ODEsMTIuMjUyMzUxNCBaIiBpZD0iQ29tYmluZWQtU2hhcGUiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+");
				    background-size: 100% 100%;
					margin-right: 4.167rpx;
				    width: 25.002rpx;
				    height: 25.002rpx;
				}
			}
		}
	}
</style>
