package com.api.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.api.entity.Candidate;
import com.api.service.CandidateService;

@Controller
@RequestMapping("/Certificate")
@CrossOrigin(origins = "http://localhost:3000")
public class CandidateController {
    
    @Autowired
    private CandidateService candidateService;
    
    @PostMapping
    public ResponseEntity<Candidate> saveCandidate(@RequestBody Candidate candidate) {
        Candidate saved = candidateService.save(candidate);
        return ResponseEntity.ok(saved);
    }
    
    @GetMapping
    public ResponseEntity<List<Candidate>> findAll() {
        List<Candidate> candidates = candidateService.findAll();
        return ResponseEntity.ok(candidates);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Integer id) {
        candidateService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Candidate> findCandidateById(@PathVariable Integer id) {
        Optional<Candidate> candidate = candidateService.findById(id);
        return candidate.map(ResponseEntity::ok)
                        .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Candidate> updateCandidate(@PathVariable Integer id, @RequestBody Candidate candidate) {
        Optional<Candidate> existingCandidate = candidateService.findById(id);
        if (existingCandidate.isPresent()) {
            Candidate can = existingCandidate.get();
            can.setCandiddateName(candidate.getCandiddateName());
            can.setCoresName(candidate.getCoresName());
            can.setEmail(candidate.getEmail());
            can.setPhone(candidate.getPhone());
            can.setStartingDate(candidate.getStartingDate());
            can.setEndingDate(candidate.getEndingDate());
            can.setGrade(candidate.getGrade());
            Candidate updatedCandidate = candidateService.save(can);
            return ResponseEntity.ok(updatedCandidate);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Candidate>> findCandidateByEmailOrPhone(
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String phone) {
        List<Candidate> candidate = List.of();
        if (email != null) {
            candidate = candidateService.findByEmail(email);
        } else if (phone != null) {
            candidate = candidateService.findByPhone(phone);
        }
        return ResponseEntity.ok(candidate);
        
    }
    
    @GetMapping("/last")
    public ResponseEntity<String> getLastCertificateNumber() {
        String lastCertificateNumber = candidateService.getLastCertificateNumber();
        return ResponseEntity.ok(lastCertificateNumber);
    }
}
