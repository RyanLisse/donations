import DonateInputs from './DonateInputs'
import { DonationOnceOptions } from 'data/DonationOptions'
import { useState } from 'react'
import { trpc } from '@libs/trpc'
import getStripe from '@libs/hooks/getStripe'

export default function DonateOnce() {
  const [customAmount, setCustomAmount] = useState<number | undefined>(
    undefined
  )
  const [currentOption, setCurrentOption] = useState<number>(0)

  const { ...getSessionbyId } = trpc.useMutation(
    'checkout.create-onetime-donation'
  )

  const selectedOption = customAmount
    ? {
        value: customAmount * 100,
      }
    : DonationOnceOptions[currentOption]

  const handleDonation = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    const response = await getSessionbyId.mutateAsync({
      amount: selectedOption.value,
    })

    const stripe = await getStripe()

    if (stripe != null) {
      await stripe.redirectToCheckout({
        sessionId: response.id,
      })
    }
  }

  return (
    <form
      className="grid grid-cols-3 gap-4 items-center"
      onSubmit={handleDonation}
    >
      {DonationOnceOptions.map((options, index) => (
        <DonateInputs
          key={options.id}
          id={options.id}
          label={options.label}
          value={options.value}
          variant="radio"
          radiogroups="donate"
          checked={!customAmount && currentOption === index}
          onChange={() => {
            setCurrentOption(index)
            setCustomAmount(undefined)
          }}
        />
      ))}
      <DonateInputs
        id="custom"
        label="Custom"
        value={customAmount}
        variant="number"
        onChange={(e) => setCustomAmount(e.currentTarget.valueAsNumber)}
      />
      <button
        className="px-3 py-2 bg-white border-secondary border-2 rounded-xl"
        type="submit"
      >
        Donate
      </button>
    </form>
  )
}
