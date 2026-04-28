import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/config'
import '../App.css'
import logo from '../assets/run-tracker-logo.png'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  async function handleLogin(event) {
    event.preventDefault()

    try {
      await signInWithEmailAndPassword(auth, email, password)
      setMessage('')
      navigate('/principal')
    } catch (error) {
      console.error(error)
      setMessage('Usuário não está cadastrado.')
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="brand-panel">
          <img src={logo} alt="Logo Run Tracker" className="brand-logo" />
          <h1>Run Tracker</h1>
          <p>Acompanhe seus treinos de corrida.</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <button type="submit">Acessar</button>

          <label className="feedback-label error">{message}</label>

          <p>
            Ainda não tem conta? <Link to="/cadastro">Cadastrar</Link>
          </p>
        </form>
      </section>
    </main>
  )
}

export default Login