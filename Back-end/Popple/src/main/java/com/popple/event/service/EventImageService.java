package com.popple.event.service;

import org.springframework.stereotype.Service;

import com.popple.event.respository.EventImageRepository;
import com.popple.event.utils.EventImageUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class EventImageService {
	private final EventImageRepository eventImageRepository;
	private final EventImageUtils evnetImageUtils;

}
