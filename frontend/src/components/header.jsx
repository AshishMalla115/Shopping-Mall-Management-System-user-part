/**
 * Mall header — same idea as workshop `components/header`, but as a proper React component.
 */
export default function Header({ activeTab, onNavigate }) {
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'register', label: 'Join' },
    { id: 'login', label: 'Sign in' },
    { id: 'members', label: 'Members' },
    { id: 'profile', label: 'Profile' },
  ]

  return (
    <header className="mall-header">
      <div className="mall-header__brand">
        <span className="mall-header__logo" aria-hidden>
          🏬
        </span>
        <div>
          <div className="mall-header__title">City Central Mall</div>
          <div className="mall-header__tagline">Member portal · User management</div>
        </div>
      </div>
      <nav className="mall-header__nav" aria-label="Main">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            className={t.id === activeTab ? 'nav-btn nav-btn--active' : 'nav-btn'}
            onClick={() => onNavigate(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>
    </header>
  )
}
