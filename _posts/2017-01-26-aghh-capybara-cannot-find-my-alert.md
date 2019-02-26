---
layout: post
title: Aghh Capybara cannot find my alert
---

I had an interesting feature test failure earlier today and was confused on why exactly it was failing.

Here is my test:

```ruby
feature 'Accounts', js: true do
  let(:company) { Company.first }
  let(:user)    { company.users.first }

  before do 
    login_as user, scope: :user
    visit settings_account_path
  end

  scenario 'successfully update subscription plan' do
    within '.plan_unlimited_plan' do
      click_button 'Choose Plan'
    end
    sleep 1

    expect(page).to have_content 'Your subscription was successfully updated.'

    within '.current_plan' do
      expect(page).to have_content 'UNLIMITED PLAN'
    end
  end
end
```

Now this test simulates a user updating their Stripe Plan in their settings page. The actual functionality is working but why is RSpec stating that it cannot find the flash message ('Your subscription was successfully updated)? Well the browser window is too small to find the actual message due to some additional elements being added to the page. To correct this I simply opened increased the browser size with:

```ruby
window = Capybara.current_session.driver.browser.manage.window
window.resize_to(1600, 1200) # width, height
```

This could be added either within the actual test or before block if it relates to other tests within this file.
