import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SecondCreed({ itemRef, textRef }) {
  const wrapRef = useRef(null)
  const commentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const start = window.innerWidth < 768 ? 'top center' : 'top 75%'

      gsap.from(wrapRef.current, {
        opacity: 0,
        x: -80,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: itemRef.current,
          start,
          toggleActions: 'play none none none',
        },
      })

      gsap.from(textRef.current, {
        opacity: 0,
        x: 40,
        duration: 0.9,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: itemRef.current,
          start,
          toggleActions: 'play none none none',
        },
      })

      gsap.set(commentRef.current, { opacity: 0 })
      gsap.to(commentRef.current, {
        opacity: 1,
        duration: 1.0,
        delay: 1.0,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: itemRef.current,
          start,
          toggleActions: 'play none none none',
        },
      })
    }, wrapRef)

    return () => ctx.revert()
  }, [itemRef, textRef])

  return (
    <div ref={wrapRef} className="w-full md:w-[45%] flex-shrink-0">
      <div className="relative max-w-[420px] mx-auto">
        <img
          src={`${import.meta.env.BASE_URL}kanki.png`}
          alt=""
          className="w-full object-contain rounded-sm block"
          style={{ filter: 'grayscale(10%) contrast(105%)' }}
        />
        <img
          ref={commentRef}
          src={`${import.meta.env.BASE_URL}kanki_comment.png`}
          alt=""
          className="absolute top-0 left-0 w-full h-full object-contain rounded-sm"
          style={{ filter: 'grayscale(10%) contrast(105%)', opacity: 0 }}
        />
      </div>
    </div>
  )
}
