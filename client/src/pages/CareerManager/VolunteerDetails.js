import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VolunteerDetails = () => {
    const navigate = useNavigate();
    const [nid, setNationalId] = useState(""); // Define nid using useState
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = () => {
        axios.get(`http://localhost:5001/api/get/${nid}`)
            .then(response => {
                setUserData(response.data.user);
                setError(null);
            })
            .catch(error => {
                setError(error.message);
                setUserData(null);
            });
    };
  

  return (
    <div>
      
            <h2>Get User Details</h2>
            <input type="text" value={nid} onChange={(e) => setNationalId(e.target.value)} />
            <button onClick={fetchData}>Fetch User</button>
            {error && <p>Error: {error}</p>}
            {userData && (
                <div>
                    <h3>User Details</h3>
                    <p>Name: {userData.fname}</p>
                    <p>Age: {userData.age}</p>
                    <p>Gender: {userData.gender}</p>
                    <p>birthday: {userData.birthday}</p>
                    <p>NationalId: {userData.nid}</p>
                    <p>Email: {userData.email}</p>
                    <p>Contact: {userData.contact}</p>
                    <p>interest: {userData.interest}</p>
                    <p>work: {userData.work}</p>
                </div>
            )}
            <div>
            <button onClick={() => navigate("/AllVolunteers")}>Back to All Volunteers</button>
            </div>
    </div>
    
  );
};

export default VolunteerDetails;