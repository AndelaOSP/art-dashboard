## User Workflow

This document will highlight all the actions that can be performed within the application, along with the expected outcomes of performing said actions.

It is expected that every action a user can perform should be documented here and if an action and/or behavior is altered, then this document should be updated to reflect those alterations.

The purpose of laying out behaviors in this way is to allow us to set up regression tests as well as end-to-end tests easily as well as allow their automation to be a lot easier to do.

#### Table of Contents
* [Logging in](#logging-in)
* [Registering](#registering)


#### [Logging In](#logging-in)
*Successful Login (Using Andela Email)*
1. Visit login page
2. Click on the `Sign in with Google` button.
3. A popup will appear requesting you to choose your preferred email.
4. Select your Andela email (email must have admin privileges)
5. User is redirected to `/dashboard` endpoint

*Failed Login (Using Non-Andela Email)*
1. Do step 1 to 3 of successful login flow
2. Select a non-Andela email
3. A toast message appears at the top right corner of the browser page asking you to login with an Andela email.

*Failed Login (Using Andela Email Without Proper Privileges)*
1. Do step 1 to 4 of successful login flow using email without proper privileges
2. A modal appears telling you that only users with admin privileges can access the site

#### [Registering](#registering)
##### Andelans
Registration is similar to login workflow. Refer to [login workflow](#logging-in)

##### Security Users
A security user must be registered by an Andela user with admin privileges.

*Successfully Registration*
1. Login - see [logging in](#logging-in). 
2. Click on `Users` link in the navigation bar.
3. Click on `Security Users` tab.
4. Click `Add Security User button`. A modal with a form to enter security user details will appear.
5. Enter the user details and click `submit` button.
6. A success alert is displayed at the top of the modal.

*Registration With Validation Errors*
1. Perform step 1 to 4 of successful registration flow
2. Submit form with validation errors
3. An alert is displayed at the top of the modal indicating the validation errors

*Registration With Invalid Email*
1. Perform step 1 to 4 of successful registration flow.
2. Submit form with an invalid email.
3. The email input field is highlighted in red and a message appears at the bottom of the input field indicating that the email is not valid.

*Registration With Duplicate Badge Number*
1. Perform step 1 to 4 of successful registration flow.
2. Submit form with a duplicate badge number.
3. An alert shows up at the top of the form informing the user that the badge number already exists.
