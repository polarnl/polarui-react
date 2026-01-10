import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '../src/index.js'

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
)

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  args: {
    placeholder: 'Standard input',
  },
  argTypes: {
    scheme: {
      control: 'select',
      options: ['light', 'dark'],
    },
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Light: Story = {
  args: {
    scheme: 'light',
    placeholder: 'Standard input',
  },
}

export const Dark: Story = {
  args: {
    scheme: 'dark',
    placeholder: 'Standard input',
  },
}

export const LightWithIcon: Story = {
  args: {
    scheme: 'light',
    placeholder: 'Input w/ icon',
    icon: <UserIcon />,
  },
}

export const DarkWithIcon: Story = {
  args: {
    scheme: 'dark',
    placeholder: 'Input w/ icon',
    icon: <UserIcon />,
  },
}

export const SearchInput: Story = {
  args: {
    scheme: 'light',
    placeholder: 'Search...',
    icon: <SearchIcon />,
  },
}
