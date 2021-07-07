<template>
	<view class="search">
		<view class="search-box">
			<view class="search-icon"></view>
			<input
				class="search-input"
				type="text" 
				placeholder="搜索歌曲"
				v-model.trim="keywords"
				@input="handleInput"
				@confirm="handleInput"
			/>
			<view class="close-icon" v-show="cleanBtn" @click="cleanKeywords">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "SearchBox",
		data() {
			return {
				keywords: "",
				cleanBtn: false
			}
		},
		methods: {
			handleInput() {
				//this.cleanBtn = this.keywords == "" ?  false : true;
				this.$emit("handleInput", this.keywords);
			},
			cleanKeywords() {
				this.keywords = "";
				this.cleanBtn = false;
				console.log("keyword is"+this.keywords)
				this.$emit("handleInput", "");
			}
		},
		watch: {
			keywords(newValue,oldValue) {
				if(newValue!==oldValue && newValue!=="") {
					this.cleanBtn = true;
				} else {
					this.cleanBtn = false;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search {
		position: relative;
		margin: 15rpx 0 30rpx 0;
		.search-box{
			position: relative;
			.search-icon {
				position: absolute;
				left: 20rpx;
				top: 20rpx;
				color: #999999;
				width: 40rpx;
				height: 40rpx;
				background-size: 100% 100%;
				background-repeat: no-repeat;
				background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==");
			}
			
			.search-input {
				
				font-size: 28rpx;
				padding: 0 80rpx;
				border-radius: 80rpx;
				background: #F7F7F7;
				height: 80rpx;
			}
			
			.close-icon{
				position: absolute;
				right: 26rpx;
				top: 26rpx;
				color: #999999;
				width: 28rpx;
				height: 28rpx;
				background-size: 100% 100%;
				background-repeat: no-repeat;
				background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzZweCIgaGVpZ2h0PSIzNnB4IiB2aWV3Qm94PSIwIDAgMzYgMzYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjEgKDc4MTM2KSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT7lj4nlj4k8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsLW9wYWNpdHk9IjAuNiI+CiAgICAgICAgPGcgaWQ9IuaQnOe0ol/ogZTmg7MiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC05MzYuMDAwMDAwLCAtMjk2LjAwMDAwMCkiIGZpbGw9IiMwMDAwMDAiPgogICAgICAgICAgICA8ZyBpZD0iR3JvdXAtNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDguMDAwMDAwLCAyNjEuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i5Y+J5Y+JIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4ODguMDAwMDAwLCAzNS4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTgsMTUuNjY0NzkzOSBMMi44MTkwMDQ3OCwwLjQ4Mzc5ODcxMSBDMi4xNzU5MDI0NywtMC4xNTkzMDM2MDQgMS4xMzA4MDM4MiwtMC4xNTg4OTQ4NzggMC40ODU5NTQ0NzIsMC40ODU5NTQ0NzIgQy0wLjE2MzM5MDY1LDEuMTM1Mjk5NTkgLTAuMTU5ODYwMDQ2LDIuMTc1MzQ2MDIgMC40ODM3OTg3MTEsMi44MTkwMDQ3OCBMMTUuNjY0NzkzOSwxOCBMMC40ODM3OTg3MTEsMzMuMTgwOTk1MiBDLTAuMTU5MzAzNjA0LDMzLjgyNDA5NzUgLTAuMTU4ODk0ODc4LDM0Ljg2OTE5NjIgMC40ODU5NTQ0NzIsMzUuNTE0MDQ1NSBDMS4xMzUyOTk1OSwzNi4xNjMzOTA2IDIuMTc1MzQ2MDIsMzYuMTU5ODYgMi44MTkwMDQ3OCwzNS41MTYyMDEzIEwxOCwyMC4zMzUyMDYxIEwzMy4xODA5OTUyLDM1LjUxNjIwMTMgQzMzLjgyNDA5NzUsMzYuMTU5MzAzNiAzNC44NjkxOTYyLDM2LjE1ODg5NDkgMzUuNTE0MDQ1NSwzNS41MTQwNDU1IEMzNi4xNjMzOTA2LDM0Ljg2NDcwMDQgMzYuMTU5ODYsMzMuODI0NjU0IDM1LjUxNjIwMTMsMzMuMTgwOTk1MiBMMjAuMzM1MjA2MSwxOCBMMzUuNTE2MjAxMywyLjgxOTAwNDc4IEMzNi4xNTkzMDM2LDIuMTc1OTAyNDcgMzYuMTU4ODk0OSwxLjEzMDgwMzgyIDM1LjUxNDA0NTUsMC40ODU5NTQ0NzIgQzM0Ljg2NDcwMDQsLTAuMTYzMzkwNjUgMzMuODI0NjU0LC0wLjE1OTg2MDA0NiAzMy4xODA5OTUyLDAuNDgzNzk4NzExIEwxOCwxNS42NjQ3OTM5IFoiIGlkPSJDb21iaW5lZC1TaGFwZSI+PC9wYXRoPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=");
			}
		}
		
		.search-tips {
			color: #507DAF;
			margin:44rpx 20rpx 44rpx 22rpx;
		}
		.match-result {
			font-size: 30rpx;
			.match-result-list {
				padding: 20rpx;
				margin: 20rpx 0;
				color: #8E8E8E;
				display: flex;
				.res-icon {
					color: #999999;
					width: 40rpx;
					height: 40rpx;
					background-size: 100% 100%;
					background-repeat: no-repeat;
					background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==");
				}
				.res-song {
					margin-left: 20rpx;
				}
			}
		}
	}
</style>
