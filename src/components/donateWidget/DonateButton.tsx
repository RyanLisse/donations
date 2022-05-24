interface DonateButtonProps {
  buttonText: string
  disabled?: boolean
}

export default function DonateButton({ buttonText }: DonateButtonProps) {
  return (
    <button
      type="submit"
      className="col-span-3 bg-white border-2 border-black rounded-xl py-2 shadow-deep hover:shadow-none transition-all duration-500 hover:bg-black hover:text-white font-bold ease-out focus:bg-green-light"
    >
      {buttonText}
    </button>
  )
}
