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

const Home = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-house-icon lucide-house">
    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
    <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
)

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
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
  args: {
    textColor: "black", children: 'Button',
 }
}

export const Orange: Story = {
  args: {
    color: 'orange',
    children: 'Button',
 },
}

export const Red: Story = {
  args: {
    color: 'red',
    children: 'Button',
   },
}

export const Green: Story = {
  args: {
    color: 'green',
    children: 'Button',
   },
}

export const Blue: Story = {
  args: {
    color: 'blue',
    children: 'Button',
   },
}

export const Dark: Story = {
  args: {
    color: 'dark',
    children: 'Button',
   },
}

export const Light: Story = {
  args: {
    color: 'light',
    children: 'Button',
   },
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
    children: 'Button',
  },
}

export const Transparent: Story = {
  args: {
    variant: 'transparent',
    color: 'blue',
    textColor: 'black',
    children: 'Button',
  },
}
export const TransparentWithIcon: Story = {
  args: {
    variant: 'transparent',
    children: <Home />
  },
}