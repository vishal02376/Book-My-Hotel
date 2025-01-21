import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import map from "../../../Assets/map.webp";
import pn from "../../../Assets/pn.png";

const Search = () => {
  const [query, setQuery] = useState("");
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numberOfPersons, setNumberOfPersons] = useState(1);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const navigate = useNavigate();

  // Fetch hotels data from the API
  useEffect(() => {
    if (query) {
      fetch(`https://www.gocomet.com/api/assignment/hotels-name`)
        .then((response) => response.json())
        .then((data) => {
          const filtered = data.filter(
            (item) =>
              item.name.toLowerCase().includes(query.toLowerCase()) ||
              item.city.toLowerCase().includes(query.toLowerCase())
          );
          setFilteredHotels(filtered);
          setIsDropdownVisible(filtered.length > 0);
        })
        .catch((error) => {
          console.error("Error fetching hotels:", error);
        });
    } else {
      setFilteredHotels([]);
      setIsDropdownVisible(false);
    }
  }, [query]);

  const handleSearch = () => {
    if (!selectedHotel || !checkInDate || !checkOutDate || !numberOfPersons) {
      alert("Please fill all fields.");
      return;
    }
  
    console.log("Selected hotel:", selectedHotel); // Log selected hotel data
  
    // Fetch selected hotel details
    fetch(`https://www.gocomet.com/api/assignment/hotels/${selectedHotel.id}`)
      .then((response) => response.json())
      .then((hotelDetails) => {
        console.log("Hotel details fetched from API:", hotelDetails); // Log the API response
        if (!hotelDetails || Object.keys(hotelDetails).length === 0) {
          alert("Failed to fetch hotel details or hotel not found.");
          return;
        }
  // Update the navigate function call
navigate("/hotel", {
  state: {
    hotelDetails: hotelDetails.hotel, // Pass the inner "hotel" object
    checkInDate,
    checkOutDate,
    numberOfPersons,
  },
});
      })
      .catch((error) => {
        console.error("Error fetching hotel details:", error);
        alert("Error fetching hotel details. Please try again.");
      });
  };
  
  // Handle suggestion click
  const handleSuggestionClick = (hotel) => {
    setQuery(`${hotel.name} - ${hotel.city}`);
    setSelectedHotel(hotel);
    setIsDropdownVisible(false);
  };

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Find the Perfect deal, always.</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipiscing elit. Similique
          officia non corrupti pariatur aspernatur sint <br /> modi commodi cum
          possimus blanditiis facilis beatae repellendus, autem voluptates
          ratione delectus architecto quae dolore.
        </p>
        <br />
        <br />
        <br />
        <div className="search-bar">
          <div className="map1" style={{ position: "relative" }}>
            <img src={map} alt="Search icon" className="map" />
            <input
              type="text"
              placeholder="Type city, place, or hotel name"
              className="search-inputs"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onBlur={() => setTimeout(() => setIsDropdownVisible(false), 200)}
              onFocus={() => query && setIsDropdownVisible(true)}
            />
            <ul
              className={`suggestions-box ${isDropdownVisible ? "active" : ""}`}
            >
              {filteredHotels.map((hotel) => (
                <li
                  key={hotel.id}
                  onClick={() => handleSuggestionClick(hotel)}
                >
                  {hotel.name} - {hotel.city}
                </li>
              ))}
            </ul>
            <img src={pn} alt="Location icon" className="map" />
          </div>

          <div className="cen">
       
          <div className="checkins">
    <div className="date-range-box">
      <span className="schek" >CheckIn</span>
      <input
        type="date"
        className="date-input"
        value={checkInDate || ''} // Ensures no value is shown by default
        onChange={(e) => setCheckInDate(e.target.value)}
      />
    </div>
    <div className="vertical-line"></div>
    <div className="date-range-box">
      <span className="schek" >CheckOut</span>
      <input
        type="date"
        className="date-input"
        value={checkOutDate || ''} // Ensures no value is shown by default
        onChange={(e) => setCheckOutDate(e.target.value)}
      />
    </div>
  </div>

<div className="numbox ">
            <div className="inbox">
            
              <input
                type="number"
                min="1"
                value={numberOfPersons}
                onChange={(e) => setNumberOfPersons(e.target.value)}
                className="guest-input"
              />
              <span>&#128101; </span>
            </div>

            <button className="search-button" onClick={handleSearch}>
              Search
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;