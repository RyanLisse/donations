import { Tab } from '@headlessui/react'
import classNames from '@utils/classnames'

interface StyledTabProps {
  buttontext: string
}

export default function StyledTabButton({ buttontext }: StyledTabProps) {
  return (
    <Tab
      className={({ selected }) =>
        classNames(
          selected
            ? 'bg-secondary text-white border-secondary-light'
            : 'hover:bg-secondary-light focus:bg-secondary-light',
          'rounded-xl border-2 px-3 py-2 font-bold text-xl transition-all duration-200 ease-in-out appearance-none outline-none w-full'
        )
      }
    >
      {buttontext}
    </Tab>
  )
}
