import axios from 'axios';
import { makeAuthenticatedRequest } from './auth';
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export async function getCompanies() {

  try {
    const response = await makeAuthenticatedRequest(`${API_URL}/api/companies`);
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
        const response = await makeAuthenticatedRequest(`${API_URL}/api/jobs`);
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

export async function getJobsByCompanyId(companyId) {
    try {
      const response = await makeAuthenticatedRequest(`${API_URL}/api/companies/${companyId}/jobs`);
      console.log("company by id : ",response);

      if(response.ok){
        const data = await response.json();
        console.log("data : ",data);

        return data;        
      }
      else{
        console.error('Error in getJobsByCompanyId:', error);
      }
      
    } catch (error) {
      console.error('Error in get jobs by id', error);
      throw error;
    }
};

export const getCompanyById = (companyId) => {
  return axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/companies/${companyId}`);
};