import React, { useState } from 'react';
import './Find.css';
import { FaDatabase } from 'react-icons/fa';
import { FcSearch } from "react-icons/fc";
import { FcList, FcInfo, FcFullTrash } from "react-icons/fc";
import { FcInternal } from "react-icons/fc";
import { Link } from 'react-router-dom';
import apiService from './apiFind';

export default function Find() {
  const [candidates, setCandidates] = useState([]);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);

  // Search candidate using mobile number or email
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const params = {};
      if (email) params.email = email;
      if (phone) params.phone = phone;

      const result = await apiService.searchCandidate(params);
      setCandidates(result.data); // Set the state with the fetched data
      setError(null);
    } catch (error) {
      setError('Candidate not found or an error occurred');
      setCandidates([]);
    }
  };

  // Delete candidate using id
  const deleteCandidate = async (id) => {
    try {
      await apiService.deleteByCandidate(id);
      // Optionally: remove the deleted candidate from the state
      setCandidates(candidates.filter(candidate => candidate.id !== id));
    } catch (error) {
      console.log(error);
    }
  }


  // updte candidate 

  const updateCandidate = async (candidate) => {
    const updatedName = prompt("Enter new candidate name:", candidate.candiddateName);
    if (updatedName === null) return; // Cancelled
  
    try {
      const updatedData = { ...candidate, candiddateName: updatedName };
      await apiService.updateCandidate(candidate.id, updatedData);
      // Update the candidate in the state
      setCandidates(candidates.map(c =>
        c.id === candidate.id ? updatedData : c
      ));
    } catch (error) {
      console.log('Error updating candidate:', error);
    }
  }
  // Find all candidates
  const fetchAllCandidates = async () => {
    try {
      const result = await apiService.getAllCandidates();
      setCandidates(result.data); // Set the state with the fetched data
    } catch (error) {
      setError('Failed to fetch candidates');
    }
  };

  // Format a date without time
  const formatDate = (isoDate) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <div className=''>
        
        <div>
        <form className="form-inline " onSubmit={handleSearch}>
          <div className="form-group mx-sm-3 mb-2 find">
            <div>
            <label htmlFor="email" className="sr-only">Enter email <FaDatabase /></label>
            <input 
              type="text" 
              className="form-control" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="email" 
            />
            </div>
            <div id='span'>or</div>
            
            <div>
            <label htmlFor="phone" className="sr-only">Enter phone <FaDatabase /></label>
            <input 
              type="text" 
              className="form-control i" 
              id="phone" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              placeholder="phone" 
            />
            </div>
           
            <div id='find-btn'>
              
            <button type="submit" className="btn btn-primary mb-2 ">
            <FcSearch /> Find the candidate
          </button>
            </div>
            
          </div>
         
         
      
        </form>
        
        </div>

        <div id='btn-all'>
      <button type="button" onClick={fetchAllCandidates} className="btn btn-success mb-2 " >
        <FcList /> All Candidates
      </button>
      </div>
      </div>
      
      <div>
      <div> {error && <p>{error}</p>}</div>
        <table className="table">
          <thead>
            
            <tr>
              <th scope="col">#</th>
              <th scope="col">Certificate Number</th>
              <th scope="col">Course Name</th>
              <th scope="col">Candidate Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Starting Date</th>
              <th scope="col">Ending Date</th>
              <th scope="col">Grade</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, index) => (
              <tr key={candidate.id}>
                <th scope="row">{index + 1}</th>
                <td>{candidate.certificateNumber}</td>
                <td>{candidate.coresName}</td>
                <td>{candidate.candiddateName}</td>
                <td>{candidate.email}</td>
                <td>{candidate.phone}</td>
                <td>{formatDate(candidate.startingDate)}</td>
                <td>{formatDate(candidate.endingDate)}</td>
                <td>{candidate.grade}</td>
                <td>
                  <Link to={`/view/${candidate.id}`}>
                    <button type='button' className='btn btn-outline-success'><FcInternal/></button>
                  </Link>
                  {/* Update button */}
                  
                    <button type='button' className='btn btn-outline-warning' onClick={()=>updateCandidate(candidate)}><FcInfo /></button>
                  
                  {/* delete button */}
                  <button  type='button'   className='btn btn-outline-danger btn-sm'
                    onClick={() => deleteCandidate(candidate.id)}> <FcFullTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
