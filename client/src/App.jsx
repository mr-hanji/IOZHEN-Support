import {
   BrowserRouter as Router,
   Route,
   Routes,
   Navigate,
} from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./Login";
import Admin from "./Admin";

function App() {
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [description, setDescription] = useState("");
   const [rating, setRating] = useState(0);

   const handleRating = (rate) => {
      setRating(rate);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = {
         firstName,
         lastName,
         score: rating,
         description,
      };

      try {
         const response = await axios.post(
            "https://iozhen-support.liara.run/api/tickets",
            formData
         );
         if (response.status === 200 || response.status === 201) {
            toast.success("Your ticket was sent successfully!");
         }
      } catch (error) {
         toast.error("Error submitting the form, please try again.");
      }
   };

   return (
      <Router>
         <ToastContainer />
         <Routes>
            <Route
               path="/"
               element={
                  <div className="relative m-10 bg-white border border-4 rounded-lg shadow">
                     <div className="flex items-start justify-between p-5 border-b rounded-t">
                        <div className="flex items-center gap-[10px] justify-center">
                           <img
                              src="/logo.jpg"
                              alt=""
                              className="w-[80px] h-[80px]"
                           />
                           <h3 className="text-xl font-semibold">IOZHEN</h3>
                        </div>
                        <h3 className="text-center absolute left-[35%] text-[30px] top-[5%]">
                           IOZHEN SUPPORT FORM
                        </h3>
                     </div>

                     <div className="p-6 space-y-6">
                        <form onSubmit={handleSubmit}>
                           <div className="grid grid-cols-6 gap-6">
                              <div className="col-span-6 sm:col-span-3">
                                 <label
                                    htmlFor="first-name"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                 >
                                    First Name
                                 </label>
                                 <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                    placeholder="Enter your First Name"
                                    required
                                    value={firstName}
                                    onChange={(e) =>
                                       setFirstName(e.target.value)
                                    }
                                 />
                              </div>
                              <div className="col-span-6 sm:col-span-3">
                                 <label
                                    htmlFor="last-name"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                 >
                                    Last Name
                                 </label>
                                 <input
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                    placeholder="Enter your Last Name"
                                    required
                                    value={lastName}
                                    onChange={(e) =>
                                       setLastName(e.target.value)
                                    }
                                 />
                              </div>
                              <div className="col-span-full">
                                 <label
                                    htmlFor="description"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                 >
                                    Description
                                 </label>
                                 <textarea
                                    id="description"
                                    rows="6"
                                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-cyan-600 focus:border-cyan-600"
                                    placeholder="Details"
                                    value={description}
                                    onChange={(e) =>
                                       setDescription(e.target.value)
                                    }
                                 ></textarea>
                              </div>
                              <div className="col-span-full">
                                 <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Rating
                                 </label>
                                 <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                       <button
                                          type="button"
                                          key={star}
                                          className={`text-xl ${
                                             rating >= star
                                                ? "text-yellow-400"
                                                : "text-gray-400"
                                          }`}
                                          onClick={() => handleRating(star)}
                                       >
                                          ★
                                       </button>
                                    ))}
                                 </div>
                              </div>
                           </div>
                           <div className="p-6 border-t border-gray-200 rounded-b">
                              <button
                                 className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                 type="submit"
                              >
                                 Save all
                              </button>
                           </div>
                        </form>
                     </div>
                  </div>
               }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
         </Routes>
      </Router>
   );
}

export default App;
