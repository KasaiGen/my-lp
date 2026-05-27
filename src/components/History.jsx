import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const milestones = [
  {
    age: '〜5歳',
    photo: '/first.jpeg',
    bg: '/bg_first.jpeg',
    title: '仮面ライダーに夢中',
    desc: '仮面ライダー、ウルトラマンをよく観ていて、\n剣や棒が好きでした。\n姉と喧嘩をし、そのときにつけられた\n顔の傷が今も残っています。\n（喧嘩理由：自分が可愛こぶっている姿に\n　姉が腹を立てたため）',
  },
  {
    age: '〜10歳',
    photo: '/second.jpeg',
    bg: '/second.jpeg',
    title: 'ピアノとの出会い',
    desc: '小学4年生からピアノを習い始めました。\n当初はイヤイヤ始めましたが、\n今となっては趣味になっているほど\n好きになっています。笑',
  },
  {
    age: '〜18歳',
    photo: '/third.jpeg',
    bg: '/bg_third.jpeg',
    title: '野球に3年間を費やす',
    desc: '高校3年間を野球に費やしました。\nボールを触っている時間よりも\n怒られている時間の方が\n長かったと思います。',
  },
  {
    age: '〜現在',
    photo: '/last.jpg',
    bg: '/bg_now2.jpg',
    title: 'バレットグループへ',
    desc: '専門学校サンテクノカレッジを卒業し、\nバレットグループへ。\n内定者インターンを始めた時と\nモチベーションは変わりません。',
  },
]

// スタック時の各写真の最終位置（重なり感を出す微妙なオフセット）
const stackedPos = [
  { rotation: -4, x: -4, y: 0 },
  { rotation:  3, x:  6, y: -5 },
  { rotation: -2, x: -5, y: -10 },
  { rotation:  4, x:  4, y: -14 },
]

const DOT_TOP_PCT = 45  // ドットの縦位置（画面上から%）
const N = milestones.length

