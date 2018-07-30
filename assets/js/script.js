/*-----------------
	Components 
-----------------*/

var redditapi = "https://www.reddit.com/r/";

// Parent | Subreddit component containing a list of 'post' components. 
Vue.component('subreddit', {
    props: ['name'],
    data: function () {
        return {
            name: this.name,
            posts: [],
            error: null, // if error during fetching data, stock messsage here.
            loading: true // show loader icon
        }
    },
    methods: {
        // fetchData
        fetchData: function () {
            // use the 'name' props to create reddit url path, + .json extention 
            // Please Note: at the moment I do this exercice, there is an error with the reddit api documentation
            // the only viable path I could found was using the .json... I am not sure if there is a better way to acheive that
            axios.get(redditapi + this.name + '.json')
                .then(
                    function (response) {
                        // once data are found, assign the result to the 'posts' props, 
                        // and slice the resutls array to 5 items, by default I got 25 results
                        this.posts = response.data.data.children.slice(0, 5);
                        this.loading = false; // hide loader icon
                    }.bind(this), // use bind since we are note in ES6 syntax
                    function (error) {
                        // handle error, hide loader icon
                        console.log(error);
                        this.error = error.message;
                        this.loading = false;
                    }.bind(this)
                );
        }
    },
    mounted() {
        // once the component is created, fetch data...
        this.fetchData();
    },
    // grabb the #subreddit template from index.hmtl
    template: "#subreddit"
});


// Child | Componenet represiting a single post.

Vue.component('post', {
    props: ['item'],
    methods: {
        // method to create background-image css property based on 'val'
        getImageBackgroundCSS: function (val) {
            return (val && val !== 'self') ? "background-image:url('" + val + "')" : "background-image:url('./assets/img/placeholder.png')";
        }
    },
    // grab the port template defined in index.hmtl
    template: "#post"
});

// create Loader component displaying spining symbol
Vue.component('loader', {
    template: "<div class='loader'></div>"
});

/*-----------------
   Custom filters 
-----------------*/
// add lowercase.
Vue.filter('lowercase', function (value) {
    return value.toLowerCase();
});

Vue.filter('reverse', function (value) {
    // slice to make a copy of array, then reverse the copy
    return value.slice().reverse();
});

// Filter that transform text to uppercase.
Vue.filter('uppercase', function (value) {
    return value.toUpperCase();
});


// Filter for cutting off strings that are too long.
Vue.filter('truncate', function (value) {
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
    el: '#main',
    data() {
        return {
            newitem: null,
            items: ['kitten', 'cats'], // list of other items to research on reddit...
        }
    },
    methods: {
        search: function () {

            //add new item to the subreddit list, and then reset input field value to ""
            if (this.newitem) {
                this.items.push(this.newitem);
                this.newitem = "";
            }

        }
    }
});