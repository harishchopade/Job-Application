package com.springproject.jobapplication.company.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.springproject.jobapplication.company.Company;
import com.springproject.jobapplication.company.CompanyRepository;
import com.springproject.jobapplication.company.CompanyService;

@Service
public class CompanyServiceImpl implements CompanyService{

    CompanyRepository companyRepository;

    public CompanyServiceImpl(CompanyRepository companyRepository){
        this.companyRepository = companyRepository;
    }


    @Override
    public List<Company> getAllCompanies() {
        
        return companyRepository.findAll();
        
    }

    @Override
    public void createCompany(Company company) {
        companyRepository.save(company);
    }

    @Override
    public Company getCompanyById(long id){
        return companyRepository.findById(id).orElse(null);
    }

    @Override
    public boolean deleteCompanyById(long id){
        try {
            companyRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean updateCompanyById(long id, Company updatedCompany){
        
        Company company = companyRepository.findById(id).orElse(null);
        if(company != null){
            company.setName(updatedCompany.getName());
            company.setDescription(updatedCompany.getDescription());
            companyRepository.save(company);
            return true;
        }
        
        return false;
    }
    
}
