import {HomeDev} from '@/components/organins/index';

export const metadata = {
  title: 'Home DevFriends',
  description: 'Initial Page',
};

export default function Home() {
  return (
    <div className='h-auto phone:h-screen bg-gradient-to-l from-[#121629] via-[#663058] to-[#121629]'>
      <HomeDev />
    </div>
  );
}
