import { useEffect, useState } from 'react'

// Custom hook to track the window size and categorize it
export const useWindowSize = () => {
  // State variable for storing the window width
  const [windowWidth, setWindowWidth] = useState<number>(() => {
    // Initial value: set to current window width or default to 1920
    return typeof window !== 'undefined' ? window.innerWidth : 1920
  })

  // State variable for storing the window height
  const [windowHeight, setWindowHeight] = useState<number>(() => {
    // Initial value: set to current window height or default to 1080
    return typeof window !== 'undefined' ? window.innerHeight : 1080
  })

  useEffect(() => {
    // Function to handle the resize event
    const handleResize = () => {
      // Update the state variables with the new window size
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
    }

    // Add event listener for window resize events
    window.addEventListener('resize', handleResize)

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []) // Empty dependency array means this effect runs once on mount

  // Return an object with window dimensions and device type classifications
  return { windowWidth, windowHeight}
}
