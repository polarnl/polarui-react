import { FiSearch, FiUser } from 'react-icons/fi';
import { COLOR_STEPS, Input, PALETTE_TONES } from '../src/index.js';

const meta = {
  title: 'Components/Input',
  component: Input,
  args: {
    placeholder: 'Type something...',
    label: 'Email',
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
    readOnly: {
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

export const Default = {
  args: {
    variant: 'light',
    tone: 'blue',
    toneStep: 500,
  },
};

export const Dark = {
  args: {
    variant: 'dark',
    label: 'Username',
    placeholder: 'Type your username',
  },
};

export const WithStartIcon = {
  args: {
    startIcon: FiSearch,
    label: 'Search',
    placeholder: 'Search docs',
  },
};

export const WithEndIcon = {
  args: {
    endIcon: FiUser,
    label: 'Assignee',
    placeholder: 'Assign to user',
  },
};

export const WithHelperText = {
  args: {
    label: 'Project name',
    description: 'Use 3-40 characters; letters and numbers only.',
    placeholder: 'Type project name',
  },
};

export const WithError = {
  args: {
    label: 'Email',
    error: 'Please enter a valid email address.',
    placeholder: 'you@example.com',
    defaultValue: 'invalid-email',
  },
};

export const Large = {
  args: {
    size: 'lg',
    label: 'Large input',
    placeholder: 'Larger touch target',
  },
};

export const Disabled = {
  args: {
    label: 'Disabled input',
    placeholder: 'Cannot edit',
    disabled: true,
    defaultValue: 'Disabled value',
  },
};

export const ReadOnly = {
  args: {
    label: 'Read-only input',
    readOnly: true,
    defaultValue: 'Immutable value',
  },
};
