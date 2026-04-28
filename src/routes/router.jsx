import { createBrowserRouter } from 'react-router-dom'
import Login from '../pages/Login'
import Cadastro from '../pages/Cadastro'
import Principal from '../pages/Principal'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/cadastro',
    element: <Cadastro />,
  },
  {
    path: '/principal',
    element: <Principal />,
  },
])

export default router