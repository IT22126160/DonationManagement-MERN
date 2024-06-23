import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function UserManager() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.users);
    useEffect(() => {
      if (user.role !== "UserManager") {
        navigate("/");
      }
    }, []);
  return (
    <div>
      Hello I am User Manager
    </div>
  )
}

export default UserManager
