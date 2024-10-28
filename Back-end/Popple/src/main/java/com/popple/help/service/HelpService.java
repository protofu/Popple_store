package com.popple.help.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.popple.auth.domain.RoleEnum;
import com.popple.auth.entity.User;
import com.popple.help.domain.AnswerRequest;
import com.popple.help.domain.AnswerResponse;
import com.popple.help.domain.HelpRequest;
import com.popple.help.domain.HelpResponse;
import com.popple.help.entity.Help;
import com.popple.help.repository.HelpRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class HelpService {
    private final HelpRepository helpRepository;

    public List<HelpResponse> getAllHelps() {
		List<Help> helps = helpRepository.findAll();
		List<HelpResponse> helpRes = helps.stream().map(HelpResponse::toDTO).collect(Collectors.toList());
		return helpRes;
	}
    
    // 문의 생성
	public HelpResponse insert(HelpRequest req, User user) {
		Help help = Help.builder()
				.user(user)
				.title(req.getTitle())
				.description(req.getDescription())
				.build();
		Help savedHelp = helpRepository.save(help);
		return HelpResponse.toDTO(savedHelp);
	}

	// 문의 삭제
	public boolean delete(Long id, User user) {
		Help help = helpRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 문의가 존재하지 않습니다."));
		if (!help.getUser().getId().equals(user.getId())) {
			throw new IllegalArgumentException("본인의 문의만 삭제할 수 있습니다.");
		}
		helpRepository.deleteById(id);
		return true;
	}

	// 답변
	public AnswerResponse reply(AnswerRequest req, User user) {
		Help help = helpRepository.findById(req.getId()).orElseThrow(() -> new IllegalArgumentException("해당 문의가 존재하지 않습니다"));
		if (!user.getRole().equals(RoleEnum.ROLE_ADMIN)) {
			throw new IllegalArgumentException("관리자만 작성할 수 있습니다.");
		}
		help.setAdminName(user.getNickname());
		help.setAnswer(req.getAnswer());
		Help savedHelp = helpRepository.save(help);
		return AnswerResponse.builder()
				.id(savedHelp.getId())
				.build();
	}

	public HelpResponse getHelp(Long id, User user) {
		Help help = helpRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 문의가 존재하지 않습니다."));
		if (!help.getUser().getId().equals(user.getId())) {
			throw new IllegalArgumentException("본인의 문의만 확인할 수 있습니다.");
		}
		log.info(help.toString());
		return HelpResponse.toDTO(help);
	}
    

}
