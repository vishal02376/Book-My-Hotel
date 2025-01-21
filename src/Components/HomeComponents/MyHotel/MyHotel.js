import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MyHotel.css";

const MyHotel = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hotelsPerPage] = useState(9);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // HEre the Static date of checkIn or Check Out
  const checkInDate = "21-01-2025";
  const checkOutDate = "22-01-2025";
  const numberOfPersons = 2;

  const filters = {
    price: ["Up to Rs. 1000", "Rs. 1001 to Rs. 2000", "Rs. 2001 to Rs. 5000", "Above Rs. 5000"],
    rating: ["0 - 1 Star", "1 - 2 Star", "2 - 3 Star", "3 - 4 Star", "4 - 5 Star"],
    city: ["Mumbai", "Kolkata", "Bangalore", "Jaipur", "Agra", "Chennai", "Goa", "Delhi"],
  };

  //In use effect we fetch the data from the api and store in the data variable
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch("https://www.gocomet.com/api/assignment/hotels?page=1&size=30");
        const data = await response.json();
        if (data.success) {
          setHotels(data.hotels);
          setFilteredHotels(data.hotels);
        }
      } catch (error) {
        console.error("Failed to fetch hotels data", error);
      }
    };

    fetchHotels();
  }, []);

  const handleFilterChange = (filter) => {
    const updatedFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter((item) => item !== filter)
      : [...selectedFilters, filter];
      
// Here we update the filters ny useing state managment of react hooks
    setSelectedFilters(updatedFilters);

    const filtered = hotels.filter((hotel) => {
      const matchesCity = updatedFilters.some((filter) => filters.city.includes(filter) && hotel.city === filter);
      const matchesRating = updatedFilters.some((filter) => {
        const rating = parseFloat(hotel.rating);
        if (filter === "0 - 1 Star") return rating <= 1;
        if (filter === "1 - 2 Star") return rating > 1 && rating <= 2;
        if (filter === "2 - 3 Star") return rating > 2 && rating <= 3;
        if (filter === "3 - 4 Star") return rating > 3 && rating <= 4;
        if (filter === "4 - 5 Star") return rating > 4 && rating <= 5;
        return false;
      });
      const matchesPrice = updatedFilters.some((filter) => {
        return hotel.rooms.some((room) => {
          const price = room.price;
          if (filter === "Up to Rs. 1000") return price <= 1000;
          if (filter === "Rs. 1001 to Rs. 2000") return price > 1000 && price <= 2000;
          if (filter === "Rs. 2001 to Rs. 5000") return price > 2000 && price <= 5000;
          if (filter === "Above Rs. 5000") return price > 5000;
          return false;
        });
      });

      return matchesCity || matchesRating || matchesPrice;
    });

    setFilteredHotels(filtered.length ? filtered : hotels);
  };

  //Here the fucntion call when user click the clear button 
  const clearFilters = () => {
    setSelectedFilters([]);
    setFilteredHotels(hotels);
  };


  //here we use a logic for the selected hotel id if the data fetched than to hotel page;

  const viewHotelDetails = async (hotelId) => {
    setLoading(true);
    try {
      const response = await fetch(`https://www.gocomet.com/api/assignment/hotels/${hotelId}`);
      const data = await response.json();

      if (data.success) {
        navigate("/hotel", {
          state: {
            hotelDetails: data.hotel,
            checkInDate,
            checkOutDate,
            numberOfPersons,
          },
        });
      } else {
        console.error("Failed to fetch hotel details:", data.message);
      }
    } catch (error) {
      console.error("Error fetching hotel details:", error);
    } finally {
      setLoading(false);
    }
  };

  //Here we use the logic of current page and next page;
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = filteredHotels.slice(indexOfFirstHotel, indexOfLastHotel);

  const nextPage = () => {
    if (currentPage * hotelsPerPage < filteredHotels.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  //Here we return all the data that come from the api;

  return (
    <>
      <center>
        <h2>Explore Hotel</h2>
        {loading && <p>Loading hotel details...</p>}
      </center>

      <div className="container">
        <div className="filters">
          <div className="filter-header">
            <h3>Filters</h3>
            <button className="clear-btn" onClick={clearFilters}>
              Clear All
            </button>
          </div>

          <div className="filter-section">
            <h4>PRICE RANGE</h4>
            {filters.price.map((price) => (
              <label key={price}>
                <input
                  type="checkbox"
                  checked={selectedFilters.includes(price)}
                  onChange={() => handleFilterChange(price)}
                />{" "}
                {price}
              </label>
            ))}
          </div>

          <div className="filter-section">
            <h4>RATING</h4>
            {filters.rating.map((rating) => (
              <label key={rating}>
                <input
                  type="checkbox"
                  checked={selectedFilters.includes(rating)}
                  onChange={() => handleFilterChange(rating)}
                />{" "}
                {rating}
              </label>
            ))}
          </div>

          <div className="filter-section">
            <h4>CITY</h4>
            {filters.city.map((city) => (
              <label key={city}>
                <input
                  type="checkbox"
                  checked={selectedFilters.includes(city)}
                  onChange={() => handleFilterChange(city)}
                />{" "}
                {city}
              </label>
            ))}
          </div>
        </div>

        <div className="listings">
          <div className="grid">
            {currentHotels.map((hotel) => (
              <div className="card" key={hotel.id}>
                <img src={hotel.image_url} alt={hotel.name} className="card-image" />
                <div className="card-body">
                <div className="hrating">
                  <h3>{hotel.name}</h3>
                 
                  <p>★ {hotel.rating}</p> 

                  </div>
                  <p> {hotel.city}</p>
                 
                  <div className="hrating">
                  <p className="price">
                      ₹{" "}
                      {Math.min(...hotel.rooms.map((room) => room.price))} - ₹{" "}
                      {Math.max(...hotel.rooms.map((room) => room.price))}
                    </p>
                  
                  <button className="view-btn" onClick={() => viewHotelDetails(hotel.id)}>
                    View ➡
                  </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button className="pagination-btn" onClick={prevPage} disabled={currentPage === 1}>
              Prev
            </button>
            <span>{currentPage}</span>
            <button
              className="pagination-btn"
              onClick={nextPage}
              disabled={currentPage * hotelsPerPage >= filteredHotels.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyHotel;
