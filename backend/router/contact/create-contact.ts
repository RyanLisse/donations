import { supabase } from '@libs/supabase'

export async function DonateContact(
  name: string,
  email: string,
  donation: number,
  customer_id: string,
  message: string,
  complete: boolean
) {
  const { error } = await supabase.from('donationex').insert([
    {
      name,
      email,
      donation,
      customer_id,
      message,
      complete,
    },
  ])
  if (error) {
    console.log(error.message)
  }
}
