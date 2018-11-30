# Code Organization

We use ReactJS and Redux in the frontend. To expidate the development process, we also use [Semantic UI's components](https://react.semantic-ui.com/).

We organize the codebase into directories as explained in the rest of the document while following the [set conventions](conventions.md).

Note that the entire codebase doesn't follow the organization structure, as the update is done progressively.

We use the most common `rails-style` structure to organize our codebase by object roles. This structure separate folders depending on their nature. Our code structure is:

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

## `_actions` folder
`_actions` contains action creators, divided per entity. E.g.
- `user.actions.js`
- `category.actions.js`

An example of an action creator is:
```js
const loadingUsers = isLoading => ({
  type: LOADING_USER,
  isLoading
});
```

## `_components` folder
`_components` contains the container components, encapsulated within their respective folders. E.g.
- `assets/addAsset.js`

The **container components** are concerned with _how things work_.

A container component is usually generated using a higher order component. E.g. `connect()` function of `react-redux`.

Even though a charactersistic of a container component is:
> contains both presentatational and container components, but they don't usually have DOM markup

we separate the component being connected to and create it in the `components` folder, as a presentational component. This ensures that the container file doesn't get too long when updating the connected/container component while adding new features or functionality.

Therefore, the container file should only have:
- `mapStateToProps` function
  - This is optional, depending on whether you are listening to state changes or not.

- `mapDispatchToProps` function
  - This is optional.
  - You can also use the shorthand notation instead of defining the function

- Any helper function that is not being reused in another file and it is used to format data to the desired value.

An example of a container file is:
```js
import Example from '../components/Example';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  // get needed data from state
});

const mapDispatchToProps = dispatch => ({
  // get the actions to dispatch
});

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(Example);
```

## `_constants` folder
`_constants` contains the constants being used in a single file. I.e. `index.js`.

**NOTE**: _The constants can be grouped into sub-files when `index.js` becomes too long to manage. Then the sub-files can be exported as a group in `index.js`. E.g._
```js
├── _constants
│   ├── users.js
│   ├── assets.js
│   ├── index.js
```

## `_reducers` folder
This folder contains all the reducers of the application.

Each reducer correspond to a specific action file. E.g. `users.reducer.js`

An example of a reducer file is:
```js
export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_USER:
      return {
        ...state,
        loading: action.isLoading
      };
    ...
    default:
      return state;
  }
};
```

## `components` folder
This folder contains the presentational components. The components are nested inside their respective folders, corresponding to the entity they are created for. E.g.
- All user related components should have `Users` as the parent. E.g. `Users/SecurityUser.jsx`
- All access control componenrts should be have `AccessControl` as the parent. E.g. `AccessControl/Authorization.jsx`

Any component shared between different folders inside `components` should be written in the `/common` directory.

An example folder structure for this can be:
```bash
├── components
│   ├── Users
│   │   ├── SecurityUser.jsx
│   ├── AccessControl
│   │   ├── Authorization.jsx
│   ├── common
│   │   ├── LoadingSpinner.jsx
```

The **presentational components** are concerned with _how things look_. They usually have the following characteristics:
- Obtains data and callbacks via props
- Contains other presentational and container (when needed)components, as well as have DOM markup
- Mostly written as functional components, unless they want to use internal state or lifecycle method
  - Note that the internal state used is mostly for managing the UI state, not data. E.g. changing a button from active to disabled

An example of a presentational component is:
```jsx
export default ({ header, buttonText }) => {
  <div className="example">
    <h3>{header}</h3>
    <button className="example__button">
      {buttonText}
    </button>
  </div>
};
```

Have a look at the [React's faq page](https://reactjs.org/docs/faq-structure.html) to see the most common structures that people use.

## `styles` folder
This directory comprises the styles used in the project.

## `_test_` folder
This folder contains the tests for all the components, containers, actions and reducers.
The tests are encapsulated in their corresponding folder. I.e.
- Reducer tests are in `/reducers` folder
- Container tests are in `/_components` folder
- Component tests are in in `/components` folder
- Action tests are in `/actions` folder
