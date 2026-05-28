import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const images = [
  { src: '/mypjt_all.png',   label: 'Map View' },
  { src: '/mypjt_feed.png',  label: 'Feed' },
  { src: '/mypjt_modal.png', label: 'Detail' },
  { src: '/mypjt_title.png', label: 'Top' },
  { src: '/mypjt_trend.png', label: 'Trend' },
]

const bullets = [
  '現在地の混雑状況 (場所 / 混雑レベル / コメント) を投稿',
  '直近30分間で投稿が多いスポットを表示',
  'お気に入りの場所を保存していつでも混雑状況を確認可能',
]

// 3セット複製：ループの錯覚に必要なバッファ
const loopImages = [...images, ...images, ...images]

function MyProjectMobile() {
  return (
    <section className="relative py-20 px-6">
      <div className="absolute inset-0 z-0">
        <img src="/mypjt_background.png" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
      </div>
      <div className="relative z-10">
        <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-6">My Project</p>
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-4xl font-bold text-white tracking-tight leading-none">Crowd Map</h2>
          <img src="/footprints.svg" alt="" className="w-10 h-10 flex-shrink-0"
            style={{ filter: 'invert(1) brightness(2)' }} />
        </div>
        <ul className="space-y-3 mb-6">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3 text-white/70 text-sm leading-relaxed">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />
              {b}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 mb-10">
          {['Next.js', 'LIFF', 'Google Maps Platform'].map((tech, i) => (
            <span key={i} className="px-3 py-1 text-xs tracking-wider text-white/55 border border-white/20 rounded-full">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-5">
          {images.map((img, i) => (
            <div key={i} className="rounded-2xl overflow-hidden">
              <img src={img.src} alt={img.label} className="w-full object-contain rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MyProjectDesktop() {
  const outerRef = useRef(null)
  const trackRef = useRef(null)
  const imgRefs  = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const setup = () => {
        const vh    = window.innerHeight
        const track = trackRef.current
        const imgs  = imgRefs.current.filter(Boolean)
        if (!track || imgs.length === 0) return

        const tops    = imgs.map(el => el.offsetTop)
        const heights = imgs.map(el => el.offsetHeight)

        // セット1（index 5〜9）をスクロール範囲の起点にする
        const oneSetH = tops[5] - tops[0]
        const centerY = vh / 2
        const initY   = centerY - heights[5] / 2 - tops[5]

        // ピン留め中に画像を1周させるだけのスクロール量を確保
        outerRef.current.style.height = `${vh + oneSetH}px`

        gsap.set(track, { xPercent: -50, y: initY })

        const updateScales = (y) => {
          imgs.forEach((el, i) => {
            const imgCY = tops[i] + y + heights[i] / 2
            const dist  = Math.abs(imgCY - centerY) / (heights[i] / 2 + 40)
            gsap.set(el, { scale: 1.05 - Math.min(dist, 1) * 0.27 })
          })
        }

        updateScales(initY)
        track.style.visibility = 'visible'

        // pin: true は使わず CSS sticky に任せる（History と同パターン）
        // pin: true だと GSAP がスペーサーを二重挿入して黒画面になる
        ScrollTrigger.create({
          trigger: outerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          onUpdate(self) {
            const y = initY - self.progress * oneSetH
            gsap.set(track, { y })
            updateScales(y)
          },
        })
      }

      const imgs   = imgRefs.current.filter(Boolean)
      const imgEls = imgs.map(el => el.querySelector('img'))
      const loads  = imgEls.map(img =>
        !img || img.complete ? Promise.resolve() :
        new Promise(res => { img.onload = res; img.onerror = res })
      )
      Promise.all(loads).then(() => requestAnimationFrame(setup))
    }, outerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={outerRef} style={{ height: '100vh', position: 'relative' }}>
      {/* 上端：Historyの黒からMyProjectへ溶け込む */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '160px',
        background: 'linear-gradient(to bottom, #000, transparent)', zIndex: 200, pointerEvents: 'none' }} />
      {/* 下端：MyProjectからMyCreeds（黒）へ溶け込む */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '160px',
        background: 'linear-gradient(to top, #000, transparent)', zIndex: 200, pointerEvents: 'none' }} />
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* 背景 */}
        <div className="absolute inset-0">
          <img src="/mypjt_background.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/75" />
        </div>

        <div className="relative z-10 h-full flex flex-col px-8 lg:px-16 pt-14 pb-10">
          <h2 className="text-5xl font-bold text-white shrink-0 mb-6">My Project</h2>

          <div className="flex-1 flex min-h-0">
            {/* 左：説明 */}
            <div className="flex flex-col justify-center w-[48%] pr-12">
              <div className="flex items-center gap-5 mb-9">
                <span className="text-5xl font-bold text-white tracking-tight leading-none">Crowd Map</span>
                <img src="/footprints.svg" alt="" className="w-14 h-14 flex-shrink-0"
                  style={{ filter: 'invert(1) brightness(2)' }} />
              </div>
              <ul className="space-y-4 mb-8">
                {bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/75 text-sm leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {['Next.js', 'LIFF', 'Google Maps Platform'].map((tech, i) => (
                  <span key={i} className="px-3 py-1 text-xs tracking-wider text-white/55 border border-white/20 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          {/* 右：スクロール連動ループ画像エリア */}
          <div className="flex-1 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-40 z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-40 z-10 pointer-events-none" />
            <div ref={trackRef} className="absolute flex flex-col items-center"
              style={{ gap: '36px', left: '50%', top: 0, willChange: 'transform', visibility: 'hidden' }}>
              {loopImages.map((img, i) => (
                <div key={i} ref={el => imgRefs.current[i] = el}
                  className="flex-shrink-0 rounded-2xl overflow-hidden"
                  style={{ width: 'clamp(260px, 38vw, 560px)' }}>
                  <img src={img.src} alt={img.label} className="w-full h-auto object-contain block" />
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MyProject() {
  return (
    <>
      <div className="md:hidden"><MyProjectMobile /></div>
      <div className="hidden md:block"><MyProjectDesktop /></div>
    </>
  )
}
