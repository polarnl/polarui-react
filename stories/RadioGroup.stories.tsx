import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FiLayers, FiShield, FiTool, FiZap } from 'react-icons/fi';
import { COLOR_STEPS, PALETTE_TONES, RadioGroup } from '../src/index.js';

const deploymentOptions = [
  {
    value: 'stable',
    label: 'Stable',
    subtext: 'Conservative updates focused on reliability.',
    icon: FiShield,
  },
  {
    value: 'balanced',
    label: 'Balanced',
    subtext: 'Good default between speed and stability.',
    icon: FiLayers,
  },
  {
    value: 'rapid',
    label: 'Rapid',
    subtext: 'Faster release cadence for testing new features.',
    icon: FiZap,
  },
  {
    value: 'custom',
    label: 'Custom',
    subtext: 'Bring your own rollout policy and approval gates.',
    icon: FiTool,
    disabled: true,
  },
];

const textOnlyOptions = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

const mixedOptions = [
  { value: 'issues', label: 'Product issues', icon: FiShield },
  { value: 'changelog', label: 'Changelog only', subtext: 'Major and minor release notes only.' },
  { value: 'everything', label: 'Everything', subtext: 'Announcements, tips, and product updates.' },
];

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  args: {
    label: 'Release channel',
    subtext: 'Choose how updates should roll out to your environment.',
    options: deploymentOptions,
    defaultValue: 'balanced',
    tone: 'blue',
    toneStep: 500,
    size: 'md',
    variant: 'light',
    orientation: 'vertical',
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
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
    },
    disabled: {
      control: 'boolean',
    },
    readOnly: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    invalid: {
      control: 'boolean',
    },
    subtext: {
      control: 'text',
    },
    loop: {
      control: 'boolean',
    },
    allowDeselect: {
      control: 'boolean',
    },
    hideIndicator: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {};

export const Dark: Story = {
  args: {
    variant: 'dark',
    tone: 'sky',
    defaultValue: 'stable',
  },
};

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    tone: 'emerald',
  },
};

export const IconOnRight: Story = {
  args: {
    iconPosition: 'right',
    tone: 'violet',
  },
};

export const TextOnly: Story = {
  args: {
    label: 'Reminder frequency',
    subtext: 'Simple text options without icons or extra row text.',
    options: textOnlyOptions,
    defaultValue: 'weekly',
    tone: 'indigo',
  },
};

export const MixedOptionalContent: Story = {
  args: {
    label: 'Email preferences',
    subtext: 'Icons and subtext are optional per item.',
    options: mixedOptions,
    defaultValue: 'changelog',
    tone: 'rose',
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('rapid');

    return (
      <RadioGroup
        {...args}
        value={value}
        onValueChange={(nextValue) => setValue(nextValue)}
        subtext={`Current selection: ${value || 'none'}`}
      />
    );
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
    error: 'Pick one release channel before continuing.',
    defaultValue: '',
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultValue: 'stable',
    subtext: 'Selection is currently locked by organization policy.',
  },
};

export const AllowDeselect: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('balanced');

    return (
      <RadioGroup
        {...args}
        value={value}
        allowDeselect
        onValueChange={(nextValue) => setValue(nextValue)}
        subtext={`Click the selected option again to clear. Current: ${value || 'none'}`}
      />
    );
  },
};

export const NoOptions: Story = {
  args: {
    options: [],
    noOptionsMessage: 'No channels are available for this project.',
  },
};
