import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Career from './Career';

function CareerManager() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.users);
    useEffect(() => {
      if (user.role !== "CareerManager") {
        navigate("/");
      }
    }, []);
  return (
    <div>
      <Career/>
    </div>
  )
}

export default CareerManager
