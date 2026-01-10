import type { Meta, StoryObj } from '@storybook/react'
import { CheckWithLabel } from '../src/index.js'

const meta: Meta<typeof CheckWithLabel> = {
  title: 'Components/CheckWithLabel',
  component: CheckWithLabel,
  args: {
    label: 'Checkbox w/ label',
  },
  argTypes: {
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof CheckWithLabel>

export const Checkbox: Story = {
  args: {
    defaultChecked: false,
  },
}

export const Disabled: Story = {
  args: {
    defaultChecked: false,
    disabled: true,
  },
}