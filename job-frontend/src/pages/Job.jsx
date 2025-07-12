// import { useEffect, useState } from 'react';
// import { getJobs } from '../services/api';

// function JobPage() {
//   const [jobs, setJobs] = useState([]);

//   useEffect(() => {
//     getJobs()
//       .then(res => setJobs(res.data))
//       .catch(err => console.error('Error fetching jobs:', err));
//   }, []);

//   console.log(getJobs())
//   return (
//     <div className='text-white'>
//       <h2 className="text-xl font-semibold mb-2">Jobs</h2>
//       <ul className="list-disc pl-5">
//         {jobs.map(job => (
//           <li key={job.id} className="mb-1">
//             {job.title} 
//             {job.description}
//             {job.location}
//             {job.minSalary}
//             {job.maxSalary}
//             {job.location}

//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default JobPage;


import { useEffect, useState } from 'react';
import { getJobs } from '../services/api'; // Ensure this path is correct

function JobPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getJobs()
      .then(res => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 font-sans antialiased p-8 flex justify-center items-center">
        <div className="text-blue-700 text-xl font-semibold">Loading jobs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-red-50 font-sans antialiased p-8 flex justify-center items-center">
        <div className="text-red-700 text-xl font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  font-sans antialiased p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 sm:p-8">
        <h2 className="text-3xl font-extrabold text-blue-800 text-center mb-8 tracking-tight">
          Job Openings
        </h2>

        {jobs.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No job openings found at the moment.</p>
        ) : (
          <div className="space-y-6">
            {jobs.map(job => (
              <div key={job.id} className="bg-blue-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold text-blue-700 mb-2">{job.title}</h3>
                <p className="text-gray-700 mb-3">{job.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-800 mb-4">
                  <div>
                    <span className="font-semibold">Salary:</span> ₹{parseInt(job.minSalary).toLocaleString()} - ₹{parseInt(job.maxSalary).toLocaleString()}
                  </div>
                  <div>
                    <span className="font-semibold">Location:</span> {job.location}
                  </div>
                </div>

                <div className="bg-white rounded-md p-4 mt-4 border border-blue-100">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Company Details:</h4>
                  <p className="font-medium text-blue-600">{job.company.name}</p>
                  <p className="text-gray-600 text-sm italic">{job.company.description}</p>

                  {job.company.reviews && job.company.reviews.length > 0 && (
                    <div className="mt-4">
                      <h5 className="text-md font-semibold text-gray-700 mb-2">Reviews:</h5>
                      <ul className="space-y-2">
                        {job.company.reviews.map(review => (
                          <li key={review.id} className="bg-gray-50 rounded-md p-3 text-sm border border-gray-200">
                            <p className="font-semibold text-gray-800">{review.title}</p>
                            <p className="text-gray-600">{review.description}</p>
                            <p className="text-gray-500 text-xs mt-1">Rating: {review.rating.toFixed(1)} / 5</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default JobPage;