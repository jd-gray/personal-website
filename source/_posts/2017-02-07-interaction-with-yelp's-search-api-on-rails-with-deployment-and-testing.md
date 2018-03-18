---
layout: post
title: Interaction with Yelp's Search API on Rails with Deployment and Testing
---

Several months ago I made a basic application using Yelp's API for search and then plotting points on a map. This was something easy to accomplish using Yelp and I thought I would share this for someone to use. This application will be built on Ruby on Rails and deployed using Heroku.

Lets start by creating the application:

``` rb
rails new yelp-tutorial -T
```

I am skipping the test unit because I will be adding RSpec for some tests.

Open the application in your favorite text-editor (I am using SublimeText fyi):

``` rb
cd yelp-tutorial
subl .
```

Also set up for version control using Git and Github. Go onto [github.com](github.com) and create a new repository:

``` rb
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/{github_name}/{repo_name}
git push -u origin master
```

Checkout to a new branch to setup the application:

``` rb
git checkout -b "app-setup"
```

Setup the gemfile:

```ruby
source 'https://rubygems.org'

gem 'rails', '4.2.3'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.1.0'
gem 'jquery-rails'
gem 'turbolinks'
gem 'jbuilder', '~> 2.0'
gem 'sdoc', '~> 0.4.0', group: :doc
gem 'figaro'
gem 'yelp', require: 'yelp'

group :development, :test do
  gem 'byebug'
  gem 'spring'
  gem 'pry', '~> 0.10.1'
  gem 'pry-rails'
  gem 'rspec-rails'
end

group :test do
  gem 'capybara'
  gem 'selenium-webdriver'
  gem 'simplecov', require: false
end

group :development do
  gem 'sqlite3'
end

group :production do 
  gem 'rails_12factor'
  gem 'pg'
end
```

Notable Gems added: Yelp, Figaro (to hide API keys), Pry (for debugging), RSpec/Capybara (for testing).

Install the gems:

``` rb
bundle install
```

Boot up your local server to make sure everything is all good and you will see the 'Welcome Aboard' displayed:

``` rb
rails s
```

Stop the server and set up some of the gems:

``` rb
rails generate rspec:install
bundle exec figaro install
```

This sets up our test suite and creates a file to hide the API keys.

Configure `rails_helper.rb` by adding the following to the existing contents:

```ruby
require 'capybara/rails'
require 'simplecov'
SimpleCov.start
```

Commit the changes and push to Github:

``` rb
git add .
git commit -m "initial setup of application"
git push origin app-setup
```

Note: I went onto github.com and created a pull request for this branch and merged it into the master branch. Now go back onto the master branch and pull down the changes (that were merged from the app-setup branch):

``` rb
git checkout master
git pull origin master
```

Even though nothing has been done, setup the application for deployment with Heroku (make sure you have a Heroku account and the tool belt setup):

``` rb
heroku login
heroku create
git push heroku master
```

Note: Since I have not given my application a name, Heroku automatically generates a name for you. In this case my application is named: afternoon-sands-41195. Also you should notice that I am using PostgreSQL as a database on production and Sqlite on development. Nothing is being saved in the database, but this is being shown where you can also configure somethings like User creation or Comment creation, for example.

Now lets get a response from Yelp's API and display it.

Checkout to a new branch to start:

``` rb
git checkout -b "yelp-response"
```

Create Yelp initializer:

``` rb
touch config/initializers/yelp.rb
```

```ruby
# config/initializers/yelp.rb
require 'yelp'

Yelp.client.configure do |config|
  config.consumer_key = ENV['YELP_CONSUMER_KEY']
  config.consumer_secret = ENV['YELP_CONSUMER_SECRET']
  config.token = ENV['YELP_TOKEN']
  config.token_secret = ENV['YELP_TOKEN_SECRET']
end
```

Beautiful. Now log into Yelp's developers console [https://www.yelp.com/developers](https://www.yelp.com/developers) and generate some keys.
Attach these keys within the application.yml file (which is ignored by Git and will not be publicly available - if Figaro was setup correctly):

```ruby
# config/application.yml

YELP_CONSUMER_KEY:  'insert yelp consumer key'
YELP_CONSUMER_SECRET: 'insert yelp consumer secret'
YELP_TOKEN: 'insert yelp token'
YELP_TOKEN_SECRET: 'insert yelp token secret'
```

