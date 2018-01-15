---
layout: post
title: Using Selectize.js to Populate Input Box
---

I have been working a little bit with the Selectize.js library on a current application and thought I would share some things that I have learned with it. Especially populating an input for a better user experience. The functionality that I was recently working with is to populate an email address within an input, but also give the user flexibility to add an email address from a drop down. The user can also search for already saved contacts through this input as well.

Also if the user does not have a contact saved within the database, they are able to add the email on the fly.

```coffeescript
  $('#email_to').selectize
    plugins:['remove_button']
    delimiter: ', '
    maxItems: null
    valueField: 'email'
    labelField: 'email'
    searchField: ['first_name','last_name','email']
    options: []
    render:
      item: (item, escape) ->
        render_email_item(item, escape)
      option: (item, escape) ->
        render_email_option(item, escape)
    create: (input) ->
      if ((new RegExp('^' + $REGEX_EMAIL() + '$', 'i')).test(input))
        return { email: input }
      match = input.match(new RegExp('^([^<]*)\<' + $REGEX_EMAIL() + '\>$', 'i'))
      if match
        return { email: match[2] }
      alert("Invalid Email Address")
      return false
    onInitialize: ->
      $.ajax
        url: '/contacts.json'
        type: 'GET'
        dataType: 'json'
        success: (res) =>
          for contact in res
            @addOption(contact)
    onOptionAdd: (value) ->
      # add primary intended recipient unless there are selected items
      if(!this.items.length)
        primary_contact = $('#primary-intended-recipient').data('primary-intended-recipient')
        if(value == primary_contact)
          this.addItem(value)
```

When we look at the top portion of this code:

```coffeescript
  $('#email_to').selectize
    plugins:['remove_button']
    delimiter: ', '
    maxItems: null
    valueField: 'email'
    labelField: 'email'
    searchField: ['first_name','last_name','email']
    options: []
```

We use our input id and link with the Selectize.js library. An added remove button is added to each name being populated for ease of deletion. Although the backspace works just as fine. All these attributes are provided in more detail on Selectizes website: [http://selectize.github.io/selectize.js/](http://selectize.github.io/selectize.js/).

Skipping down towards the bottom -> 'first_name', 'last_name', and 'email' are all attributes within our JSON file. If a user has multiple contacts then they are able to search by typing a name or email address.

If you have noticed a few functions are being called that are specified elsewhere:

```coffeescript
render_email_item = (item, escape) ->
  item_html = """
  <div>
  """
  if(item.first_name && item.last_name)
    item_html += """
      <span class="contact">&nbsp;#{ escape item.first_name + ' ' + item.last_name }</span>
    """
  item_html += """
    <span class="email">&nbsp;#{ escape item.email }</span>
  </div>
  """
  return item_html

render_email_option = (item, escape) ->
  option_html = """
  <div>
    <span class="contact">
      <i class="icon-user-add"></i>
  """
  if(item.first_name && item.last_name)
    option_html += """
      &nbsp;#{ escape item.first_name + ' ' + item.last_name }
    """
  option_html += """
    </span>
    <span class="email">&nbsp;#{ escape item.email }</span>
  </div>
  """
  return option_html
```

Both of these functions specify styling for the dropdown items and how the item is displayed within the input box.

As we get towards the bottom of the code:

```coffeescript
    onInitialize: ->
      $.ajax
        url: '/contacts.json'
        type: 'GET'
        dataType: 'json'
        success: (res) =>
          for contact in res
            @addOption(contact)
    onOptionAdd: (value) ->
      # add primary intended recipient unless there are selected items
      if(!this.items.length)
        primary_contact = $('#primary-intended-recipient').data('primary-intended-recipient')
        if(value == primary_contact)
          this.addItem(value)
```

This shows where we are pulling the contacts list into the dropdown. Also there is an onOptionAdd function called that checks for a primary intended contact and if a value is already utilized -> it will be populated into the input. There is an additional step by finding the primary_contact on the view.

```rhtml
#primary-intended-recipient.hidden data-primary-intended-recipient=@contact.email
```

This will then fill that value and if the email matches, it will be populated.

Hope this helps any developers out there! If there are any questions using Selectize.js, please ask!
