/**
 * Small reusable UI pieces (workshop-style `functional.js`).
 */

export function MessageBanner({ type, children }) {
  if (!children) return null
  const cls = type === 'error' ? 'banner banner--error' : type === 'success' ? 'banner banner--success' : 'banner'
  return <div className={cls} role="status">{children}</div>
}

export function Spinner({ show }) {
  if (!show) return null
  return (
    <div className="spinner-wrap" aria-live="polite">
      <span className="spinner" />
      <span>Talking to server…</span>
    </div>
  )
}

/** Hide password when showing user objects from the API */
export function safeUser(u) {
  if (!u || typeof u !== 'object') return u
  const { password: _p, ...rest } = u
  return { ...rest, password: _p != null ? '••••••••' : undefined }
}

export function UserCard({ user }) {
  if (!user) return null
  const s = safeUser(user)
  return (
    <article className="user-card">
      <div className="user-card__id">#{s.id}</div>
      <div className="user-card__name">{s.name ?? '—'}</div>
      <div className="user-card__meta">{s.type ?? 'member'}</div>
    </article>
  )
}

/** Decorative “stores” for the home page — no backend, just UI */
export function FeaturedStores({ onPick }) {
  const stores = [
    { id: 'fashion', name: 'Fashion Walk', emoji: '👗' },
    { id: 'food', name: 'Food Court', emoji: '🍜' },
    { id: 'tech', name: 'Tech Hub', emoji: '💻' },
    { id: 'kids', name: 'Kids Zone', emoji: '🎠' },
  ]
  return (
    <div className="store-grid">
      {stores.map((s) => (
        <button key={s.id} type="button" className="store-tile" onClick={() => onPick(s)}>
          <span className="store-tile__emoji">{s.emoji}</span>
          <span className="store-tile__name">{s.name}</span>
        </button>
      ))}
    </div>
  )
}
