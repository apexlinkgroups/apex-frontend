import { useState, useRef } from 'react'

export default function BeforeAfter({ before, after, alt = '' }) {
  const [pos, setPos]   = useState(50)
  const ref             = useRef()

  const move = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const x    = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left
    setPos(Math.min(100, Math.max(0, (x / rect.width) * 100)))
  }

  return (
    <div ref={ref} className="relative overflow-hidden rounded-xl select-none cursor-col-resize"
      onMouseMove={move} onTouchMove={move}
      style={{ aspectRatio: '16/9' }}
    >
      <img src={after}  alt={alt} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={before} alt={alt} className="w-full h-full object-cover" />
      </div>

      {/* Handle */}
      <div className="absolute top-0 bottom-0 w-0.5 pointer-events-none"
        style={{ left: `${pos}%`, background: 'var(--gold)' }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: 'var(--gold)', boxShadow: '0 0 12px var(--gold-glow)' }}>
          <span className="text-xs text-black font-bold">⇔</span>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded"
        style={{ background: 'rgba(0,0,0,.6)', color: '#fff' }}>BEFORE</span>
      <span className="absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded"
        style={{ background: 'rgba(200,168,78,.8)', color: '#0a0800' }}>AFTER</span>
    </div>
  )
}
