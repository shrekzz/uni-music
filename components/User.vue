<template>
	<view class="user-header">
		<view class="user-status">
			<text class="ic user-icon">&#xe60a;</text>
			<text class="user-status-text">未登录</text>
		</view>
		<view class="login-btn" @click="open">
			立即登录
		</view>
		<uni-popup class="popup" ref="popup" @maskClick="close">
			<view class="qrCode" v-if="qrImg">
				<view class="qr">
					<image class="qrImg" :src="qrImg"></image>
					<view class="" v-if="refreshQrFlag">
						<view class="lapse">
							<svg t="1632940540240" class="icon refresh" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3403" width="200" height="200"><path d="M684.032 403.456q-17.408-8.192-15.872-22.016t11.776-22.016q3.072-2.048 19.968-15.872t41.472-33.28q-43.008-49.152-102.4-77.312t-129.024-28.16q-64.512 0-120.832 24.064t-98.304 66.048-66.048 98.304-24.064 120.832q0 63.488 24.064 119.808t66.048 98.304 98.304 66.048 120.832 24.064q53.248 0 100.864-16.896t87.04-47.616 67.584-72.192 41.472-90.624q7.168-23.552 26.624-38.912t46.08-15.36q31.744 0 53.76 22.528t22.016 53.248q0 14.336-5.12 27.648-21.504 71.68-63.488 132.096t-99.84 103.936-128.512 68.096-148.48 24.576q-95.232 0-179.2-35.84t-145.92-98.304-98.304-145.92-36.352-178.688 36.352-179.2 98.304-145.92 145.92-98.304 179.2-36.352q105.472 0 195.584 43.52t153.6 118.272q23.552-17.408 39.424-30.208t19.968-15.872q6.144-5.12 13.312-7.68t13.312 0 10.752 10.752 6.656 24.576q1.024 9.216 2.048 31.232t2.048 51.2 1.024 60.416-1.024 58.88q-1.024 34.816-16.384 50.176-8.192 8.192-24.576 9.216t-34.816-3.072q-27.648-6.144-60.928-13.312t-63.488-14.848-53.248-14.336-29.184-9.728z" p-id="3404" fill="#d81e06"></path></svg>
							<view class="refresh-text">二维码已失效</view>
						</view>
						<view class="click-lapse" @click="refreshQr"></view>
					</view>
					
				</view> 
				<view class="tips">使用「网易云音乐APP」扫码登录</view>
				
			</view>
			<view v-else class="loading"></view>
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
				getQrFlag: false,
				timer: '',
				refreshQrFlag: false,
				avartarUrl: ''
			};
		},
		methods: {
			// 打开弹窗
			open() {
				this.$refs.popup.open('center')
				this.getQR()
			},
			// 关闭弹窗
			close() {
				this.$refs.popup.close()
				// 关闭遮罩后停止轮询
				clearInterval(this.timer)
				console.log(this.timer)
			},
			// 获取二维码KEY
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
			// 通过KEY获取二维码链接
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
					this.watchQR()
				})
			},
			// 监测二维码状态
			watchQR() {
				// 在箭头函数里this指向会改变
				let that = this
				// 发送请求
				async function checkStatus() {
					const res = await that.$MyRequest({
						url: '/login/qr/check',
						data: {
							key: that.key,
							timerstamp: (new Date()).getTime()
						},
						withCredentials: true
					})
					return res.data
				}
				this.timer = setInterval(async () => {
					const statusRes = await checkStatus()
					if (statusRes.code == 800) {
						// 二维码失效
						that.refreshQrFlag = true
						clearInterval(this.timer)
					} else if (statusRes.code === 803) {
						// 登录成功
					 	await that.getLoginStatus()
						that.close()
					}
				}, 3000)
			},
			// 刷新二维码
			refreshQr() {
				this.refreshQrFlag = false
				this.getQR()
			},
			// 获取登录状态
			async getLoginStatus() {
				const res = await this.$MyRequest({
					url: '/login/status',
					data: {
						timerstamp: (new Date()).getTime()
					},
					withCredentials: true
				})
				this.avartarUrl = res.data.avartarUrl
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
				display: flex;
				justify-content: center;
				align-items: center;
				flex-wrap: wrap;
				background: white;
				border-radius: 10%;
				width: 500rpx;
				height: 500rpx;
				margin: 0 auto;
				padding: 60rpx;
				.qr {
					position: relative;
					.qrImg {
						width: 384rpx;
						height: 384rpx;
					}
					.lapse {
						position: absolute;
						top: 0;
						width: 384rpx;
						height: 384rpx;
						background-color: rgba(255, 255, 255, .8);
						display: flex;
						align-items: center;
						justify-content: center;
						flex-direction: column;
						.refresh {
							display: block;
							cursor: pointer;
							width: 80rpx;
							height:80rpx;
							padding: 16rpx;
						}
						.refresh-text {
							color: black;
						}
					}
					.click-lapse {
						position: absolute;
						top: 0;
						width: 384rpx;
						height: 384rpx;
						z-index: 9999;
					}
				}
				
			
				.tips {
					color: black;
					font-weight: bold;
					
				}
			}

			.loading {
				background: url(data:image/gif;base64,R0lGODlhKAAoAIABANM6Mf///yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI2QURFODRFRkZBRTExRTU4NTg0QTdFMUQ4QkI2MTI1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI2QURFODRGRkZBRTExRTU4NTg0QTdFMUQ4QkI2MTI1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjZBREU4NENGRkFFMTFFNTg1ODRBN0UxRDhCQjYxMjUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjZBREU4NERGRkFFMTFFNTg1ODRBN0UxRDhCQjYxMjUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQJCgABACwAAAAAKAAoAAACeIyPqcvtD6OctNoD8rUZ7Np9VChKZAmdqKOuTOsqcIzMtGHfuaxxfbRrBGu/UfExXCRxxwRsGdg9m0IqpgmVYq1KbnTrMXmnYeAYzCtf1em2E11lf+VkFpxIP+f37td93dfF9zboVwhIaHfItJjoiBd4IzlJWalQAAAh+QQJCgABACwAAAAAKAAoAAACfIyPqcvtD6OctNqLs94WeB55AAiJ5GOeTaoubJu8nBzQGm0zuYF/0l7zIYAxocvIQzqAvVHROVRGoYemgqm0PpfZLjX53YqnV2nVWw5j1ejxkQ1Pc+Nu8FxeD4bJea2uzRf4hidotwJ4RvenmEg42IfoaFioB2N5iZmZUAAAIfkECQoAAQAsAAAAACgAKAAAAn+Mj6nL7Q+jnLRaCPK1GezafVTIaRIJmhE6qpg7sY98wg692g3+egnNm9mAup6C6EslD8hL8zcsGp4I6sI6jS6PWu42EAR3od8wVlyWor1s8m1chV/l2fQ3bm/j33m3n3F2tvfHREdYp1d4p5iIePgYqBbZB2goKIKZqbnJ+VAAACH5BAUKAAEALAAAAAAoACgAAAJ8jI+py+0PIwRUWkbB3Sjz731bKFpkGZ1mJaktm8KX29CT/Ng57ug9XwPeNC/iSLjwBY1DEFKhxDwTLl/0UH1eDVkmlNf9eqng8thqFquX606aTT6/pfJ6OznH5u/cfQBtF8cnSOgWSDcYBmeYqOWniFiod4hSaXmJmWlRAAA7) center no-repeat;
				width: 100rpx;
				height: 100rpx;
			}

		}
	}
</style>
