import axios from 'axios';

export const getCompanies = () => {
  return axios.get('http://localhost:8080/companies');
};

export const getJobs = () => {
    return axios.get('http://localhost:8080/jobs');
}

export const getJobsByCompanyId = (companyId) => {
  return axios.get(`http://localhost:8080/companies/${companyId}/jobs`);
};

export const getCompanyById = (companyId) => {
  return axios.get(`http://localhost:8080/companies/${companyId}`);
};