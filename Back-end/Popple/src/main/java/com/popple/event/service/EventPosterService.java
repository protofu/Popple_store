package com.popple.event.service;

import org.springframework.stereotype.Service;

import com.popple.event.respository.EventPosterRepository;
import com.popple.event.utils.EventPosterUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class EventPosterService {
	private final EventPosterRepository eventPosterRepository;
	private final EventPosterUtils eventPosterUtils;
}
