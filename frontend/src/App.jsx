import { useCallback, useEffect, useState } from 'react'
import { apiGet, apiPost } from './api'
import Header from './components/header.jsx'
import { FeaturedStores, MessageBanner, safeUser, Spinner, UserCard } from './components/functional.jsx'
import './App.css'

const TABS = ['home', 'register', 'login', 'members', 'profile']

export default function App() {
  const [tab, setTab] = useState('home')
  const [busy, setBusy] = useState(false)
  const [banner, setBanner] = useState({ type: '', text: '' })

  const [signupName, setSignupName] = useState('')
  const [signupType, setSignupType] = useState('customer')
  const [signupPassword, setSignupPassword] = useState('')

  const [loginId, setLoginId] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [sessionUser, setSessionUser] = useState(null)

  const [profileId, setProfileId] = useState('')
  const [profileUser, setProfileUser] = useState(null)

  const [members, setMembers] = useState([])

  const showBanner = useCallback((type, text) => {
    setBanner({ type, text })
  }, [])

  const run = useCallback(
    async (fn) => {
      setBusy(true)
      setBanner({ type: '', text: '' })
      try {
        return await fn()
      } catch (e) {
        showBanner('error', e?.message ?? String(e))
        throw e
      } finally {
        setBusy(false)
      }
    },
    [showBanner],
  )

  useEffect(() => {
    if (tab !== 'members') return
    let cancelled = false
    ;(async () => {
      try {
        setBusy(true)
        const data = await apiGet('/api/users')
        if (!cancelled) {
          const list = Array.isArray(data) ? data : Array.from(data)
          setMembers(list)
        }
      } catch (e) {
        if (!cancelled) showBanner('error', e?.message ?? String(e))
      } finally {
        if (!cancelled) setBusy(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [tab, showBanner])

  async function handleSignup(e) {
    e.preventDefault()
    await run(async () => {
      const created = await apiPost('/api/users/signup', {
        name: signupName,
        type: signupType,
        password: signupPassword,
      })
      showBanner('success', `Welcome! Your member ID is #${created.id}. You can sign in with this ID.`)
      setLoginId(String(created.id))
      setProfileId(String(created.id))
      setTab('login')
    })
  }

  async function handleLogin(e) {
    e.preventDefault()
    await run(async () => {
      const user = await apiPost('/api/users/login', {
        id: Number(loginId),
        password: loginPassword,
      })
      setSessionUser(user)
      setProfileId(String(user.id))
      showBanner('success', `Signed in as ${user.name} (ID #${user.id}).`)
      setTab('profile')
    })
  }

  async function refreshMembers() {
    await run(async () => {
      const data = await apiGet('/api/users')
      const list = Array.isArray(data) ? data : Array.from(data)
      setMembers(list)
      showBanner('success', `Loaded ${list.length} member(s).`)
    })
  }

  async function loadProfile(e) {
    e.preventDefault()
    await run(async () => {
      const user = await apiGet(`/api/users/${encodeURIComponent(profileId)}`)
      setProfileUser(user)
      showBanner('success', 'Profile loaded.')
    })
  }

  function go(tabId) {
    if (TABS.includes(tabId)) setTab(tabId)
  }

  return (
    <div className="mall-app">
      <Header activeTab={tab} onNavigate={go} />

      <main className="mall-main">
        <Spinner show={busy} />
        <MessageBanner type={banner.type}>{banner.text}</MessageBanner>

        {tab === 'home' && (
          <section className="panel hero-panel">
            <div className="hero-copy">
              <h1>Welcome to City Central Mall</h1>
              <div className="hero-actions">
                <button type="button" className="btn btn--primary" onClick={() => go('register')}>
                  Become a member
                </button>
                <button type="button" className="btn btn--ghost" onClick={() => go('login')}>
                  Sign in
                </button>
              </div>
            </div>
            <div className="hero-side">
              <h2>Explore the mall</h2>
             
              <FeaturedStores
                onPick={(s) =>
                  showBanner('success', `You picked “${s.name}”. Real product APIs can plug in here later.`)
                }
              />
            </div>
          </section>
        )}

        {tab === 'register' && (
          <section className="panel">
            <h2>Member registration</h2>
            <p className="muted">
              Maps to <code>POST /api/users/signup</code>
            </p>
            <form className="form" onSubmit={handleSignup}>
              <label>
                Name
                <input value={signupName} onChange={(e) => setSignupName(e.target.value)} required />
              </label>
              <label>
                Type (e.g. customer, staff)
                <input value={signupType} onChange={(e) => setSignupType(e.target.value)} required />
              </label>
              <label>
                Password
                <input
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
              </label>
              <button type="submit" className="btn btn--primary" disabled={busy}>
                Create account
              </button>
            </form>
          </section>
        )}

        {tab === 'login' && (
          <section className="panel">
            <h2>Sign in</h2>
            <p className="muted">
              Maps to <code>POST /api/users/login</code> (backend checks user ID + password)
            </p>
            <form className="form" onSubmit={handleLogin}>
              <label>
                Member ID
                <input value={loginId} onChange={(e) => setLoginId(e.target.value)} required />
              </label>
              <label>
                Password
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </label>
              <button type="submit" className="btn btn--primary" disabled={busy}>
                Sign in
              </button>
            </form>
            {sessionUser && (
              <p className="session-hint">
                Last session: <strong>{sessionUser.name}</strong> (#{sessionUser.id})
              </p>
            )}
          </section>
        )}

        {tab === 'members' && (
          <section className="panel">
            <div className="panel__head">
              <div>
                <h2>Member directory</h2>
                <p className="muted">
                  Maps to <code>GET /api/users</code>
                </p>
              </div>
              <button type="button" className="btn btn--ghost" onClick={refreshMembers} disabled={busy}>
                Refresh
              </button>
            </div>
            {members.length === 0 ? (
              <p className="muted">No members loaded yet. Ensure the backend is running and PostgreSQL is up.</p>
            ) : (
              <div className="member-grid">
                {members.map((u) => (
                  <UserCard key={u.id} user={u} />
                ))}
              </div>
            )}
          </section>
        )}

        {tab === 'profile' && (
          <section className="panel">
            <h2>Profile lookup</h2>
            <p className="muted">
              Maps to <code>GET /api/users/{'{id}'}</code> — profile read (README)
            </p>
            <form className="form form--inline" onSubmit={loadProfile}>
              <label>
                Member ID
                <input value={profileId} onChange={(e) => setProfileId(e.target.value)} required />
              </label>
              <button type="submit" className="btn btn--primary" disabled={busy}>
                Load profile
              </button>
            </form>
            {profileUser && (
              <div className="profile-result">
                <UserCard user={profileUser} />
                <pre className="json-preview">{JSON.stringify(safeUser(profileUser), null, 2)}</pre>
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="mall-footer">
        <span>Backend: Spring Boot · Frontend: React (Vite) · API base proxied to localhost:8080</span>
      </footer>
    </div>
  )
}
