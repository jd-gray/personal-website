---
layout: post
title: Disabling the Automatic Call-Box on Your Application
---

I came across a user story for an application that I was working on and this was to remove the automatic call-box feature when clicking on a contact. The issue was that there is a phone number displayed near the contact name and the Safari browser would automatically bring up the option to call this user.

Although I have enjoyed this feature when using other applications, this is not something needed in the application that I was working on because this portion of the application is being used by an employee who needs to access the contacts screen after clicking on the contact. The call-box was more of an annoyance.

So I thought to myself, is there a javascript function that I should be writing in order to prevent this box from popping up? After doing some research I ended up reviewing the Safari Developer Library and discovered the solution.

All I had to do was insert this meta code snippet in my view page:

```html
<meta name="format-detection" content="telephone=no">
```

This format-detection enables or disables automatic detection of possible phone numbers in a webpage in Safari on iOS. After some user testing this feature was gone.

Additional documentation on the Safari Developer Library can be found here: [https://developer.apple.com/library/safari/navigation/](https://developer.apple.com/library/safari/navigation/)
