---
layout: post
title:  "A couple of problems I've found using Flexbox"
date:   2013-08-02 15:35:36 +0000
categories: css flexbox
---
Let me preface this post by saying that Flexbox is completely ace, and there are so many awesome use-cases for it. The particular one I'm going to talk about here is a grid layout for a product listing. Four columns, two rows, and just a simple image and price for each item. The site I'm working on is WIP but as an example let's say it could be the grid of products in the pen below. (Will only work in Chrome and latest Opera).

<iframe id="cp_embed_mnoqd" src="//codepen.io/ashrobbins/embed/mnoqd?height=423&theme-id=0&slug-hash=mnoqd&user=ashrobbins&default-tab=result" scrolling="no" frameborder="0" height="423" allowtransparency="true" class="cp_embed_iframe" style="width: 100%; overflow: hidden;"></iframe>

Pretty simple. If you view the HTML you'll see it's nothing more than a simple `ul`, with each list item containing an `img` and an `h1`.

The CSS has some basic reset styles and then gets into the two classes `.products` and `.product`.

The `.products` class is where most of the flexbox work is done here. First we change the `display` property to `flex` - there are five lines for this as there are browsers which need a vendor prefix, and also some browsers who still need the older flexbox syntax. [See here](http://css-tricks.com/snippets/css/a-guide-to-flexbox/) for an overview of where flexbox is at right now.

The next declaration on `.products` is `flex-flow: row wrap;`. `flex-flow` is a shorthand property used to define both `flex-direction` and `flex-wrap` at the same time. So in this declaration we are telling the flex-items to display from left to right, and to wrap onto a new line when they run out of room.

## Wrapping in Firefox and Safari

The first problem I came across is that Firefox and Safari currently don't recognise or support the `flex-wrap` property, meaning that the items will just continue to flow outside of the parent container. You'd need to write a fallback for these browsers that don't support wrapping.

View this post in Firefox to see what this looks like.

## Alignment issues

The other problem is a bit of a tricky one. If you're listing products in a grid, it's highly likely that you're pulling that data from a database of items. It's therefore highly likely that you'll quite often have a list of items that doesn't give you enough items to fill up each row.

I want my items to have space between them, and for the last one in each row to butt up to the right hand edge of the parent container. This is possible by applying the property `justify-content` with a value of `space-between` to the container. This will line up the first item in a row with the left edge of the container, and the last item in the row to the right edge of the container, with the remaining space distributed evenly between all the items in the row.

<iframe id="cp_embed_mexFs" src="//codepen.io/ashrobbins/embed/mexFs?height=444&theme-id=344&slug-hash=mexFs&user=ashrobbins&default-tab=result" scrolling="no" frameborder="0" height="444" allowtransparency="true" class="cp_embed_iframe" style="width: 100%; overflow: hidden;"></iframe>

As you can see, the top row looks great, but the second row looks a bit pants. It is possible to make the products align in the way I want, by changing the `justify-content` value to `flex-start`. However this doesn't then distribute remaining space on a row between the product items. In theory I could make each item 25% wide, and then add an inner wrapper to each one so I can apply padding and create the effect of space between the items, but it just feels like there should be a built in solution via CSS.

<iframe id="cp_embed_ofJqg" src="//codepen.io/ashrobbins/embed/ofJqg?height=467&theme-id=344&slug-hash=ofJqg&user=ashrobbins&default-tab=result" scrolling="no" frameborder="0" height="467" allowtransparency="true" class="cp_embed_iframe" style="width: 100%; overflow: hidden;"></iframe>

I'm probably being too picky here. This solution is perfectly fine and works in Chrome. Obviously it isn't ready to be used in a production environment yet because of the lack of browser support. But I'd love to know if there is a way to align the items distributing the available space evenly, but also aligning items in a row to the left.
