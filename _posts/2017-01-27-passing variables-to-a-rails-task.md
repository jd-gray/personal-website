---
layout: post
title: Passing variables to a rake task
---

I stumbled across a situation where I needed to create a few objects on my production application for about 3 users. The original method in the user model creates these objects with a call back, but the code was implemented after a few users have already signed up. So I decided to create a rake task and pass the user id.

Create the rake task:

```ruby
namespace :attributes do 
  desc "Creates column in Standard Fields"

  task :create, [:user_id] => :environment do |t, args|
    attributes = %w(Name Street City State)

    attributes.each_with_index do |value, index|
      StandardField.create!(category: 'Details', value: value, order: index, user_id: args[:user_id].to_i)
    end
  end
end
```

This loops through an array creating fields in order with the user_id being passed through.

Call the command from the terminal (bash):

``` rb
rake attributes:create[1]
```

Thats it.

Check out an article from Thoughtbot relating to this: [https://robots.thoughtbot.com/how-to-use-arguments-in-a-rake-task](https://robots.thoughtbot.com/how-to-use-arguments-in-a-rake-task)
