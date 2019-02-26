---
layout: post
title: Recording Test Suite HTTP Interactions with VCR
---

I revisited a prior application that I built earlier last year that involved the use of the Yelp and Google maps API. Basic search through Yelp's API populates results on the view and also with map markers. In my test suite I realized that I was hitting the API every time the suite is ran. So to fix this I used the VCR gem to record the HTTP response. VCR Github: [https://github.com/vcr/vcr](https://github.com/vcr/vcr)

Include the required gem's within your already existing test group:

```ruby
group :test do 
  gem 'webmock'
  gem 'vcr', '~> 3.0', '>= 3.0.1'
end
```

In your rails_helper.rb or spec_helper.rb require Webmock (if that is what you are using) and VCR. Also include VCR's required configuration. I have attached my basic setup:

```ruby
require 'webmock/rspec'
require 'vcr'

VCR.configure do |config|
  config.cassette_library_dir = "fixtures/vcr_cassettes"
  config.hook_into :webmock
  config.allow_http_connections_when_no_cassette = true
end
```

Here is one of my feature tests prior to VCR use:

```ruby
feature 'Search', js: true do

  before do
    visit root_path
  end

 # Test that currently hits Yelp's API
  scenario 'Successful search with city' do
      fill_in 'term', with: 'Sushi'
      fill_in 'city', with: 'Huntington Beach, CA'
      click_button 'Search'

      expect(page).to have_content 'Sushi On Fire'
      expect(page).to have_content 'Matsu Restaurant'
  end
end
```

Now to capture the HTTP response, wrap the test with VCR's use_cassette method and pass the file name to be created:

```ruby
scenario 'Successful search with city' do
    VCR.use_cassette("yelp search") do
      fill_in 'term', with: 'Sushi'
      fill_in 'city', with: 'Huntington Beach, CA'
      click_button 'Search'
    
      expect(page).to have_content 'Sushi On Fire'
      expect(page).to have_content 'Matsu Restaurant'
    end
end
```

Now if you have the correct setup, you will notice there is a .yml file within fixtures/vcr_cassettes directory.
You should notice an increase in test time and also you will have the ability to run this test without the internet.
