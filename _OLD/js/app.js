var contentfulClient = contentful.createClient({
  accessToken: 'a4c20263d7f1b8a2833150885c18128343da15ed3f711ec59beac1b8fa4687f3',
  space: 'weq54bjgnfu0'
})

var POST_CONTENT_TYPE_ID = '2wKn6yEnZewu2SCCkus4as'

var container = document.getElementById('content')

contentfulClient.getEntries({
    content_type: POST_CONTENT_TYPE_ID,
    order: "-fields.date"
  })
  .then(function(entries) {
    container.innerHTML = renderPosts(entries.items)
  })

function renderPosts(posts) {
  return '<div class="posts">' +
    posts.map(renderSinglePost).join('\n') +
    '</div>'
}

setupNavAnchorListeners();

function renderSinglePost(post) {
  var fields = post.fields
  console.log(fields)
  if (fields.featuredImage) {
      return '<div class="post">' +
        '<div class="post-image">' +
        renderImage(fields.featuredImage, fields.slug) +
        '</div>' +
        '<div class="post-content">' +
        renderPostDetails(fields) +
        '</div>' +
        '</div>'
    } else {
        return '<div class="post-list">' +
          '<div class="post-content">' +
          renderPostDetails(fields) +
          '</div>' +
          '</div>'
    }
}

function renderPostDetails(fields) {
  return renderPostHeader(fields) +
    '<p class="post-categories">' +
    fields.category.map(function(category) {
      return category.fields.title
    }).join(', ') +
    '</p>' +
    '<p>' + marked(fields.body) + '</p>'
}

function renderPostHeader(fields) {
  return '<div class="post-header">' +
    '<h2 class="post-title">' +
    '<a href="post/' + fields.slug + '" data-nav>' +
    fields.title +
    '</a>' +
    '</h2>' +
    '</div>'
}

function renderImage(image, slug) {
  if (image && image.fields.file) {
    return '<a href="post/' + slug + '" data-nav>' +
      '<img src="' + image.fields.file.url + '" alt="' + image.fields.description + '" />' +
      '</a>'
  } else {
    return ''
  }
}

// Navigates to a given page via the history API
var navigate = function (href) {
  window.history.pushState({href: href}, '', href)
  loadPage(href)
}

/**
 * Event delegation mechanism for links throughout the app
 *
 * Listens to all click events in the app, and if the source element is an anchor
 * tag and has a data-nav property, it cancels the event and loads the page
 * referred in the href with the loadPage function, while also pushing it
 * to the history API
 */
function setupNavAnchorListeners() {
  document.querySelector('body').addEventListener('click', function (ev) {
    ev.preventDefault()
    if(ev.target.tagName.toLowerCase() === 'a' && 'nav' in ev.target.dataset) {
      navigate(ev.target.href)
    }
  }, false)
}

/**
 * Basic routing mechanism
 *
 * Removes the URL from the href (which can come from either an anchor tag or
 * the popstate event), and splits it by '/'.
 */
function loadPage(href) {
  href = href.replace(document.baseURI, '')
  var urlParts = href.split('/')
  var pageName = urlParts[0]
  // Attempts to get the object which contains the methods to render and setup
  // pages, otherwise defaults to the main page
  var page = PC.pages[pageName] || PC.pages.posts
  var loader
  switch(pageName) {
    // /categories and /categories/:id
    case 'categories':
      loader = page.renderHTML({
        selectedCategoryId: urlParts[1],
      })
      break
    // /about
    case 'about':
      loader = page.renderHTML()
      break
    // /post/:id
    case 'post':
      loader = page.renderHTML({
        postSlug: urlParts[1]
      })
      break
    // / (index page)
    default:
      loader = page.renderHTML()
  }

  loader.then(injectInPage).then(function () {
    // after rendering is done, run the postRender method if there is one
    if('postRender' in page) {
      setTimeout(function () {
        page.postRender()
      }, 0)
    }
  })
}
