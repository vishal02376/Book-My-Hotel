import React, { useState, useEffect } from "react";
import "./BookingModal.css";

// Accepting the data  directly from pparents in the form of props
function BookingModal({ hotelName, roomDetails, checkInDate, checkOutDate, numberOfPersons, onClose }) {
  const [persons, setPersons] = useState(
    Array.from({ length: numberOfPersons }, () => ({ name: "", age: "", gender: "" }))
  );

  // Initialize modal's state using props
  const [localCheckInDate, setLocalCheckInDate] = useState(checkInDate || new Date().toISOString().split("T")[0]);
  const [localCheckOutDate, setLocalCheckOutDate] = useState(checkOutDate || new Date().toISOString().split("T")[0]);

  // Disable background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handlePersonChange = (index, field, value) => {
    const updatedPersons = [...persons];
    updatedPersons[index][field] = value;
    setPersons(updatedPersons);
  };

  const handleAddPerson = () => {
    setPersons([...persons, { name: "", age: "", gender: "" }]);
  };

  const handleRemovePerson = (index) => {
    const updatedPersons = persons.filter((_, i) => i !== index);
    setPersons(updatedPersons);
  };

  const handleClearForm = () => {
    setPersons(Array.from({ length: numberOfPersons }, () => ({ name: "", age: "", gender: "" })));
    setLocalCheckInDate(new Date().toISOString().split("T")[0]);
    setLocalCheckOutDate(new Date().toISOString().split("T")[0]);
  };

  const handleBooking = () => {
    const incompleteDetails = persons.some(person => !person.name || !person.age || !person.gender);
    if (incompleteDetails) {
      alert("Please fill out all details for each person.");
      return;
    }
    alert(`Booking Successful! Check-in: ${localCheckInDate}, Check-out: ${localCheckOutDate}`);
    onClose();
  };

  return (
    <div className="booking-modal-overlay">
      <div className="booking-modal">
        <div className="modal-header">
          <h2>
            {hotelName} &gt; {roomDetails ? roomDetails.name : "Loading..."}
          </h2>
          <button style={{ color: "red" }} className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="left-section">
            <img src={roomDetails?.image_urls[0]} alt={roomDetails?.name} className="room-image" />
            <div className="amenities">
              {roomDetails?.amenities.map((amenity, index) => (
                <span key={index} className="amenity-tag">{amenity}</span>
              ))}
              <br />

              <div className="date-info">
                <label>
                  <span className="icon">📅</span> Check-in:
                  <input
                    type="date"
                    value={localCheckInDate}
                    onChange={(e) => setLocalCheckInDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </label>
                <label>
                  <span className="icon">📅</span> Check-out:
                  <input
                    type="date"
                    value={localCheckOutDate}
                    onChange={(e) => setLocalCheckOutDate(e.target.value)}
                    min={localCheckInDate}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="right-section">
            <div className="persons-info">
              {persons.map((person, index) => (
                <div key={index} className="person-entry">
                  <h4>Person {index + 1}</h4>
                  <input
                    className="ninput"
                    type="text"
                    placeholder="Name"
                    value={person.name}
                    onChange={(e) => handlePersonChange(index, "name", e.target.value)}
                  />
                  <input
                    className="ainput"
                    type="number"
                    placeholder="Age"
                    value={person.age}
                    onChange={(e) => handlePersonChange(index, "age", e.target.value)}
                  />
                  <div className="gender-select">
                    <label>
                      <input
                        type="radio"
                        name={`gender-${index}`}
                        value="Male"
                        checked={person.gender === "Male"}
                        onChange={() => handlePersonChange(index, "gender", "Male")}
                      />
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`gender-${index}`}
                        value="Female"
                        checked={person.gender === "Female"}
                        onChange={() => handlePersonChange(index, "gender", "Female")}
                      />
                      Female
                    </label>
                  </div>
                  <button
                    className="remove-person"
                    onClick={() => handleRemovePerson(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button className="add-person" onClick={handleAddPerson}>+ Add Person</button>
          </div>
        </div>

        <div className="modal-footer">
          <button className="clear-button" onClick={handleClearForm}>Clear</button>
          <button className="book-button" onClick={handleBooking}>Book</button>
        </div>
      </div>
    </div>
  );
}

export default BookingModal;
