import { HomeDev } from '@/components/organins/index'
import { Metadata } from 'next'

export const metadata:Metadata = {
  title: 'Home DevFriends',
  description: 'Initial Page'
}

export default function PageHome() {
  return (
    <div className="h-screen">
      <HomeDev />
    </div>
  )
}
