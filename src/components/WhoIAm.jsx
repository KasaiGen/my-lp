import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const profile = [
  { label: 'Name',            value: '河西 玄太' },
  { label: 'Origin',          value: '山梨県 甲府市' },
  { label: 'Favorite Artist', value: 'betcover!!' },
]

const skills = ['TypeScript', 'React', 'Next.js', 'PHP', 'Laravel']

export default function WhoIAm() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-black py-24 md:py-32 px-8 md:px-20">
      <h2 ref={headingRef} className="text-4xl md:text-5xl 22xl:text-7xl font-bold text-white mb-16 md:mb-24">
        Who I Am ？
      </h2>

      <div ref={contentRef} className="flex flex-col md:flex-row gap-16 md:gap-0">
        {/* プロフィール */}
        <div className="md:w-1/2">
          <div className="space-y-10 2xl:space-y-14">
            {profile.map(({ label, value }) => (
              <div key={label}>
                <p className="text-white/35 text-xs 2xl:text-sm tracking-[0.25em] uppercase mb-2">{label}</p>
                <p className="text-white text-2xl 2xl:text-4xl font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* スキル */}
        <div className="md:w-1/2">
          <p className="text-white/35 text-xs 2xl:text-sm tracking-[0.25em] uppercase mb-5">My Skills</p>
          <div className="flex flex-wrap gap-3 2xl:gap-4">
            {skills.map((s) => (
              <span key={s}
                className="px-4 py-2 2xl:px-6 2xl:py-3 text-sm 2xl:text-lg text-white/65 border border-white/20 rounded-full tracking-wide">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
