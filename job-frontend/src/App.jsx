import { Routes, Route, Link } from 'react-router-dom';
import Company from './pages/Company';
import Job from './pages/Job';
import CompanyJobList  from './pages/CompanyJobList';
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-[#10182B] font-sans antialiased flex flex-col">
      
      <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-4 shadow-md ">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-3xl font-extrabold tracking-tight hover:text-blue-200 transition duration-300 ease-in-out ">
            HireHub
          </Link>
          
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
            
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto p-6 lg:p-8 w-full">
        <Routes>

          <Route path="/" element={
            <div className="bg-gray-200 shadow-xl rounded-lg p-8 sm:p-12 text-center">
              <h2 className="text-4xl font-extrabold text-blue-800 mb-6">
                Your Next Opportunity Awaits!
              </h2>
              <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                Discover exciting job openings and explore leading companies.
                Start your career journey with HireHub.
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
          
          <Route path="/companies" element={<Company />} />
          <Route path="/jobs" element={<Job />} />
          <Route path="/companies/:companyId/jobs" element={<CompanyJobList />} /> ✅ Added route
        </Routes>
      </main>

      
      <footer className="mt-auto py-6 bg-gray-800 text-white text-center text-sm">
        <div className="max-w-7xl mx-auto">
          &copy; {new Date().getFullYear()} HireHub. All rights reserved. | <a href="#" className="hover:underline text-blue-300">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
