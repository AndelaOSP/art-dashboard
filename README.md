[![CircleCI](https://circleci.com/gh/AndelaOSP/art-dashboard.svg?style=svg)](https://circleci.com/gh/AndelaOSP/art-dashboard)
# ART
[![Coverage Status](https://coveralls.io/repos/github/AndelaOSP/art-dashboard/badge.svg)](https://coveralls.io/github/AndelaOSP/art-dashboard)

This is the admin dashboard for the ART application

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

## Directory Structure
```bash
├── src
│   ├── _test_
│   │   ├── components
│   ├── _actions
│   ├── _components
│   ├── _constants
│   ├── _reducers
│   ├── components
│   └── styles
```

### Components Folder (components)
> Contains presentational components within their specific folders. E.g. AssetsComponent is in `components/Assets`

### Containers Folder (_components)
 > Contains container components within their specific folders. e.g. AddAssetContainer is in `_components/Assets`

### Actions (_actions)
 > Contains actions in specific files. E.g. assets action in `_actions/assets.action.js` .

### Constants (_constants)
 > Contains constants in a single file in `_constants/index.js`.

### Reducers (_reducers)
> Contains reducers in their specific files, e.g. asset reducer in `_reducers/asset.reducer.js`

### Tests (__test__)
> Contains tests for components, containers, actions and reducers. E.g. reducers tests are in `__test__/reducers` folder.

### Styles (styles)
> Contains all styles used in the project
