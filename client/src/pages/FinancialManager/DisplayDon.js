import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useReactToPrint } from "react-to-print";

export default function DisplayDon() {
  const [donations, setDonations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDonations, setFilteredDonations] = useState([]);
  const componentRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/donation/")
      .then((result) => {
        setDonations(result.data);
        setFilteredDonations(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = () => {
    const filteredDonations = donations.filter((donation) =>
      donation.bank.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDonations(filteredDonations);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleDownloadPdf = () => {
    if (componentRef.current) {
      html2canvas(componentRef.current)
        .then((canvas) => {
          const pdf = new jsPDF("p", "mm", "a4");
          pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 200, 200);
          pdf.save("Donation_Report.pdf");
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
        });
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/donation/delete/${id}`)
      .then((res) => {
        console.log(res);
        window.alert("Delete successful!");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3" ref={componentRef}>
        <div className="search-container mb-3">
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search by Bank..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div>
          <Link to="/Donation" className="btn btn-primary add-button">
            + Add
          </Link>
        </div>

        <table className="customer-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Bank</th>
              <th>NIC</th>
              <th>Gmail</th>
              <th>PAYMENT</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonations.map((donation) => (
              <tr key={donation._id}>
                <td>{donation.name}</td>
                <td>{donation.bank}</td>
                <td>{donation.nic}</td>
                <td>{donation.gmail}</td>
                <td>{donation.payment}</td>
                <td>
                  <td>
                    <button className="success-btn">Success</button>
                  </td>
                  <td>
                    <button className="unsuccess-btn">Unsuccess</button>
                  </td>
                  <td>
                    <Link
                      to={`/updateD/${donation._id}`}
                      className="update-btn"
                    >
                      Update
                    </Link>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(donation._id)}>
                      Delete
                    </button>
                  </td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handlePrint} className="print-button">
        Print
      </button>
      <button onClick={handleDownloadPdf} className="download-pdf-button">
        Download PDF
      </button>
    </div>
  );
}

const styles = `
.customer-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.customer-table th, .customer-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.customer-table th {
  background-color: #f2f2f2;
  text-align: left;
}

.customer-table td {
  text-align: center;
}

.customer-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.customer-table tr:hover {
  background-color: #ddd;
}

.customer-table th, .customer-table td {
  padding-top: 12px;
  padding-bottom: 12px;
}

.customer-table td button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.customer-table td button:hover {
  background-color: #d32f2f;
}

.customer-table td a {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 4px;
}

.customer-table td a:hover {
  background-color: #45a049;
}

.customer-table td .success-btn {
    background-color: #4caf50;
}

.customer-table td .success-btn:hover {
    background-color: #45a049;
}

.customer-table td .unsuccess-btn {
    background-color: #f44336;
}

.customer-table td .unsuccess-btn:hover {
    background-color: #d32f2f;
}

.customer-table td button.update-btn {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 5px;
}

.customer-table td button.update-btn:hover {
    background-color: #218838; 
}

.add-button {
  display: inline-block;
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: 1px solid #007bff;
  border-radius: 5px;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s, transform 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-left: 2px; 
}

.add-button:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.add-button:focus {
  outline: none;
}

.add-button:active {
  transform: translateY(1px);
  box-shadow: none;
}
`;

// Create a style element and append CSS to it
const styleElement = document.createElement("style");
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);
