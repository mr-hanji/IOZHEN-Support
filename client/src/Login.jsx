import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Login() {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const navigate = useNavigate();

   const handleLogin = async (e) => {
      e.preventDefault();

      try {
         const response = await axios.post(
            "https://iozhen-support.liara.run/api/auth/login",
            {
               mobileNumber: username,
               password,
            }
         );
         if (response.status === 200) {
            // Save the token or admin status
            localStorage.setItem("adminToken", response.data.token);
            toast.success("Login successful!");
            navigate("/admin");
         } else {
            toast.error("Invalid credentials, please try again.");
         }
      } catch (error) {
         toast.error("Error logging in, please try again.");
      }
   };

   return (
      <div className="flex items-center justify-center h-screen">
         <ToastContainer />
         <form
            onSubmit={handleLogin}
            className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
         >
            <h2 className="mb-6 text-2xl font-bold">Admin Login</h2>
            <div className="mb-4">
               <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
               >
                  Username
               </label>
               <input
                  type="text"
                  id="username"
                  className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
               />
            </div>
            <div className="mb-4">
               <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
               >
                  Password
               </label>
               <input
                  type="password"
                  id="password"
                  className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
            </div>
            <button
               type="submit"
               className="w-full py-2 text-white rounded-lg bg-cyan-600 hover:bg-cyan-700"
            >
               Login
            </button>
         </form>
      </div>
   );
}

export default Login;
