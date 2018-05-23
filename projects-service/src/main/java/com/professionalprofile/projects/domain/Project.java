package com.professionalprofile.projects.domain;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.security.PublicKey;

@Document(collection = "projects")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Project {
	@Id
	public String id;

	public String name;

	public String description;

	public String icon;

	public String demoURL;

	public String sourceURL;
}