import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function WhoIAm() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    gsap.from(titleRef.current, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
    })
  }, [])

  return (
    <section ref={sectionRef} className="bg-black min-h-screen flex items-center justify-center py-32 px-8 md:px-20">
      <div className="text-center">
        <h2
          ref={titleRef}
          className="font-playfair text-4xl md:text-5xl font-bold text-white mb-8"
        >
          Who I Am ?
        </h2>
        <p className="text-white/30 text-sm tracking-widest">— Coming Soon —</p>
      </div>
    </section>
  )
}
