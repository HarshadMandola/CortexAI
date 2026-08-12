import React from 'react'
import api from '../../utils/axios'


async function sendMessages(payload) {

  try {
    const {data}= await api.post("/api/agent/chat",payload)
    console.log(`yeleee ${data}`)
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

export default sendMessages