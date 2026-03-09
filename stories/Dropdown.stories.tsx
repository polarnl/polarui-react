import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FiBriefcase, FiChevronsDown, FiCode, FiFlag, FiHeadphones } from 'react-icons/fi';
import { COLOR_STEPS, Dropdown, PALETTE_TONES } from '../src/index.js';

const options = [
  {
    value: 'design',
    label: 'Design',
    description: 'UI, UX, branding',
    icon: FiBriefcase,
  },
  {
    value: 'engineering',
    label: 'Engineering',
    description: 'Frontend and backend delivery',
    icon: FiCode,
  },
  {
    value: 'marketing',
    label: 'Marketing',
    description: 'Content and campaign strategy',
    icon: FiFlag,
  },
  {
    value: 'support',
    label: 'Customer Support',
    description: 'Help center and customer care',
    disabled: true,
    icon: FiHeadphones,
  },
];

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  args: {
    label: 'Team',
    placeholder: 'Select a team',
    options,
    tone: 'blue',
    toneStep: 500,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['light', 'dark'],
    },
    tone: {
      control: 'select',
      options: PALETTE_TONES,
    },
    toneStep: {
      control: 'select',
      options: COLOR_STEPS,
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    invalid: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    defaultValue: 'engineering',
  },
};

export const Dark: Story = {
  args: {
    variant: 'dark',
    defaultValue: 'design',
    label: 'Department',
  },
};

export const WithDescription: Story = {
  args: {
    description: 'Choose the team that owns this task.',
    placeholder: 'Pick a team',
  },
};

export const WithError: Story = {
  args: {
    error: 'Please select a team before continuing.',
  },
};

export const CustomIcons: Story = {
  args: {
    chevronIcon: FiChevronsDown,
    selectedIcon: FiCode,
    defaultValue: 'marketing',
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('marketing');

    return (
      <Dropdown
        {...args}
        value={value}
        onValueChange={(nextValue) => setValue(nextValue)}
        description={`Current value: ${value}`}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'marketing',
  },
};

export const Empty: Story = {
  args: {
    options: [],
    noOptionsMessage: 'Nothing to show right now',
  },
};
