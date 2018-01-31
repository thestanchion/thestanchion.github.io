---
layout: post
title:  "A bit LESS SASSy"
date:   2011-11-09 15:35:36 +0000
categories: css scss
---
For quite some time now people have been raving about LESS and SASS and the benefits they have over writing single scoop vanilla CSS. Allow me, if I may, to wade in and add a few of my thoughts on why, instead of choosing one or the other, neither of them are necessary to me at all.

First off its important to realise that CSS is not a programming language, it is a presentation language and when written properly it's elegant, flexible and - perhaps most importantly - simple. Therefore it shouldn't be made more complex than it needs to be with functions and variables as these are features of a programming language. I'd suggest that you'd be better off making your markup more sensible so that you don't have to repeat yourself so much in your style sheet. That way your need for variables is irrelevant and you should only need to declare things like colours once or twice.

In fact instead of functions or variables, why not just have a 'Shared' section ([credit Harry Roberts](http://coding.smashingmagazine.com/2011/08/26/writing-css-for-others/)) near the top of the sheet? Any properties that need to be applied to several different elements on the page (border-radii, colours, etc.) can just be declared that one time in the shared section, and even better, if that value needs to be changed it only needs to be changed that one time. Effectively achieving the same outcome as a variable.

One of the things that strikes me most is that while it's true that using LESS or SASS can dramatically reduce the size of your style sheets initially, when they get compiled for a release to production the CSS is expanded and output in the same way as if you'd written it long handed anyway. So you'd have to take great care not to get too involved in things like nesting rules, because it's all gonna get expanded anyway.

LESS and SASS are almost languages all of their own, and it seems silly to me to learn how to code in a new language for the benefit of a language you already know and can probably write perfectly well. CSS will probably adopt a lot of the tools that LESS and SASS offer in the coming years, by which time they'll become redundant. If we're talking about them being time savers, why not spend the time setting up your own boilerplate and then start every project from there? It will probably take the same amount of time as setting up and figuring out LESS or SASS, and you'll have your very own personalised toolkit for all your new projects.

It might just be that I'm not working on big enough builds at the moment, but I just don't see the point.
