import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import TrackerHome from '../components/trackerHome'
import { auth, db } from '../firebase/config'

function Principal() {
  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate('/login')
        return
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid))

        if (userDoc.exists()) {
          setProfile(userDoc.data())
        } else {
          setProfile(null)
        }
      } catch (error) {
        console.error(error)
        setProfile(null)
      } finally {
        setIsLoading(false)
      }
    })

    return () => unsubscribe()
  }, [navigate])

  if (isLoading) {
    return null
  }

  return <TrackerHome profile={profile} />
}

export default Principal
