import axios from 'axios';

export const getCompanies = () => {
  return axios.get('http://localhost:8080/api/companies');
};

export const getJobs = () => {
    return axios.get('http://localhost:8080/api/jobs');
}

export const getJobsByCompanyId = (companyId) => {
  return axios.get(`http://localhost:8080/api/companies/${companyId}/jobs`);
};

export const getCompanyById = (companyId) => {
  return axios.get(`http://localhost:8080/api/companies/${companyId}`);
};