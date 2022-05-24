import DonateInputs from './DonateInputs'
import { DonationOnceOptions } from 'data/DonationOptions'
import { useState } from 'react'
import { trpc } from '@libs/trpc'
import getStripe from '@libs/hooks/getStripe'
import DonateButton from './DonateButton'

export default function DonateOnce() {
  const [customAmount, setCustomAmount] = useState<number | undefined>(
    undefined
  )
  const [currentOption, setCurrentOption] = useState<number>(0)
  const [donorName, setDonorName] = useState<string>('')
  const [donorEmail, setDonorEmail] = useState<string>('')
  const [donorMessage, setDonorMessage] = useState<string>('')
  const [checkout, setCheckout] = useState<number>(0)

  const { ...getSessionbyId } = trpc.useMutation(
    'checkout.create-onetime-donation'
  )
  const { ...contactRouter } = trpc.useMutation('contact.donate-contact')

  const selectedOption = customAmount
    ? {
        value: customAmount * 100,
      }
    : DonationOnceOptions[currentOption]

  const handleDonation = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    if (checkout === 1) {
      const response = await getSessionbyId.mutateAsync({
        amount: selectedOption.value,
      })

      const stripe = await getStripe()

      if (stripe != null) {
        const donationAmount = Math.floor(selectedOption.value / 100)
        contactRouter.mutateAsync({
          name: donorName,
          email: donorEmail,
          message: donorMessage,
          customer_id: response.id,
          donation: donationAmount,
          complete: false,
        }),
          await stripe.redirectToCheckout({
            sessionId: response.id,
          })
      }
    }
    if (checkout === 0) {
      setCheckout(1)
    }
  }

  if (checkout === 1) {
    return (
      <form onSubmit={handleDonation} className="grid gap-y-4 grid-cols-3">
        <DonateInputs
          variant="text"
          id="name"
          label="Name"
          value={donorName}
          onChange={(e) => setDonorName(e.currentTarget.value)}
        />
        <DonateInputs
          variant="email"
          id="email"
          label="Email"
          value={donorEmail}
          onChange={(e) => setDonorEmail(e.currentTarget.value)}
        />
        <DonateInputs
          variant="textarea"
          id="message"
          label="Message"
          value={donorMessage}
          onChange={(e) => setDonorMessage(e.currentTarget.value)}
        />
        <DonateButton buttonText="Donate Now" />
        <button
          type="button"
          onClick={() => setCheckout(0)}
          className="hover:bg-red-light py-2 px-3 rounded-xl bg-black text-white transition-colors duration-200 col-span-1 mt-10"
        >
          Back
        </button>
      </form>
    )
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
      <DonateButton buttonText="Donate Now" />
    </form>
  )
}
