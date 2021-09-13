<template>
	<view :style="{ 'background-image': `url(${coverImgUrl})` }">
		
	</view>
</template>

<script>
	export default {
		name: "Palylist",
		data() {
			return {
				coverImgUrl: ""
			}
		},
		onLoad(params) {
			this.$MyRequest({
				url: "/playlist/detail",
				data: {
					id: params.id
				}
			}).then(res => {
				console.log(res)
				this.coverImgUrl = res.data.playlist.coverImgUrl
			})
		}
	}
</script>

<style lang="scss" >
	
</style>
