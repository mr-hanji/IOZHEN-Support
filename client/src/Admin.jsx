import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";

function Admin() {
   const [tickets, setTickets] = useState([]);

   useEffect(() => {
      const fetchTickets = async () => {
         const token = localStorage.getItem("adminToken");
         if (!token) {
            toast.error("Unauthorized access. Please log in.");
            Navigate("/login");
            return;
         }

         try {
            const response = await axios.get(
               "https://iozhen-support.liara.run/api/tickets",
               {
                  headers: {
                     Authorization: `Bearer ${token}`,
                  },
               }
            );
            if (response.status === 200) {
               setTickets(response.data);
            } else {
               toast.error("Failed to fetch tickets.");
            }
         } catch (error) {
            toast.error("Error fetching tickets, please try again.");
         }
      };

      fetchTickets();
   }, []);

   return (
      <div className="m-10">
         <ToastContainer />
         <h2 className="mb-6 text-3xl font-bold">Admin Dashboard</h2>
         <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
               <thead>
                  <tr>
                     <th className="px-4 py-2 text-center border-b">
                        First Name
                     </th>
                     <th className="px-4 py-2 text-center border-b">
                        Last Name
                     </th>
                     <th className="px-4 py-2 text-center border-b">
                        Description
                     </th>
                     <th className="px-4 py-2 text-center border-b">Rating</th>
                  </tr>
               </thead>
               <tbody>
                  {tickets.map((ticket) => (
                     <tr key={ticket.id}>
                        <td className="px-4 py-2 text-center border-b">
                           {ticket.firstName}
                        </td>
                        <td className="px-4 py-2 text-center border-b">
                           {ticket.lastName}
                        </td>
                        <td className="px-4 py-2 text-center border-b description-cell">
                           {ticket.description}
                        </td>
                        <td className="px-4 py-2 text-center border-b">
                           {ticket.score}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}

export default Admin;
