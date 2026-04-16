import { useState } from 'react'
import './App.css'
import logo from './assets/run-tracker-logo.png'
import TrackerHome from './components/trackerHome'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const validEmail = 'eduardo.lino@pucpr.br'
  const validPassword = '123456'

  function handleLogin(event) {
    event.preventDefault()

    if (email === validEmail && password === validPassword) {
      setMessage('Acessado com sucesso!')
      setIsSuccess(true)

      setTimeout(() => {
        setIsLoggedIn(true)
      }, 1000)
    } else {
      setMessage('Usuário ou senha incorretos!')
      setIsSuccess(false)
    }
  }

  if (isLoggedIn) {
    return <TrackerHome />
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="brand-panel">
          <img src={logo} alt="Logo Run Tracker" className="brand-logo" />
          <h1>Run Tracker</h1>
          <p>
            Acompanhe seus treinos de corrida com uma interface simples e
            moderna.
          </p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type="submit">Acessar</button>

          <label
            className={`feedback-label ${
              message ? (isSuccess ? 'success' : 'error') : ''
            }`}
          >
            {message}
          </label>
        </form>
      </section>
    </main>
  )
}

export default App