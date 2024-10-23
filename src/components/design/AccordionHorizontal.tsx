'use client'
import { motion } from 'framer-motion'
import { useCallback, useMemo, useState } from 'react'
import { interpolate } from 'flubber'
import { useSpring, animated } from 'react-spring'
import { useSVGS } from '@/hook'
import { usePathname } from 'next/navigation'
import { useMoToL } from '@/hook/useMoToL'

interface AccordionHorizontalProps {
  children: React.ReactNode
  title?: string
  titleColor?: string
}

export const AccordionHorizontal = ({
  children,
  title = '',
  titleColor = '#000'
}: AccordionHorizontalProps) => {
  const [open, setOpen] = useState(true)
  const { BurningArrowSVG, ArrowIceSVG } = useSVGS()
  const { movile, tablet } = useMoToL()
  const pathname = usePathname()

  const interpolator = useMemo(
    () => interpolate(BurningArrowSVG, ArrowIceSVG),
    [BurningArrowSVG, ArrowIceSVG]
  )

  const { t } = useSpring({ t: open ? 1 : 0, reset: true })

  const isDashboard = useMemo(() => /\/dashboard$/.test(pathname), [pathname])

  const widthContainerAccordion = open
    ? movile || tablet
      ? '100%'
      : 'auto'
    : movile || tablet
    ? '0rem'
    : '0rem'

  const viewBoxArrow = movile ? '700 700' : tablet ? '600 600' : '500 500'

  const toggleOpen = useCallback(() => setOpen((prev) => !prev), [])

  return (
    <>
      <motion.button
        className="container-svg-accordion main-page"
        onClick={toggleOpen}
        initial={false}
        animate={{
          right:
            isDashboard === true
              ? movile || tablet
                ? 'calc(2rem *var(--scale))'
                : open
                ? 'calc(145rem *var(--scale))'
                : 'calc(184rem *var(--scale))'
              : movile || tablet
              ? 'calc(2rem *var(--scale))'
              : open
              ? 'calc(156rem *var(--scale))'
              : 'calc(184rem *var(--scale))',
          top: movile || tablet ? '14.3rem' : '14.4rem',
          rotate: open ? '136deg' : '-33deg'
        }}
        transition={{ duration: 0.7 }}
      >
        <motion.svg
          width="5rem"
          height="5rem"
          viewBox={`0 0 ${viewBoxArrow}`}
          preserveAspectRatio="xMidYMid meet"
          initial={false}
          animate={{
            fill: open ? '#F969AA' : '#57A3E1',
            filter: `drop-shadow(${
              open ? '0px 0px 4px #F969AA' : '0px 0px 4px #58A0DE'
            })`
          }}
          transition={{ duration: 1 }}
          id="arrow"
        >
          <animated.path
            d={t.to(interpolator)}
            stroke={`${open ? '#F969AA' : '#57A3E1'}`}
          />
        </motion.svg>
      </motion.button>
      <div className="AccordionHorizontal main-page">
        <motion.div
          className="container-accordion-general"
          initial={false}
          animate={{
            width: widthContainerAccordion,
            height: '100%'
          }}
          transition={{ duration: 0.7 }}
        >
          <div className=" container-accordion  ">
            <div className="container-arrow">
              <div className="container-letter" style={{ display: 'flex' }}>
                {title?.split('').map((character, index) => (
                  <motion.h1
                    key={index}
                    style={{
                      display: 'inline-block',
                      overflow: 'hidden',
                      marginTop: '2rem',
                      color: titleColor
                    }}
                    initial={{ opacity: 1, x: 0 }}
                    animate={{
                      opacity: open ? 1 : '0',
                      x: open ? 0 : '100%'
                    }}
                    transition={{ delay: (title.length - index - 1) * 0.02 }}
                  >
                    {character === ' ' ? '\u00A0' : character}
                  </motion.h1>
                ))}
              </div>
            </div>
            {children}
          </div>
        </motion.div>
      </div>
    </>
  )
}
