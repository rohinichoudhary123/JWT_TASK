import React from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from "axios"
const Verify = () => {

    let {token} = useParams()
    const navigate = useNavigate()

    const verifyEmail = async () => {
      try {
        let  res = await axios.get(`http://localhost:3000/api/auth/verify-email/${token}`)

        if(res){
          console.log("res is ......." , res);
          
        }
        
      } catch (error) {
        console.log("error in verify email, ", error.response.data.message)
      }
    }

verifyEmail()
    
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
       <div className='bg-white p-10 rounded-2xl shadow-lg text-center w-[30%]'> 
        <h1  className='text-2xl font-semibold mb-2'>  Email Verified</h1>
        <p className="text-gray-500 mb-6">    Your email has been verified successfully</p>
        <button    onClick={() => navigate("/login")}className='bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700 transition'>Go To Login</button>
        </div>
    </div>
  )
}

export default Verify