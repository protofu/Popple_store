package com.popple.help.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import com.popple.help.entity.Help;
import com.popple.help.repository.HelpRepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class HelpService {
    
    private final HelpRepository helpRepository;
    
    public List<Help> getAllHelps() {
        return helpRepository.findAll();
    }
    
    public Help getHelpById(Long id) {
        Optional<Help> help = helpRepository.findById(id);
        if (help.isPresent()) {
            return help.get();
        } else {
            return null;
        }
    }

    public Help createHelp(Help help) {
        return helpRepository.save(help);
    }

	public void deleteHelp(Long id) {
		helpRepository.deleteById(id);
	}
}
