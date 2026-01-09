import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../src/index.js'

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
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {}

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