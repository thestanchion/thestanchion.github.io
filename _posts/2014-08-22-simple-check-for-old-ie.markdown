---
layout: post
title:  "Simple check for old IE"
date:   2014-08-22 15:35:36 +0000
categories: js browsers
---
On a recent project I needed to be able to detect if a user was browsing using IE8 or 7, and serve different functionality to them if that was true.

After looking around a really easy way to do this is to simply check whether the browsers supports the `leadingWhiteSpace` feature, using jQuery's `$.supports` method.

{% highlight js %}
if ($.support.leadingWhitespace == false) {
    var oldIE = true;
}
{% endhighlight %}

Old versions of Internet Explorer don't support this feature, and therefore `oldIE` will be false on these browsers. You could then apply a conditional class to your `body` tag to style something differently, or write a quick `if` statement to check the value of `oldIE` before executing some script for example.
