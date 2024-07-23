import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
            toast.success("نظر شما با موفقیت ثبت شد");
            setFirstName("");
            setLastName("");
            setDescription("");
            setRating(0);
         }
      } catch (error) {
         toast.error("مشکلی پیش آمده دوباره تلاش کنید");
      }
   };

   return (
      <Router>
         <ToastContainer />
         <Routes>
            <Route
               path="/"
               element={
                  <div className="flex items-center justify-center w-full lg:h-[100vh] bg-gray-100">
                     <div className="p-[30px] lg:p-0 w-full h-auto sm:w-[1200px] sm:h-[600px] flex flex-col-reverse sm:flex-row shadow-lg bg-white items-center">
                        <div
                           className="lg:w-[70%]"
                           style={{ direction: "rtl" }}
                        >
                           <div className="p-6 space-y-6">
                              <h3 className="text-[30px] text-center font-[700] ">
                                 فرم نظر سنجی شرکت آیوژن
                              </h3>
                              <form onSubmit={handleSubmit}>
                                 <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                       <label
                                          htmlFor="first-name"
                                          className="block mb-2 text-sm font-medium text-gray-900"
                                       >
                                          نام
                                       </label>
                                       <input
                                          type="text"
                                          name="first-name"
                                          id="first-name"
                                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                          placeholder="نام خود را وارد کنید"
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
                                          نام خانوادگی
                                       </label>
                                       <input
                                          type="text"
                                          name="last-name"
                                          id="last-name"
                                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                          placeholder="نام خانوادگی خود را وارد کنید"
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
                                          توضیحات
                                       </label>
                                       <textarea
                                          id="description"
                                          rows="6"
                                          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-cyan-600 focus:border-cyan-600 max-h-[10vh]"
                                          placeholder="جزئیات"
                                          value={description}
                                          onChange={(e) =>
                                             setDescription(e.target.value)
                                          }
                                       ></textarea>
                                    </div>
                                    <div className="col-span-full">
                                       <label className="block mb-2 text-sm font-medium text-center text-gray-900">
                                          امتیاز
                                       </label>
                                       <div className="flex items-center justify-center w-full gap-1">
                                          {[1, 2, 3, 4, 5].map((star) => (
                                             <button
                                                type="button"
                                                key={star}
                                                className={`text-xl ${
                                                   rating >= star
                                                      ? "text-yellow-400"
                                                      : "text-gray-400"
                                                }`}
                                                onClick={() =>
                                                   handleRating(star)
                                                }
                                             >
                                                ★
                                             </button>
                                          ))}
                                       </div>
                                    </div>
                                 </div>
                                 <div className="flex items-center justify-center w-full p-4 border-t border-gray-200 rounded-b">
                                    <button
                                       className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                       type="submit"
                                    >
                                       ثبت همه
                                    </button>
                                 </div>
                              </form>
                           </div>
                        </div>
                        <div className="w-full p-[10px] lg:p-0 lg:w-[30%] bg-[#4adce3] h-full flex items-center justify-center flex-col px-[30px]">
                           <img
                              src="/logo2.png"
                              alt="logo"
                              className="max-w-[150px]"
                           />
                           <h2 className="mt-2 mb-4 text-xl font-bold text-center">
                              به مرکز پشتیبانی آیوژن خوش آمدید
                           </h2>
                           <h4 className="mb-2 text-lg font-semibold ">
                              مشتری گرامی
                           </h4>
                           <p className="mb-2 text-base text-center ">
                              از اینکه آیوژن را برای نیازهای خود انتخاب
                              کرده‌اید، سپاسگزاریم. ما همواره در تلاشیم تا
                              بهترین خدمات و پشتیبانی را به شما ارائه دهیم
                           </p>
                           <p className="mb-2 text-base text-center ">
                              نظرات شما میتواند به پیشرفت کار ما کمک شایانی بکند
                           </p>
                           <p className="text-lg font-bold ">
                              با احترام، تیم پشتیبانی آیوژن
                           </p>
                        </div>
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
