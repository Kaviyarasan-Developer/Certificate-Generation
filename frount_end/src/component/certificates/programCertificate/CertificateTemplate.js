import React, { useEffect, useState } from 'react';
import './CertificateTemplate.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import image1 from "./image1.png"

export default function CertificateTemplate() {
  const { id } = useParams();
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/Certificate/${id}`);
        setCertificate(response.data);
      } catch (error) {
        console.error('Error fetching certificate:', error);
      }
    };

    fetchCertificate();
  }, [id]);

  const downloadPDF = (id) => {
    const input = document.getElementById(id);
    html2canvas(input, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('landscape', 'pt', [canvas.width, canvas.height]);
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('certificate.pdf');
      });
  }

  const getFormattedDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'numeric', 
      day: 'numeric' 
    });
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return date.toLocaleDateString('en-IN', options);
  }
  return (
    <div className='container'>
      {certificate ? (
        <div>
          <div className='certificate' id={`certificate-${certificate.id}`}>
            <div className='cimg-container'>
              <img src={image1} alt='' className='cimg'/>
              <div className='name'>{certificate.candiddateName}</div>
              <div className='corse'>{certificate.coresName}</div>
              <div className='grade'>{certificate.grade}</div>
              <div className='sdate'>{ formatDate (certificate.startingDate)}</div>
              <div className='edate'>{ formatDate (certificate.endingDate)}</div>
              <div className='today'>{getFormattedDate()}</div>
              <div className='sign'>sign</div>
              <div className='cnu'><h6>No:<span className='cnum'>{certificate.certificateNumber}</span></h6></div>
            </div>
          </div>
          <button onClick={() => downloadPDF(`certificate-${certificate.id}`)}>Download PDF</button>
        </div>
      ) : (
        <p>Loading certificate...</p>
      )}
    </div>
  )
}
