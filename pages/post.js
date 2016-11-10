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
  return '<div class="single-post">' +
    '<div class="post-image">' +
      renderImage(fields.featuredImage, fields.slug) +
      '<h1 class="post-title">' + fields.title + '</h1>' +
      '<date class="post-date">' + fields.date + '</date>' +
    '</div>' +
    '<div class="post-content wrapper">' + marked(fields.body) + '</div>' +
    '<div class="post-categories wrapper">' +
      fields.categories.map(function (category) {
        return '<a href="#" title="View all posts in ' + category.fields.title + '">' + category.fields.title + '</a>'
    }).join(' | ') +
    '</div>' +
  '</div>'
}

function renderImage(image, slug) {
  if(image && image.fields.file) {
    return '<img src="' + image.fields.file.url + '" alt="' + slug + '" />'
  } else {
    return ''
  }
}

}());
