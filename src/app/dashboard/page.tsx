import { HomeDashboard } from '@/components/molecules/dashboard/HomeDashboard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work Spaces',
  description: 'General workspaces',
  icons: {
    icon: '/logoNew3.svg'
  }
}

const Page = () => {
  return (
    <>
      <HomeDashboard />
    </>
  )
}

export default Page
