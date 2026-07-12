import { Link } from 'react-router-dom'

export default function PricingCard({ plan }) {
  return (
    <div className="relative rounded-2xl overflow-hidden transition-transform hover:-translate-y-1"
      style={{
        background: plan.isPopular ? 'linear-gradient(135deg,rgba(200,168,78,.15),rgba(200,168,78,.05))' : 'var(--bg3)',
        border: `1px solid ${plan.isPopular ? 'var(--gold)' : 'var(--glass-border)'}`,
        boxShadow: plan.isPopular ? '0 0 40px rgba(200,168,78,.2)' : 'none',
      }}
    >
      {plan.isPopular && (
        <div className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full font-semibold tracking-wider"
          style={{ background: 'var(--gold)', color: '#0a0800' }}>
          POPULAR
        </div>
      )}

      <div className="p-8">
        <p className="text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--text-dim)' }}>{plan.category.replace('-', ' ')}</p>
        <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
        <p className="text-sm mb-6" style={{ color: 'var(--text-dim)' }}>{plan.description}</p>

        <div className="flex items-baseline gap-1 mb-8">
          <span className="text-4xl font-bold" style={{ color: 'var(--gold)' }}>${plan.price}</span>
          <span className="text-sm" style={{ color: 'var(--text-dim)' }}>
            {plan.billingCycle === 'one-time' ? '' : `/${plan.billingCycle}`}
          </span>
        </div>

        <ul className="space-y-3 mb-8">
          {plan.features?.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-dim)' }}>
              <span style={{ color: 'var(--gold)' }}>✓</span>
              {f}
            </li>
          ))}
        </ul>

        <Link to={`/start-project?plan=${plan._id}`}
          className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5 ${plan.isPopular ? 'btn-gold' : 'btn-outline'}`}
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}
