---
layout: post
title:  "Angular scope in your console"
date:   2015-07-21 15:35:36 +0000
categories: angular
---
Sometimes it can be really useful to inspect the data you're working with on an Angular build. There are some plugins and extensions to help with this, like the Batarang extension for Chrome.

I prefer to have my scope in my dev tools console while I'm looking at a page. That way I can see how the data changes as I interact with the page, or view the data returned from an API. There's a simple command which lets you do that.

{% highlight js %}
angular.element($0).scope();
{% endhighlight %}

Select an element in Chrome's dev tools, paste that into the dev tools console and hit return. You'll get an interactive model of the scope for the selected element.
