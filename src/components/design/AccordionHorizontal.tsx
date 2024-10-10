'use client'
import { motion } from "framer-motion";
import { useState } from "react";
import { interpolate } from "flubber";
import { useSpring, animated } from "react-spring";
import {useSVGS,WindowSize} from "@/hook";
import { usePathname } from "next/navigation";

interface AccordionHorizontalProps {
  children: React.ReactNode;
  title?: string;
  titleColor?: string;
}

export const AccordionHorizontal = ({
  children,
  title="",
  titleColor="#000",
}: AccordionHorizontalProps) => {
  const [open, setopen] = useState<boolean>(true);
  const [animacion, setAnimacion] = useState<number>(1);
  const { BurningArrowSVG, ArrowIceSVG } = useSVGS();
  const { windowSize } = WindowSize();
  const pathname = usePathname();

  const pathInicial = BurningArrowSVG;
  const pathFinal = ArrowIceSVG;

  const interpolador = interpolate(pathInicial, pathFinal);

  const { t } = useSpring({
    to: { t: 1 },
    from: { t: 0 },
    reset: true,
    reverse: animacion % 2 === 0,
  });

  const isDashboard = /\/dashboard$/.test(pathname);

  return (
    <>
      <motion.button
        className="container-svg-accordion main-page"
        onClick={() => {
          setopen((prev) => !prev), setAnimacion(animacion + 1);
        }}
        initial={false}
        animate={{
          right:
            isDashboard === true
              ? windowSize < 1200
                ? "calc(2rem *var(--scale))"
                : open
                ? "calc(145rem *var(--scale))"
                : "calc(184rem *var(--scale))"
              : windowSize < 1200
              ? "calc(2rem *var(--scale))"
              : open
              ? "calc(156rem *var(--scale))"
              : "calc(184rem *var(--scale))",
          top: windowSize < 1200 ? "14.3rem" : "14.4rem",
          rotate: open ? "136deg" : "-33deg",
        }}
        transition={{ duration: 0.7 }}
      >
        <motion.svg
          width="5rem"
          height="5rem"
          viewBox={`0 0 ${
            windowSize < 1300
              ? "700 700"
              : windowSize < 1300
              ? "600 600"
              : "500 500"
          }`}
          preserveAspectRatio="xMidYMid meet"
          initial={false}
          animate={{
            fill: open ? "#F969AA" : "#57A3E1",
            filter: `drop-shadow(${
              open ? "0px 0px 4px #F969AA" : "0px 0px 4px #58A0DE"
            })`,
          }}
          transition={{ duration: 1 }}
          id="arrow"
        >
          <animated.path
            d={t.to(interpolador)}
            stroke={`${open ? "#F969AA" : "#57A3E1"}`}
          />
        </motion.svg>
      </motion.button>
      <div className="AccordionHorizontal main-page">
        <motion.div
          className="container-accordion-general"
          initial={false}
          animate={{
            width:
              windowSize < 1200 && open
                ? "100%"
                : windowSize < 1200 && !open
                ? "0rem"
                : open
                ? "auto"
                : "calc(8rem *var(--scale))",
            height: "100%",
          }}
          transition={{ duration: 0.7 }}
        >
          <div className=" container-accordion  ">
            <div className="container-arrow">
              <div className="container-letter" style={{ display: "flex" }}>
                {title?.split("").map((character, index) => (
                  <motion.h1
                    key={index}
                    style={{
                      display: "inline-block",
                      overflow: "hidden",
                      marginTop: "2rem",
                      color: titleColor,
                    }}
                    initial={{ opacity: 1, x: 0 }}
                    animate={{
                      opacity: open ? 1 : "0",
                      x: open ? 0 : "100%",
                    }}
                    transition={{ delay: (title.length - index - 1) * 0.02 }}
                  >
                    {character === " " ? "\u00A0" : character}
                  </motion.h1>
                ))}
              </div>
            </div>
            {children}
          </div>
        </motion.div>
      </div>
    </>
  );
};
