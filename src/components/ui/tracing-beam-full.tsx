"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useVelocity,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const TracingBeamFull = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.getBoundingClientRect().height);
    }
  }, [contentRef.current]);

  return (
    <motion.div
      className={cn("relative w-full mx-auto h-full", className)}
    >
      <div className="absolute">
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight} // Set the SVG height
          className="block"
          aria-hidden="true"
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        >
          <motion.path
            d={`M 1 1 V ${svgHeight-1}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.25"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={0} // set y1 for gradient
              y2={svgHeight} // set y2 for gradient
            >
              <stop stopColor="#18CCFC" stopOpacity="0"></stop>
              <stop stopColor="#18CCFC"></stop>
              <stop offset="0.325" stopColor="#6344F5"></stop>
              <stop offset="1" stopColor="#AE48FF" stopOpacity="1"></stop>
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};
