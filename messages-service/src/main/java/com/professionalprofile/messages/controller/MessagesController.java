package com.professionalprofile.messages.controller;

import com.professionalprofile.messages.domain.Message;
import com.professionalprofile.messages.service.MessagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class MessagesController {

	@Autowired
	private MessagesService messagesService;

	@PreAuthorize("isFullyAuthenticated()")
	@RequestMapping(path = "/", method = RequestMethod.GET)
	public Iterable<Message> getAllMessages() {
		return messagesService.findAll();
	}

	@PreAuthorize("isFullyAuthenticated()")
	@RequestMapping(path = "/", method = RequestMethod.PUT)
	public void updateMessage(@Valid @RequestBody Message message) {
		messagesService.update(message);
	}

	@RequestMapping(path = "/{captchaToken}", method = RequestMethod.POST)
	public Message createMessage(@PathVariable String captchaToken, @Valid @RequestBody Message message) {
		return messagesService.create(captchaToken, message);
	}

	@PreAuthorize("isFullyAuthenticated()")
	@RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
	public void deleteMessage(@PathVariable String id) {
		messagesService.delete(id);
	}
}
