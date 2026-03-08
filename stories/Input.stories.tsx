import type { Meta, StoryObj } from '@storybook/react'
import { FiSearch, FiUser } from 'react-icons/fi'
import { Input } from '../src/index.js'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  args: {
    placeholder: 'Type something...',
    label: 'Email',
  },
  argTypes: {
    scheme: {
      control: 'select',
      options: ['light', 'dark'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    readOnly: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    scheme: 'light',
  },
}

export const Dark: Story = {
  args: {
    scheme: 'dark',
    label: 'Username',
    placeholder: 'Type your username',
  },
}

export const WithStartIcon: Story = {
  args: {
    startIcon: FiSearch,
    label: 'Search',
    placeholder: 'Search docs',
  },
}

export const WithEndIcon: Story = {
  args: {
    endIcon: FiUser,
    label: 'Assignee',
    placeholder: 'Assign to user',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Project name',
    description: 'Use 3-40 characters; letters and numbers only.',
    placeholder: 'Type project name',
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    error: 'Please enter a valid email address.',
    placeholder: 'you@example.com',
    defaultValue: 'invalid-email',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large input',
    placeholder: 'Larger touch target',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled input',
    placeholder: 'Cannot edit',
    disabled: true,
    defaultValue: 'Disabled value',
  },
}

export const ReadOnly: Story = {
  args: {
    label: 'Read-only input',
    readOnly: true,
    defaultValue: 'Immutable value',
  },
}
