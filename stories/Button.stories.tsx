import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../src/index.js'

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['sky', 'orange', 'red', 'green', 'blue', 'dark', 'light'],
    },
    textColor: {
      control: 'select',
      options: ['white', 'black'],
    },
    iconSide: {
      control: 'select',
      options: ['left', 'right'],
    },
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: { textColor: "black" }
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

export const Blue: Story = {
  args: { color: 'blue' },
}

export const Dark: Story = {
  args: { color: 'dark' },
}

export const Light: Story = {
  args: { color: 'light' },
}

export const WithIconLeft: Story = {
  args: {
    children: 'Star',
    icon: <StarIcon />,
    iconSide: 'left',
  },
}

export const WithIconRight: Story = {
  args: {
    children: 'Continue',
    icon: <ArrowIcon />,
    iconSide: 'right',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}