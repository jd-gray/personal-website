---
layout: post
title: Rails Flash Messages with Ajax
---

Here is an example of rendering a basic flash message with AJAX after submitting a modal form.

Lets look at the create method in our controller:

```ruby
# posts_controller.rb

class PostsController < ApplicationController
  respond_to :js, only: [:create]

  def create
    @post = Post.new(post_params)

    if @post.save
      flash.now[:notice] = "Post successfully created"
    end
    respond_with @post
  end
end
```

Now onto our create.js.erb file:

```rhtml
# create.js.erb

<% if @post.valid? %>
  $("#modal-add-post").modal('hide');
  $('#flash').html('<%= j render partial: "layouts/flash" %>');
< % end %>
```

Basically what this code is stating is that if the post submitted is valid, the modal hides and then immediately your flash message is displayed. You need to make sure the flash message partial exists as well as the id :).

And we might as well add a test to confirm:

```ruby
# post_controller_spec.rb

describe PostsController do 

  describe 'POST :create' do
    subject { post :create, format: :js, post: attributes_for(:post) }

    it 'renders a flash notice' do
      subject
      expect(flash[:notice]).to_not be_empty
    end
  end
end
```

This should come out green and you will be good to go ;).
