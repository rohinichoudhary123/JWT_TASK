import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { myStore } from "../context/AppContext";
const Login = ({ setToggle }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const { setIsLoggedIn } = useContext(myStore);

  //   const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData,
        {
          withCredentials: true,
        },
      );

      if (res) {
        console.log("User Login ", res);
        setIsLoggedIn(res.data.user);
        navigate("/");
      }
    } catch (error) {
      console.log("Error in login:-", error.response.data.message);
    }

    // console.log(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-50">
      <div className="w-90 bg-white rounded-3xl shadow-xl p-6">
        <h2 className="text-2xl font-semibold text-center mb-1">Sign In</h2>

        <p className="text-center text-gray-400 text-sm mb-6">
          Hi! Welcome back, you've been missed
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="flex items-center border rounded-lg mt-1 px-2">
              <input
                // type={showPassword ? "text" : "password"}
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 outline-none"
              />

              <span
                className="cursor-pointer text-gray-400"
                // onClick={() => setShowPassword(!showPassword)}
              ></span>
            </div>

            <p className="text-right text-sm text-teal-600 mt-1 cursor-pointer">
              Forgot Password?
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 rounded-lg font-semibold hover:bg-teal-600"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="text-gray-400 text-sm">Or sign in</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <p className="text-center text-sm">
          Don't have an account?{" "}
          <span
            onClick={() => setToggle(true)}
            className="text-teal-600 cursor-pointer"
          >
            Sign Up
          </span>
        </p>

        <p className="text-center text-sm text-gray-400 mt-3">OR</p>

        <p className="text-center text-sm text-teal-600 cursor-pointer">
          Continue as a guest
        </p>
      </div>
    </div>
  );
};

export default Login;
