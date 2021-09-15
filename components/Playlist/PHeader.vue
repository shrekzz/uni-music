<template>
	<view class="header" >
	    <view class="intro" v-if="getDes">
	        <view class="intro-cover">
	            <image class="intro-img" :src="descriptions.coverImgUrl"></image>
	            <view class="play_counts">
	                <image class="counts_icon" :src="counts_icon"></image>
	                <text>{{ (descriptions.playCount/100000000).toFixed(1)  }}亿</text>
	            </view>
	        </view>
			<view class="intro-content">
	            <view class="content-title">{{ descriptions.name }}</view>
	           <view class="content-avatar">
	                <image class="avatar-img" :src="descriptions.creator.avatarUrl"></image>{{descriptions.creator.nickname}}</view>
	            <view class="content-description">
	                <view @click="navToDescriptionModal" class="context" v-if="descriptions.description">{{descriptions.description}}
	                     <image class="arrow" id="arrow" :src="arrow"></image>
	                </view>
	                <text v-else>暂无简介</text>
	            </view>
	        </view>
	    </view>
	</view>

</template>

<script>
	export default {
		name:"PHeader",
		data() {
			return {
				arrow: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTVweCIgaGVpZ2h0PSIyNXB4IiB2aWV3Qm94PSIwIDAgMTUgMjUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjEgKDc4MTM2KSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5Hcm91cCA2PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgb3BhY2l0eT0iMC42MDAwMDAwMjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+CiAgICAgICAgPGcgaWQ9IuatjOWNleivpuaDhV/liIbkuqvnirbmgIEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC05OTYuMDAwMDAwLCAtNjI5LjAwMDAwMCkiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjMiPgogICAgICAgICAgICA8ZyBpZD0i5Lik6KGM5paH5a2XIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0ODMuMDAwMDAwLCAyOTEuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAtNiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTA2LjAwMDAwMCwgMzM2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC03Ij4KICAgICAgICAgICAgICAgICAgICAgICAgPHBvbHlsaW5lIGlkPSJQYXRoLTUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0LjY5NDYxOSwgMTQuODAxODU1KSByb3RhdGUoLTkwLjAwMDAwMCkgdHJhbnNsYXRlKC0xNC42OTQ2MTksIC0xNC44MDE4NTUpICIgcG9pbnRzPSI0IDkgMTQuNjk0NjE4NyAyMC42MDM3MDk2IDI1LjM4OTIzNzQgOSI+PC9wb2x5bGluZT4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==",
				counts_icon: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjJweCIgaGVpZ2h0PSIyNnB4IiB2aWV3Qm94PSIwIDAgMjIgMjYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjEgKDc4MTM2KSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5QYXRoIDI8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0i5q2M5Y2V6K+m5oOFX+WIhuS6q+eKtuaAgSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI4Ny4wMDAwMDAsIC0zMDcuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPGcgaWQ9IuS4k+i+kSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDguMDAwMDAwLCAyOTEuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i5bCB6Z2iIj4KICAgICAgICAgICAgICAgICAgICA8ZyBpZD0i5pKt5pS+5pWwIj4KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTI0MiwxOS43ODY1NDgzIEwyNDIsMzguMjE3ODEwOCBMMjU3LjA4Mjk5MywyOS4wMzU3MTc1IEwyNDIsMTkuNzg2NTQ4MyBaIE0yMzksMTguMDAwMjgzOSBDMjM5LDE3LjYzMTIzMyAyMzkuMTAyMTEzLDE3LjI2OTM3ODMgMjM5LjI5NTAzNywxNi45NTQ3NjkyIEMyMzkuODcyNDU5LDE2LjAxMzE0NDEgMjQxLjEwMzg5LDE1LjcxNzg5OSAyNDIuMDQ1NTE1LDE2LjI5NTMyMDkgTDI2MC4wNDY1MDUsMjcuMzMzODYgQzI2MC4zMTcwODMsMjcuNDk5NzgyOSAyNjAuNTQ0Mjg0LDI3LjcyNzcyMTYgMjYwLjcwOTMzLDI3Ljk5ODgzNDggQzI2MS4yODM3LDI4Ljk0MjMyNDggMjYwLjk4NDQ2OSwzMC4xNzI3OTMxIDI2MC4wNDA5NzksMzAuNzQ3MTYyNyBMMjQyLjAzOTk4OCw0MS43MDU2NDkyIEMyNDEuNzI2NjM1LDQxLjg5NjQwOTUgMjQxLjM2Njg1MSw0MS45OTczMDk1IDI0MSw0MS45OTczMDk1IEMyMzkuODk1NDMxLDQxLjk5NzMwOTUgMjM5LDQxLjEwMTg3OSAyMzksMzkuOTk3MzA5NSBMMjM5LDE4LjAwMDI4MzkgWiIgaWQ9IlBhdGgtMiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"
			};
		},
		props: ['descriptions','creator'],
		computed: {
			getDes(){
				return Object.keys(this.descriptions).length !== 0
			}
		}
	}
</script>

<style lang="scss">
	.header {
	    margin-top: 41.67rpx;
	    margin-bottom: 47.9205rpx;
	    padding: 0 33.336rpx;
		.intro {
		    display: -ms-flexbox;
		    display: flex;
		    -ms-flex-pack: justify;
		    justify-content: space-between;
		    height: 262.521rpx;
			.intro-cover {
			    position: relative;
			    height: 100%;
				.intro-img {
				    width: 262.521rpx;
				    height: 100%;
				    border-radius: 12.501rpx;
				}
				.play_counts {
				    position: absolute;
				    top: 0;
				    right: 10.4175rpx;
				    color: #fff;
				    font-size: 29.169rpx;
					.counts_icon {
					    margin-right: 3.4725rpx;
					    width: 20.835rpx;
					    height: 19.446rpx;
					}
				}
			}
			.intro-content {
			    width: 381.2805rpx;
			    height: 100%;
			    vertical-align: top;
				.content-title {
				    display: -webkit-box;
				    overflow: hidden;
				    color: #fff;
				    text-overflow: ellipsis;
				    white-space: normal;
				    word-wrap: break-word;
				    font-size: 35.4195rpx;
				    line-height: 1.4;
				    line-clamp: 2;
				}
				.content-avatar {
				    overflow: hidden;
				    margin-top: 25.002rpx;
				    margin-bottom: 27.0855rpx;
				    height: 54.171rpx;
				    color: rgba(255,255,255,.8);
				    text-overflow: ellipsis;
				    white-space: nowrap;
				    word-break: normal;
				    font-size: 27.0855rpx;
				    line-height: 1.5;
					.avatar-img {
					    display: inline-block;
					    margin-right: 12.501rpx;
					    width: 54.171rpx;
					    height: 100%;
					    border-radius: 50%;
					    vertical-align: middle;
					}
				}
				.content-description {
				    position: relative;
				    color: rgba(255,255,255,.6);
				    font-size: 22.9185rpx;
				    line-height: 1.5;
					.context {
					    display: -webkit-box;
					    overflow: hidden;
					    -webkit-box-orient: vertical;
					    text-overflow: ellipsis;
					    white-space: normal;
					    word-wrap: break-word;
					    -webkit-line-clamp: 2;
					}
					.arrow {
						position: absolute;
					    right: -18.057rpx;
					    bottom: 4.167rpx;
					    margin-left: 4.8615rpx;
					    width: 20.835rpx;
					    height: 20.835rpx;
					    vertical-align: -4%;
					}
				}
			}
		}
	}
	
</style>
