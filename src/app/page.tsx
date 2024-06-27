import { HomeDev } from '@/components/organins/index'
import { Metadata } from 'next'

export const metadata:Metadata = {
  title: 'Home DevFriends',
  description: 'Initial Page'
}

export default function Home() {
  return (
    <div className="h-auto phone:h-screen bg-gradient-to-l from-[#121629] via-[#663058] to-[#121629]">
      <HomeDev />
    </div>
  )
}
