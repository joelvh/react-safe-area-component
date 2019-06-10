# Handling the iPhone X Notch in React

There is an iOS-specific CSS style that can be used to dynamically add padding to the side where "The Notch" is positioned on the iPhone X device. This padding is not just for the notch, but also for the gesture area at the bottom of the device. In particular, the notch becomes a problem in landscape orientation if you want your app to be "full bleed" and not have left and right margins.

This React component easily allows you to specify which sides you want to add padding when it's needed, so that the notch and gesture swipe area at the bottom of the screen don't overlap your UI components.

## Setup

By default, iOS will add a margin at the left and right in landscape orientation. You can make your app "full bleed" by specifying a meta tag with `viewport-fit=cover` in your HTML.

```html
<meta name="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover">
```

In your react app, you can use the `SafeArea` component to render a div element with the appropriate padding as a "spacer", or to wrap your other components.

**"Spacer" example:**

```es6
import React from 'react'
import SafeArea from 'react-safe-area-inset'

function MyComponent (props) {
  return <>
    <SafeArea top />
    <h1>My Component</h1>
    <SafeArea bottom />
  </>
}
```

**Wrapper example:**

```es6
import React from 'react'
import SafeArea from 'react-safe-area-inset'

function MyComponent (props) {
  return (
    <SafeArea top bottom>
      <h1>My Component</h1>
    </SafeArea>
  )
}
```

[CSS Tricks has visual examples here.](https://css-tricks.com/the-notch-and-css/)

## Customize

The `SafeArea` adds spacing on the sides you specify only when needed. You can specify all sides if you want to wrap your whole app in the component. You can also specify a `component` instead of a "div" tag.

**Custom component example:**

```es6
import React from 'react'
import SafeArea from 'react-safe-area-inset'

function MyComponent (props) {
  return (
    <SafeArea component='h1' top left right>
      My Component
    </SafeArea>
  )
}
```

If you have a particular way that you are styling your app, you can specify how to apply the CSS styles by controlling how props are used. With `applyStyles`, the specified sides and CSS are provided along with the render props. Simply return the props you want to use, such as CSS class names or using some other styling framework.

**Custom styles example:**

```es6
import React from 'react'
import SafeArea from 'react-safe-area-inset'

// This example simply adds the `style` prop to all render props
const applyStyles = ({
  sides,  // ['top']
  styles, // { paddingTop: 'env(safe-area-inset-top' }
  props   // all render props (excluding SafeArea-specific props)
}) => {
  return {
    ...props,
    style: styles
  }
}

function MyComponent (props) {
  return (
    <SafeArea component='h1' top applyStyles={applyStyles}>
      My Component
    </SafeArea>
  )
}
```
