import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Displayform(){

  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const componentRef = useRef();

  useEffect(() => {
      axios.get('http://localhost:3000/customer/')
          .then(result => setCustomers(result.data))
          .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/customer/delete/${id}`)
      .then(() => {
        alert("Customer successfully deleted");
        window.location.reload();
      })
      .catch(err => console.log(err));
  };
  const handleSearch = () => {
    const filteredCustomers = customers.filter((customer) =>
      customer.requestType.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCustomers(filteredCustomers);
    setNoResults(filteredCustomers.length === 0);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleDownloadPdf = () => {
    html2canvas(componentRef.current)
      .then((canvas) => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);
        pdf.save('monthly-customer-requests.pdf');
      });
  };


    return(
        <div className="d-flex vh-100 bg-primary justify-content-conter align-items-center">
           <div className="w-50 bg-white rounded p-3">
          <div><h1>CUSTOMER REQUEST DETAILS..</h1></div>
           <div className="search-container">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Request Type"
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">Search</button>
        </div>
       
          <div ref={componentRef}>
            <table className="customer-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>IdNumber</th>
                        <th>Request Type</th>
                        <th>CustomerRequest</th>
                    </tr>
                </thead>
                <tbody>
                {customers.map((customer) => (
                        <tr key={customer._id}>
                           <td>{customer.idd}</td>
                            <td>{customer.name}</td>
                            <td>{customer.address}</td>
                            <td>{customer.nic}</td>
                            <td>{customer.requestType}</td>
                            <td>{customer.request}</td>
                            <td>
                                <Link to={`/update/${customer._id}`}>Update</Link>
                                <button onClick={() => handleDelete(customer._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handlePrint} className="print-button">Print</button>
        <button onClick={handleDownloadPdf} className="download-pdf-button">Download PDF</button>
            </div>
        </div>
      </div>
    )
}

const styles = `
.customer-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.customer-table th, .customer-table td {
  border: 1px solid #ddd;
  padding: 12px;
}

.customer-table th {
  background-color: #f2f2f2;
  text-align: left;
  font-weight: bold;
}

.customer-table td {
  text-align: center;
}

.customer-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.customer-table tr:hover {
  background-color: #f0f0f0;
}

.customer-table td button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.customer-table td button:hover {
  background-color: #c82333;
}

.customer-table td a {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 12px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.customer-table td a:hover {
  background-color: #218838;
}

.search-container {
  display: flex;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
}

.search-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #0056b3;
}

.print-button,
.download-pdf-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.print-button:hover,
.download-pdf-button:hover {
  background-color: #0056b3;
}

.download-pdf-button {
  background-color: #28a745;
}

.download-pdf-button:hover {
  background-color: #218838;
}

`;

// Create a style element and append CSS to it
const styleElement = document.createElement("style");
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);