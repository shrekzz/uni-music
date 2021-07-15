<template>
	<view class="t">
		<!-- 标题&针 -->
		<view class="vinyl-head">
			<view class="logo">
				
			</view>
			<image class="vinyl-neddle" src="../../static/images/needle.png" ></image>
		</view>
		<!-- 中间轮盘 -->
		<view class="vinyl-turntable">
			<image class="vinyl-mask" :src="picUrl" :class="{pause: !play}" ></image>
			<image class="vinyl-bottom" src="../../static/images/vinyl.png" :class="{pause: !play}" ></image>
		</view>
		
		<!-- 播放按钮 -->
		<view class="" @tap="palyMusic()">
			<view class="play-btn-play" v-if="play"></view>
			<view class="play-btn-pause" v-else ></view>
		</view>
		<!--  歌词同步滚动 -->
		<lyrics-view :lrc="lrc" :showLrc="showLrc" ></lyrics-view>
	</view>
</template>

<script>
	import LyricsView from "../../components/Song/LyricsView.vue";
	export default {
		data() {
			return {
				// 歌曲id
				id: "",
				// 图片地址
				picUrl: "",
				// 播放状态
				play: true,
				// 歌词以及时间线
				lrc: [],
				// 歌词
				showLrc: [],
				// 歌曲地址
				url: "",
			}
		},
		components: {
			LyricsView
		},
		methods: {
			getSong() {
				this.$MyRequest({
					url: "/song/detail",
					data: {
						ids: this.id
					}
				}).then(
					res => {
						let songInfo = res.data.songs[0].al;
						console.log(res.data.songs[0].al);
						this.picUrl = songInfo.picUrl;
					}
				);
				// 获取歌词
				this.$MyRequest({
					url: "/lyric",
					data: {
						id: this.id
					}
				}).then(
					res => {
						// 歌词格式化
						if(res.data.uncollected) {
							this.showLrc.push("<div class='focus'>暂无歌词，求歌词</div>");
							return
						}
						let handleLrc = []
						let lrc = res.data.lrc.lyric.split("\n");
						lrc.forEach(item => {
							if(item) {
								let lrcTime = /\[(.+?)\]/g.exec(item)[1].split(":")
								lrcTime = Number(lrcTime[0])*60+Number(lrcTime[1]);
								// 去掉时间 eg:[01:23.33]
								let word = /(?<=]).*/.exec(item)[0];
								// 空歌词不要
								if(word.length !== 0) {
									handleLrc.push({t: lrcTime, w: word });
									this.showLrc.push(word);
								}	
							}
						})
						this.lrc = handleLrc;
						console.log(handleLrc)
					}
				);
				// 获取url
				this.$MyRequest({
					url: "/song/url",
					data: {
						id: this.id
					}
				}).then(
					res => {
						this.url = res.data.data[0].url;
						this.initMusic();
					}
				);
			},
			// 初始化音乐
			initMusic() {
				this.$innerAudioContext.src = this.url;
				this.$innerAudioContext.play();
				this.$innerAudioContext.onPlay(() => {
				  console.log('开始播放');
				});
				// 歌曲自然播放停止事件
				this.$innerAudioContext.onEnded(() => {
					this.play = false;	
				})
			},
			// 播放/暂停音乐
			palyMusic() {
				if(this.play) {
					// 暂停
					this.$innerAudioContext.pause();
				}else {
					// 播放
					this.$innerAudioContext.play();
				}
				this.play = !this.play;
			},
		},
		onLoad(data) {
			uni.setNavigationBarTitle({
				title: data.name
			})

			this.id = data.id;
			this.getSong()
			
			
		}
	}
</script>

