import Navbar   from '../components/layout/Navbar'
import Footer   from '../components/layout/Footer'
import Hero     from '../components/sections/Hero'
import About    from '../components/sections/About'
import Experience from '../components/sections/Experience'
import Projects from '../components/sections/Projects'
import Skills   from '../components/sections/Skills'
import Contact  from '../components/sections/Contact'

const DIVIDER = () => (
  <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.07),transparent)', margin: '0 24px' }} />
)

export default function Home() {
  return (
    <div style={{ background: '#07090F', minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <DIVIDER />
      <About />
      <DIVIDER />
      <Experience />
      <DIVIDER />
      <Projects />
      <DIVIDER />
      <Skills />
      <DIVIDER />
      <Contact />
      <Footer />
    </div>
  )
}