export default function History() {
  const outerRefs    = useRef([])
  const photoRefs    = useRef(Array.from({ length: N }, () => Array(N).fill(null)))
  const bgRefs       = useRef(Array.from({ length: N }, () => Array(N).fill(null)))
  const dotRefs      = useRef([])
  const branchRefs   = useRef([])
  const textRefs     = useRef([])
  const topLineRefs  = useRef([])
  const botLineRefs  = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      milestones.forEach((m, i) => {

        // ── 背景初期化 ──
        milestones.forEach((_, bi) => {
          const el = bgRefs.current[i][bi]
          if (el) gsap.set(el, { opacity: bi === i ? 1 : 0 })
        })

        // ── 写真初期化 ──
        milestones.forEach((_, pi) => {
          const el = photoRefs.current[i][pi]
          if (!el) return
          if (pi < i) {
            // すでにスタックに積まれた写真（静的表示）
            gsap.set(el, { opacity: 1, ...stackedPos[pi] })
          } else if (pi === i) {
            // このセクションで登場する写真（下に隠れている）
            gsap.set(el, { opacity: 0, y: 500, x: stackedPos[pi].x, rotation: stackedPos[pi].rotation })
          } else {
            // まだ登場しない写真
            gsap.set(el, { opacity: 0, y: 500 })
          }
        })

        // ── タイムライン要素初期化 ──
        gsap.set(dotRefs.current[i],    { scale: 0, opacity: 0 })
        gsap.set(branchRefs.current[i], { scaleX: 0, transformOrigin: 'right center', opacity: 0 })
        gsap.set(textRefs.current[i],   { opacity: 0, x: 15 })
        if (i > 0 && topLineRefs.current[i])
          gsap.set(topLineRefs.current[i], { scaleY: 0, transformOrigin: 'top center' })
        if (i < N - 1 && botLineRefs.current[i])
          gsap.set(botLineRefs.current[i], { scaleY: 0, transformOrigin: 'top center' })

        // ── ScrollTrigger タイムライン ──
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: outerRefs.current[i],
            start: 'top top',
            end: '+=100%',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        })

        // 写真が下からスライドアップ
        tl.to(photoRefs.current[i][i], {
          opacity: 1,
          y: stackedPos[i].y,
          duration: 0.28,
          ease: 'power3.out',
        }, 0)

        // 上部ライン（セクション2以降：前セクションから引き継ぐ）
        if (i > 0) {
          tl.to(topLineRefs.current[i], { scaleY: 1, duration: 0.12 }, 0.05)
        }

        // ドット出現
        tl.to(dotRefs.current[i], {
          scale: 1, opacity: 1,
          duration: 0.1,
          ease: 'back.out(2.5)',
        }, i === 0 ? 0.26 : 0.16)

        // ブランチ＋テキスト
        tl.to(branchRefs.current[i], { scaleX: 1, opacity: 1, duration: 0.08 }, '<+0.04')
        tl.to(textRefs.current[i],   { opacity: 1, x: 0,      duration: 0.08 }, '<+0.03')

        // 下部ラインがスクロールにつれて伸びる（最後のセクション以外）
        if (i < N - 1) {
          tl.to(botLineRefs.current[i], {
            scaleY: 1,
            duration: 0.6,
            ease: 'none',
          }, 0.4)
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      {milestones.map((m, i) => (
        <div
          key={i}
          ref={el => outerRefs.current[i] = el}
          style={{ height: '200vh' }}
        >
          <div className="h-screen overflow-hidden relative bg-black">

            {/* 背景画像 */}
            {milestones.map((bm, bi) => (
              <img
                key={bi}
                ref={el => { bgRefs.current[i][bi] = el }}
                src={bm.bg}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            ))}
            <div className="absolute inset-0 bg-black/65 z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 z-10" />

            {/* コンテンツ */}
            <div className="relative z-20 h-full flex px-8 md:px-20 pt-14 pb-10">

              {/* セクションタイトル（最初のセクションのみ） */}
              {i === 0 && (
                <h2 className="absolute top-14 left-8 md:left-20 font-playfair text-4xl md:text-5xl font-bold text-white z-30">
                  History
                </h2>
              )}

              {/* 左：写真スタック */}
              <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                {milestones.map((pm, pi) => (
                  <img
                    key={pi}
                    ref={el => { photoRefs.current[i][pi] = el }}
                    src={pm.photo}
                    alt={pm.age}
                    className="absolute rounded-sm shadow-2xl"
                    style={{
                      width: 'clamp(220px, 36vw, 400px)',
                      aspectRatio: '4/3',
                      objectFit: 'cover',
                      zIndex: pi + 1,
                    }}
                  />
                ))}
              </div>

              {/* 右：タイムライン */}
              <div
                className="relative shrink-0"
                style={{ width: '38%', maxWidth: '360px' }}
              >
                {/* 縦ライン軌跡 */}
                <div className="absolute top-0 right-0 h-full" style={{ width: '1.5px' }}>
                  {/* ガイド（薄い） */}
                  <div className="absolute inset-0 bg-white/10" />

                  {/* 上部ライン（前セクションから引き継ぎ、セクション1以降） */}
                  {i > 0 && (
                    <div
                      ref={el => topLineRefs.current[i] = el}
                      className="absolute top-0 left-0 w-full bg-white/70"
                      style={{ height: `${DOT_TOP_PCT}%` }}
                    />
                  )}

                  {/* 下部ライン（スクロールで伸びる） */}
                  {i < N - 1 && (
                    <div
                      ref={el => botLineRefs.current[i] = el}
                      className="absolute left-0 w-full bg-white/70"
                      style={{ top: `${DOT_TOP_PCT}%`, height: `${100 - DOT_TOP_PCT}%` }}
                    />
                  )}
                </div>

                {/* マイルストーン（ドット＋ブランチ＋テキスト） */}
                <div
                  className="absolute right-0 flex items-center flex-row-reverse"
                  style={{ top: `${DOT_TOP_PCT}%`, transform: 'translateY(-50%)' }}
                >
                  {/* ドット */}
                  <div
                    ref={el => dotRefs.current[i] = el}
                    className="w-3 h-3 rounded-full bg-white border-2 border-white shadow-lg shrink-0 z-10"
                    style={{ marginRight: '-6px' }}
                  />
                  {/* ブランチ */}
                  <div
                    ref={el => branchRefs.current[i] = el}
                    className="shrink-0"
                    style={{ width: '36px', height: '1px', background: 'rgba(255,255,255,0.5)' }}
                  />
                  {/* テキスト */}
                  <div
                    ref={el => textRefs.current[i] = el}
                    className="text-right pr-3"
                  >
                    <span className="block text-white/40 text-xs tracking-widest mb-1 font-inter">
                      {m.age}
                    </span>
                    <span className="block text-white font-medium text-sm mb-2 font-noto">
                      {m.title}
                    </span>
                    <span className="block text-white/55 text-xs leading-loose font-noto whitespace-pre-line">
                      {m.desc}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      ))}
    </>
  )
}
