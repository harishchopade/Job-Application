package com.springproject.jobapplication.company;

import java.util.List;

public interface CompanyService {

    List<Company> getAllCompanies();

    void createCompany(Company company);

    Company getCompanyById(long id);
    boolean deleteCompanyById(long id);

    boolean updateCompanyById(long id, Company updatedCompany);

}
