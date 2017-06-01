const PostList = {
    template: "#post-list"
}
const Page = {
    template: "#page",
    methods: {
        setPost: function() {
            var arr = this.$root.pages,
                slug = this.$route.params.slug;

            if (!arr.length) {
                return;
            }
            var app = this.$root;

            _.forEach(arr, function(page) {
                if (page.fields.slug === slug) {
                    app.selectedPage = page;
                }
            });
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

            _.forEach(arr, function(post) {
                if (post.fields.slug === slug) {
                    app.selectedPost = post;
                }
            });
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
const Category = {
    template: "#category",
    methods: {
        getList: function() {
            var app = this.$root,
                slug = this.$route.params.slug,
                categoryID,
                fetchArgs = {
                    method: "GET",
                    mode: "cors"
                };

            _.forEach(app.entries, function(category) {
                if (category.fields.title) {
                    var catID = category.fields.title.toLowerCase();

                    if (catID == slug) {
                        app.selectedCategory = category.fields.title;
                        categoryID = category.sys.id;
                    }
                }
            });

            fetch(app.postsUrl + app.categoriesUrl + categoryID, fetchArgs).then(function(response){
                return response.json();
            })
            .then(function(response) {
                app.categoryList = response.items;
                app.categoryList = _.orderBy(app.categoryList, function(e) { return e.fields.date }, 'desc');
            });
        }
    },
    mounted: function() {
        this.$root.categoryList = [];
        this.getList();
    },
    watch: {
        "$route": function() {
            this.$root.categoryList = [];
            this.getList();
        },
        "$root.posts": function() {
            this.$root.categoryList = [];
            this.getList();
        }
    }
}

const routes = [
  { path: '/', component: PostList },
  { path: '/page/:slug', component: Page },
  { path: '/:slug', component: Post },
  { path: '/category/:slug', component: Category }
];

const router = new VueRouter({routes});

const app = new Vue({
    router,
    el: "#app",
    data: {
        postsUrl: "http://cdn.contentful.com/spaces/weq54bjgnfu0/entries?access_token=a4c20263d7f1b8a2833150885c18128343da15ed3f711ec59beac1b8fa4687f3&content_type=2wKn6yEnZewu2SCCkus4as",
        pagesUrl: "http://cdn.contentful.com/spaces/weq54bjgnfu0/entries?access_token=a4c20263d7f1b8a2833150885c18128343da15ed3f711ec59beac1b8fa4687f3&content_type=page",
        categoriesUrl: "&fields.categories.sys.id[match]=",
        posts: [],
        pages: [],
        selectedCategory: "",
        categoryList: [],
        selectedPost: {
            "fields": {}
        },
        selectedPage: {
            "fields" :{}
        },
        assets: [],
        entries: [],
        pageAssets: [],
        pageEntries: []
    },
    methods: {
        getApiData: function(url) {
            var _this = this,
                fetchArgs = {
                    method: "GET",
                    mode: "cors"
                };

            fetch(_this.postsUrl, fetchArgs).then(function(response){
                return response.json();
            })
            .then(function(response) {
                _this.posts = response.items;
                _this.assets = response.includes.Asset;
                _this.entries = response.includes.Entry;
                _this.posts = _.orderBy(_this.posts, function(e) { return e.fields.date }, 'desc');
            });

            fetch(_this.pagesUrl, fetchArgs).then(function(response){
                return response.json();
            })
            .then(function(response) {
                _this.pages = response.items;
                _this.pageAssets = response.includes.Asset;
                _this.pageEntries = response.includes.Entry;
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
        categoryLink: function(id) {
            var _this = this;
            var categoryTitle;
            _.forEach(_this.entries, function(category) {
                if (category.sys.id == id) {
                    categoryTitle = category.fields.title;
                }
            });
            if (categoryTitle) {
                return "/category/" + categoryTitle.toLowerCase();
            }
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
