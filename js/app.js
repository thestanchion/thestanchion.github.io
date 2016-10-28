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

function renderSinglePost(post) {
  var fields = post.fields
  console.log(fields)
  if (fields.featuredImage) {
      return '<div class="post-list">' +
        '<div class="post-image">' +
        renderImage(fields.featuredImage[0], fields.slug) +
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
    '<a href="post/' + fields.slug + '">' +
    fields.title +
    '</a>' +
    '</h2>' +
    '</div>'
}

function renderImage(image, slug) {
  if (image && image.fields.file) {
    return '<a href="post/' + slug + '">' +
      '<img src="' + image.fields.file.url + '" width="150" height="150" />' +
      '</a>'
  } else {
    return ''
  }
}
