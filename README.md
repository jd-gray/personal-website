## Features

* Compatible with [Github Pages](https://pages.github.com/)
* Minimal, responsive and speed performance optimized
* SEO friendly, with help of [Jekyll SEO Plugin](https://github.com/jekyll/jekyll-seo-tag)
* Easy [Google Tag Manager](https://tagmanager.google.com/) Integration
* Support for [Disqus](https://disqus.com/) comments
* Form submissions with [Formspree](#formspree)

###[Google Tag Manager](#gtm)

To enable Google Tag Manager, add the following lines to `_config.yml`: 
```yaml
google_tag_manager: GTM-XXXXXXX
```

where `GTM-XXXXXXX` is your Google Tag Manager Container ID. 
**Note** by default GTM tracking snippet will be also included in development. Google Tag Manager was chosen for this project as it's more flexible than Google Analytics, and it can be used to add GA to your site.
