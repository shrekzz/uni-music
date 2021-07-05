<template>
	<view class="search-wrapper">
		<search-box
			@handleInput="getKeywords"
		/>
		<match-list
			:matchList="matchList"
			:keywords="keywords"
			@search="search"
		/>
		<hot-list v-show="showHot" />
		<search-result :searchResult="searchResult"></search-result>
	</view>
</template>

<script>
	import SearchBox from "../../components/Search/SearchBox";
	import MatchList from "../../components/Search/MatchList";
	import HotList from "../../components/Search/HotList";
	import SearchResult from "../../components/Search/SearchResult";
	import { mapMutations } from "vuex";
	export default {
		data() {
			return {
				// searchbox传过来的关键字
				keywords: "",
				// 匹配结果
				matchList: [],
				// 是否显示热搜
				showHot: false,
				// 是否显示搜索结果
				showResult: false,
				//关键字和搜索结果
				searchResult: {
					keyword: "",
					resultList: []
				}
			}
		},
		methods: {
			getKeywords(keywords) {
				this.keywords = keywords;
				this.showHot = false;
				if (keywords.length !== 0) {
					this.$MyRequest({
						url: "/search/suggest",
						data: {
							keywords: keywords,
							type: "mobile"
						}
					}).then(
						(res, err) => {
							if (res.data.result.allMatch) {
								this.matchList = res.data.result.allMatch;
							} else {
								this.matchList = [];
							}
						}
					);
				}
			},
			...mapMutations(["handleHistory"]),
			search(key) {
				this.handleHistory(key);
				this.$MyRequest({
					url: "/cloudsearch",
					data: {
						keywords: key,
						limit: 30
					}
				}).then(
					(res, err) => {
						this.searchResult = {
							keyword: key,
							resultList: res.data.result.songs
						}
						console.log(res.data)
						this.showResult = true;
					}
				);
			}
		},
		components:{
			SearchBox,
			MatchList,
			HotList,
			SearchResult
		},
		computed: {
		},
		watch: {
			keywords(newValue) {
				if(newValue == "") {
					this.matchList = [];
					this.showHot = true;
					this.searchResult = {
						keyword: "",
						resultList: []
					};
					this.showResult = false;
				} else {
					
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.search-wrapper{
		padding: 20rpx 40rpx;	
}
</style>
