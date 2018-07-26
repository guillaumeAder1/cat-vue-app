/*-----------------
	Components 
-----------------*/

var redditapi = "https://www.reddit.com/r/"

// Parent | Subreddit component containing a list of 'post' components. 
Vue.component('subreddit', {
    props: ['name'],
    data: function() {
        return {
            name: this.name,
            posts: []
        }
    },
    methods: {
        fetchData: function() {
            axios.get(redditapi + this.name + '.json')
                .then(function(response) {
                    this.posts = response.data.data.children
                }.bind(this))
        }
    },
    mounted() {
        this.fetchData()
    },
    template: "#subreddit"
})


// Child | Componenet represiting a single post.

Vue.component('post', {
    props: ['item'],
    methods: {
        getImageBackgroundCSS: function(val) {
            return "background-image:url('" + val + "')"
        }
    },
    template: "#post"
})


/*-----------------
   Custom filters 
-----------------*/


// Filter that transform text to uppercase.
Vue.filter('uppercase', function(value) {
    return value.toUpperCase();
});


// Filter for cutting off strings that are too long.
Vue.filter('truncate', function(value) {
    var length = 60;

    if (value.length <= length) {
        return value;
    } else {
        return value.substring(0, length) + '...';
    }
});


/*-----------------
   Initialize app 
-----------------*/

new Vue({
    el: '#main'
});