/* ─── Page & Section ──────────────────────────────────── */
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.4 } },
}

export const slideLeft = {
  hidden: { opacity: 0, x: -30 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export const slideRight = {
  hidden: { opacity: 0, x: 30 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

/* ─── Stagger Container ───────────────────────────────── */
export const staggerContainer = (stagger = 0.1, delayChildren = 0) => ({
  hidden: {},
  show:   { transition: { staggerChildren: stagger, delayChildren } },
})

/* ─── Card Hover ──────────────────────────────────────── */
export const cardHover = {
  rest:  { y: 0,    boxShadow: '0 0px 0px rgba(0,0,0,0)' },
  hover: { y: -4,   boxShadow: '0 20px 50px rgba(0,0,0,.4)', transition: { duration: 0.2 } },
}

/* ─── Scale Pop ───────────────────────────────────────── */
export const scalePop = {
  hidden: { opacity: 0, scale: 0.85 },
  show:   { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } },
}

/* ─── Button Press ────────────────────────────────────── */
export const btnPress = {
  whileHover: { scale: 1.02 },
  whileTap:   { scale: 0.97 },
}

/* ─── Page Transition ─────────────────────────────────── */
export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.25 } },
}
