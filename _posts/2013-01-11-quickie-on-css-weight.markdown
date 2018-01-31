---
layout: post
title:  "Quickie on CSS weight"
date:   2013-01-11 15:35:36 +0000
categories: css
---
In this completely made up and unrealistic example, which version is heavier? This...

    .main-nav li,
    .main-nav a {
        padding: 0.5em 1em;
    }
    .main-nav a {
        text-align: center;
    }

or...

    .main-nav li {
        padding: 0.5em 1em;
    }
    .main-nav a {
        padding: 0.5em 1em;
        text-align: center;
    }

I'm pretty certain that version one is better because there are only two actual declarations as opposed to three in version two. Just confused me momentarily because they are technically both seven lines of CSS, and only 10 characters different in length.

### Update

I had a reply to this question from Harry Roberts, A.K.A. [@csswizardry]("http://www.twitter.com/csswizardry"):

> Here, it's not about the weight of the CSS that matters, it's the sensibility of its architecture. The simplest test is just looking out for repetition.
>
> Repetition should be avoided, not necessarily from a weight point of view (repetition actually compresses (e.g. gzip) better than non-repeated strings) but from a maintainability point of view. The problem with repetition in CSS is the maintenance overhead.
>
> In the second example you are repeating `padding:0.5em 1em` twice, this means that should you need to change it to `padding:1em 2em` you would have to make that change twice.
>
> Your declarations are more likely to change than your selectors; your selectors are likely to remain fairly constant (you're more likely to change the `padding` values than you are to change `.main-nav a{}`) so author your CSS to make these changes as easy as possible to implement.
>
> Hope that helps, H
