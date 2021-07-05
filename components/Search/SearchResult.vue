<template>
	<view class="">
		<view class="" v-for="item of searchResult.resultList">
			<view class="" v-html="keywordHignlight(item.name)">
			
			</view>
			<view class="">{{item.ar[0].name}}</view>	
		</view>
	</view>
</template>

<script>
	export default {
		name: "SearchResult",
		props: {
			searchResult : {
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
		}
	}
</script>

<style lang="scss" scoped>
</style>
