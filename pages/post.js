(function () {

PC.pages.post = {}

/**
 * Renders the individual post page
 */

PC.pages.post.renderHTML = function (params) {
  return PC.contentfulClient.getEntries({
    content_type: PC.config.postContentTypeId,
    'fields.slug': params.postSlug
  })
  .then(function (entries) {
    return renderSingleProduct(entries.items[0])
  })
}

function renderSingleProduct(post) {
  var fields = post.fields
  return '<div class="post">' +
    '<div class="post-image">' +
      renderImage(fields.featuredImage[0]) +
    '</div>' +
    '<div class="post-header">' +
      '<h1>' + fields.title + '</h1>' +
    '</div>' +
    '<div class="post-categories">' +
      fields.categories.map(function (category) {
        return category.fields.title
      }).join(', ') +
    '</div>' +
    '<div class="post-content">' + marked(fields.body) + '</div>' +
  '</div>'
}

function renderImage(image) {
  if(image && image.fields.file) {
    return '<img src="' + image.fields.file.url + '" width="300" height="300" />'
  } else {
    return ''
  }
}

}());
