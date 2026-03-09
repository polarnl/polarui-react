import { FiArrowRight } from 'react-icons/fi';
import { Button } from '../src/index.js';

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 2l2.8 5.67L21 8.58l-4.5 4.39 1.06 6.2L12 16.3l-5.56 2.87 1.06-6.2L3 8.58l6.2-.91L12 2z" />
  </svg>
);

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['button', 'a'],
    },
    tone: {
      control: 'select',
      options: ['sky', 'orange', 'red', 'green', 'blue', 'dark', 'light'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    textColor: {
      control: 'select',
      options: ['white', 'black'],
    },
    iconSide: {
      control: 'select',
      options: ['left', 'right'],
    },
    loading: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default = {
  args: { tone: 'blue', size: 'md' },
};

export const Sky = {
  args: { tone: 'sky' },
};

export const Orange = {
  args: { tone: 'orange' },
};

export const Red = {
  args: { tone: 'red' },
};

export const Green = {
  args: { tone: 'green' },
};

export const Dark = {
  args: { tone: 'dark' },
};

export const Light = {
  args: { tone: 'light' },
};

export const WithIconRight = {
  args: {
    tone: 'blue',
    icon: <StarIcon />,
    iconSide: 'right',
    children: 'Continue',
  },
};

export const WithReactIconComponent = {
  args: {
    tone: 'sky',
    icon: FiArrowRight,
    children: 'Next step',
  },
};

export const Loading = {
  args: {
    tone: 'blue',
    loading: true,
    children: 'Save changes',
  },
};

export const AsLink = {
  args: {
    as: 'a',
    href: 'https://ui.polarnl.org/',
    target: '_blank',
    rel: 'noreferrer',
    children: 'Open docs',
    tone: 'sky',
  },
};

export const IconOnly = {
  args: {
    icon: <StarIcon />,
    children: null,
    'aria-label': 'Favorite',
    tone: 'blue',
    size: 'sm',
  },
};

export const Small = {
  args: { size: 'sm', children: 'Small Button' },
};

export const Large = {
  args: { size: 'lg', children: 'Large Button' },
};

export const Disabled = {
  args: {
    disabled: true,
  },
};
