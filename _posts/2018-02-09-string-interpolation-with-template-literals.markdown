---
layout: post
title:  "String interpolation with template literals"
date:   2018-02-09 10:00:36 +0000
categories: js
---
One useful feature in ES6 that I came across recently is template literals. Template literals can be used to store a sequence of characters in much the same way as string literals, but they come with some added bonuses.

## Expression interpolation

To create a template literal we use back-ticks (\` \`) as opposed to double or single quotes used for string literals. A basic example would be:

{% highlight js %}
const first_name =  "Ash";
const last_name = `Robbins`;
{% endhighlight %}

Both of these variables would evaluate to a string if they were logged out in console. The benefits of template literals become apparent when we take things to the next level and try to include variables within a string. Traditionally if we had a variable we could insert it into a string like this:

{% highlight js %}
"Hi, " + first_name + ", how's it hanging?"
{% endhighlight %}

That is a very basic example but the closing of quotes and the inclusion of multiple `+` operators can become clumsy and unreadable when you're dealing with large templates and multiple variables.

Template literals allow us to simply type the name of the variable into the middle of the string using the `${NAME}` syntax.

{% highlight js %}
`Hi, ${first_name}, how's it hanging?`
{% endhighlight %}

We don't need to worry about closing and re-opening quotes and there are no concatenation operators to worry about. Template literals give us a much cleaner method of interpolating variables into a string.

## Multi-line strings

Another nice way we can make use of template literals is when we need to build multi-line strings in our JavaScript. For example if we need to output a block of HTML for a card template, we might normally write something like:

{% highlight js %}
const card = "<div class='c-card'>" +
                "<h3 class='c-card__name'>" + first_name + " " + last_name + "</h3>" +
                "<span>" + job_title + "</span>" +
            "</div>";
{% endhighlight %}

It's easy to see how this could quickly get quite messy and it isn't the nicest thing in the world to read. Template literals would let us write that code like this:

{% highlight js %}
const card = `<div class="c-card">
                <h3 class="c-card__name">${first_name} ${last_name}</h3>
                <span>${job_title}</span>
            </div>`;
{% endhighlight %}

Much neater and much closer to natural HTML. We can get rid of the need to close and re-open quotes, we don't need the `+` at the end of each line and we have even used the expression interpolation syntax from before to include our variables.

Template literals give us a much cleaner method of interpolating variables into a string and make handling multi-line strings much simpler.
