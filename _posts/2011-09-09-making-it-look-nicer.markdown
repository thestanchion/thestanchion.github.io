---
layout: post
title:  "Making it look nicer"
date:   2011-09-09 15:35:36 +0000
categories: css
---
Just thought I'd share a couple of cool things I've been using more and more in projects recently: `hyphens` and `::selection`. Both features are only available in newer versions of browsers, but the key with both of them is that anyone who can't support them won't know any different. It's progressive enhancement in action.

## hyphens
You know how if you're reading a book or a newspaper, and you get to the end of a line and the next word is too long to fit in, and the printers plonk a hyphen in the middle of the word and just carry it on on the next line? Us web folk have never had that ability. If we left justify a block of text we end up with a raggedy right hand edge where words of different lengths finish off the lines, and if we use `text-align:justify;` then we often end up with huge rivers of white running through our text. Ugly.

This is where `hyphens` come in.

All we need to do to hyphenate our paragraphs is add the following properties to our CSS.

{% highlight ruby %}
hyphens: auto;
{% endhighlight %}

A quick word on support...

>Currently hyphens is supported in Safari 5.1 and Firefox 6. For Firefox 6 the lang-attribute must be set as mentioned above. [Also it only supports english](https://developer.mozilla.org/en/CSS/hyphens#AutoCompatibilityTable). It is not working in Chrome 15.
>
>[http://drublic.de/blog/css3-auto-hyphenation-for-text-elements](http://drublic.de/blog/css3-auto-hyphenation-for-text-elements)

So even though not everybody will see the hyphens, it will be a nice enhancement for everyone who does have a browser that supports them. Also it'll mean your CSS is future-proof and ready for the day when hyphens are more widely supported. View this site in the latest Firefox to see hyphens in action.

## ::selection

We can use `::selection` in its simplest form to change the `color` and `background` values of highlighted text on a page from the standard white on blue, to any colours you like.

{% highlight scss %}
::selection {
    background: #5BC961;
    color: #ffffff;
}
::-moz-selection {
    background: #5BC961;
    color: #ffffff;
}
{% endhighlight %}

Again, you won't be able to see this effect unless you're using a newer browser, but Firefox (4+), Chrome, Safari and even IE9 are all supporting this feature, and again it's a nice piece of progressive enhancement for those who are able to see it.
