import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const Profile = () => {
  const { nid } = useParams();
  const [volunteer, setVolunteer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVolunteerData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/profile/${nid}`);
        setVolunteer(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching volunteer data:', error);
        setLoading(false);
      }
    };

    fetchVolunteerData();

  }, [nid]);

  return (
   <div>
    <div>
    </div>
     <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Volunteer Profile</h1>
      {loading ? (
        <p>Loading...</p>
      ) : volunteer ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: '0 0 300px', marginRight: '20px' }}>
            <img
              src={volunteer.image}
              alt="Volunteer"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <div style={{ flex: '1' }}>
            <h2 style={{ marginTop: '0' }}>{volunteer.fname}</h2>
            <p style={{ marginBottom: '5px' }}>Age: {volunteer.age}</p>
            <p style={{ marginBottom: '5px' }}>Gender: {volunteer.gender}</p>
            <p style={{ marginBottom: '5px' }}>Birthday: {volunteer.birthday}</p>
            <p style={{ marginBottom: '5px' }}>NIC: {volunteer.nid}</p>
            <p style={{ marginBottom: '5px' }}>Email: {volunteer.email}</p>
            <p style={{ marginBottom: '5px' }}>Phone: {volunteer.contact}</p>

          </div>
        </div>
      ) : (
        <p>Volunteer data not found.</p>
      )}
    </div>
    <div>
    </div>
   </div>
  );
};

export default Profile;