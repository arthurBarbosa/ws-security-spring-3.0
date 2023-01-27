package com.abcode.security.application.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/categories")
public class CategoryResource {

    @GetMapping
    public ResponseEntity<String> getCategories(){
        return ResponseEntity.ok("Hello categories ");
    }
}
