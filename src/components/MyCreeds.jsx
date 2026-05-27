import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const creeds = [
  {
    image: '/aoteru.png',
    quote: '「すべての行動には結果が伴う。\n　それが己が意図しなかった結果だとしても。」',
    body: '言い訳をしない、ということではありません。意図がどうであれ、自分の行動が生む結果を、自分のものとして引き受けるということです。「意図していなかった」は免罪符にはならない。自分の行動が生んだものはすべて自分のもの、そう受け止めることが、判断の質を上げると思っています。だからこそ、何かを決断するとき、その先に何が起きうるかを常に考えるようになりました。それが今の自分の行動規範になっています。',
    layout: 'text-left',
  },
  {
    image: '/kanki.png',
    quote: '「全部 上手くいく」',
    body: '謙虚でいることは大切にしています。ですが、謙虚を意識しすぎると「自分にできるだろうか」と迷い続けた結果、肝心な場面で退いてしまう。そんな経験を何度かしてからこの言葉に出会いました。\n\nやると決めたことに対しては「全部うまくいく」と自分に言い聞かせるようにしています。根拠がなくてもいい。覚悟を決めた瞬間から動き方が変わる。桓騎のあの笑顔には、そういう強さが宿っている気がします。この言葉は今もお守りになっています。',
    layout: 'image-left',
  },
  {
    image: '/lookback.png',
    quote: '「4年生で私より絵がウマい奴がいるなんて\n　絶っっ対に許せない」',
    body: 'ずっと自分が一番だと思っていた主人公が、同級生の圧倒的な画力を目の当たりにした瞬間のセリフ。絶望ではなく、悔しさに火がついた瞬間です。\n\n自分より遥かに上の存在に出会った時、萎縮するのではなくこう思えるかどうか。\nこの場面に感化されてから気づいたのですが、知見の深い人と話した時に悔しさを感じるのは、自分がまだ本気で追いかけているからだと思うようにしました。悔しいと感じられる間は、まだ諦めていない証拠です。その感情を、立ち止まる理由ではなく前に進む燃料にしたいと思っています。',
    layout: 'text-left',
  },
]

function CreedItem({ creed, index }) {
  const itemRef = useRef(null)
  const imgRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isImageLeft = creed.layout === 'image-left'

      gsap.from(imgRef.current, {
        opacity: 0,
        x: isImageLeft ? -50 : 50,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: itemRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from(textRef.current, {
        opacity: 0,
        x: isImageLeft ? 40 : -40,
        duration: 0.9,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: itemRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })
    }, itemRef)

    return () => ctx.revert()
  }, [creed.layout])

  const isImageLeft = creed.layout === 'image-left'

  return (
    <div
      ref={itemRef}
      className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 ${
        isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* 漫画画像 */}
      <div ref={imgRef} className="w-full md:w-[45%] flex-shrink-0">
        <img
          src={creed.image}
          alt=""
          className="w-full max-w-[420px] mx-auto object-contain rounded-sm"
          style={{ filter: 'grayscale(10%) contrast(105%)' }}
        />
      </div>

      {/* テキスト */}
      <div ref={textRef} className="flex-1 max-w-lg">
        <blockquote className="text-white font-noto text-base md:text-lg leading-loose mb-6 whitespace-pre-line">
          {creed.quote}
        </blockquote>
        <p className="text-white/55 text-sm leading-[2] whitespace-pre-line font-noto">
          {creed.body}
        </p>
      </div>
    </div>
  )
}

export default function MyCreeds() {
  const titleRef = useRef(null)

  useEffect(() => {
    gsap.from(titleRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 85%',
      },
    })
  }, [])

  return (
    <section className="bg-black py-24 md:py-32 px-8 md:px-20">
      <h2
        ref={titleRef}
        className="font-playfair text-4xl md:text-5xl font-bold text-white mb-20 md:mb-28"
      >
        My Creeds
      </h2>

      <div className="flex flex-col gap-28 md:gap-36 max-w-6xl">
        {creeds.map((creed, i) => (
          <CreedItem key={i} creed={creed} index={i} />
        ))}
      </div>
    </section>
  )
}
