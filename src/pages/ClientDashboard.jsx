import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { myProjects } from '../services/projects'

const STATUS_COLORS = {
  pending:     { bg: 'rgba(200,168,78,.15)',  text: '#c8a84e' },
  'in-review': { bg: 'rgba(100,140,220,.15)', text: '#6498dc' },
  'in-progress':{ bg: 'rgba(80,180,120,.15)', text: '#50b478' },
  revision:    { bg: 'rgba(220,160,40,.15)',  text: '#dcb030' },
  completed:   { bg: 'rgba(80,200,120,.15)',  text: '#50c878' },
  delivered:   { bg: 'rgba(200,168,78,.25)',  text: '#e8c96a' },
  cancelled:   { bg: 'rgba(200,80,80,.15)',   text: '#c85050' },
}

export default function ClientDashboard() {
  const { user }          = useAuth()
  const [projects, setProjects] = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    myProjects().then(r => setProjects(r.data.projects)).finally(() => setLoading(false))
  }, [])

  return (
    <div className="pt-28 pb-24 min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-xs tracking-[.4em] uppercase mb-1" style={{ color: 'var(--gold)' }}>Client Portal</p>
            <h1 className="font-display text-3xl font-black">Welcome back, {user?.name?.split(' ')[0]}</h1>
          </div>
          <Link to="/start-project" className="btn-gold px-5 py-2.5 text-sm">+ New Project</Link>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Projects', value: projects.length },
            { label: 'In Progress',    value: projects.filter(p => p.status === 'in-progress').length },
            { label: 'Completed',      value: projects.filter(p => ['completed','delivered'].includes(p.status)).length },
            { label: 'Pending Review', value: projects.filter(p => p.status === 'pending').length },
          ].map(s => (
            <div key={s.label} className="glass-card p-5 text-center">
              <p className="font-display text-3xl font-black mb-1" style={{ color: 'var(--gold)' }}>{s.value}</p>
              <p className="text-xs" style={{ color: 'var(--text-dim)' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Projects list */}
        <div className="glass-card overflow-hidden">
          <div className="px-6 py-4 flex items-center justify-between"
            style={{ borderBottom: '1px solid var(--glass-border)' }}>
            <h2 className="font-semibold">Your Projects</h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 rounded-full border-2 border-transparent animate-spin"
                style={{ borderTopColor: 'var(--gold)' }} />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-4">📭</p>
              <p className="font-medium mb-2">No projects yet</p>
              <p className="text-sm mb-6" style={{ color: 'var(--text-dim)' }}>Start your first project to get started.</p>
              <Link to="/start-project" className="btn-gold px-6 py-2.5 text-sm">Start a Project</Link>
            </div>
          ) : (
            <div className="divide-y" style={{ '--tw-divide-opacity': 1 }}>
              {projects.map(p => (
                <Link key={p._id} to={`/project/${p._id}`}
                  className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-[var(--bg3)]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                      style={{ background: 'var(--bg4)' }}>
                      {p.type === 'photo-editing' ? '📸' : p.type === 'video-editing' ? '🎬' : '🎨'}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{p.title}</p>
                      <p className="text-xs mt-0.5 capitalize" style={{ color: 'var(--text-dim)' }}>
                        {p.type.replace('-', ' ')} · {new Date(p.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {/* Progress bar */}
                    <div className="hidden md:block w-24 h-1.5 rounded-full" style={{ background: 'var(--bg4)' }}>
                      <div className="h-full rounded-full" style={{ width: `${p.progress || 0}%`, background: 'var(--gold)' }} />
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium capitalize"
                      style={{ ...(STATUS_COLORS[p.status] || { bg: 'var(--bg4)', text: 'var(--text-dim)' }), background: STATUS_COLORS[p.status]?.bg }}>
                      {p.status.replace('-', ' ')}
                    </span>
                    <span style={{ color: 'var(--text-muted)' }}>›</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
