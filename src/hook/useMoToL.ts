import { useEffect, useState } from 'react'

// Custom hook to track the window size and categorize it using matchMedia
export const useMoToL = () => {

  const [movile, setmovile] = useState(false)
  const [tablet, settablet] = useState(false)
  const [laptop, setlaptop] = useState(true)

  useEffect(() => {
    // Define media queries for mobile, tablet, and laptop
    const mobileQuery = window.matchMedia('(max-width: 767px)')
    const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1199px)')
    const laptopQuery = window.matchMedia('(min-width: 1200px)')

    // Handler function to update state based on the media queries
    const updateDevice = () => {
        setmovile(mobileQuery.matches)
        settablet(tabletQuery.matches)
        setlaptop(laptopQuery.matches)

    }

    // Initial check
    updateDevice()

    // Add event listeners for media query changes
    mobileQuery.addEventListener('change', updateDevice)
    tabletQuery.addEventListener('change', updateDevice)
    laptopQuery.addEventListener('change', updateDevice)

    // Cleanup listeners on unmount
    return () => {
      mobileQuery.removeEventListener('change', updateDevice)
      tabletQuery.removeEventListener('change', updateDevice)
      laptopQuery.removeEventListener('change', updateDevice)
    }
  }, [])

  return {movile, tablet, laptop}
}
