---
layout: post
title: Linking a Heroku Based Ruby on Rails Application to a Custom Domain
---

As I have always utilized Heroku when launching my Ruby on Rails application to the web, I wanted to make sure my personal site would be linked to my personal domain name. I purchased my domain through GoDaddy last November and used Hostgator to host my original website.

Here are the steps that I took to launch my Heroku App to my personal domain:

Using the Heroku Toolbelt, you will need to add the custom domain:

``` rb
heroku domains:add www.exampledomain.com
heroku domains:add exampledomain.com
```

- Login to your GoDaddy account, find your domain and select `Manage`

- Select the tab `DNS ZONE FILE` and look for `CName`

- Select the edit button by the `www` host. Then change the `Points To` to your domain name. In this example it would be: exampledomain.herokuapp.com.

After those steps your Heroku App should now be referenced with the domain name you own. You can always check by typing this command in your terminal:

``` rb
host www.exampledomain.com
```

There you should see the alias has been set up. For further reference you can always review the Heroku documentation: [https://devcenter.heroku.com/articles/custom-domains](https://devcenter.heroku.com/articles/custom-domains)
