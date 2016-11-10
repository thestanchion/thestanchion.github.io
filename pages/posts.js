(function () {

PC.pages.posts = {}

/**
 * Renders the posts list page
 *
 * The posts list page can optionally be filtered by a category, and will
 * then only show posts from that category. This is only used from the
 * categories page, in order to render lists of posts with only posts
 * from a selected category.
 */

PC.pages.posts.renderHTML = function (params) {
  var query = {
    content_type: PC.config.postContentTypeId,
    order: "-fields.date"
  }

  if (params && params.categoryId) {
    query['fields.categories.sys.id[in]'] = params.categoryId
  }

  return PC.contentfulClient.getEntries(query)
  .then(function (entries) {
    return renderProducts(entries.items)
  })
}

function renderProducts(posts) {
  return '<div class="post-list">' +
        posts.map(renderSingleProduct).join('\n') +
    '</div>'
}

function renderSingleProduct(post) {
  var fields = post.fields;

  return '<div class="post">' +
    '<div class="post-image">' +
      renderImage(fields.featuredImage, fields.slug) +
      renderProductDetails(fields) +
    '</div>' +
  '</div>'
}

function renderProductDetails(fields) {
  return renderProductHeader(fields) +
    '<date class="post-date">' +
    fields.date +
    '</date>'
}

function renderProductHeader(fields) {
  return '<h2 class="post-title">' +
      '<a href="post/' + fields.slug + '" data-nav>' +
        fields.title +
      '</a>'+
    '</h2>'
}

function renderImage(image, slug) {
  if(image && image.fields.file) {
    return '<a href="post/' + slug + '" data-nav>' +
      '<img src="' + image.fields.file.url + '" alt="' + image.fields.title + '" />' +
    '</a>'
  } else {
    return ''
  }
}

}());
