## User Workflow

This document will highlight all the actions that can be performed within the application, along with the expected outcomes of performing said actions.

It is expected that every action a user can perform should be documented here and if an action and/or behavior is altered, then this document should be updated to reflect those alterations.

The purpose of laying out behaviors in this way is to allow us to set up regression tests as well as end-to-end tests easily as well as allow their automation to be a lot easier to do.

#### Table of Contents
* [Registering](#registering)
* [Logging in](#logging-in)

#### [Registering](#registering)
##### Andelans
An Andelan is automatically registered if they have an Andela email, i.e. _`(xxxx.xxxx@andela.com)`_

##### Security Users
A security user must be registered by an Andela user with admin privileges.
To register a security user:
* After [logging in](#logging-in), click on the `Users` link on the navigation bar.
* Click on the `Security Users` tab.
* Click on the `Add security User` button. A modal with a form to enter the security user details will appear.
* On the modal, enter the details and click on the `Submit` button.
* If a user tris to submit the form with any of the required fields left blank, then an alert shows up at the top of the form informing them that the required field cannot be left blank.
* If a user tries to submit the form with an invalid email, then the email input field is highlighted in red and a message appears at the bottom of the input field indicating that the email is not valid.
* If the user tries to submit the form and the badge number is not unique, then an alert shows up at the top of the form informing them that the badge number already exists.

#### [Logging In](#logging-in)
* Click on the `Sign in with Google` button.
* A popup will appear requesting you to choose your preferred email.
* If a user chooses an email that is not an Andela email, a toast message appears on the top right corner of the browser page asking them to log in with their Andela email.
* If a user chooses an Andela email and they do not have the proper privileges, a modal will appear telling them that only users with admin privileges can access the site.
* If a user chooses an Andela email and they have the proper privileges, then they are successfully logged in and redirected to the `/dashboard` endpoint.
