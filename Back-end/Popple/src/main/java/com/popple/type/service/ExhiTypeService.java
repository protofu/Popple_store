package com.popple.type.service;

import org.springframework.stereotype.Service;

import com.popple.type.ExhiType;
import com.popple.type.domain.ExhiTypeRequest;
import com.popple.type.domain.ExhiTypeResponse;
import com.popple.type.repository.ExhiTypeRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor

public class ExhiTypeService {
	private final ExhiTypeRepository eTrepo;
	
	public ExhiTypeResponse getExhiType(ExhiTypeRequest req) {
		
		ExhiType type = eTrepo.findById(req.getId()).orElseThrow(()->new IllegalArgumentException("없는 타입입니다."));
		ExhiTypeResponse exRes = ExhiTypeResponse.toDTO(type);
		return exRes;
	}

}
