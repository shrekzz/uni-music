<template>
	<view class="result-wrapper">
		<view
			class="result-list"
			v-for="(item, index) of searchResult.resultList"
			:key="index"
			@click="toSong(item.id, item.name)"
			v-if="resLen"
		>
		     <view class="order" v-if="type == 'toplist'">{{index+1}}</view>
			<view class="song">
				<view class="song-name" v-html="keywordHignlight(item.name)"></view>
				<view class="song-details">
					<view class=""  v-html="iconTag(item.privilege.fee,'vip')"></view>
					<view class="" v-html="iconTag(item.privilege.flag,'cr')"></view>
					<view class="" v-html="iconTag(item.privilege.maxbr, 'sq')"></view>
					<view class="artist" v-html="keywordHignlight(getAr(item.ar)+' - '+item.al.name)"></view>
				</view>
			</view>
			<view class="play-btn">
				
			</view>
		</view>
		<view class="no-result" v-show="!resLen">
			暂无搜索结果
		</view>
	</view>
</template>

<script>
	export default {
		name: "SearchResult",
		props: {
			searchResult: {
				keyword: String,
				resultList: Array
			},
			type: String
		},
		computed: {
			keywordHignlight(keyword) {
				return (item) => {
					let key = this.searchResult.keyword
					return item.replace(key, "<span class='Highlight'>" + key + "</span>")
				}
			},
			resLen() {
				return this.searchResult.resultList !== undefined
			}
		},
		methods: {
			getAr(ar) {
				if (ar.length === 1) {
					return ar[0].name
				} else {
					let user = ""
					ar.forEach((item, index) => {
						if (index !== ar.length - 1) {
							user += item.name + " / "
						} else {
							user += item.name
						}
					})
					return user;
				}
			},
			iconTag(flag, tag) {
				
				switch(tag) {
					case "vip": 
						if(flag == 1) {
							return "<div class='vip'></div>";
						}		
					case "cr":  
						if(flag >= 60 && flag <= 70) {
							return "<div class='cr'></div>";
						}
					case "sq": 
						if( flag == 999000) {
							return "<div class='sq'></div>";
						}
				}
	
			},
			toSong(id, name) {
				uni.navigateTo({
					url:"../../pages/Song/Song?id="+ id + "&name="+ name,
					animationType: "pop-in"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.result-wrapper {
		.result-list {
			position: relative;
			.song {
				box-sizing: border-box;
				border: 0 solid rgba(0,0,0,.1);
				border-bottom-width: 2rpx;
				padding: 20rpx 0;
				display: inline-block;
				width: 100%;
				.song-name {
					width: 85%;
					font-size: 31.2525rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					word-break: normal;
					line-height: 1.5;
				}
				.song-details {
					display: flex;
					align-items: center;
					.artist {
						color: #999;
						font-size: 22.9185rpx;
					}
				}
				
			}
			.play-btn {
				position: absolute;
				top: 37.503rpx;
				right: 0;
				width: 50.004rpx;
				height: 50.004rpx;
				background-size: 100% 100%;
				background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNzJweCIgaGVpZ2h0PSI3MnB4IiB2aWV3Qm94PSIwIDAgNzIgNzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjEgKDc4MTM2KSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5Hcm91cCAxODwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9IjAuMjAwMDAwMDAzIj4KICAgICAgICA8ZyBpZD0i5pCc57SiX+e7k+aenCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTk2MC4wMDAwMDAsIC00NTEuMDAwMDAwKSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjMiPgogICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMi1Db3B5LTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLCAzOTcuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMTgiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDk2MC4wMDAwMDAsIDU0LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtNCIgY3g9IjM2IiBjeT0iMzYiIHI9IjM0LjUiPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zNy4xNjExNjkzLDI3LjE5MDY5ODkgTDI2LjM5NTgwODIsNDQuNDE1Mjc2NSBDMjUuODUyMjEyNyw0NS4yODUwMjk0IDI1Ljk3NTkyMyw0NS41MDc5ODkzIDI3LjAwNTc2NjEsNDUuNTA3OTg5MyBMNDkuMDA3MjE2NSw0NS41MDc5ODkzIEM1MC4wNDA1ODM3LDQ1LjUwNzk4OTMgNTAuMTYyNjI1OCw0NS4yODc5OTg5IDQ5LjYxNzE3NDQsNDQuNDE1Mjc2NSBMMzguODUxODEzMywyNy4xOTA2OTg5IEMzOC4yNzA4OTY2LDI2LjI2MTIzMjEgMzcuNzQyMjM2MSwyNi4yNjA5OTIgMzcuMTYxMTY5MywyNy4xOTA2OTg5IFoiIGlkPSJUcmlhbmdsZS0yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzOC4wMDcyNDAsIDM2LjAwMDc0OSkgcm90YXRlKDkwLjAwMDAwMCkgdHJhbnNsYXRlKC0zOC4wMDcyNDAsIC0zNi4wMDA3NDkpICI+PC9wYXRoPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=);
			}
		}
		.no-result {
			height: 125.01rpx;
			color: #999;
			text-align: center;
			font-size: 32.6415rpx;
			line-height: 125.01rpx;
		}
	}
</style>
