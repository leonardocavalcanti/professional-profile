package com.professionalprofile.jobs.domain;

import java.util.Date;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "jobs")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Job {
	@Id
	public String id;

	public String companyName;

	public String role;

	public Date startDate;

	public Date finishDate;

	public String description;

	public String longDescription;
}