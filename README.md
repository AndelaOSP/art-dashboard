[![CircleCI](https://circleci.com/gh/AndelaOSP/art-dashboard.svg?style=svg)](https://circleci.com/gh/AndelaOSP/art-dashboard)
# ART
[![Coverage Status](https://coveralls.io/repos/github/AndelaOSP/art-dashboard/badge.svg)](https://coveralls.io/github/AndelaOSP/art-dashboard)

This is the admin dashboard for the ART application

## Directory Structure
```bash
├── src
│   ├── _test_
│   │   ├── components
│   ├── _actions
│   ├── _components
│   ├── _constants
│   ├── _reducers
│   └── components
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