<style lang="scss" scoped>
	@-webkit-keyframes circling {
	    0% {
	        transform: rotate(0deg);
	    }
	
	    to {
	        transform: rotate(360deg);
	    }
	}
	
	@keyframes circling {
	    0% {
	        transform: rotate(0deg);
	    }
	
	    to {
	        transform: rotate(360deg);
	    }
	}
	.t{
		background-color: rgba(0,0,0,.5);
	}
	.vinyl-head {
		position: relative;
		height: 209.739rpx;
		.logo {
			background-image: url(../../static/images/logo.svg);
			background-size: 193.7655rpx 37.503rpx;
			position: absolute;
			top: 15.279rpx;
			left: 20.835rpx;
			width: 193.7655rpx;
			height: 37.503rpx;
		}
		.vinyl-neddle {
			position: absolute;
			left: 46%;
			z-index: 1;
			width: 213.2115rpx;
			height: 345.1665rpx;
			z-index: 1;
		}
	}
	.vinyl-turntable {
		position: relative;
		height: 575.046rpx;
		.vinyl-mask {
			position: absolute;
			top: 50%;
			left: 50%;
			margin: -184.0425rpx 0 0 -184.0425rpx;
			width: 368.085rpx;
			height: 368.085rpx;
			
		}
		.vinyl-bottom {
			position: absolute;
			top: 50%;
			left: 50%;
			margin: -287.523rpx 0 0 -287.523rpx;
			width: 575.046rpx;
			height: 100%;
	
		}
		.vinyl-bottom, .vinyl-mask {
			animation: circling 20s infinite linear;
		}
		
		.pause {
			animation-play-state: paused;
		}
	}
	
	
	@mixin play-btn {
		position: absolute;
		background-size: 104.175rpx 104.175rpx;
		top: 445.1745rpx;
		left: 50%;
		z-index: 5;
		margin-left: -52.0875rpx;
		width: 104.175rpx;
		height: 104.175rpx;
	}
	.play-btn-pause {
		@include  play-btn;
		background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTUwcHgiIGhlaWdodD0iMTUwcHgiIHZpZXdCb3g9IjAgMCAxNTAgMTUwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA1NS4xICg3ODEzNikgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+cGxheTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLmkq3mlL7pobVf5YiG5Lqr54q25oCBIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDY1LjAwMDAwMCwgLTc3Ni4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Ium7keiDtuWUseeJhyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTI2LjAwMDAwMCwgNDM3LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9IuaSreaUvui9rOebmCI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9IuWwgemdoiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTM5LjAwMDAwMCwgMTM5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0i5pKt5pS+IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNzAuMDAwMDAwLCAxNzAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0icGxheSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzAuMDAwMDAwLCAzMC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMS41LDc1IEMxLjUsMTE1LjU5MzMxMiAzNC40MDY2ODgsMTQ4LjUgNzUsMTQ4LjUgQzExNS41OTMzMTIsMTQ4LjUgMTQ4LjUsMTE1LjU5MzMxMiAxNDguNSw3NSBDMTQ4LjUsMzQuNDA2Njg4IDExNS41OTMzMTIsMS41IDc1LDEuNSBDMzQuNDA2Njg4LDEuNSAxLjUsMzQuNDA2Njg4IDEuNSw3NSBaIiBpZD0iRmlsbC0xIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMyIgZmlsbC1vcGFjaXR5PSIwLjQiIGZpbGw9IiMwMDAwMDAiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNTcsNTIuMTM4MTI5MyBMNTcsOTcuODU5ODcxNCBDNTcsMTAwLjA2OTAxIDU4Ljc5MDg2MSwxMDEuODU5ODcxIDYxLDEwMS44NTk4NzEgQzYxLjczNzMwMjQsMTAxLjg1OTg3MSA2Mi40NjAyNTk1LDEwMS42NTYwODggNjMuMDg5MDIyOCwxMDEuMjcxMDI3IEwxMDAuNDI4NDQ1LDc4LjQwNDAyNTYgQzEwMi4zMTIzNzUsNzcuMjUwMjkwMiAxMDIuOTA0MzE0LDc0Ljc4Nzc3NjQgMTAxLjc1MDU3OCw3Mi45MDM4NDcgQzEwMS40MjAzMzgsNzIuMzY0NTk5IDEwMC45NjY5NTgsNzEuOTExMzI2OCAxMDAuNDI3NjMxLDcxLjU4MTIxNTIgTDYzLjA4ODIwOCw0OC43MjY0NzQ3IEM2MS4yMDQwMDMyLDQ3LjU3MzE4OTMgNTguNzQxNjMwOCw0OC4xNjU3MTY1IDU3LjU4ODM0NTQsNTAuMDQ5OTIxMyBDNTcuMjAzNjA0Niw1MC42Nzg0OTk4IDU3LDUxLjQwMTE1MTUgNTcsNTIuMTM4MTI5MyBaIiBpZD0iUGF0aC03IiBmaWxsPSIjRkZGRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+");
	}
	.play-btn-play {
		@include  play-btn;
		background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTUwcHgiIGhlaWdodD0iMTUwcHgiIHZpZXdCb3g9IjAgMCAxNTAgMTUwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA1NS4xICg3ODEzNikgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+5pKt5pS+PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IuaSreaUvumhtV/liIbkuqvnirbmgIEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00NjUuMDAwMDAwLCAtNzc2LjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0i6buR6IO25ZSx54mHIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjYuMDAwMDAwLCA0MzcuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i5pKt5pS+6L2s55uYIj4KICAgICAgICAgICAgICAgICAgICA8ZyBpZD0i5bCB6Z2iIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMzkuMDAwMDAwLCAxMzkuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSLmkq3mlL4iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE3MC4wMDAwMDAsIDE3MC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSJwbGF5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMC4wMDAwMDAsIDMwLjAwMDAwMCkiIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC40IiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMyI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTEuNSw3NSBDMS41LDExNS41OTMzMTIgMzQuNDA2Njg4LDE0OC41IDc1LDE0OC41IEMxMTUuNTkzMzEyLDE0OC41IDE0OC41LDExNS41OTMzMTIgMTQ4LjUsNzUgQzE0OC41LDM0LjQwNjY4OCAxMTUuNTkzMzEyLDEuNSA3NSwxLjUgQzM0LjQwNjY4OCwxLjUgMS41LDM0LjQwNjY4OCAxLjUsNzUgWiIgaWQ9IkZpbGwtMSI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9InBhdXNlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMC4wMDAwMDAsIDMwLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xLjUsNzUgQzEuNSwxMTUuNTkzMzEyIDM0LjQwNjY4OCwxNDguNSA3NSwxNDguNSBDMTE1LjU5MzMxMiwxNDguNSAxNDguNSwxMTUuNTkzMzEyIDE0OC41LDc1IEMxNDguNSwzNC40MDY2ODggMTE1LjU5MzMxMiwxLjUgNzUsMS41IEMzNC40MDY2ODgsMS41IDEuNSwzNC40MDY2ODggMS41LDc1IFoiIGlkPSJGaWxsLTEiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIzIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTYyLDQ1IEM2NS4zMTM3MDg1LDQ1IDY4LDQ3LjY4NjI5MTUgNjgsNTEgTDY4LDk5IEM2OCwxMDIuMzEzNzA4IDY1LjMxMzcwODUsMTA1IDYyLDEwNSBDNTguNjg2MjkxNSwxMDUgNTYsMTAyLjMxMzcwOCA1Niw5OSBMNTYsNTEgQzU2LDQ3LjY4NjI5MTUgNTguNjg2MjkxNSw0NSA2Miw0NSBaIE04OSw0NSBDOTIuMzEzNzA4NSw0NSA5NSw0Ny42ODYyOTE1IDk1LDUxIEw5NSw5OSBDOTUsMTAyLjMxMzcwOCA5Mi4zMTM3MDg1LDEwNSA4OSwxMDUgQzg1LjY4NjI5MTUsMTA1IDgzLDEwMi4zMTM3MDggODMsOTkgTDgzLDUxIEM4Myw0Ny42ODYyOTE1IDg1LjY4NjI5MTUsNDUgODksNDUgWiIgaWQ9IkNvbWJpbmVkLVNoYXBlIiBmaWxsPSIjRkZGRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+");
	}
		
</style>
