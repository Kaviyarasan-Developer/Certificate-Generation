package com.api.repo;
import java.util.List;
//import java.util.Optional;// it is using only fetching id in single value 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.api.entity.Candidate;

public interface CandidateRepo extends JpaRepository<Candidate, Integer> {
    List<Candidate> findByEmail(String email);
    List<Candidate> findByPhone(String phone);
    List<Candidate> findBycertificateNumber(String certificateNumber);
	

    @Query("SELECT c.certificateNumber FROM Candidate c ORDER BY c.id DESC LIMIT 1")
    String findLastCertificateNumber();
	
}
