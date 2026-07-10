import { motion } from 'framer-motion'

/**
 * ClayChip — claymorphism pill/badge primitive
 *
 * Props:
 *  color    - hex accent color (default '#6366F1')
 *  size     - 'sm' | 'md' | 'lg'  (default 'md')
 *  animate  - stagger-pop on mount
 *  delay    - animation delay seconds
 *  onClick  - optional click handler
 *  children
 */
const SIZE = {
  sm: 'text-[10px] px-2.5 py-1',
  md: 'text-[12px] px-3 py-1.5',
  lg: 'text-[14px] px-4 py-2',
}

export default function ClayChip({
  color = '#6366F1',
  size  = 'md',
  animate = false,
  delay = 0,
  onClick,
  children,
  className = '',
}) {
  const alpha = (hex, a) => {
    const r = parseInt(hex.slice(1,3),16)
    const g = parseInt(hex.slice(3,5),16)
    const b = parseInt(hex.slice(5,7),16)
    return `rgba(${r},${g},${b},${a})`
  }

  const style = {
    background:  alpha(color, 0.12),
    border:      `1px solid ${alpha(color, 0.28)}`,
    color:       alpha(color, 1),
    borderRadius: 10,
    fontWeight:   500,
    cursor:       onClick ? 'pointer' : 'default',
    userSelect:   'none',
    boxShadow:    `3px 3px 8px rgba(0,0,0,.35), -2px -2px 6px rgba(255,255,255,.04)`,
    fontFamily:   "'Inter', sans-serif",
    transition:   'transform 0.15s ease',
  }

  const Comp = animate ? motion.span : 'span'
  const animProps = animate
    ? { initial:{opacity:0,scale:.85}, whileInView:{opacity:1,scale:1}, viewport:{once:true}, transition:{duration:0.3,delay} }
    : {}

  return (
    <Comp
      className={`inline-block ${SIZE[size]} ${className}`}
      style={style}
      onClick={onClick}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
      {...animProps}
    >
      {children}
    </Comp>
  )
}
