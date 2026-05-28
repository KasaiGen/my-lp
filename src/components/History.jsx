import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const milestones = [
  {
    age: '~5歳',
    photo: '/mychildview.jpeg',
    bg: '/child.jpeg',
    title: '仮面ライダーに夢中',
    desc: '仮面ライダー、ウルトラマンをよく観ていて、剣や棒が好きでした。姉と喧嘩をし、そのときにつけられた顔の傷が今も残っています。（喧嘩理由：自分が可愛こぶっている姿に姉が腹を立てたため）',
  },
  {
    age: '~10歳',
    photo: '/second.jpeg',
    bg: '/bg_second.jpg',
    title: 'ピアノとの出会い',
    desc: '小学4年生からピアノを習い始めました。当初はイヤイヤ始めましたが、今となっては趣味になっているほど好きになっています。笑',
  },
  {
    age: '~18歳',
    photo: '/third.jpeg',
    bg: '/bg_third.jpeg',
    title: '野球に3年間を費やす',
    desc: '高校3年間を野球に費やしました。ボールを触っている時間よりも怒られている時間の方が長かったと思います。',
  },
  {
    age: '~現在',
    photo: '/last.jpg',
    bg: '/bg_now2.jpg',
    title: 'バレットグループへ',
    desc: '専門学校サンテクノカレッジを卒業し、バレットグループへ。内定者インターンを始めた時とモチベーションは変わりません。',
  },
]

const stackedPos = [
  { rotation: -4, x: -4, y: 0 },
  { rotation:  3, x:  6, y: -5 },
  { rotation: -2, x: -5, y: -10 },
  { rotation:  4, x:  4, y: -14 },
]

const DOT_TOPS = [16, 38, 61, 84]

