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
      renderImage(fields.image[0]) +
    '</div>' +
    '<div class="post-header">' +
      '<h2>' + fields.postName + '</h2>' +
      ' by ' +
      '<a href="brand/' + fields.brand.sys.id + '" data-nav>' + fields.brand.fields.companyName + '</a>' +
    '</div>' +
    '<p class="post-categories">' +
      fields.categories.map(function (category) {
        return category.fields.title
      }).join(', ') +
    '</p>' +
    '<p>' + marked(fields.postDescription) + '</p>' +
    '<p>Size/Type/Color: ' + fields.sizetypecolor+ '</p>' +
    '<p>' + fields.quantity + ' in stock</p>' +
    '<p>' + fields.price + ' &euro;</p>' +
    '<p>SKU: ' + fields.sku + '</p>' +
    '<p>More details: <a href="'+fields.website+'">' + fields.website + '</a></p>' +
    '<p class="post-tags"><span>Tags:</span> ' + fields.tags.join(', ')+ '</p>' +
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
