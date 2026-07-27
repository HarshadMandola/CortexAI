import { signInWithPopup } from 'firebase/auth'

import { auth, googleProvider } from '../utils/firebase'
import api from '../utils/axios'
function App() {

  const handleLogin= async(token)=>{
      try {
        const {data}=await api.post("/auth/login",{token})
        console.log(data)
      } catch (error) {
        console.log(`handleLogin error ${error}`)
      }
  }

  const googleLogin=async()=>{
      try {
        const data=await signInWithPopup(auth,googleProvider)
        const token=await data.user.getIdToken();
        await handleLogin(token)
        console.log(data)
      } catch (error) {
        console.log(error)
        
      }
  }
  return (
    <div className='bg-black h-screen flex items-center justify-center'>
      <button className='bg-white w-50 h-15 ' onClick={googleLogin}>
        login with google
      </button>
    </div>
  )
}

export default App