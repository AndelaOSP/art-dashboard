[![CircleCI](https://circleci.com/gh/AndelaOSP/art-dashboard.svg?style=svg)](https://circleci.com/gh/AndelaOSP/art-dashboard)
# ART
[![Coverage Status](https://coveralls.io/repos/github/AndelaOSP/art-dashboard/badge.svg)](https://coveralls.io/github/AndelaOSP/art-dashboard)

This is the admin dashboard for the ART application

To get started:
  - Set up according to the [Getting Started](#getting-started) guidelines
  - Read the [onboarding](docs/onboarding.md) and [best practices](docs/best_practices) documents to understand how we work

## Getting Started
Clone the repository
> git clone https://github.com/AndelaOSP/art-dashboard.git

Navigate to the created folder
> cd art-dashboard

Install dependencies
> npm install

Copy .env_sample to .env by executing(or running the command)
> cp .env_sample .env

Assign valid values to the environment variables.<br/>
Ask your TTL/team mates for the valid values and source the `.env` file
> source .env

Start the application
> npm start

Log in with your Andela email and voila! You're all set :smiley:

To run tests, type
> npm test

In case you get the following error while running the `test` command,
> Error: EMFILE: too many open files, watch <br/>
  &nbsp;&nbsp;at FSEvent.FSWatcher._handle.onchange (fs.js:1352:28)

Execute these...
> brew update <br/>
  brew install watchman

To generate coverage report while running tests, execute:
> npm run coverage
