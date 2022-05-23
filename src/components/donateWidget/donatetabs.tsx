import { Tab } from '@headlessui/react'
import DonateOnce from './DonateOnce'
import StyledTabButton from './StyledTabButton'
import StyledTabPanel from './StyledTabPanel'

const DonateTabData = [{ name: 'Donate Once' }, { name: 'Monthly' }]

export default function DonateTabs() {
  return (
    <div className="flex flex-col w-full max-w-md mx-auto">
      <Tab.Group defaultIndex={1}>
        <Tab.List className="flex w-full space-x-4">
          {DonateTabData.map((tab) => (
            <StyledTabButton key={tab.name} buttontext={tab.name} />
          ))}
        </Tab.List>

        <Tab.Panels className="mt-4 p-4 border-gray-light border-2 rounded-xl bg-gray-light/10">
          <StyledTabPanel>
            <DonateOnce />
          </StyledTabPanel>
          <StyledTabPanel>Test</StyledTabPanel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