Note: I am note sharing my keys, this is something for you to insert ;).

Now onto creating a route, controller, and view:

``` rb
rails g controller welcome index
```

```ruby
# config/routes.rb

Rails.application.routes.draw do
  root 'welcome#index'
end
```

Boot up your server and you should see the generated Welcome#Index view.

Commit the changes:

``` rb
git add .
git commit -m "setup of yelp configuration and welcome controller"
```

Configure the welcome_controller.rb and Index view

```ruby
# app/controllers/welcome_controller.rb

class WelcomeController < ApplicationController
  def index
    if params[:term] != nil && params[:city] != nil
      parameters = { term: params[:term], limit: 18 }
      @response = Yelp.client.search(params[:city], parameters)
    end
  end
end
```

Note: I added a binding.pry so you can see the response generated in the console (Be sure to remove after seeing the console response)

```rhtml
# app/views/welcome/index.html.erb

<form class="search" role="search">
  <div class="form-group">
    <%= form_for root_path, method: :get do %>
      <%= text_field_tag(:term, nil, placeholder: 'Hamburgers') %>
      <%= text_field_tag(:city, nil, placeholder: 'Phoenix, AZ') %>
      <%= submit_tag 'Search', name: nil %>
    <% end %>
  </div>
</form>
```

Now looking at the view you will see two input boxes that will pass in our parameters to the controller upon submit. If you left the binding the pry in the controller you will see where the code has stopped and by typing the instance variable (@response), you will see the response from Yelp. *Hopefully you passed in a search like Sushi and Huntington Beach :)

Well this is cool and all, but now lets display the results on the view.

```rhtml
# app/views/welcome/index.html.erb

...

<% unless @response.nil? %>
    <% @response.businesses.each do |business| %>
        <div class="yelp-response">
            <h3><%= business.name %></h3>
            <p><%= image_tag business.image_url %></p>
            <p><%= image_tag business.rating_img_url %></p>
        </div>
    <% end %>
<% end %>
```

There are many things that can be displayed from Yelp like Street, City, State, etc. I have only displayed the business name, image, and star rating. Upon successful search, the results will be displayed.

Commit the changes and push to Github:

``` rb
git add .
git commit -m "basic search and response from yelp"
git push origin yelp-response
```

Create a pull request on Github and merge into master. Then check back to master and pull down the code:

``` rb
git checkout master
git pull origin master
```

To recap we have a basic search setup and result displayed on the view.

Now lets write a couple feature tests:

``` rb
git checkout -b "testing"
```

``` rb
mkdir spec/features
touch spec/features/index_spec.rb
```

```ruby
require 'rails_helper'

feature 'Search', js: true do

  before do
    visit root_path
  end

  scenario 'Successful search with city' do
    fill_in 'term', with: 'Sushi'
    fill_in 'city', with: 'Huntington Beach, CA'
    click_button 'Search'

    expect(page).to have_content 'Sushi On Fire'
    expect(page).to have_content 'Matsu Restaurant'
  end

  scenario 'Successful search with zip code' do
    fill_in 'term', with: 'Sushi'
    fill_in 'city', with: '92647'
    click_button 'Search'

    expect(page).to have_content 'Sushi On Fire'
    expect(page).to have_content 'Matsu Restaurant'
  end
end
```

Run the tests within your terminal and you should be in the green. These are just a few basic tests to test the response, but more can be written.

Commit the changes and push to Github:

``` rb
git add .
git commit -m "a couple of tests written"
git push origin testing
```

Note: Since Simplecov was added to his application, you can view what is tested and what isn't tested

``` rb
open coverage/index.html
```

Create a pull request and merge into master.

Pull down the new code written from master and push the results to Heroku:

``` rb
git checkout master
git pull origin master
```

I have yet to push to Heroku. That is because I have yet to add Yelp's API keys onto Heroku. This time setup on Heroku's website. Login and go to your application. Click on Settings and Reveal Config Variables. Here is where you will need to add the Yelp variables.

Now push to Heroku:

``` rb
git push heroku master
heroku open
```

You should now see your application deployed to the web :)

Some things to keep in mind: This application consists of a very basic setup. There are many changes and improvements that can be made. Some ideas: Styling, User creation, more tests (especially to capture/save the HTTP response), Begin/Rescue block for the search, search parameter validations. Please comment or message if you have any questions, hope you enjoy :)
