var firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBb_aT0EJCnUnvr-WTFqbxS0T1UXXN8LS4",
    authDomain: "personal-site-22ce8.firebaseapp.com",
    databaseURL: "https://personal-site-22ce8.firebaseio.com",
    storageBucket: "personal-site-22ce8.appspot.com",
    messagingSenderId: "678334779328"
})
var db = firebaseApp.database()

// 1. Define route components.
// These can be imported from other files
const Home = { template: '#post-list' }
const One = { template: '<div>one</div>' }
const Two = { template: '<div>two</div>' }
const Three = { template: '<div>three</div>' }
const Post = {
    template: '#post',
    //root: this.config.root,
    methods: {
        getPost: function() {
            var slug = this.$route.params.slug;

            for (var i in this.$root.posts) {
                var post = this.$root.posts[i];
                if (post.slug == slug) {
                    this.$root.selectedPost = post;
                }
            }
        }
    },
    mounted: function() {
        this.getPost();
    }
}

db.ref("posts").once("value", function() {
    if (app._route.params.slug) {
        var slug = app._route.params.slug;
        app.setPost(slug);
    }
    console.log(app);
});

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
// const routes = [
//     { path: '/', component: Home },
//     { path: '/one', component: One },
//     { path: '/two', component: Two },
//     { path: '/three', component: Three },
//     { path: '/post/:slug', component: Post }
// ]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  // short for routes: routes
  routes: [
      {
          path: '/',
          component: Home
      },
      { path: '/one', component: One },
      { path: '/two', component: Two },
      { path: '/three', component: Three },
      {
          path: '/post/:slug',
          name: 'post',
          component: Post
      }
  ]
})

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
    router,
    firebase: {
      // simple syntax, bind as an array by default
      posts: db.ref('posts')
    },
    data: {
        selectedPost: {
            title: "",
            content: ""
        }
    },
    methods: {
        setPost: function(val) {
            for (var i in app.posts) {
                if (app.posts[i].slug == val) {
                    app._data.selectedPost = app.posts[i];
                }
            }
        },
        date: function (date) {
            return moment(date).fromNow();
        }
    },
    watch: {
        posts: {
            handler: function() {
                console.log("changed");
            },
            deep: true
        }
    }
}).$mount('#app')

// Now the app has started!
