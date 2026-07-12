export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full border-2 border-transparent animate-spin"
          style={{ borderTopColor: 'var(--gold)', borderRightColor: 'var(--gold-dark)' }} />
        <p className="font-display text-sm tracking-widest uppercase" style={{ color: 'var(--gold)' }}>
          APEX LINK Studio
        </p>
      </div>
    </div>
  )
}
