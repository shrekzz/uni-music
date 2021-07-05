<template>
	<view class="">
		<view class="" v-for="item of searchResult.resultList" :key="item.al.id">
			<view class="result" v-html="keywordHighlight(item.name)"></view>
			<text class="" v-html="keywordHighlight(getUser(item.ar))"></text> -
			<text class="" v-html="keywordHighlight(item.al.name)"></text>
			
			
		</view>
	</view>
</template>

<script>
	export default {
		name:"SearchResult",
		props: {
			searchResult: Object
		},
		data() {
			return {
				keywordColor: "<span class='keywordHighligh'>"+ this.searchResult.keyword +"</span>"
			};
		},
		computed: {
			// 匿名函数闭包传参
			keywordHighlight(text) {
				return (text) => {
					return text.replace(this.searchResult.keyword, this.keywordColor);
				}
			}
		},
		methods: {
			getUser(ar) {
				if(ar.length === 1) {
					return ar[0].name
				}else {
					let user = ""
					ar.forEach((item,index) => {
						if(index !== ar.length-1) {
							user+=item.name+"/"
						}else{
							user+=item.name
						}
					})
					return user;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
