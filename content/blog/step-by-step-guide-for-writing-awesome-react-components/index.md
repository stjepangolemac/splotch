---
title: Step by step guide for writing awesome React components 
date: "2019-03-06T23:36:34+0000"
description: Descriptive and versatile checklist with must do’s and should do’s when conceptualizing sleek and professional React code
cover: "./cover.jpg"
coverAlt: typing on laptop
---

Going through the process of learning and using React and Redux I came to a following conclusion - they are not hard to grasp but are fairly difficult to master. Both are pretty minimal when it comes to their API and that helps new users to churn out new components and even apps at an incredible pace. Nevertheless, that convenience degrades the average quality of React code.

Being the minimally opinionated library as it is, React allows a fair amount of maneuverability regarding the different approaches one can take. The consequence of that is the broad spectrum of available best practices for someone to apply.

Some of those alleged best practices are not even good practices at all, and some of them are not compatible with one another. Best practices can depend on the tools and libraries you use, and they can be different relative to the type and purpose of the app.

The greatest difficulty I had and still have when searching for some additional valid knowledge is the lack of high quality and up-to-date materials. My goal here is to compile and organise in one place as many methods, concepts, and practices as my laziness allows.

![cat](./cat.gif)

#### Pillars of creation

High-quality React code rests on 5 pillars. It is not by chance a pillar and not a column, pole or a shaft. Pillar is defined as a _**slender**, freestanding, vertical support (“Pillar.” The American Heritage® Dictionary of the English Language. Wordnik.com)._

> The code should be made as simple as possible, but not simpler. And it should document itself. And it should be fast. And that is it.

There are 5 core principles (or pillars) of React components and they are:
1. Modularity
2. Reusability
3. Brevity
4. Flexibility
5. Efficiency

For every important thing that influences the usage of a best practice, there will be a ⻧ character (I do not know the origin nor the meaning of it, it just reminds me of a checkbox hanging on a sign). Afterwards, important concepts will be summarised along with the available ways to respect them.

#### Modularity

A proper way to write **modular** and composable Javascript code is to follow the principles of functional programming (⻧). A brief suggestion is to write functions wherever and whenever possible.

More complex algorithms and processing should be handled with higher order functions (⻧) which take other functions as parameters or return them. That way the duplication of code is minimum and the organisation is maximum. Take a look at one helper function in the inferno-shared package from InfernoJS team:

```js
export function isNullOrUndef(o) {
  return isUndefined(o) || isNull(o)
}
```

The function is composed of two functions that could again be composed of more functions. This prevents redundancy and visual complexity.

#### Reusability

As it is with every piece of code that is ever written, the shape of the implemented functionality must always adhere to some interchangeable format so that it can easily be replaced or **reused**.

When it comes to React this principle can be fulfilled by grouping similar components or utility functions and extracting them to a separate git repo or npm package. A good example of this can once again be found in the work of the InfernoJS team.

```
inferno-compat
inferno-component
inferno-create-class
inferno-create-element
inferno-devtools
inferno-hyperscript
inferno-mobx
inferno-redux
inferno-router
inferno-server
inferno-shared
inferno-test-utils
inferno-utils
inferno-vnode-flags
inferno
```

