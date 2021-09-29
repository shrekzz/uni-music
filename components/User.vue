<template>
	<view class="user-header">
		<view class="user-status">
			<text class="ic user-icon">&#xe60a;</text>
			<text class="user-status-text">未登录</text>
		</view>
		<view class="login-btn" @click="open">
			立即登录
		</view>
		<uni-popup class="popup" ref="popup" type="bottom">
			<view class="qrCode">
				<image class="qrImg" :src="qrImg" mode="widthFix"></image>
				<view class="tips">请使用微信「扫一扫」登录</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name: "User",
		data() {
			return {
				qrImg: '',
				key: '',
				popupFlag: false
			};
		},
		methods: {
			open() {
				let timer
				this.$refs.popup.open('top')
				this.getQR()
				
				// timer = setInterval(async () => {
				// 	const statusRes = await this.watchQCR()
				// 	if (statusRes.code === 800) {
				// 		alert('二维码已过期,请重新获取')
				// 		clearInterval(timer)
				// 	}
				// 	if (statusRes.code === 803) {
				// 		// 这一步会返回cookie
				// 		clearInterval(timer)
				// 		alert('授权登录成功')
				// 		await this.getLoginStatus()
				// 	}
				// }, 3000)
			},
			close() {

			},
			getQR() {
				this.$MyRequest({
					url: '/login/qr/key',
					withCredentials: true
				}).then(res => {
					const {
						code,
						unikey
					} = res.data.data
					if (code == '200') {
						this.key = unikey
						this.createQR()
					} else {
						console.log(code)
					}
				})
			},
			createQR() {
				this.$MyRequest({
					url: '/login/qr/create',
					data: {
						key: this.key,
						qrimg: true,
						timerstamp: (new Date()).getTime()
					},
					withCredentials: true
				}).then(res => {
					console.log(res.data)
					this.qrImg = res.data.data.qrimg
					setInterval(async () => {
						await this.watchQR()
					},1000 )
				})
			},
			async watchQR() {
				const res = await this.$MyRequest({
					url: '/login/qr/check',
					data: {
						key: this.key,
						timerstamp: (new Date()).getTime()
					},
					withCredentials: true
				})
				return res.data
			}
		}
	}
</script>

<style lang="scss">
	.user-header {
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		color: #999999;

		.user-status {
			display: flex;
			align-items: center;

			.user-status-text {
				margin-left: 20rpx;
				font-size: 30rpx;
			}

			.user-icon {
				font-size: 70rpx;
			}
		}

		.login-btn {
			border: 1rpx solid #e5e5e5;
			border-radius: 44rpx;
			padding: 5rpx 20rpx;
			color: #333333;
			height: 44rpx;
			font-size: 28rpx;
		}

		.popup {
			.qrCode {
				transform: translateY(50%);
				display: flex;
				justify-content: center;
				align-items: center;
				flex-wrap: wrap;

				.qrImg {
					width: 70%;
				}

				.tips {
					color: black;
					font-weight: bold;
					letter-spacing: 7rpx;
					margin-top: 20rpx;
				}
			}

		}
	}
</style>
