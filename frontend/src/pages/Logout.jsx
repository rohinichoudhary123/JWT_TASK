import { useContext } from "react"
import { useNavigate } from "react-router"
import axios from "axios"
import { myStore } from "../context/AppContext"

const Logout = () => {

  const { setIsLoggedIn } = useContext(myStore)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {

      let res = await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true }
      )

      if (res) {
      //  Cookie.removeItem("token")
        setIsLoggedIn(false)
        navigate("/login")
      }

    } catch (error) {
      console.log("error in Logout", error.response?.data?.message)
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  )
}

export default Logout