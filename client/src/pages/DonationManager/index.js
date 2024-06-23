import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AllDonations from './AllDonations';

function DonationManager() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.users);
    useEffect(() => {
      if (user.role !== "DonationManager") {
        navigate("/");
      }
    }, []);
  return (
    <div>
      <AllDonations />

    </div>
  )
}

export default DonationManager
