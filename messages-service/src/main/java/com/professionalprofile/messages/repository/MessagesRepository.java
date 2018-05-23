package com.professionalprofile.messages.repository;

import com.professionalprofile.messages.domain.Message;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessagesRepository extends CrudRepository<Message, String> {
}