Organising similar code in independent packages enables clean import paths, easier maintenance, and greater modularity. The downsides are reviewing changes and testing code which can become much more complex. Effects of those problems can be minimised by using [Lerna](https://github.com/lerna/lerna)(⻧). Be sure to check [Webpack aliasing feature](https://webpack.js.org/configuration/resolve/#resolve-alias) (⻧) for even shorter and more beautiful import paths.

#### Brevity

With the introduction of functional components in React 0.14 developers got the ability to write more concise and clear code (⻧). The type of component depends on the need to use component state (which is discouraged, use Redux) and lifecycle methods. Imagine a component that renders an image of a sloth. Now imagine the most verbose way to write it.

```jsx
class SlothImage extends React.Component {
  render() {
    return <img src='sloth.gif' alt='Pretty face' />
  }
}
export default SlothImage
```

This code is completely correct and performant but can it be shorter? This component has no use of lifecycle methods.

```jsx
const SlothImage = props => {
  return <img src='sloth.gif' alt='Pretty face' />
}
export default SlothImage
```

Two lines have been spared by converting the class component to the functional component. What if the source and alt text are externally defined?

```jsx
const SlothImage = props => {
  return <img src={props.source} alt={props.alternativeText} />
}
export default SlothImage
```

The amount of lines is unchanged but the total number of characters is greater. Heard of JavaScript destructuring (⻧)?

```jsx
const SlothImage = ({ source, alternativeText }) => {
  return <img src={source} alt={alternativeText} />
}
export default SlothImage
```

That is better but it is not enough. Let us rename the props to their respective `<img>` counterparts and export the component in the same line.

```jsx
/*
The props should now be built like this:
{
  src: 'sloth.gif',
  alt: 'Pretty face',
}
*/
export default props => <img {...props}>
```

The dots are called a spread operator (⻧). One line is short enough but most of the real world components are not this simple. Remember, the goal is to reduce the number of characters, not newlines. My preference for writing more complex components is as follows:

```jsx
export default ({
  separateNext: underline,
  rightComponent,
  onRightComponentClick,
  ...rest: imgProps
}) => {
  return (
    <Row
      underline
      actionComponent={rightComponent}
      onActionClick={onRightComponentClick}
    >
      <SlothImage {...imgProps} />
    </Row>
  )
}
```

If I could pick one rule in writing React components it would be exceeding the 80 characters mark (⻧) in a single line. When dealing with more than few properties it is always a good idea to format them one below another and to properly indent them. Using destructuring along with renaming and the rest operator (⻧) is a good way to save some keystrokes.

#### Flexibility

If we want the components to be reusable, they need to be able to fit in different contexts and visual environments. That implies having different shape and style dependent on the parents or surrounding children. The component that renders a text input for entering an amount of money could be used like this:

```jsx
<TextInput
  wide
  required
  suffix={<DollarSign />}
>
  43
</TextInput>
```

The logic for achieving the correct behavior of this component is not too complex. The checks for boolean props are oneliners and rendering the suffix is a matter of injecting it in the right place. But the over need for flexibility and customisation may complicate the component to the point where it has several hundred lines of code. The sign of overcomplication is the usage of _“enum”_ like props or having too many props.

```jsx
<TextInput
  required
  width='col-6'
  height='xlarge'
  bgColor='#a4a4a4'
  type='primary'
  suffix='dollar'
>
  1337
</TextInput>
```

Every component should have a single responsibility (⻧) and a reasonable amount of flexibility. If the code is too complex, break it down to several components.

#### Efficiency

User experience greatly depends on the responsiveness and snappy interaction which must be the priority when building (progressive) web apps. One of the things that can slow down transitions and navigation is unnecessarily iterating over arrays, especially if the app contains long tables and lots of repeating elements. Let’s suppose we need to render only short strings in spans.

```jsx
const arr = ['foo', 'bazzzz', 'bartender', 'qux']
const spans = arr
  .filter(entry => entry.length <= 3)
  .map(entry => <span>{entry}</span>)
```

This way there are two loops to do a simple rendering. A great way to get two times faster execution is to, guess once, shorten the number of loops twofold.

```jsx
const spans = arr.reduce((acc, curr) => {
    return curr.length <= 3 ? [...acc, <span>{curr}</span>] : acc
},[])
```

The reduce method (⻧) on the Array object is very powerful since it allows processing the entries before accumulating them by some rule.

Performance can be even greatly impacted by unnecessary re-renders of complex React components. Every change in the props triggers the rendering process that can be CPU intensive for complex components. To the rescue comes `shouldComponentUpdate` (⻧) lifecycle hook. If the change in some prop does not need to trigger rendering it can be written like this:

```jsx
class Example extends React.Component {
  ...
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.foo !== this.props.foo
  }
  ...
}
```

When this hook returns `true` the component will be re-rendered, and if it returns `false` it will not.

![cat walking](./cat-walking.gif)

#### Important concepts sorted by magic (⻧)
- Functional programming
- shouldComponentUpdate
- Higher order functions
- Functional components
- Lerna
- Webpack resolve.alias
- Destructuring
- Spread operator
- Rest operator
- 80 characters
- Single responsibility
- Array.reduce
