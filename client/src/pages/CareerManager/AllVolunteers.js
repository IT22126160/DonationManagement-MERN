import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllVolunteers.css";
import { useNavigate } from "react-router-dom";


const AllVolunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVolunteers, setFilteredVolunteers] = useState([]);
  const [searchNotFound, setSearchNotFound] = useState(false);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api");
        setVolunteers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  useEffect(() => {
    const filtered = volunteers.filter((volunteer) =>
      volunteer.interest.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filtered.length === 0 && searchTerm.trim() !== "") {
      setSearchNotFound(true);
    } else {
      setSearchNotFound(false);
    }

    setFilteredVolunteers(filtered);
  }, [searchTerm, volunteers]);

  const handleDelete = (nid) => {
    if (window.confirm("Are you sure you want to delete this volunteer?")) {
      axios
        .delete(`http://localhost:5001/api/deleteV/${nid}`)
        .then(() => {
          setVolunteers((prevVolunteers) =>
            prevVolunteers.filter((volunteer) => volunteer.nid !== nid)
          );
          alert("Volunteer deleted successfully");
        })
        .catch((error) => {
          alert("Error deleting volunteer: " + error);
        });
    }
  };

  const navigate = useNavigate();

  const generateVolunteerJoiningReport = () => {
    const totalVolunteers = volunteers.length;
    const reportData = volunteers.map((volunteer) => ({
      "Volunteer ID": volunteer.nid,
      Id: volunteer.nid,
      Name: `${volunteer.fname} ${volunteer.lname}`,
      Volunteering: volunteer.interest,
      Months: volunteer.workingMonths,
      "Working Months": volunteer.workingMonths,
    }));
  
    // Add total number of volunteers to the report data
    reportData.unshift({ "Total Volunteers": totalVolunteers });
  
    // Prepare CSV content
    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(reportData[0]).join(",") +
      "\n" +
      reportData
        .map((volunteer) => Object.values(volunteer).join(","))
        .join("\n");
  
    // Create a CSV file and initiate download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "volunteers_report.csv");
    document.body.appendChild(link);
    link.click();
  };

  // Separate volunteers into categories based on interest
  const categorizedVolunteers = {};
  filteredVolunteers.forEach((volunteer) => {
    if (!categorizedVolunteers[volunteer.interest]) {
      categorizedVolunteers[volunteer.interest] = [];
    }
    categorizedVolunteers[volunteer.interest].push(volunteer);
  });

  return (
    <div>
     
      <div className="all-volunteers-container">
        <div className="search-container">
          <button className="Search">Search</button>
          <input
            type="text"
            placeholder="Search by interest..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchNotFound && <p>No volunteers found for the given interest</p>}
        </div>

        <div className="header_actions">
          <button onClick={generateVolunteerJoiningReport}>
            Download Volunteer Report
          </button>
        </div>

        
        {/* Display volunteers by category */}
        {Object.entries(categorizedVolunteers).map(([category, volunteers]) => (
          <div key={category} className="volunteer-category">
            <h2>{category}</h2>
            <div className="volunteers-grid">
              {volunteers.map((volunteer) => (
                <div key={volunteer.nid} className="volunteer">
                  <h3>{volunteer.fname}</h3>
                  <img
                    src={volunteer.image}
                    alt="Volunteer"
                    className="volunteer-image"
                  />
                  <div className="details">
                    <p>Age: {volunteer.age}</p>
                    <p>Gender: {volunteer.gender}</p>
                    <p>Volunteering: {volunteer.interest}</p>
                    <p>Working Months: {volunteer.work}</p>
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        navigate(`/UpdateVolunteer/${volunteer.nid}`)
                      }
                    >
                      Update
                    </button>
                    &nbsp;
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(volunteer.nid)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
  
    </div>
  );
};

export default AllVolunteers;