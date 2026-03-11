import React from 'react'
import Register from '../pages/Register'
import Login from '../pages/Login'
import { useState } from 'react'
const AuthLayout = () => {
    const [toggle, setToggle] = useState(false)
    
  return (
    <div className='h-screen'>{
        
       toggle ? (<Register setToggle={setToggle}/>) : (<Login setToggle={setToggle}/>) 
        
        }</div>
  )
}

export default AuthLayout