import React from 'react'
import api from '../../utils/axios'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../../utils/firebase.js'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice.js'
import SideBar from '../components/SideBar.jsx'
import CharArea from '../components/CharArea.jsx'
import Artifact from '../components/Artifact.jsx'

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
    <div className="min-h-screen bg-[#111111] text-white">
      {userData ? (
        <div className="flex h-[100dvh] overflow-hidden">
          <SideBar />
          <main className="min-w-0 flex-1">
            <CharArea />
          </main>
          <Artifact />
        </div>
      ) : (
        <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#1e3a8a_0%,_#111827_38%,_#09090b_78%)] px-5">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#171717]/90 p-8 text-center shadow-2xl shadow-blue-950/40 backdrop-blur sm:p-10">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl shadow-lg shadow-blue-600/30">
              ✦
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Welcome to CortexAI
            </h1>
            <p className="mt-3 text-gray-400">
              Sign in to start a conversation.
            </p>

            <button
              onClick={googleLogin}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-white py-3 font-semibold text-gray-800 shadow-md transition hover:-translate-y-0.5 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#171717] active:translate-y-0"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="h-5 w-5"
              />
              Continue with Google
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
