import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { useAuth } from '../context/AuthContext'
import { createProject, uploadFiles } from '../services/projects'
import toast from 'react-hot-toast'

const SERVICE_TYPES = [
  { value: 'photo-editing',  label: '📸 Photo Editing' },
  { value: 'video-editing',  label: '🎬 Video Editing' },
  { value: 'color-grading',  label: '🎨 Color Grading' },
  { value: 'retouching',     label: '✨ Retouching' },
  { value: 'composite',      label: '🖼 Compositing' },
  { value: 'other',          label: '❓ Other' },
]

export default function StartProject() {
  const [params]     = useSearchParams()
  const { user }     = useAuth()
  const navigate     = useNavigate()
  const [step, setStep] = useState(1)
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '', type: params.get('type') || 'photo-editing',
    description: '', deadline: '', priority: 'standard',
  })
  const [projectId, setProjectId] = useState(null)

  const update = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: accepted => setFiles(prev => [...prev, ...accepted]),
    maxSize: 200 * 1024 * 1024,
  })

  const submitStep1 = async (e) => {
    e.preventDefault()
    if (!user) { navigate('/login', { state: { from: { pathname: '/start-project' } } }); return }
    setLoading(true)
    try {
      const { data } = await createProject(form)
      setProjectId(data.project._id)
      setStep(2)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create project')
    } finally { setLoading(false) }
  }

  const submitStep2 = async () => {
    if (files.length === 0) { setStep(3); return }
    setLoading(true)
    try {
      const fd = new FormData()
      files.forEach(f => fd.append('files', f))
      await uploadFiles(projectId, fd)
      setStep(3)
    } catch (err) {
      toast.error('File upload failed — you can upload later from your dashboard')
      setStep(3)
    } finally { setLoading(false) }
  }

  if (step === 3) return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-24" style={{ background: 'var(--bg)' }}>
      <div className="glass-card p-12 text-center max-w-md">
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="font-display text-3xl font-black mb-4">Project Submitted!</h2>
        <p className="mb-8" style={{ color: 'var(--text-dim)' }}>
          We've received your project and will review it shortly. You'll receive an update within 24 hours.
        </p>
        <button onClick={() => navigate('/dashboard')} className="btn-gold w-full py-3">
          Go to Dashboard
        </button>
      </div>
    </div>
  )

  return (
    <div className="pt-28 pb-24 min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="max-w-2xl mx-auto px-6">
        <p className="text-xs tracking-[.4em] uppercase mb-3" style={{ color: 'var(--gold)' }}>Let's Get Started</p>
        <h1 className="font-display text-4xl font-black mb-10">Start Your Project</h1>

        {/* Progress */}
        <div className="flex items-center gap-3 mb-10">
          {[1,2].map(n => (
            <div key={n} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                style={{ background: step >= n ? 'var(--gold)' : 'var(--bg3)', color: step >= n ? '#0a0800' : 'var(--text-dim)' }}>
                {n}
              </div>
              <span className="text-sm" style={{ color: 'var(--text-dim)' }}>
                {n === 1 ? 'Project Details' : 'Upload Files'}
              </span>
              {n < 2 && <div className="w-12 h-px mx-2" style={{ background: 'var(--glass-border)' }} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <form onSubmit={submitStep1} className="glass-card p-8 space-y-6">
            <div>
              <label className="block text-sm mb-1.5" style={{ color: 'var(--text-dim)' }}>Project Title *</label>
              <input type="text" required value={form.title} onChange={update('title')}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: 'var(--bg4)', border: '1px solid var(--glass-border)', color: 'var(--text)' }}
                placeholder="E.g. Wedding Album Retouching" />
            </div>

            <div>
              <label className="block text-sm mb-2" style={{ color: 'var(--text-dim)' }}>Service Type *</label>
              <div className="grid grid-cols-2 gap-2">
                {SERVICE_TYPES.map(t => (
                  <button key={t.value} type="button" onClick={() => setForm(f => ({ ...f, type: t.value }))}
                    className="px-3 py-2.5 rounded-xl text-sm text-left transition-all"
                    style={{
                      background: form.type === t.value ? 'rgba(200,168,78,.15)' : 'var(--bg4)',
                      border: `1px solid ${form.type === t.value ? 'var(--gold)' : 'var(--glass-border)'}`,
                      color: form.type === t.value ? 'var(--gold)' : 'var(--text-dim)',
                    }}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1.5" style={{ color: 'var(--text-dim)' }}>Description</label>
              <textarea rows={4} value={form.description} onChange={update('description')}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                style={{ background: 'var(--bg4)', border: '1px solid var(--glass-border)', color: 'var(--text)' }}
                placeholder="Describe what you need, style preferences, references…" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1.5" style={{ color: 'var(--text-dim)' }}>Deadline (optional)</label>
                <input type="date" value={form.deadline} onChange={update('deadline')}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--bg4)', border: '1px solid var(--glass-border)', color: 'var(--text)' }} />
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: 'var(--text-dim)' }}>Priority</label>
                <select value={form.priority} onChange={update('priority')}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--bg4)', border: '1px solid var(--glass-border)', color: 'var(--text)' }}>
                  <option value="standard">Standard</option>
                  <option value="urgent">Urgent (+30%)</option>
                  <option value="rush">Rush (+60%)</option>
                </select>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-gold w-full py-3 disabled:opacity-60">
              {loading ? 'Saving…' : 'Next: Upload Files →'}
            </button>
          </form>
        )}

        {step === 2 && (
          <div className="glass-card p-8">
            <h2 className="font-semibold text-lg mb-6">Upload Your Files</h2>

            <div {...getRootProps()} className="rounded-xl p-10 text-center cursor-pointer transition-all mb-6"
              style={{
                border: `2px dashed ${isDragActive ? 'var(--gold)' : 'var(--glass-border)'}`,
                background: isDragActive ? 'rgba(200,168,78,.05)' : 'var(--bg4)',
              }}>
              <input {...getInputProps()} />
              <p className="text-4xl mb-3">📁</p>
              <p className="font-medium mb-1">Drag & drop files here</p>
              <p className="text-sm" style={{ color: 'var(--text-dim)' }}>
                or click to browse — max 200MB per file
              </p>
            </div>

            {files.length > 0 && (
              <div className="space-y-2 mb-6">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center justify-between text-sm px-3 py-2 rounded-lg"
                    style={{ background: 'var(--bg3)' }}>
                    <span style={{ color: 'var(--text-dim)' }}>{f.name}</span>
                    <button onClick={() => setFiles(fs => fs.filter((_, j) => j !== i))}
                      style={{ color: 'var(--text-muted)' }}>✕</button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="btn-outline flex-1 py-3">← Back</button>
              <button onClick={submitStep2} disabled={loading} className="btn-gold flex-1 py-3 disabled:opacity-60">
                {loading ? 'Uploading…' : files.length > 0 ? 'Upload & Continue →' : 'Skip for Now →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
