package com.professionalprofile.skills.domain;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.security.PublicKey;

@Document(collection = "skills")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Skill {
	@Id
	public String id;

	public String name;

	public String description;
}