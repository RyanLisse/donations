interface InputProps {
  variant: 'radio' | 'number' | 'text' | 'email'
  id: string
  value: string | number | undefined
  label: string
  radiogroups?: string
  checked?: boolean | undefined
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean | undefined
}

export default function DonateInputs({
  id,
  value,
  label,
  radiogroups,
  checked,
  onChange,
  ...props
}: InputProps) {
  const { variant = 'radio' } = props

  if (variant === 'number') {
    return (
      <label htmlFor={id} className="col-span-2 h-full">
        <input
          id={id}
          type="number"
          value={value}
          name={id}
          onChange={onChange}
          className="block group border-2 border-gray-light appearance-none outline-none rounded-xl relative px-3 py-2 text-base bg-white w-full h-full"
          placeholder="Enter custom amount..."
        />
      </label>
    )
  }

  return (
    <div className="relative w-full bg-white group rounded-xl">
      <input
        id={id}
        checked={checked}
        name={radiogroups}
        type={props.variant}
        value={value}
        onChange={onChange}
        className="w-full sr-only peer"
      />
      <label
        htmlFor={id}
        className="relative z-10 flex item-center justify-center w-full border-2 border-gray-light p-3 cursor-pointer bg-white peer-checked:z-0 peer-checked:bg-secondary peer-checked:border-secondary rounded-xl peer-checked:text-white font-bold text-base transition-all duration-200 ease-in-out hover:bg-secondary-light hover:text-white"
      >
        {label}
      </label>
    </div>
  )
}
