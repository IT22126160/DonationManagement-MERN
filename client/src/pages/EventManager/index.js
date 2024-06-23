import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AllEvents from './AllEvents';

function EventsManager() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.users);
    useEffect(() => {
      if (user.role !== "EventsManager") {
        navigate("/");
      }
    }, []);
  return (
    <div>
      <AllEvents />
    </div>
  )
}

export default EventsManager
