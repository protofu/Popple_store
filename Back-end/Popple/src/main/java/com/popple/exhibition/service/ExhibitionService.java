package com.popple.exhibition.service;

import org.springframework.stereotype.Service;

import com.popple.exhibition.repository.ExhibitionRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ExhibitionService {
	private final ExhibitionRepository exhibitionRepository;
	
	
}
