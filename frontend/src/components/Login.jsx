import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Login = ({ setShowLogin }) => {
  const { backend_url, setToken } = useContext(AppContext)
  const [state, setState] = useState("login")
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  // on Submit Handler
  const onSubmitHandler = async (event) => {
    event.preventDefault()
    if (state !== "login" && name.length < 4) {
      toast.error("Username Must Be At Least 4 characters")
    }
    if (password.length < 6) {
      toast.error("Password Must be at least 6 characters")
    }
    if (state !== "login") {
      const userDetails = {
        name: name,
        email: email,
        password: password
      }
      const response = await axios.post("/api/user/signup", userDetails);
      if (response.data.success) {
        window.localStorage.setItem("token", response.data.user.token)
        setToken(response.data.user.token)
        toast.success(response.data.message);
        navigate("/")
        setShowLogin(false)
      }
    } else {
      const userDetails = {
        email: email,
        password: password
      }
      const response = await axios.post("/api/user/login", userDetails);
      if (response.data.success) {
        window.localStorage.setItem("token", response.data.user.token)
        setToken(response.data.user.token)
        toast.success(response.data.message);
        navigate("/")
        setShowLogin(false)
      }
    }
  }


  return (
    <div onClick={() => { setShowLogin(false) }} className="fixed h-screen w-full bg-black/30 z-50 flex items-center justify-center">
      <div onClick={(event) => { event.stopPropagation() }} className="relative w-[400px] h-auto p-5 bg-white border border-gray-400 rounded-md shadow-lg text-gray-600">
        <div onClick={() => { setShowLogin(false) }} className="absolute top-0 right-0 w-8 h-8 bg-red-600 rounded-bl-lg flex items-center justify-center cursor-pointer">
          <img src={assets.close_icon} alt="close-icon" className="h-3 brightness-300" />
        </div>
        <h2 className="text-center text-2xl font-semibold mb-8"><span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}</h2>
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-5">

          {/* Username */}
          {
            state !== "login" &&
            <div>
              <label htmlFor="username" className="block w-fit mb-1 ml-1">Username</label>
              <input onChange={(event) => { setName(event.target.value) }} value={name}
                required type="text" placeholder="Type Here" id="username" className="block w-full py-1.5 px-3 rounded-md outline-none border border-gray-600" />
            </div>
          }

          {/* Email */}
          <div>
            <label htmlFor="email" className="block w-fit mb-1 ml-1">Email</label>
            <input onChange={(event) => { setEmail(event.target.value) }} value={email}
              required type="email" placeholder="Type Here" id="email" className="block w-full py-1.5 px-3 rounded-md outline-none border border-gray-600" />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block w-fit mb-1 ml-1">Password</label>
            <input onChange={(event) => { setPassword(event.target.value) }} value={password}
              required type="password" placeholder="Type Here" id="password" className="block w-full py-1.5 px-3 rounded-md outline-none border border-gray-600" />
          </div>

          {
            state === "login"
              ?
              <div className="flex items-center gap-1">
                <p>Don't Have An Account?</p>
                <span onClick={() => { setState("signup") }} className="underline text-primary font-semibold cursor-pointer">Sign Up</span>
              </div>
              :
              <div className="flex items-center gap-1">
                <p>Already Have An Account?</p>
                <span onClick={() => { setState("login") }} className="underline text-primary font-semibold cursor-pointer">Login</span>
              </div>
          }

          {/* Btn */}
          <button className="block w-full py-2 px-4 text-white bg-primary rounded-md cursor-pointer transition-all duration-300 hover:bg-primary-dull">{state === "login" ? "Login" : "Sign Up"}</button>

        </form>
      </div>
    </div>
  )
}

export default Login