// ── モバイル用：写真フルスクリーンスタック ──
function HistoryMobile() {
  const outerRef   = useRef(null)
  const photoRefs  = useRef([])
  const captionRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(photoRefs.current[0], { y: 0 })
      photoRefs.current.slice(1).forEach(el => gsap.set(el, { y: '100%' }))
      captionRefs.current.forEach(el => gsap.set(el, { opacity: 0 }))

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      })

      tl.to(captionRefs.current[0], { opacity: 1, duration: 0.06 }, 0)

      const pts = [0.08, 0.38, 0.68]
      pts.forEach((start, i) => {
        tl.to(photoRefs.current[i + 1], { y: 0, duration: 0.22, ease: 'power2.out' }, start)
        tl.to(captionRefs.current[i],     { opacity: 0, duration: 0.06 }, start + 0.10)
        tl.to(captionRefs.current[i + 1], { opacity: 1, duration: 0.06 }, start + 0.18)
      })
    }, outerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={outerRef} style={{ height: '500vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        {/* 上部グラデーション＋タイトル */}
        <div className="absolute top-0 left-0 right-0 z-50 px-6 pt-10 pb-16 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, transparent 100%)' }}>
          <h2 className="text-2xl font-bold text-white">History</h2>
        </div>

        {milestones.map((m, i) => (
          <div
            key={i}
            ref={el => photoRefs.current[i] = el}
            className="absolute inset-0"
            style={{ zIndex: i + 1 }}
          >
            <img src={m.photo} alt="" className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div
              ref={el => captionRefs.current[i] = el}
              className="absolute bottom-0 left-0 right-0 px-6 pb-14"
            >
              <span className="block text-5xl font-bold text-white leading-none mb-2">{m.age}</span>
              <span className="block text-white/75 font-medium text-sm mb-3">{m.title}</span>
              <span className="block text-white/50 text-xs leading-relaxed">{m.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── デスクトップ用アニメーションレイアウト ──
function HistoryDesktop() {
  const outerRef    = useRef(null)
  const bgRefs      = useRef([])
  const photoRefs   = useRef([])
  const dotRefs     = useRef([])
  const branchRefs  = useRef([])
  const textRefs    = useRef([])
  const lineSegRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(bgRefs.current[0], { opacity: 1 })
      gsap.set(bgRefs.current.slice(1), { opacity: 0 })

      photoRefs.current.forEach((el, i) => {
        gsap.set(el, { opacity: 0, y: 480, x: stackedPos[i].x, rotation: stackedPos[i].rotation })
      })
      dotRefs.current.forEach(el => gsap.set(el, { scale: 0, opacity: 0 }))
      branchRefs.current.forEach(el => gsap.set(el, { scaleX: 0, transformOrigin: 'left center', opacity: 0 }))
      textRefs.current.forEach(el => gsap.set(el, { opacity: 0, x: -14 }))
      lineSegRefs.current.forEach(el => gsap.set(el, { scaleY: 0, transformOrigin: 'top center' }))

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      })

      tl.to(photoRefs.current[0], { opacity: 1, y: stackedPos[0].y, duration: 0.08, ease: 'power3.out' }, 0)
      tl.to(dotRefs.current[0], { scale: 1, opacity: 1, duration: 0.04, ease: 'back.out(2)' }, 0.06)
      tl.to(branchRefs.current[0], { scaleX: 1, opacity: 1, duration: 0.03 }, 0.09)
      tl.to(textRefs.current[0], { opacity: 1, x: 0, duration: 0.03 }, 0.10)

      tl.to(lineSegRefs.current[0], { scaleY: 1, duration: 0.18, ease: 'none' }, 0.16)
      tl.to(bgRefs.current[0], { opacity: 0, duration: 0.07 }, 0.24)
      tl.to(bgRefs.current[1], { opacity: 1, duration: 0.07 }, 0.24)
      tl.to(photoRefs.current[1], { opacity: 1, y: stackedPos[1].y, duration: 0.09, ease: 'power3.out' }, 0.26)

      tl.to(textRefs.current[0], { opacity: 0, duration: 0.03 }, 0.35)
      tl.to(branchRefs.current[0], { opacity: 0, duration: 0.03 }, 0.35)
      tl.to(dotRefs.current[1], { scale: 1, opacity: 1, duration: 0.04, ease: 'back.out(2)' }, 0.35)
      tl.to(branchRefs.current[1], { scaleX: 1, opacity: 1, duration: 0.03 }, 0.38)
      tl.to(textRefs.current[1], { opacity: 1, x: 0, duration: 0.03 }, 0.39)

      tl.to(lineSegRefs.current[1], { scaleY: 1, duration: 0.18, ease: 'none' }, 0.45)
      tl.to(bgRefs.current[1], { opacity: 0, duration: 0.07 }, 0.53)
      tl.to(bgRefs.current[2], { opacity: 1, duration: 0.07 }, 0.53)
      tl.to(photoRefs.current[2], { opacity: 1, y: stackedPos[2].y, duration: 0.09, ease: 'power3.out' }, 0.55)

      tl.to(textRefs.current[1], { opacity: 0, duration: 0.03 }, 0.64)
      tl.to(branchRefs.current[1], { opacity: 0, duration: 0.03 }, 0.64)
      tl.to(dotRefs.current[2], { scale: 1, opacity: 1, duration: 0.04, ease: 'back.out(2)' }, 0.64)
      tl.to(branchRefs.current[2], { scaleX: 1, opacity: 1, duration: 0.03 }, 0.67)
      tl.to(textRefs.current[2], { opacity: 1, x: 0, duration: 0.03 }, 0.68)

      tl.to(lineSegRefs.current[2], { scaleY: 1, duration: 0.16, ease: 'none' }, 0.73)
      tl.to(bgRefs.current[2], { opacity: 0, duration: 0.07 }, 0.80)
      tl.to(bgRefs.current[3], { opacity: 1, duration: 0.07 }, 0.80)
      tl.to(photoRefs.current[3], { opacity: 1, y: stackedPos[3].y, duration: 0.09, ease: 'power3.out' }, 0.82)

      tl.to(textRefs.current[2], { opacity: 0, duration: 0.03 }, 0.90)
      tl.to(branchRefs.current[2], { opacity: 0, duration: 0.03 }, 0.90)
      tl.to(dotRefs.current[3], { scale: 1, opacity: 1, duration: 0.04, ease: 'back.out(2)' }, 0.90)
      tl.to(branchRefs.current[3], { scaleX: 1, opacity: 1, duration: 0.03 }, 0.93)
      tl.to(textRefs.current[3], { opacity: 1, x: 0, duration: 0.03 }, 0.94)
    }, outerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={outerRef} style={{ height: '600vh', position: 'relative' }}>
      {/* 上端：直前セクション（黒）からHistoryへ溶け込む */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '160px',
        background: 'linear-gradient(to bottom, #000, transparent)', zIndex: 200, pointerEvents: 'none' }} />
      {/* 下端：HistoryからMyProjectへ溶け込む */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '160px',
        background: 'linear-gradient(to top, #000, transparent)', zIndex: 200, pointerEvents: 'none' }} />
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        {milestones.map((m, i) => (
          <img key={i} ref={el => bgRefs.current[i] = el} src={m.bg} alt=""
            className="absolute inset-0 w-full h-full object-cover" />
        ))}
        <div className="absolute inset-0 bg-black/65 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 z-10" />

        <div className="relative z-20 h-full flex flex-col px-16 pt-14 pb-10">
          <h2 className="text-5xl font-bold text-white shrink-0 mb-6">History</h2>

          <div className="flex-1 flex min-h-0">
            {/* 左：写真スタック */}
            <div className="relative flex items-center justify-center overflow-hidden" style={{ width: '46%' }}>
              {milestones.map((m, i) => (
                <img key={i} ref={el => photoRefs.current[i] = el} src={m.photo} alt={m.age}
                  className="absolute rounded-sm shadow-2xl"
                  style={{ width: 'clamp(200px, 34vw, 420px)', aspectRatio: '4/3', objectFit: 'cover', zIndex: i + 1 }} />
              ))}
            </div>

            {/* 右：テキスト＋ライン */}
            <div className="relative flex-1">
              {/* 縦ライン：右カラムの63%地点に固定 */}
              <div className="absolute top-0 h-full" style={{ left: 'calc(63% - 1px)', width: '2px' }}>
                {milestones.slice(0, -1).map((_, i) => {
                  const top = DOT_TOPS[i]
                  const height = DOT_TOPS[i + 1] - DOT_TOPS[i]
                  return (
                    <div key={i} ref={el => lineSegRefs.current[i] = el}
                      className="absolute left-0 w-full bg-white/90"
                      style={{ top: `${top}%`, height: `${height}%` }} />
                  )
                })}
              </div>

              {milestones.map((m, i) => (
                <div key={i} className="absolute"
                  style={{ top: `${DOT_TOPS[i]}%`, left: 0, width: '63%', transform: 'translateY(-50%)' }}>
                  {/* ドット：コンテナ右端 = 縦ラインの位置 */}
                  <div ref={el => dotRefs.current[i] = el}
                    className="absolute w-4 h-4 rounded-full bg-white shadow-lg z-10"
                    style={{ right: '-8px', top: '50%', transform: 'translateY(-50%)' }} />
                  {/* テキスト＋枝：枝が残りスペースを自動で埋める */}
                  <div className="flex items-center pr-2">
                    <div ref={el => textRefs.current[i] = el} className="pl-2 text-left shrink-0">
                      <span className="block text-6xl font-bold text-white leading-none mb-3">{m.age}</span>
                      <span className="block text-white/80 font-medium text-base mb-3">{m.title}</span>
                      <span className="block text-white/55 text-sm leading-relaxed max-w-[340px]">{m.desc}</span>
                    </div>
                    <div ref={el => branchRefs.current[i] = el}
                      style={{ flex: 1, minWidth: '16px', height: '1px', background: 'rgba(255,255,255,0.5)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function History() {
  return (
    <>
      <div className="md:hidden"><HistoryMobile /></div>
      <div className="hidden md:block"><HistoryDesktop /></div>
    </>
  )
}
