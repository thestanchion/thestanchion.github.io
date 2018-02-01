---
layout: post
title:  "AngularJS - ngHide for oldIE"
date:   2015-01-14 15:35:36 +0000
categories: css angular
---
Yeah I know I know, old IEs are dumb and should be run over by a bus or thrown off a bridge and blah blah blah. But sometimes 20% of your client's users are using IE7, and another 20% on top of that use IE8, so you've got to deal with it.

The trouble is, to support these browsers you need to include a legacy version of Angular, but some pretty basic directives don't work in these browsers,[for example ngHide](https://github.com/angular/angular.js/commit/c785267eb8780d8b7658ef93ebb5ebddd566294d).

Hiding and showing elements based on whether a scope object is `true` or `false` is one of the most common things we do with Angular, so at work we built a custom directive which will work across all browsers.

{% highlight js %}
angular.module('ar.directives', [])
.directive('arHide', function () {
    return {
        scope: {
            arHide: "="
        },
        link: function (scope, element) {
            scope.$watch("arHide", function () {
                if (scope.arHide) {
                    element.addClass("ng-hide");
                } else {
                    element.removeClass("ng-hide");
                }
            });
        }
    };
});
{% endhighlight %}

I've created a new module called `ar.directives`, and a new directive called `arHide`. You can call these what you want, __ar__ is just my initials.

### Isolated scope

I've then got an __isolated scope__ on the directive, and I've created a property within it called __arHide__. The name of this property will correspond to the way I use the directive in my markup (`ar-hide`), therefore I can use the shorthand `arHide: "="`.

Our isolated scope property will always take the value of the `ar-hide` attribute whenever we use it in our app, and it's clever enough to recognise the camel-case and look for its equivalent hyphenated attribute.

### Adding functionality

The `link` option can be used when you want a directive to manipulate the DOM. In this case I'll be adding and removing the `ng-hide` class when an argument is true or false.

`link` accepts three arguments:

* `scope`, which in this case is my isolated scope from earlier
* `element`, which is the element this directive is called from
* `attrs`, which is a reference to the attributes of the `element` passed in

I don't need `attrs` in this case so I've left it out.

I use `$.watch` to keep a constant eye on the argument provided in `arHide`, which translates to the `ar-hide` attribute in the markup. When this argument resolves to `true` I add the class `ng-hide`, if it's false the class gets removed. Simple as that.

### Markup

Using the new directive is really simple.

{% highlight html %}
//The element will be hidden if 'valueToTest' is true
<p ar-hide="valueToTest">Hide me if true</p>
{% endhighlight %}
