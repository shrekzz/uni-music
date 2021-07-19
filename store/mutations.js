export default {
	handleHistory(state, value) {
		if(!state.searchHistory.includes(value)) {
			state.searchHistory.push(value);
		}
	},
	showLoading(state, flag) {
		state.loading = flag;
	},
	changePlaylist(state, song) {
		state.playlist = [...song];
	}
	
}