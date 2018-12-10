# Conventions
The given conventions are guidelines, which are not set on stone. This means that the document may be modified regularly to reflect the updated and new best practices adopted by the team.

We are using the [airbnb react standards](https://github.com/airbnb/javascript/tree/master/react), with some of the rules overriden to fit special use cases.

Always follow the _**SOLID and YAGNI principles**_ when writing code. This is to ensure that our code becomes easier to maintain, extend and update. Fixing a bug in one file should not prompt changes in 5 different files which doesn't have anything to do with the bug, in order not to break existing functionalities.

**YAGNI** basically means that _"You aren't gonna need it"_. It advocates for adding only the code that you need to implement a feature, not adding a code that you think you will use in the foreseeable future.

**SOLID** stands for:
- **Single Responsibility Principl (SRP)**
  > A module should have one, and only one, reason to change
  - A module can be a class, function, component, etc, depending on the language or framework you are using.
  - In our case, a module can be a function or class.
  - _"A reason to change"_ is sometimes referred to as a **responsibility**
  - If a module has too much responsibilities, then it will have as many change requests when something changes, consequently making it harder to update. This is because the responsibilities of a module are mostly coupled to each other, and modifying one responsibilty will give rise to additional changes.

- **Open-closed Principle**
  > A module should be open for extension but closed for modification
  - In general, this principle says that a class should be easily extendible without modifying its behaviour. A good example is `React.Component`.
  - When applying this principle, a class that is being extended should not be modified at all. No one should make any change to the source code.
  - This principle is easily achievable using **abstractions**
- **Liskov Substitution Principle**
  > Derived classes must be substitutable for their base classes
  - In other words, any subclass/derived class should be substitutable for their base/parent class
  - This principle implies that a subclass should override a parent class' methods without breaking existing functionalities
- **Interface Segregation Principle**
  > A client should not be forced to implement interfaces it does not use

  OR

  > A client should not be forced to depend on a method it does not use

  - This principle is easier to understand :)
- **Dependency Inversion Principle**
  > Entities must depend on abstractions, not concretions
  - This princple states that _the high level module must not depend on the low level module, but both of them should depend on abstractions_.
  - Abstraction should not depend on details. Details should depend upon abstractions. This is the case with some of the utility functions defined that works for different use cases defined in the repository.
  - It helps reduce tight coupling in object oriented languages.
  - As JavaScript is a dynamic language, this principle doesn't apply much to it in terms of abstraction. However. the following still applies in JavaScript:
  > ...high level module must not depend on the low level module...

  - This principle can be achieved using a **higher order function (HOF)** in JavaScript or ReactJS. As HOF may seem confusing to entry-level developers, use `render` prop in ReactJS.

To understand SOLID principles better, let Google be your best friend. There are many articles online explaining the principles, you just have to do your research.

---

## How to apply SOLID principles in React
Note that SOLID principles are easily applicable in object-oriented languages compared to a dynamic language like JavaScript. Therefore, apply the knowledge of the principles to the source code but don't expect to have a codebase that follows the SOLID principles to the dot.

How can we apply the principles?
### 1. Single responsibility principle
- Create components and functions that have a single purpose. Failure to do so creates components bloated with unnecessary methods, props, etc; which causes maintenance and modification nightmare.

