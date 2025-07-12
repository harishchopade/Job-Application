import { useEffect, useState } from 'react';
import { getCompanies } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Company() {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  // ✅ Pass the specific company ID to the function
  const handleViewOpenings = (companyId) => {
    navigate(`/companies/${companyId}/jobs`);
  };

  useEffect(() => {
    getCompanies()
      .then(res => setCompanies(res.data))
      .catch(err => console.error('Error fetching companies:', err));
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 sm:p-8">
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
            Featured Companies
          </h2>
          <ul className="space-y-4">
            {companies.map((company) => (
              <li
                key={company.id}
                className="bg-blue-50 hover:bg-blue-100 rounded-lg p-4 transition duration-300 ease-in-out transform hover:scale-[1.02] flex flex-col sm:flex-row justify-between items-start sm:items-center"
              >
                <div>
                  <p className="text-lg font-semibold text-blue-700">{company.name}</p>
                  <p className="text-gray-600 text-sm sm:text-base mt-1 sm:mt-0">{company.description}</p>
                </div>
                <button
                  className="mt-3 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
                  onClick={() => handleViewOpenings(company.id)} // ✅ Pass company.id here
                >
                  View Openings
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 pt-6 border-t-2 border-gray-200 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Job Application Portal. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Company;
