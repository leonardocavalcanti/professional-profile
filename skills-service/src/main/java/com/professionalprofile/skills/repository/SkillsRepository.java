package com.professionalprofile.skills.repository;

import com.professionalprofile.skills.domain.Skill;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillsRepository extends CrudRepository<Skill, String> {
}