package com.professionalprofile.profile.domain;

import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "profiles")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Profile {
	@Id
	public String id;

	public String name;

	public String title;

	public String pictureURL;

	public String resumeURL;

	public String description;

	public List<ExternalPage> externalPages;
}