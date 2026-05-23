'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function LuxuryCursor() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const mouseX = useSpring(0, { stiffness: 150, damping: 20, mass: 0.5 })
  const mouseY = useSpring(0, { stiffness: 150, damping: 20, mass: 0.5 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const enter = () => setVisible(true)
    const leave = () => setVisible(false)

    const onHoverStart = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('a, button, [role="button"]')) setHovered(true)
    }
    const onHoverEnd = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (!t.closest('a, button, [role="button"]')) setHovered(false)
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mousemove', onHoverStart)
    document.addEventListener('mousemove', onHoverEnd)
    document.addEventListener('mouseenter', enter)
    document.addEventListener('mouseleave', leave)

    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mousemove', onHoverStart)
      document.removeEventListener('mousemove', onHoverEnd)
      document.removeEventListener('mouseenter', enter)
      document.removeEventListener('mouseleave', leave)
    }
  }, [mouseX, mouseY, visible])

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none hidden lg:block"
      style={{ x: mouseX, y: mouseY }}
    >
      <motion.div
        className="rounded-full border border-[#c9a054]"
        animate={{
          width: hovered ? 44 : 18,
          height: hovered ? 44 : 18,
          opacity: visible ? (hovered ? 0.9 : 0.55) : 0,
          x: hovered ? -22 : -9,
          y: hovered ? -22 : -9,
          backgroundColor: hovered ? 'rgba(201,160,84,0.08)' : 'transparent',
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  )
}
