import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { saveAs } from 'file-saver'; // Ensure this library is correctly installed
import { pdfMake, pdfFonts } from 'pdfmake/build/pdfmake';
import { vfs } from 'pdfmake/build/vfs_fonts';
import authService from '../services/authService'; // Import your authService

const Profile = () => {
  const [currentBill, setCurrentBill] = useState(null);
  const [pastBills, setPastBills] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const bills = await authService.getBills();
        setCurrentBill(bills.currentBill);
        setPastBills(bills.pastBills);
      } catch (error) {
        console.error('Error fetching bills:', error);
      }
    };

    fetchBills();
  }, []);

  const handleDownload = async (billId) => {
    try {
      const response = await axios.get(`/api/bills/${billId}/download`, {
        responseType: 'arraybuffer',
      });
      const file = new Blob([response.data], { type: 'application/pdf' });
      saveAs(file, `bill_${billId}.pdf`); // Use a dynamic file name based on billId
    } catch (error) {
      console.error('Error downloading bill:', error);
    }
  };

  const handleGeneratePDF = async () => {
    try {
      const docDefinition = {
        content: [
          { text: 'Current Bill Details', style: 'header' },
          `Amount Due: ${currentBill.amountDue}`,
          `Due Date: ${currentBill.dueDate}`,
          // Add other current bill details here
          { text: 'Past Bills', style: 'subheader' },
          ...pastBills.map(bill => ({
            text: `Bill ID: ${bill.id} - Amount: ${bill.amount} - Date: ${bill.date}`,
            style: 'text',
          })),
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10],
          },
          subheader: {
            fontSize: 16,
            margin: [0, 10, 0, 5],
          },
          text: {
            fontSize: 12,
            margin: [0, 0, 0, 5],
          },
        },
      };

      pdfMake.vfs = vfs;
      pdfMake.createPdf(docDefinition).download('bills_summary.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-primary">
      <h1 className="text-white text-4xl mb-8">Profile</h1>
      {currentBill && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4">Current Bill</h2>
          <p>Amount Due: {currentBill.amountDue}</p>
          <p>Due Date: {currentBill.dueDate}</p>
          {/* Add more current bill details here */}
          <button
            onClick={handleGeneratePDF}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
          >
            Download Bill Summary
          </button>
        </div>
      )}
      {pastBills.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Past Bills</h2>
          <ul>
            {pastBills.map(bill => (
              <li key={bill.id} className="flex justify-between items-center mb-2">
                <span>Bill ID: {bill.id} - Amount: {bill.amount} - Date: {bill.date}</span>
                <button
                  onClick={() => handleDownload(bill.id)}
                  className="bg-green-500 text-white py-1 px-3 rounded"
                >
                  Download
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
