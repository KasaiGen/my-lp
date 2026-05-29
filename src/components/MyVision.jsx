import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    title: '技術で信頼を作る',
    desc: '確かな実装とアウトプットでクライアントからの信頼を積み上げ、長期的な関係の土台を作る。',
  },
  {
    num: '02',
    title: '課題を引き出す',
    desc: '納品して終わりではなく、対話を重ねてクライアントが抱える次の課題を発見し、提案につなげる。',
  },
  {
    num: '03',
    title: '案件を育てる',
    desc: '小さな入り口から、大きな関係へ。\n技術力とコミュニケーションの両輪で案件そのものを成長させられるエンジニアになる。',
  },
]

export default function MyVision() {
  const sectionRef = useRef(null)
  const h2Ref = useRef(null)
  const subRef = useRef(null)
  const headlineRef = useRef(null)
  const stepsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const startVal = window.innerWidth < 768 ? 'top center' : 'top 80%'
      const trigger = { trigger: sectionRef.current, start: startVal }

      gsap.from(h2Ref.current, {
        opacity: 0, y: 16, duration: 0.8, delay: 0, ease: 'power2.out', scrollTrigger: trigger,
      })

      gsap.from(subRef.current, {
        opacity: 0, duration: 0.7, delay: 0.6, ease: 'power2.inOut', scrollTrigger: trigger,
      })

      gsap.from(headlineRef.current, {
        opacity: 0, y: 16, duration: 0.9, delay: 0.75, ease: 'power2.out', scrollTrigger: trigger,
      })

      stepsRef.current.forEach((el, i) => {
        gsap.from(el, {
          opacity: 0, y: 20, duration: 0.7, delay: 1.5 + i * 0.35, ease: 'power2.out', scrollTrigger: trigger,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-black min-h-screen py-28 md:py-36 px-8 md:px-20">
      <h2 ref={h2Ref} className="text-4xl md:text-5xl font-bold text-white mb-20">
        My Near-term vision
      </h2>

      {/* メインヘッドライン */}
      <div className="text-center mb-24 md:mb-32">
        <p
          ref={subRef}
          className="text-white/40 text-xs tracking-[0.4em] mb-4"
        >
          技術力とコミュニケーションで案件を成長させられる存在
        </p>
        <h3
          ref={headlineRef}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight"
        >
          エンジニアリングで<br className="hidden md:block" />案件を伸ばす
        </h3>
      </div>

      {/* ステップ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
        {steps.map((step, i) => (
          <div
            key={i}
            ref={el => stepsRef.current[i] = el}
            className=""
          >
            <span className="block text-5xl md:text-6xl font-bold text-white/20 leading-none mb-4 tracking-tight">
              {step.num}
            </span>
            <div className="border-t border-white/20 mb-6" />
            <h4 className="text-white font-medium text-lg mb-3">
              {step.title}
            </h4>
            <p className="text-white/50 text-sm leading-relaxed whitespace-pre-line">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
