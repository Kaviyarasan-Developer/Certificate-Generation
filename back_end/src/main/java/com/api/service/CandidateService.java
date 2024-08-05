package com.api.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.api.entity.Candidate;
import com.api.repo.CandidateRepo;

@Service
public class CandidateService {
    
    @Autowired
    private CandidateRepo candidateRepo;

    public Candidate save(Candidate candidate) {
        return candidateRepo.save(candidate);
    }

    public List<Candidate> findAll() {
        return candidateRepo.findAll();
    }

    public Optional<Candidate> findById(Integer id) {
        return candidateRepo.findById(id);
    }

    public void deleteById(Integer id) {
        candidateRepo.deleteById(id);
    }
    
    public List<Candidate> findByEmail(String email) {
        return candidateRepo.findByEmail(email);
    }

    public List<Candidate> findByPhone(String phone) {
        return candidateRepo.findByPhone(phone);
    }
    
    public String getLastCertificateNumber() {
        return candidateRepo.findLastCertificateNumber();
    }
	
    
//    public List<Candidate> findBycertificateNumber(String certificateNumber) {
//        return candidateRepo.findBycertificateNumber(certificateNumber);
//    }
}
