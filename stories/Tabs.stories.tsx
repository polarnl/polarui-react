import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Tabs } from '../src/index.js'

const dashboardTabs = ['Users', 'Orgs', 'Roles', 'Settings']

const DashboardTabs = ({ scheme }: { scheme: 'light' | 'dark' }) => {
  const [activeTab, setActiveTab] = useState('Orgs')

  return (
    <Tabs
      scheme={scheme}
      tabs={dashboardTabs}
      activeTab={activeTab}
      onActiveTabChange={setActiveTab}
    />
  )
}

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  args: {
    scheme: 'light',
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
type Story = StoryObj<typeof Tabs>

export const Light: Story = {
  args: {
    scheme: 'light',
  },
}

export const Dark: Story = {
  args: {
    scheme: 'dark',
  },
}

export const Comparison: Story = {
  render: () => (
    <div className="flex flex-col gap-8 bg-[#404040] p-8">
      <DashboardTabs scheme="dark" />
      <DashboardTabs scheme="light" />
    </div>
  ),
}

export const Dashboard: Story = {
  render: () => <DashboardTabs scheme="dark" />,
}