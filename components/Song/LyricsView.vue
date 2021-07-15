<template>
	<view>
		<scroll-view class="scroll-view" scroll-y="true" :scroll-top="scrollTop" scroll-with-animation="true">
			<view class="lyric-content" v-for="(item, index) in Lrc" :key="index">
				<view class="lyric-item" v-html="item">
				</view>
			</view>
		</scroll-view>
		<view class="mask"></view>
	</view>
</template>

<script>
	export default {
		name: "LyricsView",
		props: {
			// 歌词源文件
			lrc: Array,
			// 纯歌词
			showLrc: Array
		},
		data() {
			return {
				scrollTop: 0,
				lineNo: 0,
				// 歌词
				Lrc: this.showLrc
			}
		},
		watch: {
			lrc(newVal) {
				if (newVal.length !== 0) {
					this.lyricScroll();
				}
			}
		},
		methods: {
			// 歌词滚动
			lyricScroll() {
				let lrcLen = this.lrc.length
				this.$innerAudioContext.onTimeUpdate(() => {
					if (this.lineNo !== lrcLen) {
						let lineNo = this.lineNo
						var curTime = this.$innerAudioContext.currentTime; //播放器时间
						if (this.lrc[lineNo].t <= curTime) {
							this.$set(this.Lrc, lineNo, "<div class='focus'>" + this.Lrc[lineNo] + "</div>");
							if (lineNo > 0) {
								// 正则去掉样式
								this.clearClass(lineNo - 1)
							}
							if (lineNo > 1) {
								this.scrollTop += 40;
							}

							this.lineNo++;
						}
					}

				})
				// 歌曲自然播放结束事件
				this.$innerAudioContext.onEnded(() => {
					// 最后一行歌词去掉样式
					this.clearClass(this.Lrc.length - 1);
					this.lineNo = 0;
					this.scrollTop = 0;
				})
			},
			clearClass(index) {
				let pre = this.Lrc[index].replace(/<\/?.+?\/?>/g, "");
				this.$set(this.Lrc, index, pre);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-view {
		position: relative;
		height: 120px;
		//padding: 0 33.336rpx;
		transition: transform .3s ease-out;
		transition: transform .3s ease-out, -webkit-transform .3s ease-out;
		padding-top: 62.505rpx;
		padding-bottom: 83.34rpx;
		text-align: center;
		font-size: 29.169rpx;

		.lyric-content {
			padding: 0 33.336rpx;

			.lyric-item {
				overflow: hidden;
				margin-bottom: 16PX;
				color: rgba(250, 250, 250, .4);
				text-overflow: ellipsis;
				white-space: nowrap;
				word-break: normal;
				font-size: 16PX;
				line-height: 1.5;
			}
		}
	}

	.mask {
		height: 120px;
		position: fixed;
		width: 100%;
		margin-top: -156px;
	}
</style>
