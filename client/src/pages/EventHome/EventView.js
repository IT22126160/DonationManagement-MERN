import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EventView = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5001/event/")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert("Error fetching events");
      });
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) =>
        event.headline.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  };

  // Inline CSS styles
  const containerStyle = {
    backgroundColor: "#F8E5D8",
    padding: "20px",
  };

  const headingStyle = {
    color: "#D9853B",
    textAlign: "center",
    marginBottom: "20px",
  };

  const searchContainerStyle = {
    textAlign: "center", // Center-aligns the search input
    marginBottom: "10px",
  };

  const searchInputStyle = {
    padding: "8px",
    border: "1px solid #D9853B",
    borderRadius: "5px",
    width: "300px", // Adjusted width
  };

  const eventListStyle = {
    listStyleType: "none",
    padding: 0,
  };

  const eventItemStyle = {
    backgroundColor: "#F5E8DF",
    padding: "15px", // Reduced padding for more compact look
    borderRadius: "10px",
    marginBottom: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  };

  const detailsStyle = {
    textAlign: "left", // Align text to the left for better readability
  };

  const confirmButtonStyle = {
    backgroundColor: "#D9853B",
    color: "#FFFFFF",
    padding: "8px", // Reduced padding for smaller button
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>All Events</h1>
      <div style={searchContainerStyle}>
        <input
          type="text"
          placeholder="Search by headline"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch(); // Trigger search when input changes
          }}
          style={searchInputStyle}
        />
      </div>

      <ul style={eventListStyle}>
        {(searchTerm.trim() === "" ? events : filteredEvents).map((event) => (
          <li key={event._id} style={eventItemStyle}>
            <h2 style={{ color: "#D9853B", textAlign: "center" }}>
              {event.headline}
            </h2>

            <div style={detailsStyle}>
              <img
                src={event.image}
                alt="event"
                style={{
                  maxWidth: "200px",
                  height: "auto",
                  borderRadius: "10px",
                }} // Reduced image size
              />
              <p>Date: {event.date}</p>
              <p>Time: {event.time}</p>
              <p>Venue: {event.venue}</p>
              <p>Description: {event.description}</p>

              <button
                style={confirmButtonStyle}
                onClick={() => navigate("/addconfirm")}
              >
                Confirm Participation
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventView;
