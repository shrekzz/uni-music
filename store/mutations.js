export default {
	// 历史记录处理
	handleHistory(state, value) {
		if(!state.searchHistory.includes(value)) {
			state.searchHistory.push(value);
		}
	},
	// 删除历史记录
	deleteHistory(state, value) {
		state.searchHistory = []
	},
	showLoading(state, flag) {
		state.loading = flag;
	},
	changePlaylist(state, song) {
		state.playlist = [...song];
	}
	
}