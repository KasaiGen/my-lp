import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const milestones = [
  {
    age: '~5歳',
    photo: '/first.jpeg',
    bg: '/bg_first.jpeg',
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

// 写真スタックの最終位置（微妙なオフセットで積み重なり感）
const stackedPos = [
  { rotation: -4, x: -4, y: 0 },
  { rotation:  3, x:  6, y: -5 },
  { rotation: -2, x: -5, y: -10 },
  { rotation:  4, x:  4, y: -14 },
]

// 各ドットのY位置（右パネル上端から%）
const DOT_TOPS = [16, 38, 61, 84]

export default function History() {
  const outerRef      = useRef(null)
  const bgRefs        = useRef([])
  const photoRefs     = useRef([])
  const dotRefs       = useRef([])
  const branchRefs    = useRef([])
  const textRefs      = useRef([])
  const lineSegRefs   = useRef([]) // ドット間3本のライン

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── 初期状態の設定 ──
      gsap.set(bgRefs.current[0], { opacity: 1 })
      gsap.set(bgRefs.current.slice(1), { opacity: 0 })

      photoRefs.current.forEach((el, i) => {
        gsap.set(el, {
          opacity: 0,
          y: 480,
          x: stackedPos[i].x,
          rotation: stackedPos[i].rotation,
        })
      })

      dotRefs.current.forEach(el =>
        gsap.set(el, { scale: 0, opacity: 0 })
      )
      branchRefs.current.forEach(el =>
        gsap.set(el, { scaleX: 0, transformOrigin: 'left center', opacity: 0 })
      )
      textRefs.current.forEach(el =>
        gsap.set(el, { opacity: 0, x: 14 })
      )
      lineSegRefs.current.forEach(el =>
        gsap.set(el, { scaleY: 0, transformOrigin: 'top center' })
      )

      // ── スクロール連動タイムライン ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      })

      // =====================
      // MILESTONE 0 (〜5歳)
      // =====================
      // 写真0 が下からスライドアップ
      tl.to(photoRefs.current[0], {
        opacity: 1, y: stackedPos[0].y, duration: 0.08, ease: 'power3.out',
      }, 0)
      // ドット0 出現
      tl.to(dotRefs.current[0], { scale: 1, opacity: 1, duration: 0.04, ease: 'back.out(2)' }, 0.06)
      // ブランチ＋テキスト0
      tl.to(branchRefs.current[0], { scaleX: 1, opacity: 1, duration: 0.03 }, 0.09)
      tl.to(textRefs.current[0],   { opacity: 1, x: 0,      duration: 0.03 }, 0.10)

      // =====================
      // LINE 0: dot0 → dot1
      // =====================
      tl.to(lineSegRefs.current[0], { scaleY: 1, duration: 0.18, ease: 'none' }, 0.16)
      // 背景クロスフェード → bg1
      tl.to(bgRefs.current[0], { opacity: 0, duration: 0.07 }, 0.24)
      tl.to(bgRefs.current[1], { opacity: 1, duration: 0.07 }, 0.24)
      // 写真1 スライドアップ（ラインが伸びる途中で）
      tl.to(photoRefs.current[1], {
        opacity: 1, y: stackedPos[1].y, duration: 0.09, ease: 'power3.out',
      }, 0.26)

      // =====================
      // MILESTONE 1 (〜10歳)
      // =====================
      // テキスト0 フェードアウト
      tl.to(textRefs.current[0],   { opacity: 0, duration: 0.03 }, 0.35)
      tl.to(branchRefs.current[0], { opacity: 0, duration: 0.03 }, 0.35)
      // ドット1 出現
      tl.to(dotRefs.current[1], { scale: 1, opacity: 1, duration: 0.04, ease: 'back.out(2)' }, 0.35)
      // ブランチ＋テキスト1
      tl.to(branchRefs.current[1], { scaleX: 1, opacity: 1, duration: 0.03 }, 0.38)
      tl.to(textRefs.current[1],   { opacity: 1, x: 0,      duration: 0.03 }, 0.39)

      // =====================
      // LINE 1: dot1 → dot2
      // =====================
      tl.to(lineSegRefs.current[1], { scaleY: 1, duration: 0.18, ease: 'none' }, 0.45)
      // 背景クロスフェード → bg2
      tl.to(bgRefs.current[1], { opacity: 0, duration: 0.07 }, 0.53)
      tl.to(bgRefs.current[2], { opacity: 1, duration: 0.07 }, 0.53)
      // 写真2 スライドアップ
      tl.to(photoRefs.current[2], {
        opacity: 1, y: stackedPos[2].y, duration: 0.09, ease: 'power3.out',
      }, 0.55)

      // =====================
      // MILESTONE 2 (〜18歳)
      // =====================
      tl.to(textRefs.current[1],   { opacity: 0, duration: 0.03 }, 0.64)
      tl.to(branchRefs.current[1], { opacity: 0, duration: 0.03 }, 0.64)
      tl.to(dotRefs.current[2], { scale: 1, opacity: 1, duration: 0.04, ease: 'back.out(2)' }, 0.64)
      tl.to(branchRefs.current[2], { scaleX: 1, opacity: 1, duration: 0.03 }, 0.67)
      tl.to(textRefs.current[2],   { opacity: 1, x: 0,      duration: 0.03 }, 0.68)

      // =====================
      // LINE 2: dot2 → dot3
      // =====================
      tl.to(lineSegRefs.current[2], { scaleY: 1, duration: 0.16, ease: 'none' }, 0.73)
      // 背景クロスフェード → bg3
      tl.to(bgRefs.current[2], { opacity: 0, duration: 0.07 }, 0.80)
      tl.to(bgRefs.current[3], { opacity: 1, duration: 0.07 }, 0.80)
      // 写真3 スライドアップ
      tl.to(photoRefs.current[3], {
        opacity: 1, y: stackedPos[3].y, duration: 0.09, ease: 'power3.out',
      }, 0.82)

      // =====================
      // MILESTONE 3 (〜現在)
      // =====================
      tl.to(textRefs.current[2],   { opacity: 0, duration: 0.03 }, 0.90)
      tl.to(branchRefs.current[2], { opacity: 0, duration: 0.03 }, 0.90)
      tl.to(dotRefs.current[3], { scale: 1, opacity: 1, duration: 0.04, ease: 'back.out(2)' }, 0.90)
      tl.to(branchRefs.current[3], { scaleX: 1, opacity: 1, duration: 0.03 }, 0.93)
      tl.to(textRefs.current[3],   { opacity: 1, x: 0,      duration: 0.03 }, 0.94)
      // ここで終了（t=0.97〜1.0 はホールド → スクロール解除）

    }, outerRef)

    return () => ctx.revert()
  }, [])

  return (
    // outerRef: スクロール距離を稼ぐ大きなコンテナ（600vh）
    <div ref={outerRef} style={{ height: '600vh' }}>

      {/* CSS sticky で画面に固定 */}
      <div className="sticky top-0 h-screen overflow-hidden bg-black">

        {/* 背景画像 */}
        {milestones.map((m, i) => (
          <img
            key={i}
            ref={el => bgRefs.current[i] = el}
            src={m.bg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        ))}
        <div className="absolute inset-0 bg-black/65 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 z-10" />

        {/* コンテンツ */}
        <div className="relative z-20 h-full flex flex-col px-8 md:px-16 pt-14 pb-10">

          {/* タイトル */}
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white shrink-0 mb-6">
            History
          </h2>

          {/* メインエリア：写真(左半分) ｜ ライン+テキスト(右半分) */}
          <div className="flex-1 flex min-h-0">

            {/* 左：写真スタック */}
            <div className="relative flex items-center justify-center overflow-hidden" style={{ width: '50%' }}>
              {milestones.map((m, i) => (
                <img
                  key={i}
                  ref={el => photoRefs.current[i] = el}
                  src={m.photo}
                  alt={m.age}
                  className="absolute rounded-sm shadow-2xl"
                  style={{
                    width: 'clamp(220px, 38vw, 440px)',
                    aspectRatio: '4/3',
                    objectFit: 'cover',
                    zIndex: i + 1,
                  }}
                />
              ))}
            </div>

            {/* 右：ライン＋ドット＋ブランチ＋テキスト（一体化） */}
            <div className="relative flex-1 pl-12">

              {/* 縦ライン（左端に固定） */}
              <div className="absolute top-0 left-0 h-full" style={{ width: '2px' }}>
                {milestones.slice(0, -1).map((_, i) => {
                  const top    = DOT_TOPS[i]
                  const height = DOT_TOPS[i + 1] - DOT_TOPS[i]
                  return (
                    <div
                      key={i}
                      ref={el => lineSegRefs.current[i] = el}
                      className="absolute left-0 w-full bg-white/90"
                      style={{ top: `${top}%`, height: `${height}%` }}
                    />
                  )
                })}
              </div>

              {/* 各マイルストーン（ドット＋ブランチ＋テキスト） */}
              {milestones.map((m, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{ top: `${DOT_TOPS[i]}%`, left: 0, transform: 'translateY(-50%)' }}
                >
                  {/* ドット（ライン上、中央揃え） */}
                  <div
                    ref={el => dotRefs.current[i] = el}
                    className="absolute w-4 h-4 rounded-full bg-white shadow-lg z-10"
                    style={{ left: '-7px', top: '50%', transform: 'translateY(-50%)' }}
                  />

                  {/* ブランチ＋テキストの横並び */}
                  <div className="flex items-center">
                    {/* ブランチ（ライン直後から伸びる） */}
                    <div
                      ref={el => branchRefs.current[i] = el}
                      className="shrink-0"
                      style={{
                        width: '48px',
                        height: '1px',
                        background: 'rgba(255,255,255,0.55)',
                        marginLeft: '2px',
                      }}
                    />
                    {/* テキスト */}
                    <div
                      ref={el => textRefs.current[i] = el}
                      className="pl-5"
                    >
                      <span className="block font-playfair text-4xl md:text-5xl font-bold text-white leading-none mb-2">
                        {m.age}
                      </span>
                      <span className="block text-white/80 font-medium text-base mb-2 font-noto">
                        {m.title}
                      </span>
                      <span className="block text-white/55 text-sm leading-relaxed font-noto max-w-[260px]">
                        {m.desc}
                      </span>
                    </div>
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
