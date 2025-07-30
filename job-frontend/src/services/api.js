import axios from 'axios';
import { makeAuthenticatedRequest } from './auth';

export async function getCompanies() {

  try {
    const response = await makeAuthenticatedRequest('http://localhost:8080/api/companies');
    console.log("Companies : ",response);

    if (response.ok) {
      const data = await response.json();
      return {data};
    } else {
      throw new error('Failed to fetch companies')
    }
    
  } catch (error) {
      console.error('Error in getJobs:', error);
      throw error;
  }
};

export async function getJobs() {
    try {
        const response = await makeAuthenticatedRequest('http://localhost:8080/api/jobs');
        console.log("Frontend Api : ",response)
        
        if (response.ok) {
            const data = await response.json();
            console.log("data : ",data);
            
            return data; // Return in the format your component expects
        } else {
            throw new Error('Failed to fetch jobs');
        }
    } catch (error) {
        console.error('Error in getJobs:', error);
        throw error;
    }
}

export const getJobsByCompanyId = (companyId) => {
  return axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/companies/${companyId}/jobs`);
};

export const getCompanyById = (companyId) => {
  return axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/companies/${companyId}`);
};