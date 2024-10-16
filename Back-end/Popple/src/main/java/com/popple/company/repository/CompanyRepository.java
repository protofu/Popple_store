package com.popple.company.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.popple.company.entity.Company;

public interface CompanyRepository extends JpaRepository<Company, Long> {

}
