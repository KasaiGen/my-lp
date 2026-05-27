import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { src: '/mypjt_trend.png', label: 'Trend Feed' },
  { src: '/mypjt_modal.png', label: 'Modal UI' },
  { src: '/mypjt_feed.png', label: 'Feed Design' },
  { src: '/mypjt_all.png', label: 'Overview' },
]

export default function MyProject() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      const totalWidth = track.scrollWidth - track.parentElement.offsetWidth

      // 横スクロールアニメーション
      gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalWidth + 400}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })

      // タイトルフェードイン
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* 背景 */}
      <div className="absolute inset-0 z-0">
        <img src="/mypjt_background.png" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 h-screen flex flex-col justify-center px-8 md:px-20">
        {/* タイトル画像（中央配置） */}
        <div ref={titleRef} className="flex justify-center mb-12">
          <img src="/mypjt_title.png" alt="My Project" className="h-16 md:h-20 object-contain" />
        </div>

        {/* 横スクロールトラック */}
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-6 items-center"
            style={{ willChange: 'transform' }}
          >
            {projects.map((p, i) => (
              <div
                key={i}
                className="flex-shrink-0 relative group rounded-2xl overflow-hidden"
                style={{ width: '280px' }}
              >
                <img
                  src={p.src}
                  alt={p.label}
                  className="w-full object-contain rounded-2xl transition-transform duration-500 group-hover:scale-105"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 rounded-2xl">
                  <span className="text-white text-sm font-medium">{p.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* スクロールヒント */}
        <div className="flex justify-center mt-10 gap-2 items-center opacity-40">
          <div className="w-8 h-px bg-white" />
          <span className="text-xs tracking-widest text-white">SCROLL</span>
          <div className="w-8 h-px bg-white" />
        </div>
      </div>
    </section>
  )
}
