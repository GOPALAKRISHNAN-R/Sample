package com.example.sample.repository;

import org.springframework.data.repository.CrudRepository;

import com.example.sample.model.User;

public interface UserRepository extends CrudRepository<User, Long>{

}
