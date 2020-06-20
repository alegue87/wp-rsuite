// Globally in .storybook/config.js
import { addDecorator } from '@storybook/react'
import { withResponsiveViews } from 'storybook-addon-responsive-views'

addDecorator(withResponsiveViews({
  // xs <= 479
  sm: 480, // < 992 
  lg: 1200
}))

window.viewPorts = {
  xs: 0, 
  sm: 480, // <=
  md: 960, // <=
  lg: 1200 // <=
}