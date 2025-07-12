import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getJobsByCompanyId, getCompanyById } from '../services/api';
import Company from './Company';

function CompanyJobList() {
    const { companyId } = useParams();
    const [jobs, setJobs] = useState([]);
    const [company, setCompany] = useState(null); // ✅ This was likely missing
    const navigate = useNavigate();

    useEffect(() => {
        getJobsByCompanyId(companyId)
            .then(res => setJobs(res.data))
            .catch(err => console.error('Error fetching jobs:', err));

        // Fetch Company Info
        getCompanyById(companyId)
            .then(res => setCompany(res.data))
            .catch(err => console.error('Error fetching company:', err));
    }, [companyId]);

    const data = getCompanyById(companyId);
    console.log(data);


    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 sm:p-8">
                {/* 🔙 Back Button and Title */}
                <div className="flex items-center mb-6">
                    <button
                        className="text-blue-600 hover:text-blue-800 font-semibold mr-4 px-3 py-1 border border-blue-500 rounded"
                        onClick={() => navigate(-1)}
                    >
                        ← Back
                    </button>
                    <h2 className="text-2xl font-bold text-blue-800">
                        Job Openings {company ? `at ${company.name}` : ''}
                    </h2>
                </div>
                {/* <h2 className="text-2xl font-bold text-blue-800 mb-6">
                    Job Openings {company ? `at ${company.name}` : ''}
                </h2> */}

                {jobs.length === 0 ? (
                    <p className="text-gray-500">No jobs found for this company.</p>
                ) : (
                    <ul className="space-y-4">
                        {jobs.map(job => (
                            <li key={job.id} className="border border-gray-200 rounded p-4 shadow-sm hover:shadow-md transition">
                                <h3 className="text-lg font-semibold text-blue-700">{job.title}</h3>
                                <p className="text-gray-600">{job.description}</p>
                                <p className="text-sm text-gray-500 mt-2">Location: {job.location}</p>
                                <p className="text-sm text-gray-500">Salary: ₹{job.minSalary} - ₹{job.maxSalary}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default CompanyJobList;
