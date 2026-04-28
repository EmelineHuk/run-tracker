import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/config'
import '../App.css'
import logo from '../assets/run-tracker-logo.png'

function Cadastro() {
  const [nome, setNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const navigate = useNavigate()

  async function handleCadastro(event) {
    event.preventDefault()

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredential.user

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        nome,
        sobrenome,
        dataNascimento,
        email,
      })

      setMessage('Usuário cadastrado com sucesso!')
      setIsSuccess(true)

      setTimeout(() => {
        navigate('/login')
      }, 1200)
    } catch (error) {
      console.error(error)

      if (error.code === 'auth/email-already-in-use') {
        setMessage('Este e-mail já está cadastrado.')
      } else if (error.code === 'auth/weak-password') {
        setMessage('A senha deve ter pelo menos 6 caracteres.')
      } else if (error.code === 'auth/invalid-email') {
        setMessage('E-mail inválido.')
      } else {
        setMessage('Erro ao cadastrar usuário.')
      }

      setIsSuccess(false)
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="brand-panel">
          <img src={logo} alt="Logo Run Tracker" className="brand-logo" />
          <h1>Run Tracker</h1>
          <p>Crie sua conta para organizar treinos</p>
        </div>

        <form className="login-form" onSubmit={handleCadastro}>
          <h2>Cadastro</h2>

          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Sobrenome"
            value={sobrenome}
            onChange={(event) => setSobrenome(event.target.value)}
            required
          />

          <input
            type="date"
            value={dataNascimento}
            onChange={(event) => setDataNascimento(event.target.value)}
            required
          />

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

          <button type="submit">Criar conta</button>

          <label
            className={`feedback-label ${
              message ? (isSuccess ? 'success' : 'error') : ''
            }`}
          >
            {message}
          </label>

          <p>
            Já tem uma conta? <Link to="/login">Entrar</Link>
          </p>
        </form>
      </section>
    </main>
  )
}

export default Cadastro