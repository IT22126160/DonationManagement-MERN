import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function AllEvents() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    function getEvents() {
      axios
        .get("http://localhost:5001/event/")
        .then((res) => {
          setEvents(res.data);
        })
        .catch((err) => {
          console.error(err);
          alert("Error fetching events");
        });
    }
    getEvents();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5001/event/delete/${id}`)
      .then((res) => {
        // Reload the events list after deletion
        const updatedEvents = events.filter((event) => event._id !== id);
        setEvents(updatedEvents);
        setFilteredEvents(updatedEvents);
      })
      .catch((err) => console.error(err));
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      const filtered = events.filter((event) =>
        event.headline.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents([]);
    }
  };

  const generateReport = () => {
    // Generate CSV content for all events
    const csvContent =
      "data:text/csv;charset=utf-8," +
      events
        .map(
          (event) =>
            `${event.headline},${event.date},${event.time},${event.venue},${event.description}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "events_report.csv");
    document.body.appendChild(link);

    link.click(); // Trigger download
    document.body.removeChild(link);
  };

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
    marginBottom: "10px",
  };

  const searchInputStyle = {
    padding: "8px",
    border: "1px solid #D9853B",
    borderRadius: "5px",
    width: "200px", // Adjust as needed
  };

  const buttonStyle = {
    padding: "8px",
    backgroundColor: "#D9853B",
    color: "#FFFFFF",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    margin: "0 10px", // Margin between buttons
  };

  const eventListStyle = {
    listStyleType: "none",
    padding: 0,
  };

  const eventItemStyle = {
    backgroundColor: "#F5E8DF",
    padding: "15px", // More compact padding
    textAlign: "center",
    borderRadius: "10px",
    marginBottom: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  };

  const detailsStyle = {
    textAlign: "center",
  };

  const imageStyle = {
    width: "150px", // Smaller image size
    height: "150px",
    borderRadius: "10px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>All Events</h1>

      <div style={searchContainerStyle}>
        <input
          type="text"
          placeholder="Search by headline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyle}
        />
        <button onClick={handleSearch} style={buttonStyle}>
          Search
        </button>
        <button onClick={generateReport} style={buttonStyle}>
          Generate Report
        </button>
        <button
          onClick={() => {
            window.location.href = "/addevent";
          }}
          style={buttonStyle}
        >
          Add event
        </button>
      </div>

      <div>
        {(searchTerm.trim() === "" ? events : filteredEvents).map((event) => (
          <div key={event._id} style={eventItemStyle}>
            <h2 style={{ color: "#D9853B", textAlign: "center" }}>
              {event.headline}
            </h2>
            <div style={detailsStyle}>
              <img
                src={event.image}
                alt="Event image"
                style={imageStyle} // Apply image style
              />
              <p>Date: {event.date}</p>
              <p>Time: {event.time}</p>
              <p>Venue: {event.venue}</p>
              <p>Description: {event.description}</p>
              <button
                style={buttonStyle}
                onClick={() => {
                  window.location.href = `/updateEvent/${event._id}`;
                }}
              >
                Update
              </button>
              &nbsp;
              <button
                style={buttonStyle}
                onClick={() => handleDelete(event._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
