import axios from 'axios';

export const getCompanies = () => {
  return axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/companies`);
};

export const getJobs = () => {
    return axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/jobs`);
}

export const getJobsByCompanyId = (companyId) => {
  return axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/companies/${companyId}/jobs`);
};

export const getCompanyById = (companyId) => {
  return axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/companies/${companyId}`);
};