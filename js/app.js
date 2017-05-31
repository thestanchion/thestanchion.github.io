const PostList = {
    template: "#post-list"
}
const Post = {
    template: "#post",
    methods: {
        setPost: function() {
            var arr = this.$root.posts,
                slug = this.$route.params.slug;

            if (!arr.length) {
                return;
            }
            var app = this.$root;

            for (var i = 0; i < arr.length; i++) {
                var post = arr[i];
                if (post.fields.slug === slug) {
                    app.selectedPost = post;
                }
            }
        }
    },
    mounted: function() {
        this.setPost();
    },
    watch: {
        "$route": function() {
            this.setPost();
        },
        "$root.posts": function() {
            this.setPost();
        }
    }
}

const routes = [
  { path: '/', component: PostList },
  { path: '/:slug', component: Post },
];

const router = new VueRouter({routes});

const app = new Vue({
    router,
    el: "#app",
    data: {
        postsUrl: "http://cdn.contentful.com/spaces/weq54bjgnfu0/entries?access_token=a4c20263d7f1b8a2833150885c18128343da15ed3f711ec59beac1b8fa4687f3&content_type=2wKn6yEnZewu2SCCkus4as",
        posts: [],
        selectedPost: {
            "fields": {}
        },
        assets: [],
        entries: []
    },
    methods: {
        getApiData: function(url) {
            var _this = this,
                fetchArgs = {
                    method: "GET",
                    mode: "cors"
                }

            fetch(_this.postsUrl, fetchArgs).then(function(response){
                return response.json();
            })
            .then(function(response) {
                _this.posts = response.items;
                _this.assets = response.includes.Asset;
                _this.entries = response.includes.Entry;
                _this.posts = _.orderBy(_this.posts, function(e) { return e.fields.date }, 'desc');
            });
        },
        formatDate: function(val, format) {
            if (val) {
                var date = new Date(val);
                return moment(date).format(format);
            }
        },
        postLink: function(val) {
            if (val) {
                return "/" + val;
            }
        },
        categoryName: function(id) {
            var _this = this;
            var categoryTitle;
            _.forEach(_this.entries, function(category) {
                if (category.sys.id == id) {
                    categoryTitle = category.fields.title;
                }
            });
            return categoryTitle;
        },
        renderMarkdown: function(content) {
            var converter = new showdown.Converter();

            return converter.makeHtml(content);
        }
    },
    created: function() {
        this.getApiData();
    }
});
