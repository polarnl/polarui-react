import type { Meta, StoryObj } from '@storybook/react'
import { FiArrowRight } from 'react-icons/fi'
import { Button } from '../src/index.js'

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.8 5.67L21 8.58l-4.5 4.39 1.06 6.2L12 16.3l-5.56 2.87 1.06-6.2L3 8.58l6.2-.91L12 2z" />
  </svg>
)

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['button', 'a'],
    },
    color: {
      control: 'select',
      options: ['sky', 'orange', 'red', 'green', 'blue', 'dark', 'light'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    textColor: {
      control: 'select',
      options: ['white', 'black'],
    },
    iconSide: {
      control: 'select',
      options: ['left', 'right'],
    },
    loading: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: { color: 'blue', size: 'md' },
}

export const Sky: Story = {
  args: { color: 'sky' },
}

export const Orange: Story = {
  args: { color: 'orange' },
}

export const Red: Story = {
  args: { color: 'red' },
}

export const Green: Story = {
  args: { color: 'green' },
}

export const Dark: Story = {
  args: { color: 'dark' },
}

export const Light: Story = {
  args: { color: 'light' },
}

export const WithIconRight: Story = {
  args: {
    color: 'blue',
    icon: <StarIcon />,
    iconSide: 'right',
    children: 'Continue',
  },
}

export const WithReactIconComponent: Story = {
  args: {
    color: 'sky',
    icon: FiArrowRight,
    children: 'Next step',
  },
}

export const Loading: Story = {
  args: {
    color: 'blue',
    loading: true,
    children: 'Save changes',
  },
}

export const AsLink: Story = {
  args: {
    as: 'a',
    href: 'https://ui.polarnl.org/',
    target: '_blank',
    rel: 'noreferrer',
    children: 'Open docs',
    color: 'sky',
  },
}

export const IconOnly: Story = {
  args: {
    icon: <StarIcon />,
    children: null,
    'aria-label': 'Favorite',
    color: 'blue',
    size: 'sm',
  },
}

export const Small: Story = {
  args: { size: 'sm', children: 'Small Button' },
}

export const Large: Story = {
  args: { size: 'lg', children: 'Large Button' },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