### 2. Open-closed principle
- Create components that makes it easier to add new features without breaking existing functionalities
- When modifying an existing component, aim to not introduce breaking changes to an existing component that will force you to refactor a lot of existing code
- Apply _composition_ as a method for extension
- What is composition?
  - Composition means "combining". You can read about general composition knowledge [this page](https://www.cs.utah.edu/~germain/PPS/Topics/composition.html)
  - In terms of components, create small standalone components and combine them in one parent component. In the following example, assume that components are imported somewhere at the top of the file.
  ```jsx
  export default (props) => (
    <Fragment>
      <Header title="This is title" showIcon />
      <Content {...props} />
      <Footer color="primary" showNarrowFooter />
    </Fragment>
  )
  ```
- It is easier to read and understand the above snippet even without looking at the individual component's implementation. Also, each component such as `Header` only have one single responsibilty, which should be related to displaying the header
- Also note that you can render container components in presentation components. Therefore, you can retrieve the necessary props from the store for a particular container component rendered in a presentation component.

### 4. Interface segregation principle
- This principle should help with keeping _"Single responsibility principle"_.
  - Any component that violates SRP mostly likely also violates this principle.
- We can adopt this principle in terms of props, methods, etc. Consider the following 2 scenarios:
  - a component receives props it does not use, and just passes it to the child component
  - a component has methods that it does not use, and even the state being set is not used in it. All it does is pass the methods and states to child components
- The above scenarios are examples of where we can apply the segregation principle. For example:
  - If the props are retrieved from a redux store, create a container for the child component
  - Change a functional child component to a class if the methods, state, etc being passed to it from the parent component are not being used anywhere in the parent component

### 5. Dependency inversion principle
- This principle can be applied by either using a _higher order component or the render prop_.
- The recommended method between the two is the use of a `render` prop. Therefore, if you find yourself having a high-level component depending on a low-level component, then `render prop` will come in handy.

Look at [the example](#example-application-of-the-solid-principles) to see how the principles have been applied.

---
## Other Conventions
### Limit props being passed to child component
For sanity purposes as well as maintaining readability and comprehension of the code, ensure that you pass a maximum of 8 props to a component in the render method. For example:
```jsx
render() {
  <Fragment>
    <ChildComponent
      firstProp="Hi"
      secondProp="There!"
    />
    <AnotherChildComponent
      firstProp="lkklkl"
      secondProp="lkkllkn"
      thirdProp="asojjoiji"
      fourthProp="aslkjkljs"
      fifthProp="nklklkl"
      sixthProp="ihiohohi"
      seventhProp="wddslnlkn"
      eighthProp="jlknknjk"
    />
  </Fragment>
}
```

If you find yourself passing more than 8 props, then think of how you can improve your code structure in order not to surpass the limit.

---

## Example application of the SOLID principles
Let's work with the following code extract that I have retrieved from the codebase.

```jsx
export default class UserComponent extends React.Component {
  ...

  retrieveUsers = (activePage, limit) => {
    if (checkIfCutoffExceeded(activePage, limit)) {
      const url = `users?page=${activePage}&page_size=${limit}`;
      this.props.loading(true);
      return fetchData(url).then((response) => {
        this.props.loading(false);
        this.setState({ users: response.data.results });
      }).catch(() => {
        this.props.loading(false);
        this.setState({ allDataFetched: true });
      });
    }
    return this.props.loadUsers(activePage, limit);
  };

  ...

  render() {
    const currentUsers = `page_${this.props.activePage}`;
    const activePageUsers = this.props.users[currentUsers] || this.state.users;
    const hasNoUsers = isEmpty(activePageUsers);
    const showStatus = this.props.hasError && this.props.errorMessage;

    if (this.props.isLoading) {
      return <LoaderComponent />;
    }

    if (hasNoUsers) {
      const message = this.props.isFiltered
        ? 'No data for that filter. Please try another option.'
        : 'Please try again later, to see if we\'ll have users to show you.';

      return (
        <NavBarComponent>
          <UserHeader
            hideHeader={!this.props.isFiltered}
            limit={this.state.limit}
          />
          <ItemsNotFoundComponent
            allDataFetched={this.state.allDataFetched}
            message={message}
          />
        </NavBarComponent>
      );
    }

    return (
      <NavBarComponent title="Users" placeHolder="Search by name... ">
        <UserHeader limit={this.state.limit} />

        {
            showStatus && (
              <StatusMessageComponent
                message={this.props.errorMessage}
                className="error-status"
                reset={this.props.resetMessage}
              />
            )
          }

        <Table basic selectable className="users-list">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Email Address</Table.HeaderCell>
              <Table.HeaderCell>Cohort</Table.HeaderCell>
              <Table.HeaderCell>Assets Assigned</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
                activePageUsers.map((user) => {
                  const viewUserUrl = `users/${user.id}/view`;

                  const updatedUser = {
                    ...user,
                    assets_assigned: user.allocated_asset_count
                  };

                  return (
                    <TableRow
                      viewDetailsRoute={viewUserUrl}
                      key={user.id}
                      data={updatedUser}
                      headings={['full_name', 'email', 'cohort', 'assets_assigned']}
                    />
                  );
                })
              }
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              {!this.emptyUsersList() && (
              <Table.HeaderCell colSpan="4" id="pagination-header">
                <Segment.Group horizontal id="art-pagination-section">
                  <Segment>
                    <Pagination
                      id="art-pagination-component"
                      totalPages={this.handlePageTotal() || 1}
                      onPageChange={this.handlePaginationChange}
                      activePage={this.props.activePage}
                    />
                  </Segment>
                  <Segment>
                    <DropdownComponent
                      customClass="page-limit"
                      placeHolder="Show Rows"
                      options={rowOptions}
                      upward
                      value={this.state.limit}
                      onChange={this.handleRowChange}
                    />
                  </Segment>
                </Segment.Group>
              </Table.HeaderCell>
                )}
            </Table.Row>
          </Table.Footer>
        </Table>
      </NavBarComponent>
    );
  }
}
```
The component has a lot of reasons to change. The obvious ones are:
- Each time more table headers are to be added
- Each time the ajax request in `retrieveUsers` is to be changes. E.g. adding a query arg to the url
- Each time the table is to be updated or modified. E.g. updating the styles, modifying the data prop being passed, etc
- Each time the empty UI in the `hasNoUsers` block is to be updated
- Each time a new component is to be added, e.g. a terms of service component

Now that we know the reasons for the table to change, create abstractions for those reasons. In simple terms, create componnets, functions, etc, where appropriate.

Let's start with the render function. How can we improve it? We can move the following to their own components.
- Table Header
- Table body
- Table footer
Then combine the above components into a parent component. This will be applying composition.

What else can be done?
- The `hasNoUsers` block can be combined the last `return` block.
- The `loading` if block can be moved to the newly created component.

Our render function will now look like so:

```jsx
render() {
	const {
		activePage,
		users,
		hasError,
		errorMessage,
		isFiltered,
		resetMessage,
		isLoading,
		usersCount
	} = this.props;
	const currentUsers = `page_${activePage}`;
	const activePageUsers = users[currentUsers] || this.state.users;
	const hasUsers = !isEmpty(activePageUsers);
	const showStatus = hasError && errorMessage;

	const message = isFiltered
			? 'No data for that filter. Please try another option.'
			: 'Please try again later, to see if we\'ll have users to show you.';

	return (
		<NavBarComponent title="Users" placeHolder="Search by name... ">
			<UserHeader
			  hideHeader={!isFiltered}
				limit={this.state.limit}
			/>

			{showStatus && (
				<StatusMessageComponent
					message={errorMessage}
					className="error-status"
					reset={resetMessage}
				/>
			)}

			{!hasUsers && (
				<ItemsNotFoundComponent
					allDataFetched={this.state.allDataFetched}
					message={message}
				/>
			)}

			{hasUsers && (
				<UserTable
					isEmpty={!hasUsers}
					isLoading={isLoading}
					users={activePageUsers}
					count={usersCount}
					activePage={activePage}
					options={rowOptions}
				/>
			)}
		</NavBarComponent>
	);
}
```

_UserTable.jsx_
```jsx
export default class UserTable extends React.Component {
	state = {
		limit: 10,
	};

	getTotalPage = () => {
		const { count } = this.props;
		const { limit } = this.state;

		if (!count) {
			return 1;
		}

		return Math.ceil(count / limit);
	};

	handlePaginationChange = (e, { activePage }) => {
   // the pagination logic goes here
	}

	handleRowChange = (e, data) => {
		// row change logic goes here
	}

	render() {
		const {
			isLoading,
			users,
			isEmpty,
			activePage,
			options
		} = this.props;

		if (isLoading) {
			return <LoaderComponent />;
		}

		return (
			<Table basic selectable className="users-list">
				<TableHeader />
				<TableBody users={users} />
				<TableFooter
					isEmpty={isEmpty}
					totalPages={this.getTotalPage()}
					onPageChange={this.handlePaginationChange}
					activePage={activePage}
					options={options}
					value={this.state.limit}
					onChange={this.handleRowChange}
				/>
			</Table>
		);
	}
}
```

_TableHeader.jsx_
```jsx
const TableHeader = () => (
	<Table.Header>
		<Table.Row>
			<Table.HeaderCell>Name</Table.HeaderCell>
			<Table.HeaderCell>Email Address</Table.HeaderCell>
			<Table.HeaderCell>Cohort</Table.HeaderCell>
			<Table.HeaderCell>Assets Assigned</Table.HeaderCell>
		</Table.Row>
	</Table.Header>
);
```

_TableBody.jsx_
```jsx
const TableBody = ({ users }) => (
	<Table.Body>
		{users.map(user => {
			const viewUserUrl = `users/${user.id}/view`;
			const updatedUser = {
				...user,
				assets_assigned: user.allocated_asset_count
			};

			return (
				<TableRow
					viewDetailsRoute={viewUserUrl}
					key={user.id}
					data={updatedUser}
					headings={['full_name', 'email', 'cohort', 'assets_assigned']}
				/>
			);
		})}
</Table.Body>
)
```

_TableFooter.jsx_
```jsx
const TableFooter = props => {
	if (props.isEmpty) {
		return null;
	}

	return (
		<Table.Footer>
			<Table.Row>
				<Table.HeaderCell colSpan="4" id="pagination-header">
					<Segment.Group horizontal id="art-pagination-section">
						<Segment>
							<Pagination
								id="art-pagination-component"
								totalPages={props.totalPages}
								onPageChange={props.onPageChange}
								activePage={props.activePage}
							/>
						</Segment>
						<Segment>
							<DropdownComponent
								customClass="page-limit"
								placeHolder="Show Rows"
								options={props.options}
								upward
								value={props.limit}
								onChange={props.onRowChange}
							/>
						</Segment>
					</Segment.Group>
				</Table.HeaderCell>
			</Table.Row>
		</Table.Footer>

	);
}
```

Looking at the refactored render function of the `UserComponent`, it will now be easy to:
- Change `UserHeader` with little to no changes in the parent component
- Easily add a new component to the parent component without breaking existing functionalities

What about `retrieveUsers`? What can be done to improve it? Remember that the method is defined as:
```jsx
retrieveUsers = (activePage, limit) => {
	if (checkIfCutoffExceeded(activePage, limit)) {
		const url = `users?page=${activePage}&page_size=${limit}`;
		this.props.loading(true);
		return fetchData(url).then((response) => {
			this.props.loading(false);
			this.setState({ users: response.data.results });
		}).catch(() => {
			this.props.loading(false);
			this.setState({ allDataFetched: true });
		});
	}
	return this.props.loadUsers(activePage, limit);
};
```
We can move the fetch block to its own function in the container component, and its response assigned to a variable that can be used to set the state.

We can create a helper file and move the following logic to it:

```jsx
const constructUrl = (endpointName, pageNumber, pageSize) => {
  const url = `${endpointName}?page=${pageNumber}&page_size=${pageSize}`
}

const fetchInfo = (url, loadingCallback) => {
  loadingCallback(true);

  return axios.get(url)
    .then((response) => {
      loadingCallback(false);
      return response.data;
    })
    .catch((error) => {
      loadingCallback(false);
      return handleAxiosErrors(error);
    });
};
```

The beauty of having `constructUrl` and `fetchInfo` as illustrated in the above snippet is that they can be reused in different components, as long as they are used with correct parameters.

The the ajax block in `retrieveUsers` can then be extracted to its own method as:

```jsx
makeAjaxRequest = async (activePage, limit) => {
  const url = constructUrl('users', activePage, limit);
  const response = await fetchInfo(url, this.props.loading);

  const { results = {} } = response;
  if (isEmpty(results)) {
    this.setState({ allDataFetched: true });
    return;
  }

  this.setState({ users: results });
}

```

and `retrieveUser` updated to:

```jsx
retrieveUsers = (activePage, limit) => {
	if (checkIfCutoffExceeded(activePage, limit)) {
    return this.makeAjaxRequest(activePage, limit);
	}

  return this.props.loadUsers(activePage, limit);
};

```

After refactoring `retrieveUsers` method, any update to the ajax block will not affect it as we now have a method `makeAjaxRequest` that have a responsibility of dealing with anything related to the ajax request.

In summary, after the refactor we will have the following:

**_helpers.js_**
```jsx
export const constructUrl = (endpointName, pageNumber, pageSize) => {
  const url = `${endpointName}?page=${pageNumber}&page_size=${pageSize}`
}

export const fetchInfo = (url, loadingCallback) => {
  loadingCallback(true);

  return axios.get(url)
    .then((response) => {
      loadingCallback(false);
      return response.data;
    })
    .catch((error) => {
      loadingCallback(false);
      return handleAxiosErrors(error);
    });
};
```

**_UserComponent.jsx_**
```jsx
export default class UserComponent extends React.Component {
  ...

  makeAjaxRequest = async (activePage, limit) => {
    const url = constructUrl('users', activePage, limit);
    const response = await fetchInfo(url, this.props.loading);

    const { results = {} } = response;
    if (isEmpty(results)) {
      this.setState({ allDataFetched: true });
      return;
    }

    this.setState({ users: results });
  }

  rretrieveUsers = (activePage, limit) => {
    if (checkIfCutoffExceeded(activePage, limit)) {
      return this.makeAjaxRequest(activePage, limit);
    }

    return this.props.loadUsers(activePage, limit);
  };

  ...

  render() {
    const {
      activePage,
      users,
      hasError,
      errorMessage,
      isFiltered,
      resetMessage,
      isLoading,
      usersCount
    } = this.props;
    const currentUsers = `page_${activePage}`;
    const activePageUsers = users[currentUsers] || this.state.users;
    const hasUsers = !isEmpty(activePageUsers);
    const showStatus = hasError && errorMessage;

    const message = isFiltered
        ? 'No data for that filter. Please try another option.'
        : 'Please try again later, to see if we\'ll have users to show you.';

    return (
      <NavBarComponent title="Users" placeHolder="Search by name... ">
        <UserHeader
          hideHeader={!isFiltered}
          limit={this.state.limit}
        />

        {showStatus && (
          <StatusMessageComponent
            message={errorMessage}
            className="error-status"
            reset={resetMessage}
          />
        )}

        {!hasUsers && (
          <ItemsNotFoundComponent
            allDataFetched={this.state.allDataFetched}
            message={message}
          />
        )}

        {hasUsers && (
          <UserTable
            isEmpty={!hasUsers}
            isLoading={isLoading}
            users={activePageUsers}
            count={usersCount}
            activePage={activePage}
            options={rowOptions}
          />
        )}
      </NavBarComponent>
    );
  }
}
```

Note that the refactor above is not complete and it is done to demonstrate how SOLID principles can be applied. The assumption made is that all the props are passed to the components as needed.

When doing the actual refactoring:
- Some of the newly created components will have their own containers that retrieves the props from the redux store, in order to limit the number of props being passed from one component to another
- Some of the newly created components will be scrapped off, as there are existing components with that functionality. For example, the `TableFooter` component can be replaced by the [PaginationComponent](https://github.com/AndelaOSP/art-dashboard/blob/develop/src/components/common/PaginationComponent.jsx)
