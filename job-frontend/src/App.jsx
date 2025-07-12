// import { useEffect, useState } from 'react'
// import './App.css'
// import { getCompanies } from './services/api';

// function App() {

//   const [companies, setCompanies] = useState([]);

//   useEffect(()=>{
//     getCompanies().then(response =>{
//       setCompanies(response.data);
//     })
//     .catch(error => {
//       console.error("Error Fetching Companies: ",error);
      
//     })
//   })

//   return (
//     <>
//        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
//       <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 sm:p-8">
//         <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-800 text-center mb-8 tracking-tight">
//           Job Application Portal
//         </h1>

//         <div className="mb-8">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
//             Featured Companies
//           </h2>
//           <ul className="space-y-4">
//             {companies.map((company) => (
//               <li
//                 key={company.id}
//                 className="bg-blue-50 hover:bg-blue-100 rounded-lg p-4 transition duration-300 ease-in-out transform hover:scale-[1.02] flex flex-col sm:flex-row justify-between items-start sm:items-center"
//               >
//                 <div>
//                   <p className="text-lg font-semibold text-blue-700">{company.name}</p>
//                   <p className="text-gray-600 text-sm sm:text-base mt-1 sm:mt-0">{company.description}</p>
//                 </div>
//                 <button className="mt-3 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200">
//                   View Openings
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* You can add more sections here, e.g., "Your Applications", "Browse Jobs" */}
//         <div className="mt-10 pt-6 border-t-2 border-gray-200 text-center text-gray-500 text-sm">
//           &copy; {new Date().getFullYear()} Job Application Portal. All rights reserved.
//         </div>
//       </div>
//     </div>
//     </>
//   )

  
// }

// export default App

import { Routes, Route, Link } from 'react-router-dom';
import Company from './pages/Company';
import Job from './pages/Job';
import CompanyJobList  from './pages/CompanyJobList';
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-[#10182B] font-sans antialiased flex flex-col">
      {/* Header/Banner */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-4 shadow-md ">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-3xl font-extrabold tracking-tight hover:text-blue-200 transition duration-300 ease-in-out ">
            Job Finder Pro
          </Link>
          {/* Main Navigation */}
          <nav className="space-x-6">
            <Link
              to="/companies"
              className="text-white hover:text-blue-200 transition duration-300 ease-in-out font-medium text-lg"
            >
              Companies
            </Link>
            <Link
              to="/jobs"
              className="text-white hover:text-blue-200 transition duration-300 ease-in-out font-medium text-lg"
            >
              Jobs
            </Link>
            {/* Add more nav items as needed */}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto p-6 lg:p-8 w-full">
        <Routes>
          {/* Home Page Route */}
          <Route path="/" element={
            <div className="bg-gray-200 shadow-xl rounded-lg p-8 sm:p-12 text-center">
              <h2 className="text-4xl font-extrabold text-blue-800 mb-6">
                Your Next Opportunity Awaits!
              </h2>
              <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                Discover exciting job openings and explore leading companies.
                Start your career journey with Job Finder Pro.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link
                  to="/jobs"
                  className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md
                             hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  Browse Jobs
                </Link>
                <Link
                  to="/companies"
                  className="inline-block px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg shadow-md
                             hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  Explore Companies
                </Link>
              </div>
            </div>
          } />
          {/* Other Routes */}
          <Route path="/companies" element={<Company />} />
          <Route path="/jobs" element={<Job />} />
          <Route path="/companies/:companyId/jobs" element={<CompanyJobList />} /> ✅ Added route
        </Routes>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 bg-gray-800 text-white text-center text-sm">
        <div className="max-w-7xl mx-auto">
          &copy; {new Date().getFullYear()} Job Finder Pro. All rights reserved. | <a href="#" className="hover:underline text-blue-300">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
