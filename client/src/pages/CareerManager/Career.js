import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import volunteeringImage from "../CareerHome/images/volunteeringMain.jpg";

const Career = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/applications");
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching volunteer applications:", error);
        setError("Error fetching volunteer applications. Please try again later.");
      }
    };

    fetchApplications();
  }, []);


  const handleReject = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/applications/${id}`);
      setApplications(applications.filter(application => application._id !== id));
    } catch (error) {
      console.error("Error rejecting volunteer application:", error);
      setError("Error rejecting volunteer application. Please try again later.");
    }
  };

  const handleAccept = async (id, applicationData) => {
    try {
      // Delete the application
      await axios.delete(`http://localhost:5001/api/applications/${id}`);
      // Remove the application from the state
      setApplications(applications.filter(application => application._id !== id));
      
      // Navigate to the AddVolunteer page
      navigate(`/AddVolunteer?fname=${applicationData.fname}&age=${applicationData.age}&gender=${applicationData.gender}&birthday=${applicationData.birthday}&nid=${applicationData.nid}&email=${applicationData.email}&contact=${applicationData.contact}&interest=${applicationData.interest}&work=${applicationData.work}&image=${applicationData.image}`);
    } catch (error) {
      console.error("Error accepting volunteer application:", error);
      setError("Error accepting volunteer application. Please try again later.");
    }
  };


  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div>
      </div>
      <div style={{ backgroundColor: "white", color: "black", flex: 1 }}>
        <div>
          <img src={volunteeringImage} alt="Volunteering" style={{ width: "100%", height: "250px", objectFit: "cover" }} />
        </div>
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h1>Volunteering & Career</h1>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
          <h3>Volunteer Applications</h3>
          {applications && applications.length === 0 ? (
            <p>No Volunteer Applications</p>
          ) : (
            <ul style={{ listStyleType: "none" }}>
              {applications && applications.map((application) => (
                <li key={application._id} style={{ marginTop: "20px", width: "100%" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ flex: "0 0 70%", paddingLeft: "10px" }}>
                      <img src={application.image} alt="Volunteer Image" style={{ width: "100px", height: "auto" }} />
                      <p><strong>Name:</strong> {application.fname}</p>
                      <p><strong>Age:</strong> {application.age}</p>
                      <p><strong>Gender:</strong> {application.gender}</p>
                      <p><strong>Birthday:</strong> {application.birthday}</p>
                      <p><strong>National ID:</strong> {application.nid}</p>
                      <p><strong>Email:</strong> {application.email}</p>
                      <p><strong>Contact:</strong> {application.contact}</p>
                      <p><strong>Interest:</strong> {application.interest}</p>
                      <p><strong>Volunteering Duration:</strong> {application.work} months</p>
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <button style={{ display: "block", width: "auto", padding: "10px 20px", marginTop: "20px", backgroundColor: "#ff4d00", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", textAlign: "center", textDecoration: "none" }} onClick={() => handleAccept(application._id, application)}>Accept</button>
                        <button style={{ display: "block", width: "auto", padding: "10px 20px", marginTop: "20px", backgroundColor: "#ff4d00", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", textAlign: "center", textDecoration: "none", marginLeft: "10px" }} onClick={() => handleReject(application._id)}>Reject</button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div>
      </div>
    </div>
  );
};

export default Career;