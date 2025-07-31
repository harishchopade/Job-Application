import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
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
  )
}

export default HomePage