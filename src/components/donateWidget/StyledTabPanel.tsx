import { Tab } from '@headlessui/react'

interface StyledTabProps {
  children: React.ReactNode
}

export default function StyledTabPanel({ children }: StyledTabProps) {
  return <Tab.Panel>{children}</Tab.Panel>
}
