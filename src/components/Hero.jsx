import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const base = import.meta.env.BASE_URL

const bgImages = [
  `${base}bg_1.jpg`, `${base}bg_2.jpg`, `${base}bg_4.jpg`, `${base}bg_5.jpg`,
  `${base}bg_6.jpg`, `${base}bg_7.jpg`, `${base}bg_8.jpg`, `${base}bg_9.jpg`,
  `${base}bg_10.jpg`, `${base}bg_11.jpg`,
]

export default function Hero() {
  const containerRef = useRef(null)
  const imgRefs = useRef([])
  const nameRef = useRef(null)
  const subtitleRef = useRef(null)

  useEffect(() => {
    const imgs = imgRefs.current

    // 全画像を初期化
    gsap.set(imgs, { opacity: 0 })

    // 画像をループで高速切り替え
    const tl = gsap.timeline({ repeat: -1 })
    bgImages.forEach((_, i) => {
      tl.set(imgs[i], { opacity: 1 })
      tl.to(imgs[i], { opacity: 0, duration: 0.06 }, '+=0.09')
    })

    // 名前テキストのディゾルブイン（1回のみ）
    gsap.set(nameRef.current, { opacity: 0, y: 20 })
    gsap.set(subtitleRef.current, { opacity: 0, y: 15 })
    gsap.to(nameRef.current, { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out', delay: 1 })
    gsap.to(subtitleRef.current, { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out', delay: 1.3 })

    return () => { tl.kill() }
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center"
    >
      {/* 背景画像群 */}
      <div className="absolute inset-0">
        {bgImages.map((src, i) => (
          <img
            key={src}
            ref={el => imgRefs.current[i] = el}
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0 }}
          />
        ))}
        {/* 薄い黒オーバーレイ */}
        <div className="absolute inset-0 bg-black/70 z-10" />
        {/* 上下グラデーション */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black z-10" />
      </div>

      {/* テキスト */}
      <div className="relative z-20 text-center">
        <h1
          ref={nameRef}
          className="text-4xl sm:text-6xl md:text-8xl font-bold text-white tracking-widest"
          style={{ textShadow: '0 2px 40px rgba(0,0,0,0.8)' }}
        >
          Kasai Genta
        </h1>
      </div>

      {/* スクロール誘導 */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-60">
        <span className="text-xs tracking-[0.3em] text-white/50">SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
