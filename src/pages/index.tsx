import DonateTabs from '@components/donateWidget/donatetabs'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className="mx-auto flex flex-col items-center justify-center align-middle h-screen">
      <DonateTabs />
    </div>
  )
}

export default Home
