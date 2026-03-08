import type { Meta, StoryObj } from '@storybook/react'
import { CheckWithLabel } from '../src/index.js'

const meta: Meta<typeof CheckWithLabel> = {
  title: 'Components/CheckWithLabel',
  component: CheckWithLabel,
  args: {
    label: 'Receive product updates',
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['sky', 'orange', 'red', 'green', 'blue', 'dark', 'light'],
    },
    controlSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    indeterminate: {
      control: 'boolean',
    },
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

export const Default: Story = {
  args: {
    color: 'blue',
    defaultChecked: false,
  },
}

export const Checked: Story = {
  args: {
    color: 'sky',
    defaultChecked: true,
  },
}

export const WithDescription: Story = {
  args: {
    description: 'We only send release notes and major updates.',
    defaultChecked: true,
  },
}

export const ErrorState: Story = {
  args: {
    error: 'You must accept this option to continue.',
    defaultChecked: false,
  },
}

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    checked: false,
    label: 'Some items selected',
    description: 'This is a mixed state checkbox.',
  },
}

export const Large: Story = {
  args: {
    controlSize: 'lg',
    defaultChecked: true,
    label: 'Large checkbox option',
  },
}

export const Disabled: Story = {
  args: {
    defaultChecked: false,
    disabled: true,
  },
}
