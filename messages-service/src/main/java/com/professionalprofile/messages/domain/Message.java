package com.professionalprofile.messages.domain;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.security.PublicKey;
import java.util.Date;

@Document(collection = "messages")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Message {
	@Id
	public String id;

	public Date date;

	public String name;

	public String email;

	public String subject;

	public String message;

	public Boolean read;
}