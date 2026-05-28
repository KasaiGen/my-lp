import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    title: '技術力を磨く',
    desc: 'コードを書けるPMとして、エンジニアと同じ目線で技術的な意思決定に参加できるようになる。',
  },
  {
    num: '02',
    title: 'チームを動かす',
    desc: 'プロジェクトの推進だけでなく、メンバーの成長や組織の健全性にも責任を持つマネジメントを実践する。',
  },
  {
    num: '03',
    title: 'プレイングPMへ',
    desc: '技術とマネジメントの両軸を持ち、現場でも戦略でも価値を出せる存在になる。',
  },
]

export default function MyVision() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const stepsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(subRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: sectionRef.current, start: 'top center' },
      })

      gsap.from(headlineRef.current, {
        opacity: 0,
        duration: 1.0,
        delay: 0.2,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: sectionRef.current, start: 'top center' },
      })

      stepsRef.current.forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          duration: 0.7,
          delay: i * 0.15,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: sectionRef.current, start: 'top center' },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-black min-h-screen py-28 md:py-36 px-8 md:px-20">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-20">
        My Near-term vision
      </h2>

      {/* メインヘッドライン */}
      <div className="text-center mb-24 md:mb-32">
        <p
          ref={subRef}
          className="text-white/40 text-xs tracking-[0.4em] mb-4"
        >
          技術力もマネジメントもカバーできる存在
        </p>
        <h3
          ref={headlineRef}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight"
        >
          プレイングPMになる
        </h3>
      </div>

      {/* ステップ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
        {steps.map((step, i) => (
          <div
            key={i}
            ref={el => stepsRef.current[i] = el}
            className="border-t border-white/20 pt-8"
          >
            <span className="block text-white/25 text-xs tracking-widest mb-4">
              {step.num}
            </span>
            <h4 className="text-white font-medium text-lg mb-3">
              {step.title}
            </h4>
            <p className="text-white/50 text-sm leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
