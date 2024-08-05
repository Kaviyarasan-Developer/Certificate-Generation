import React, { useState, useEffect, useRef } from 'react';
import './Pdf.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';

export default function PdfView({ certificateId }) {
    const [certificateDetails, setCertificateDetails] = useState(null);
    const certificateRef = useRef();

    useEffect(() => {
        const fetchCertificateDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/Certificate/${certificateId}`);
                setCertificateDetails(response.data);
            } catch (error) {
                console.error('Error fetching certificate details:', error);
            }
        };

        fetchCertificateDetails();
    }, [certificateId]);

    const handleDownloadPdf = async () => {
        const element = certificateRef.current;
        if (element) {
            const canvas = await html2canvas(element);
            const data = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [canvas.width, canvas.height],
            });
            pdf.addImage(data, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save('certificate.pdf');
        } else {
            console.error('Reference to certificate element is not set.');
        }
    };

    if (!certificateDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div ref={certificateRef} className="certificateStyle">
                <div className="overlayStyle">
                    <h1 className="headingStyle">Certificate of Completion</h1>
                    <p className="nameStyle">{certificateDetails.name}</p>
                    <p className="courseStyle">{certificateDetails.course}</p>
                    <p className="dateStyle">{certificateDetails.date}</p>
                </div>
            </div>
            <button onClick={handleDownloadPdf}>Download PDF</button>
        </div>
    );
}
