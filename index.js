/* global navigator, window */

import React from 'react'
import PropTypes from 'prop-types'

// Detect iOS
export function iOS () {
  const { platform = null } = navigator
  // return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
  return !!platform && /iPad|iPhone|iPod/.test(platform)
}

// Detect Chrome on iOS
export function isCriOS () {
  return iOS() && /CriOS/.test(navigator.userAgent)
}

// Detect iPhone X notch position
export function notchPosition () {
  let { orientation, screen } = window
  let position

  if (orientation) {
    position = ({
      '90': 'left',
      '-90': 'right'
    })[orientation]
  } else {
    orientation = ('orientation' in screen)
      ? screen.orientation.type : ('mozOrientation' in screen)
        ? screen.mozOrientation : undefined

    position = ({
      'landscape-primary': 'left',
      'landscape-secondary': 'right'
    })[orientation]
  }

  return position || 'none'
}

function capitalize (s) {
  return s[0].toUpperCase() + s.slice(1)
}

const SIDES = ['left', 'right', 'top', 'bottom']

function SafeArea (props) {
  const { component: Component, applyStyles, left, right, top, bottom, ...rest } = props
  let componentProps = rest

  if (iOS()) {
    const sides = SIDES.filter(side => (
      this.props[side] && (
        (side === 'bottom') ||
        (side === 'top' && !isCriOS()) ||
        (side === notchPosition())
      )
    ))

    componentProps = applyStyles({
      sides,
      styles: sides.reduce(
        (styles, side) => {
          styles[`padding${capitalize(side)}`] = `env(safe-area-inset-${side})`
          return styles
        }, {}
      ),
      props: rest
    })
  }

  return (
    <Component {...componentProps} />
  )
}

SafeArea.propTypes = {
  component: PropTypes.elementType.isRequired,
  applyStyles: PropTypes.func.isRequired,
  left: PropTypes.bool,
  right: PropTypes.bool,
  top: PropTypes.bool,
  bottom: PropTypes.bool
}

SafeArea.defaultProps = {
  component: 'div',
  applyStyles: ({ sides, styles, props: { style, ...props } }) => {
    return {
      ...props,
      style: {
        ...style,
        ...styles
      }
    }
  },
  left: false,
  right: false,
  top: false,
  bottom: false
}

export default SafeArea
