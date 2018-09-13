const actions = {
    getInTheaters({ commit }, that) {
        that.$http.jsonp('https://api.douban.com/v2/movie/in_theaters')
            .then(function (response) {
                commit('updateInTheaters', response.body.subjects)
            })
            .catch(function (response) {
                console.log(response)
            })
    },
    getComingSoon({ commit }, that) {
        that.$http.jsonp('https://api.douban.com/v2/movie/coming_soon')
            .then(function (response) {
                commit('updateComingSoon', response.body.subjects)
            })
            .catch(function (response) {
                console.log(response)
            })
    },
    getRanking({ commit }, that) {
        that.$http.jsonp('https://api.douban.com/v2/movie/top250')
            .then(function (response) {
                commit('updateRanking', response.body.subjects)
            })
            .catch(function (response) {
                console.log(response)
            })
    },
    getMovieMsg({ commit }, that) {
        that.$http.jsonp(`https://api.douban.com/v2/movie/subject/${that.$route.params.id}`)
            .then(function (response) {
                commit('updateMovieMsg', response.body);
                that.show = true;
            })
            .catch(function (response) {
                console.log(response)
            })
    }
    ,
    getComments({ commit }, that) {
        that.$http.jsonp(`https://api.douban.com/v2/movie/subject/${that.$route.params.id}/comments?apikey=0b2bdeda43b5688921839c8ecb20399b&start=0&count=10`)
            .then(function (response) {
                commit('updateComments', response.body.comments)
            })
            .catch(function (response) {
                console.log(response)
            })
    },
    getReviews({ commit }, that) {
        that.$http.jsonp(`https://api.douban.com/v2/movie/subject/${that.$route.params.id}/reviews?apikey=0b2bdeda43b5688921839c8ecb20399b&start=0&count=10`)
            .then(function (response) {
                commit('updateReviews', response.body.reviews)
            })
            .catch(function (response) {
                console.log(response)
            })
    },
    getClassifyResult({ commit }, that) {
        that.$http.jsonp(`https://api.douban.com/v2/movie/search?tag=${that.searchContent}`)
            .then(function (response) {
                that.show = false;
                commit('updateSearchResult', response.body.subjects);
            })
            .catch(function (response) {
                console.log(response)
            })
    },
    getSearchResult({ commit }, that) {
        that.$http.jsonp(`https://api.douban.com/v2/movie/search?q=${that.searchContent}`)
            .then(function (response) {
                that.show = false;
                commit('updateSearchResult', response.body.subjects);
            })
            .catch(function (response) {
                console.log(response)
            })
    }
}

export default actions;