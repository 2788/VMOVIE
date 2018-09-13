const mutations = {
    updateInTheaters(state, list){
        state.inTheaters = list;
    },
    updateComingSoon(state, list){
        state.comingSoon = list;
    },
    updateRanking(state, list){
        state.ranking = list;
    },
    updateMovieMsg(state, obj){
        state.movieMsg = obj;
        state.id = obj.id;
    },
    updateComments(state, list){
        state.comments = list;
    },
    updateReviews(state, list){
        state.reviews = list;
    },
    updateSearchResult(state, list){
        state.searchResult = list;
    }
}

export default mutations
