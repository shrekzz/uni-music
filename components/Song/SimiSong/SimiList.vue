<template>
	<view class="simisong-item" @click="changeSong(list.id, list.name)">
		<image class="simisong-img" :src="list.album.picUrl" lazy-load ></image>
		<view class="content">
			<text class="content-title">{{ list.name }}</text>
			<view class="content-main">
				<image class="sq-tag" v-if="list.privilege.maxbr == 999000" ></image>
				{{ albumName }}
			</view>
			<view class="content-btn" ></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "SimiList",
		props: {
			list: Object
		},
		computed: {
			albumName() {
				let artists = this.list.album.artists;
				let name = this.list.album.name;
				let signers = []
				artists.forEach(item => {
					signers.push(item.name)
				})
				return signers.join("/") + " - "  + name;
			}
		},
		methods: {
			toSong(id, name) {
				uni.navigateTo({
					url:"../../pages/Song/Song?id="+ id + "&name="+ name,
					animationType: "pop-in"
				})
			}
		},
		inject:["changeSong"]
	}
</script>

<style lang="scss" scoped>
	.simisong-item {
	    position: relative;
	    margin-top: 40.9755rpx;
	    padding-right: 65.9775rpx;
	    padding-left: 104.175rpx;
	    height: 83.34rpx;
		.simisong-img {
		    position: absolute;
		    left: 0;
		    width: 83.34rpx;
		    height: 83.34rpx;
		    border-radius: 8.334rpx;
		}
		.content {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			word-break: normal;
			line-height: 1.5;
			.content-title {
			    display: block;
			    font-size: 31.2525rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				word-break: normal;
			}
			.content-main {
			    color: rgba(255,255,255,.6);
			    font-size: 22.9185rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				word-break: normal;
				.sq-tag {
					width: 25.002rpx;
					height: 16.668rpx;
				    margin-right: 7.6395rpx;
					background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzZweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMzYgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjEgKDc4MTM2KSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5TUTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLmkq3mlL7pobVf5YiG5Lqr54q25oCBIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTk4LjAwMDAwMCwgLTI1NzUuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSJHcm91cC1Db3B5LTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLCAyNDY0LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQ4LjAwMDAwMCwgMzAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1MC4wMDAwMDAsIDkuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSJTUSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDcyLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS0zMyIgc3Ryb2tlPSIjRkU2NzJFIiBzdHJva2Utd2lkdGg9IjIiIHg9IjEiIHk9IjEiIHdpZHRoPSIzNCIgaGVpZ2h0PSIyMiIgcng9IjIiPjwvcmVjdD4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zMCwxNiBMMzAuOTkwNjMxMSwxNiBDMzEuNTQ4MDkwMiwxNiAzMiwxNi40NDI2NjAzIDMyLDE2Ljk5ODk1NjYgTDMyLDE4LjAwMTA0MzQgQzMyLDE4LjU1Mjc1MTkgMzEuNTU2NjQ2OCwxOSAzMC45OTA2MzExLDE5IEwyOS4wMDkzNjg5LDE5IEMyOS4wMDg1NDQsMTkgMjkuMDA3NzE5NCwxOC45OTk5OTkgMjkuMDA2ODk1LDE4Ljk5OTk5NzEgQzI5LjAwNjA3MiwxOC45OTk5OTkgMjkuMDA1MjQ3NCwxOSAyOS4wMDQ0MjI1LDE5IEwxOS45OTU1Nzc1LDE5IEMxOS40NDU3MzUyLDE5IDE5LDE4LjU1MjUxMDYgMTksMTguMDAxNDk3NyBMMTksNi45OTg1MDIzMyBDMTksNi40NDcwNDQ3MiAxOS40NDQ4MzcsNiAxOS45OTU1Nzc1LDYgTDI5LjAwNDQyMjUsNiBDMjkuNTU0MjY0OCw2IDMwLDYuNDQ3NDg5NDMgMzAsNi45OTg1MDIzMyBMMzAsMTYgWiBNMjIsMTAuMDAyOTI5MyBMMjIsMTQuOTk3MDcwNyBDMjIsMTUuNTYyMTE4NiAyMi40NDc2MjkxLDE2IDIyLjk5OTgwNzUsMTYgTDI2LjAwMDE5MjUsMTYgQzI2LjU1NjI4MzQsMTYgMjcsMTUuNTUwOTczMiAyNywxNC45OTcwNzA3IEwyNywxMC4wMDI5MjkzIEMyNyw5LjQzNzg4MTM1IDI2LjU1MjM3MDksOSAyNi4wMDAxOTI1LDkgTDIyLjk5OTgwNzUsOSBDMjIuNDQzNzE2Niw5IDIyLDkuNDQ5MDI2NzYgMjIsMTAuMDAyOTI5MyBaIiBpZD0iUmVjdGFuZ2xlLTQwIiBmaWxsPSIjRkU2NzJFIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTQsMTkgTDYsMTkgTDYsMTYgTDE0LDE2IEwxNCwxNCBMOSwxNCBMNywxNCBDNi40NDc3MTUyNSwxNCA2LDEzLjU1MjI4NDcgNiwxMyBMNiw2IEw5LDYgTDE3LDYgTDE3LDkgTDksOSBMOSwxMSBMMTYsMTEgQzE2LjU1MjI4NDcsMTEgMTcsMTEuNDQ3NzE1MyAxNywxMiBMMTcsMTQgTDE3LDE4IEMxNywxOC41NTIyODQ3IDE2LjU1MjI4NDcsMTkgMTYsMTkgTDE0LDE5IFoiIGlkPSJDb21iaW5lZC1TaGFwZSIgZmlsbD0iI0ZFNjcyRSI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=");
					background-size: 25.002rpx 16.668rpx;
				}	
			}
			.content-btn {
			    position: absolute;
			    top: 17.3625rpx;
			    right: 0;
			    margin: 0;
			    padding: 0;
			    width: 50.004rpx;
			    height: 50.004rpx;
			    border: 0;
			    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzIiIGhlaWdodD0iNzIiIHZpZXdCb3g9IjAgMCA3MiA3MiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiNGRkYiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBvcGFjaXR5PSIuMiI+PGNpcmNsZSBjeD0iMzYiIGN5PSIzNiIgcj0iMzQuNSIvPjxwYXRoIGQ9Ik00Ni44MTcgMzUuMTU1TDI5LjU5MyAyNC4zODljLS44Ny0uNTQzLTEuMDkzLS40Mi0xLjA5My42MXYyMi4wMDJjMCAxLjAzMy4yMiAxLjE1NSAxLjA5My42MWwxNy4yMjQtMTAuNzY2Yy45My0uNTguOTMtMS4xMSAwLTEuNjl6Ii8+PC9nPjwvc3ZnPg==);
			    background-size: contain;
			    background-repeat: no-repeat;
				&:after {
					border: 0;
				}
			}
		}
	}
</style>
