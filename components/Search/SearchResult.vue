<template>
	<view class="result-wrapper">
		<view class="result-list" v-for="(item, index) of searchResult.resultList" :key="index">
			<view class="song">
				<view class="song-name" v-html="keywordHignlight(item.name)"></view>
				<view class="song-details">
					<view class="" v-html="iconTag(item.privilege.fee,'vip')"></view>
					<view class="" v-html="iconTag(item.privilege.flag,'cr')"></view>
					<view class="" v-html="iconTag(item.privilege.maxbr, 'sq')"></view>
					<view class="artist" v-html="keywordHignlight(getAr(item.ar)+' - '+item.al.name)"></view>
				</view>
			</view>
			<view class="play-btn">
				
			</view>
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
			}
		},
		computed: {
			keywordHignlight(keyword) {
				return (item) => {
					let key = this.searchResult.keyword
					return item.replace(key, "<span class='Highlight'>" + key + "</span>")
				}
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
				.song-name {
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
		.loading {
			background-image: url(data:image/gif;base64,R0lGODlhKAAoAIABANM6Mf///yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI2QURFODRFRkZBRTExRTU4NTg0QTdFMUQ4QkI2MTI1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI2QURFODRGRkZBRTExRTU4NTg0QTdFMUQ4QkI2MTI1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjZBREU4NENGRkFFMTFFNTg1ODRBN0UxRDhCQjYxMjUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjZBREU4NERGRkFFMTFFNTg1ODRBN0UxRDhCQjYxMjUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQJCgABACwAAAAAKAAoAAACeIyPqcvtD6OctNoD8rUZ7Np9VChKZAmdqKOuTOsqcIzMtGHfuaxxfbRrBGu/UfExXCRxxwRsGdg9m0IqpgmVYq1KbnTrMXmnYeAYzCtf1em2E11lf+VkFpxIP+f37td93dfF9zboVwhIaHfItJjoiBd4IzlJWalQAAAh+QQJCgABACwAAAAAKAAoAAACfIyPqcvtD6OctNqLs94WeB55AAiJ5GOeTaoubJu8nBzQGm0zuYF/0l7zIYAxocvIQzqAvVHROVRGoYemgqm0PpfZLjX53YqnV2nVWw5j1ejxkQ1Pc+Nu8FxeD4bJea2uzRf4hidotwJ4RvenmEg42IfoaFioB2N5iZmZUAAAIfkECQoAAQAsAAAAACgAKAAAAn+Mj6nL7Q+jnLRaCPK1GezafVTIaRIJmhE6qpg7sY98wg692g3+egnNm9mAup6C6EslD8hL8zcsGp4I6sI6jS6PWu42EAR3od8wVlyWor1s8m1chV/l2fQ3bm/j33m3n3F2tvfHREdYp1d4p5iIePgYqBbZB2goKIKZqbnJ+VAAACH5BAUKAAEALAAAAAAoACgAAAJ8jI+py+0PIwRUWkbB3Sjz731bKFpkGZ1mJaktm8KX29CT/Ng57ug9XwPeNC/iSLjwBY1DEFKhxDwTLl/0UH1eDVkmlNf9eqng8thqFquX606aTT6/pfJ6OznH5u/cfQBtF8cnSOgWSDcYBmeYqOWniFiod4hSaXmJmWlRAAA7);
			width: 80rpx;
			height: 80rpx;
		}
	}
</style>
