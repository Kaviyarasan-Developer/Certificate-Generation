import React, { useState, useEffect } from 'react';
import './Certificate.css';
import axios from 'axios';

const OrignalCertificate = () => {
  const [certificate, setCertificate] = useState({
    certificateNumber: '',
    coresName: '',
    candiddateName: '',
    email: '',
    phone: '',
    startingDate: '',
    endingDate: '',
    grade: 'A+'
  });

  // Function to fetch the last certificate number from the server
  const fetchLastCertificateNumber = async () => {
    try {
      const response = await axios.get('http://localhost:8080/Certificate/last');
      const lastCertificateNumber = response.data;  // assuming response.data is the string
      const lastNumber = parseInt(lastCertificateNumber.slice(2));
      const newNumber = lastNumber + 1;
      const newCertificateNumber = `AB${newNumber.toString().padStart(4, '0')}`;
      setCertificate(prev => ({ ...prev, certificateNumber: newCertificateNumber }));
    } catch (error) {
      console.error('Error fetching last certificate number:', error);
    }
  };

  useEffect(() => {
    fetchLastCertificateNumber();
  }, []);

  // Utility function to check if a date is valid
  const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the certificate state
    setCertificate((prev) => {
      // If the starting date is changed, set the ending date to three months later
      let newEndingDate = prev.endingDate;
      if (name === 'startingDate' && isValidDate(value)) {
        const startDate = new Date(value);
        const endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + 3);
        newEndingDate = endDate.toISOString().split('T')[0]; // Format to yyyy-mm-dd
      }

      // Convert candidate name to uppercase
      const updatedValue = name === 'candiddateName' ? value.toUpperCase() : value;

      return {
        ...prev,
        [name]: updatedValue,
        ...(name === 'startingDate' && { endingDate: newEndingDate }),
      };
    });
  };

  // post the data throw link api
  const handleSave = async (e) => {
    e.preventDefault();
    console.log('Saving certificate:', certificate);
    try {
      const response = await axios.post('http://localhost:8080/Certificate', {
        ...certificate,
      });
      console.log('Certificate saved:', response.data);

      // Auto-increment certificate number for the next form entry
      const lastNumber = parseInt(certificate.certificateNumber.slice(2));
      const newNumber = lastNumber + 1;
      const newCertificateNumber = `AB${newNumber.toString().padStart(4, '0')}`;

      setCertificate({
        certificateNumber: newCertificateNumber,
        coresName: '',
        candiddateName: '',
        email: '',
        phone: '',
        startingDate: '',
        endingDate: '',
        grade: 'A+',
      });
    } catch (error) {
      console.error('Error saving certificate:', error);
    }
  };

  // course title
  const courseOptions = [
    'JAVA FULLSTACK',
    'PYTHON FULLSTACK',
    'INTERNSHIP',
    'PHP',
  ];

  // Grade for candidate
  const gradeOptions = [
    'A+', 'A', 'B+', 'B',
  ];

  return (
    <div className="container certificate-container">
      <div className='fb'>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>Certificate Number</label>
            <input type="text" className="form-control" name="certificateNumber" value={certificate.certificateNumber} readOnly />
          </div>
          <div className="form-group">
            <label>Course Name</label>
            <select className="form-control" name="coresName" value={certificate.coresName} onChange={handleChange} required>
              <option value="" disabled>Select a course</option>
              {courseOptions.map((course, index) => (
                <option key={index} value={course}>{course}</option>
              ))}
            </select>
          </div>

          {/* Grade selection input block */}
          <div className="form-group">
            <label>Grade</label>
            <select className="form-control" name="grade" value={certificate.grade} onChange={handleChange} >
              <option value="" disabled>Select a grade</option>
              {gradeOptions.map((grade, index) => (
                <option key={index} value={grade}>{grade}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Candidate Name</label>
            <input type="text" className="form-control" name="candiddateName" value={certificate.candiddateName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-control" name="email" value={certificate.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="tel" className="form-control" name="phone" value={certificate.phone} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Start Date</label>
            <input type="date" className="form-control" name="startingDate" value={certificate.startingDate} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input type="date" className="form-control" name="endingDate" value={certificate.endingDate} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
      <div className="certificate-preview">
        <div className="certificate-border">
          <h6>C.NO : {certificate.certificateNumber}</h6>
          <h6>Course: {certificate.coresName}</h6>
          <h6>Name: {certificate.candiddateName}</h6>
          <h6>Email: {certificate.email}</h6>
          <h6>Date: {certificate.startingDate} To {certificate.endingDate}</h6>
          <h6>Grade: {certificate.grade}</h6>
        </div>
      </div>
    </div>
  );
};

export default OrignalCertificate;
