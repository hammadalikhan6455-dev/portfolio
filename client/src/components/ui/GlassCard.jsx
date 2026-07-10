import { motion } from 'framer-motion'

/**
 * GlassCard — reusable glassmorphism card primitive
 *
 * Props:
 *  className  - extra Tailwind classes
 *  hover      - enable hover border brighten (default true)
 *  padding    - inner padding class (default 'p-5')
 *  animate    - wrap in motion.div with fadeUp (default false)
 *  delay      - animation delay in seconds
 *  style      - extra inline styles
 *  children
 */
export default function GlassCard({
  className = '',
  hover = true,
  padding = 'p-5',
  animate = false,
  delay = 0,
  style = {},
  children,
  ...rest
}) {
  const base = {
    background:     'rgba(255,255,255,0.04)',
    border:         '1px solid rgba(255,255,255,0.08)',
    borderRadius:   16,
    backdropFilter: 'blur(20px)',
    transition:     'border-color 0.2s ease',
    ...style,
  }

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay }}
        className={`${padding} ${className}`}
        style={base}
        onMouseEnter={hover ? (e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)' } : undefined}
        onMouseLeave={hover ? (e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' } : undefined}
        {...rest}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div
      className={`${padding} ${className}`}
      style={base}
      onMouseEnter={hover ? (e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)' } : undefined}
      onMouseLeave={hover ? (e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' } : undefined}
      {...rest}
    >
      {children}
    </div>
  )
}
