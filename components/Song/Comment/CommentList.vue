<template>
	<view class="comment-item">
		<view class="avatar" >
			<image class="avatar-img" lazyLoad="true" :src="list.user.avatarUrl"></image>
			<text ></text>
		</view>
		<view class="comment-info">
			<view class="nick-name">{{ list.user.nickname }}
					<!-- <image class="{{iconStyle}}" lazyLoad="{{true}}" src="{{vipIcon}}" wx:if="{{iconStyle&&vipIcon}}"></image> -->
			</view>
			<text class="time">{{ time }}</text>
			<view class="content">
				<!-- <replied-comment compid="{{$compid__58}}" wx:if="{{beReplied&&beReplied.length>0}}"></replied-comment> -->
				
					<!-- <image class="cmt_emoji" lazyLoad="true" src="{{'https:'+list[$original].content}}" wx:if="{{item[$original].type==='image'}}"></image> -->
					<text wx:else>{{list.content}}</text>
				
			</view>
			<view class="zan">
				<button class="zan-btn" hover-class='none'>
					<text class="zan-count">{{ list.likedCount }}</text>
					<image class="zan-img" lazyLoad="true" ></image>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import moment from "../../../util/moment.js"
	
	export default {
		name: "CommentList",
		props: {
			list: Object
		},
		computed: {
			time() {
				return  moment(this.list.time).format('ll'); 
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comment-item {
	    position: relative;
	    margin-top: 31.2525rpx;
		.avatar {
		    position: absolute;
		    top: 0;
		    left: 0;
		    overflow: visible;
		    padding: 0;
		    border: 0;
			.avatar-img {
			    display: block;
			    width: 62.505rpx;
			    height: 62.505rpx;
			    border-radius: 50%;
			}
			.ava-icon {
			    position: absolute;
			    right: -4.8615rpx;
			    bottom: 0;
			    width: 29.8635rpx;
			    height: 29.8635rpx;
			    background-image: url(https://p4.music.126.net/l0FkWHfIqLav4I1oYHIyVQ==/19013854579518977.jpg);
			    background-size: 166.68rpx auto;
			    background-repeat: no-repeat;
			}
			.yyr {
			    background-position: -43.7535rpx 0;
			}
			.v {
			    background-position: 0 0;
			}
			.daren {
			    background-position: -88.2015rpx 0;
			}
		}
		 .comment-info {
		    margin-left: 83.34rpx;
		    padding-bottom: 31.2525rpx;
		    border-bottom: 0.6945rpx solid rgba(255,255,255,.1);
			.nick-name {
			    display: block;
			    color: rgba(255,255,255,.6);
			    font-size: 25.002rpx;
			    line-height: 1.5;
				.vip-associator, .vip-package {
				    display: inline-block;
				    margin-left: 9.0285rpx;
				    width: 18.7515rpx;
				    height: 18.7515rpx;
				}
				.vip-package {
				    width: 38.892rpx;
				}
				 .vip-annualfee {
				    display: inline-block;
				    margin-left: 6.2505rpx;
				    width: 54.8655rpx;
				    height: 18.7515rpx;
				}
				
			}
			.time {
			    display: block;
			    color: rgba(255,255,255,.3);
			    font-size: 18.7515rpx;
			    line-height: 1.5;
			}
			.content {
			    padding: 12.501rpx 0 0;
			    color: #fff;
			    font-size: 29.169rpx;
			    line-height: 1.5;
				.cmt_emoji {
				    width: 29.169rpx;
				    height: 29.169rpx;
				    vertical-align: middle;
				}
			}
			.zan {
			    position: absolute;
			    top: 0;
			    right: 0;
				.zan-btn {
				    padding: 0;
				    border: none;
				    line-height: 1;
					background-color: transparent;
					.zan-count {
					    color: rgba(255,255,255,.4);
					    font-size: 25.002rpx;
					}
					.zan-img {
					    margin-left: 8.334rpx;
					    width: 33.336rpx;
					    height: 33.336rpx;
					    vertical-align: bottom;
						background-size: 33.336rpx;
						background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDZweCIgaGVpZ2h0PSI0NHB4IiB2aWV3Qm94PSIwIDAgNDYgNDQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjEgKDc4MTM2KSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT7otZ48L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBvcGFjaXR5PSIwLjM5NjIyMSI+CiAgICAgICAgPGcgaWQ9IuaSreaUvumhtV/liIbkuqvnirbmgIEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC05ODYuMDAwMDAwLCAtMzE5NS4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9IjEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQ4LjAwMDAwMCwgMzE5MC4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSLnlKjmiLfkv6Hmga8iPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSLotZ4r5pWw5YC8IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4ODguMDAwMDAwLCAzLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0i6LWeIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0OS4wMDAwMDAsIDAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAtOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMy4wNjQ5MDIsIDMuNTA5OTM5KSI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTI2LjM3Nzk3MTQsMTQuNjM1NDAwOSBDMjcuMDU5ODI3MywxMy4zNTM2MDg5IDI3LjM3NTAzMDUsMTAuODg5ODI4MyAyNy4zNzUwMzA1LDcuODI0OTkzNTMgQzI3LjM3NTAzMDUsMC42NDU4MjMyNzEgMjMuNDQ4MjA3OSwtMC4wMDA1NjYxNTY1NzkgMjIuMDIwMDA1MiwzLjcxNTgyMTM4ZS0wNyBDMTcuNjE2MjI5NiwwLjAwMTc0NzIyNjUxIDE2LjgxNTgzMTQsNC4wMTA0NTQ4NiAxNi44MTU4MzE0LDcuODI0OTkzNTMgQzE2LjgxNTgzMTQsMTQuMjkwNzAxOCAxMi4zNTEyNzg4LDE2LjU4NjUyNzUgOC43ODU4MDAzOCwxNi42NTUwMzIxIEMwLjU0NDk3OTM3NywxNi42NTUwMzIxIDAsMTkuODA0ODc3OSAwLDI2Ljk1MDg0OCBMMCwzNi4xMDc1NDg5IEMwLDQwLjk4MDQ4NzYgNC44ODg0MzMzMiw0MC45NzU2MDk3IDQuODg4NDMzMzIsNDAuOTc1NjA5NyBMMjQuNjU2ODQ2Myw0MC45NzU2MDk3IEMzNy40NTkyNjQ3LDQwLjk3NTYwOTggMzkuNzA3MjcxNywzNi41NzE4MDIgNDEuNjY3OTIwMiwyNS4yNTg0OSBDNDMuNjI4NTY4NywxMy45NDUxNzgxIDM2LjM1NDc3NTksMTQuNjM1NDAwOSAzNC4yODM0MjE2LDE0LjYzNTQwMDkgTDI2LjM3Nzk3MTQsMTQuNjM1NDAwOSBaIiBpZD0i6LWeX3VwIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZSIgZmlsbD0iI0ZGRkZGRiIgZmlsbC1ydWxlPSJub256ZXJvIiB4PSI4LjEyOTAzMjI2IiB5PSIxNi44NzcyNDkxIiB3aWR0aD0iMyIgaGVpZ2h0PSIyNC45NDE1NjAyIj48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==");
					}
				}
			}
		}
	}
	.comment-item .avatar::after,.comment-item .comment-info .zan .zan-btn::after {
	    border: none;
	}

</style>
