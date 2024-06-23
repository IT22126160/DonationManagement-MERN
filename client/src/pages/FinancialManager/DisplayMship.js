import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useReactToPrint } from "react-to-print";

export default function DisplayMship() {
  const [memberships, setMemberships] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMemberships, setFilteredMemberships] = useState([]);
  const [totalPayment, setTotalPayment] = useState({ sum: 0, combination: "" });
  const componentRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/membership/")
      .then((result) => {
        setMemberships(result.data);
        setFilteredMemberships(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = () => {
    //search
    const filteredMemberships = memberships.filter((membership) =>
      membership.bank.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMemberships(filteredMemberships);
  };

  const handlePrint = useReactToPrint({
    //report
    content: () => componentRef.current,
  });

  const handleDownloadPdf = () => {
    // report
    if (componentRef.current) {
      html2canvas(componentRef.current)
        .then((canvas) => {
          const pdf = new jsPDF("p", "mm", "a4");
          pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 200, 200);
          pdf.save("Membership_Report.pdf");
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
        });
    }
  };

  const handleDelete = (id) => {
    //delete
    axios
      .delete(`http://localhost:3000/membership/delete/${id}`)
      .then((res) => {
        console.log(res);
        setFilteredMemberships(
          filteredMemberships.filter((member) => member._id !== id)
        );
        window.alert("Delete successful!");
      })
      .catch((err) => console.log(err));
  };

  const calculateTotalPayment = () => {
    let totalPayment = 0;
    let combination = "";
    filteredMemberships.forEach((membership) => {
      totalPayment += membership.payment;
      combination += `${membership.payment} + `;
    });
    combination = combination.slice(0, -3); // Remove the last " + "
    combination += `= ${totalPayment}`;
    return { sum: totalPayment, combination };
  };

  const handleCalculate = () => {
    const total = calculateTotalPayment();
    setTotalPayment(total);
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
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
          <Link to="/Membership" className="btn btn-primary add-button">
            +Add
          </Link>
        </div>

        <table className="customer-table" ref={componentRef}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Bank</th>
              <th>NIC</th>
              <th>Gmail</th>
              <th>Address</th>
              <th>PAYMENT</th>
            </tr>
          </thead>
          <tbody>
            {filteredMemberships.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.bank}</td>
                <td>{user.nic}</td>
                <td>{user.gmail}</td>
                <td>{user.address}</td>
                <td>{user.payment}</td>
                <td>
                  <button className="success-btn">Success</button>
                </td>
                <td>
                  <button className="unsuccess-btn">Unsuccess</button>
                </td>
                <td>
                  <Link to={`/updateM/${user._id}`} className="update-btn">
                    Update
                  </Link>
                </td>
                <td>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={handlePrint} className="print-button">
          Print
        </button>
        <button onClick={handleDownloadPdf} className="download-pdf-button">
          Download PDF
        </button>
        <div>Total Payment: {totalPayment.combination}</div>
        <button onClick={handleCalculate} className="calculate-button">
          Calculate Total Payment
        </button>
      </div>
    </div>
  );
}
//css
const styles = `


body {
  .display-membership-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
}

.membership-table-container {
    width: 50%;
    background-color: #ffffff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.search-container {
    display: flex;
    margin-bottom: 20px;
}

.search-input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.search-button {
    margin-left: 10px;
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.add-button {
    padding: 8px 16px;
    background-color: #28a745;
    color: #fff;
    text-decoration: none;
    border: none;
    border-radius: 4px;
}

.customer-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.customer-table th, .customer-table td {
    padding: 10px;
    border-bottom: 1px solid #ccc;
}

.customer-table th {
    background-color: #007bff;
    color: #fff;
}

.action-btn {
    padding: 6px 12px;
    margin-right: 5px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.success-btn {
    background-color: #28a745;
    color: #fff;
}

.unsuccess-btn {
    background-color: #dc3545;
    color: #fff;
}

.update-btn {
    background-color: #ffc107;
    color: #000;
}

.delete-btn {
    background-color: #dc3545;
    color: #fff;
}

.buttons-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.total-payment {
    margin-top: 10px;
    font-weight: bold;
}

.calculate-button {
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

`;
