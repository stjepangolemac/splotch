---
title: Slashing down the linescraper one domain at a time
date: "2017-04-26T00:21:31+0000"
description: Reducing the Redux boilerplate by domain driven modularization of store management logic.
cover: "./cover.jpg"
coverAlt: forest and trail
---

I started using React and Redux a couple of months ago and after going through the basic concepts I immediately **fell in love**. It took one relatively complex app to realize how much boilerplate I needed to write. It soon became apparent that without some kind of **reorganization** of logic and file structure, maintenance and extension will become tiresome.

![alright](./alright.gif)

After a couple of days of researching and thinking about ways to reduce the code, I conceived a template. The biggest concern I wanted to avoid was the **towering height** of Redux-related folders like constants and actions and the long import paths.

**DISCLAIMER**: The packages which I use are not obligatory by any means and these tips can be used with virtually any selection of tools. This disclaimer is mostly related to the selectors and sagas below.

#### Grouping files by function

Most guides and tutorials regarding React and Redux on the web are following this folder layout:

```
actions/
  |-- codes.js
  |-- locations.js
  |-- partners.js
  |-- users.js
constants/
  |-- codes.js
  |-- locations.js
  |-- partners.js
  |-- users.js
reducers/
sagas/
selectors/
```

This folder structure is commonly known as “Rails-style” and it groups the files based on their function which is not per se a bad thing. The problem appears when you have tens of files grouped together and every action requires you to skim the list in a quest for the right file.

Making it even worse, import paths are always crossing several levels of folders which make imports fat and importing **cumbersome**.

![ah](./ah.gif)

#### Domain driven modularization

What if we could group files by their respective “_departments_”? For example, let’s put all _users_ related files in one folder and point out some advantages of this approach.

```
users/
  |-- actions.js
  |-- constants.js
  |-- reducer.js
  |-- saga.js
  |-- selectors.js
```

At first glance, nothing special happened but let’s address aforementioned problems and see what is different.

- **File count** — folders are now easier to skim through or analyze and they are using less vertical space, which means better use of screen real estate
- **Import paths** — importing now takes less horizontal space because all related files are in the same folder, which means no more figuring out how many slashes or dots is enough

Depending on the size and complexity of your project, it may already seem considerably easier to maintain and extend the codebase. But, what if there were additional improvements?

![belair](./belair.gif)

#### Bundling the domain

Organizing the code like this allows us to define an index file that could import all those specific files, and then export them from a **single point**. For example, let’s take _users_ domain and bundle it into one file.

```
users/
  |-- actions.js
  |-- constants.js
  |-- reducer.js
  |-- saga.js
  |-- selectors.js
  |-- index.js
```

Now, all remaining files need to be imported into the index file and afterwards exported.

```js
SEO.js
import * as constants from './constants'
import * as actions from './actions'
import * as selectors from './selectors'
import reducer from './reducer'
import saga from './saga'
export {
  constants,
  actions,
  selectors,
  reducer,
  saga
}
```

We can make this even shorter by directly exporting imported modules. The downside of this approach is losing the grouping of imports.

```js
export * from './constants' // BAD
export { default as reducer } from './reducer' // GOOD
```

This way, when you need something related to the _users_ domain, you always import from the **same path**. It’s not uncommon to import both action creators and selectors at the same time.

```js
import
  actions as usersActions,
  selectors as userSelectors
} from '../../redux/users'
```

#### Composing React components

The index file can be used for all sorts of wiring and enwrapments of React components too. This is exceptionally useful if the component is connected to the part of Redux state and has constants, action creators, or requires an async action to be called. The structure is the same with the addition of the component definition.

```js
SEO.js
import { connect } from 'react-redux'
import TodoList from './todolist'
import * as constants from './constants'
import * as actions from './actions'
import * as selectors from './selectors'
import reducer from './reducer'
import saga from './saga'
const connectedTodoList = connect(
  state => {
    return {
      todos: selectors.todos(state)
    } 
  },
  dispatch => {
    return {
      getTodos: () => dispatch(actions.get.try())
    }
  }
)(TodoList)
export default connectedTodoList
export {
  constants,
  actions,
  selectors,
  reducer,
  saga
}
```

#### Conclusion

Not everyone will appreciate the granularity of control and choice available while writing React + Redux apps. However, if utilized effectively it can lead to surprisingly **sleek and organized** code.

I am currently experimenting with builders for Redux-related code and if I succeed in making the code short enough, putting all of this in a single, well-organized file may be a plausible action. The builder for constants can already be tested.

[redux-constants-builder](https://www.npmjs.com/package/redux-constants-builder)

Feel free to **try it** and leave your suggestions, comments and ideas!

I hope this article was helpful and that it would spark some new ideas about code structure in React + Redux apps. Stay tuned for my future efforts to reduce the Redux boilerplate!