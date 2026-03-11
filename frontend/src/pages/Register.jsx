import axios from "axios";
import { useState } from "react";

const Register = ({setToggle}) => {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit =  async(e) => {
          e.preventDefault();
    try {
        let res =  await axios.post("http://localhost:3000/api/auth/register" , formData , {
            withCredentials:true
        })

        if(res){
          console.log("response -------")
          console.log(res)
            console.log("User Is Register" );
              setToggle(false)
        }
    } catch (error) {
        console.log("User is Not Register" , error.message);
        
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  bg-amber-50">

      <div className="w-[360px] bg-white rounded-3xl shadow-xl p-6">

        <h2 className="text-2xl font-semibold text-center mb-2">
          Create Account
        </h2>

        <p className="text-center text-gray-400 text-sm mb-6">
          Fill your information below
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-sm text-gray-500">Username</label>
            <input
              type="text"
              name="username"
              placeholder="John Doe"
              value={formData.username}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg mt-1 outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg mt-1 outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg mt-1 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 rounded-lg font-semibold hover:bg-teal-600"
          >
            Sign Up
          </button>

        </form>

        <p className="text-center text-sm mt-5">
          Already have an account?{" "}
          <span 
  onClick={() => setToggle(prev => !prev)}className="text-teal-600 cursor-pointer">
            Sign in
          </span>
        </p>

      </div>

    </div>
  );
};

export default Register;