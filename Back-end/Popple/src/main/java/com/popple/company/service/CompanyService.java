package com.popple.company.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.popple.auth.entity.User;
import com.popple.auth.repository.UserRepository;
import com.popple.company.domain.CompanyRequest;
import com.popple.company.domain.CompanyResponse;
import com.popple.company.entity.Company;
import com.popple.company.repository.CompanyRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class CompanyService {
	private final CompanyRepository companyRepository;
	private final UserRepository userRepository;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public CompanyResponse createCompany(CompanyRequest companyRequest) {
//		닉네임, 이메일이 중복이면 진행을 안 하게(유저 기준)
		Company company = companyRequest.toEntity();
		Company savedCompany = companyRepository.save(company);
		User user = companyRequest.toUserEntity();
		String encodedPassword = bCryptPasswordEncoder.encode(companyRequest.getPassword());
		user.setPassword(encodedPassword);
		user.setCompId(savedCompany.getId());
		userRepository.save(user);
		return null;
	}

	public CompanyResponse updateCompany(CompanyRequest companyRequest, User user) {
		Company company = companyRepository.findById(user.getCompId()).orElseThrow(() -> new IllegalArgumentException("해당 기업 회원을 찾을 수 없음"));
		if(user.getCompId() == company.getId()) {

			if (companyRequest.getBuisinessNumber() != null) company.setBuisinessNumber(companyRequest.getBuisinessNumber());
			if (companyRequest.getSector() != null) company.setSector(companyRequest.getSector());
			if (companyRequest.getName() != null) company.setName(companyRequest.getName());
			if (companyRequest.getAddress() != null) company.setAddress(companyRequest.getAddress());
			if (companyRequest.getTel() != null) company.setTel(companyRequest.getTel());
			if (companyRequest.getLeader() != null) company.setLeader(companyRequest.getLeader());


			companyRepository.save(company);
			userRepository.save(user);	
		}
				
//		User u = userRepository.findById(user.getId()).orElseThrow(() -> new IllegalArgumentException("해당 기업 유저를 찾을 수 없음"));
//		if(u.getId() == user.getId()) {
//			if(companyRequest.getPassword() != null) u.setPassword(companyRequest.getPassword());
//			if(companyRequest.getName() != null) u.setNickname(companyRequest.getName());
//			if(companyRequest.getLeader() != null) u.setName(companyRequest.getLeader());
//		}
		return CompanyResponse.toDTO(company);
	}

	public CompanyResponse getCompany(Long id) {
		Company company = companyRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 기업 회원을 찾을 수 없습니다."));
		CompanyResponse dto = CompanyResponse.toDTO(company);
		User user = userRepository.findByCompId(company.getId()).orElseThrow(() -> new IllegalArgumentException("해당 기업 회원을 찾을 수 없음"));
		dto.setEmail(user.getEmail());
		return dto;
	}

	public CompanyResponse deleteCompany(Long id, User user) {
		Company company = companyRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 기업 회원을 찾을 수 없습니다."));
		if(company.getId() == user.getCompId()) {
			companyRepository.deleteById(id);
			userRepository.deleteById(user.getCompId());	
		}
		//		User u = userRepository.findById(user.getCompId(id))
		
		return null;
	}

}
