<template>
	<view class="mask">
		<scroll-view
			class="scroll-view"
			scroll-y="true"
			:scroll-top="scrollTop"
			scroll-with-animation="true"
		>
			<view class="lyric-content" v-for="item in Lrc">
				<view class="lyric-item" v-html="item">
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "LyricsView",
		props: {
			// 歌词
			lrc: Array,
			showLrc: Array
		},
		data() {
			return {
				scrollTop: 0,
				lineNo: 0,
				// 歌词
				Lrc: this.$props.showLrc
			}
		},
		mounted() {
			this.lyricScroll()
		},
		methods: {
			lyricScroll() {
				this.$innerAudioContext.onTimeUpdate(() => {
					let lineNo = this.lineNo
					if(lineNo==this.lrc.length)
						return;
					var curTime = this.$innerAudioContext.currentTime; //播放器时间
					if(this.lrc[lineNo].t<=curTime){
						this.$set(this.Lrc, lineNo, "<div class='focus'>"+this.Lrc[lineNo] +"</div>")
						console.log(this.Lrc[lineNo])
						if(lineNo>0) {
							 //console.log(this.$refs.lyrics.$el)
							// 正则去掉样式
							let pre = this.Lrc[lineNo-1].replace(/<\/?.+?\/?>/g,"")
							this.$set(this.Lrc, lineNo-1, pre)
						}
						if(lineNo > 1) {
							this.scrollTop += 40
						}
											
						this.lineNo++;
					}
				})			
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mask {
		.scroll-view {
			position: relative;
			height: 120px;
			//padding: 0 33.336rpx;
			transition: transform .3s ease-out;
			transition: transform .3s ease-out,-webkit-transform .3s ease-out;
			padding-top: 62.505rpx;
			padding-bottom: 83.34rpx;
			text-align: center;
			font-size: 29.169rpx;
			.lyric-content {
				padding: 0 33.336rpx;
				.lyric-item {
					overflow: hidden;
					margin-bottom: 16PX;
					color: rgba(250,250,250,.4);
					text-overflow: ellipsis;
					white-space: nowrap;
					word-break: normal;
					font-size: 16PX;
					line-height: 1.5;
				}  
			}
		}
	}
	
</style>
