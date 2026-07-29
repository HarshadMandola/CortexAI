import React from 'react'
import api from '../../utils/axios'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../../utils/firebase.js'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice.js'

function Home() {
  const {userData}=useSelector(state=>state.user)
  const dispatch=useDispatch()
    const handleLogin= async(token)=>{
      try {
        const {data}=await api.post("/api/auth/login",{token})
        dispatch(setUserData(data))
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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 flex items-center justify-center">
      {!userData && <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 shadow-2xl w-[400px] text-center">
    <h1 className="text-3xl font-bold text-white mb-2">
      Welcome to CortexAI
    </h1>

    <p className="text-gray-400 mb-8">
      Sign in to continue
    </p>

    <button
      onClick={googleLogin}
      className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-semibold py-3 rounded-xl shadow-md hover:bg-gray-100 hover:scale-[1.02] active:scale-95 transition-all duration-200"
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        className="w-6 h-6"
      />
      Continue with Google
    </button>
  </div>}
</div>
  )
}

export default Home