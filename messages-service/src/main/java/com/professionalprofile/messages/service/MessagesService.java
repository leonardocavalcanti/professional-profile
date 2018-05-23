package com.professionalprofile.messages.service;

import com.professionalprofile.messages.domain.Message;

public interface MessagesService {

	/**
	 * Find all messages
	 *
	 * @return message list
	 */
	Iterable<Message> findAll();

	/**
	 * Creates new message with default parameters
	 *
	 * @param create
	 * @return created message
	 */
	Message create(String captchaToken, Message create);

	/**
	 * Validates and applies incoming message updates
	 *
	 * @param update
	 */
	void update(Message update);

	/**
	 * Validates and deletes message by id
	 *
	 * @param id
	 */
	void delete(String id);
}
