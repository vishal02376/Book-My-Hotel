import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Hotelsone.css";
import BookingModal from "../Booking/BookingModal";


function Hotelsone() {
  const location = useLocation();
  const navigate = useNavigate();
  const { hotelDetails, checkInDate, checkOutDate, numberOfPersons } = location.state || {};
  const [showModal, setShowModal] = useState(false);
  const [roomDetails, setRoomDetails] = useState(null); 
  const homepage = () => {
    alert("Please select a hotel from the home page.");
  };

  // if the hotel details is not found than it show the static data
  if (!hotelDetails) {
    return (
      <div className="error-container">
        <div className="hotelsone-container">
          <div className="otp">
            <div className="back-button">
              <button onClick={() => navigate("/")}>← Back</button>
            </div>
            <center>
              <div className="hotel-details">
                <h1 className="HotelName">Oberoi Amarvilas</h1>
                <p>
                  <span className="city">➤ Agra</span>{" "}
                  <span className="rating">★ 4</span>
                </p>
              </div>
            </center>
            <img
              src="https://raw.githubusercontent.com/gocomet-india/frontend-hotel-assignment/main/hotels/oberoi-amarvilas.jpg"
              alt="Oberoi Amarvilas"
              className="hotel-image"
            />
          </div>
        </div>

        {/* Static Hotel Room Section */}
        <div className="HotelBox">
          <div className="room-card">
            <img
              src="https://raw.githubusercontent.com/gocomet-india/frontend-hotel-assignment/main/rooms/3/3-1.jpg"
              alt="Premier Room"
              className="room-image"
            />
            <div className="Bich">
              <h2 className="room-title">Deluxe Room</h2>
              <div className="room-icons">
                <span>👤 2</span>
              </div>
            </div>
            <p className="room-price">₹ 1600/ night</p>
            <div className="room-actions">
              <button className="view-facilities">View facilities</button>
              <button className="book-now" onClick={homepage}>
      Book Now →
    </button>
            </div>
          </div>

          <div className="room-card">
            <img
              src="https://raw.githubusercontent.com/gocomet-india/frontend-hotel-assignment/main/rooms/1/1-1.jpg"
              alt="Executive Suite"
              className="room-image"
            />
            <div className="Bich">
              <h2 className="room-title">Premier Room with Balcony</h2>
              <div className="room-icons">
                <span>👤 3</span>
              </div>
            </div>
            <p className="room-price">₹ 3,000 / night</p>
            <div className="room-actions">
              <button className="view-facilities">View facilities</button>
              <button className="book-now">Book Now →</button>
            </div>
          </div>

          <div className="room-card">
            <img
              src="https://raw.githubusercontent.com/gocomet-india/frontend-hotel-assignment/main/rooms/8/8-1.jpg"
              alt="Presidential Suite"
              className="room-image"
            />
            <div className="Bich">
              <h2 className="room-title">Kohinoor Suite</h2>
              <div className="room-icons">
                <span>👤 4</span>
              </div>
            </div>
            <p className="room-price">₹ 5,800 / night</p>
            <div className="room-actions">
              <button className="view-facilities">View facilities</button>
              <button className="book-now">Book Now →</button>
            </div>
          </div>
        </div>

        <div className="hotel-description">
          <h2>About Oberoi Amarvilas</h2>
          <p>Cillum andouille reprehenderit mollit dolore. Bacon cow cupim, dolore pariatur ut chislic ullamco tri-tip picanha. Beef ribs mollit labore non cillum aliquip dolore aute. Pork belly veniam consequat cow strip steak corned beef andouille. Sint voluptate sunt corned beef ham hock bresaola. Flank aliqua ut duis, non jerky prosciutto nulla est. Commodo boudin hamburger rump ut ipsum officia. Et nostrud beef ribs pork sausage. Adipisicing occaecat biltong, esse t-bone proident shoulder laborum ut dolore ham pork chop. Tongue dolore short ribs voluptate esse. Qui id chislic do, minim aute shoulder tongue. Voluptate officia exercitation ground round, veniam aliqua culpa short loin dolor beef nulla dolore aute. Beef quis irure turducken picanha. Tongue magna burgdoggen, excepteur turkey ribeye minim ea id reprehenderit cupidatat do veniam jowl dolore. Fatback shankle reprehenderit dolore turducken, doner filet mignon ea. In ham hock shankle shoulder laboris. Laboris sausage filet mignon do, shankle leberkas mollit spare ribs qui beef. Laboris pariatur chicken capicola strip steak adipisicing sausage mollit ribeye bresaola. Ad venison leberkas, ribeye quis sunt jerky anim. Irure pig fatback, bresaola pariatur salami minim sint deserunt est in picanha eu turkey. Shank drumstick eiusmod, in beef ribs reprehenderit aute spare ribs irure. Sint eu flank magna dolor. Hamburger ullamco ribeye tail voluptate in lorem. Strip steak sed sirloin porchetta ut chislic ex burgdoggen aliqua corned beef ut pork chop et in. Ham qui consectetur aliquip ut, buffalo dolore burgdoggen picanha.</p>
        </div>
      </div>
    );
  }

  // Heer we Destructure when the data is missing
  const {
    name = "Hotel Name Not Available",
    city = "City Not Available",
    rating = "N/A",
    image_url = "https://via.placeholder.com/150", // Fallback image
    rooms = [],
    description = "Description not available for this hotel. Please check back later.",
  } = hotelDetails;

  // Handle room selection
  const handleRoomSelect = (selectedRoom) => {
    setRoomDetails(selectedRoom); 
    setShowModal(true); // This open the Model
  };

  return (
    <>
      <div className="hotelsone-container">
        <div className="otp">
          <div className="back-button">
            <button onClick={() => navigate("/")}>← Back</button>
          </div>
          <center>
            <div className="hotel-details">
              <h1 className="HotelName">{name}</h1>
              <p>
                <span className="city">➤ {city}</span>{" "}
                <span className="rating">★ {rating}</span>
              </p>
            </div>
          </center>
          <img src={image_url} alt={name} className="hotel-image" />
        </div>
      </div>

      {/* Hotel Room Section */}
      <div className="HotelBox">
        {rooms.length > 0 ? (
          rooms.map((room, index) => (
            <div className="room-card" key={index}>
              <img
                src={(room.image_urls && room.image_urls[0]) || "https://via.placeholder.com/150"}
                alt={room.name || "Room"}
                className="room-image"
              />
              <div className="Bich">
                <h2 className="room-title">{room.name || "Room Title"}</h2>
                <div className="room-icons">
                  <span>👤 {numberOfPersons}</span>
                </div>
              </div>
              <p className="room-price">₹ {room.price || "N/A"} / night</p>
              <div className="room-actions">
                <button className="view-facilities">View facilities</button>
                <button className="book-now" onClick={() => handleRoomSelect(room)}>
                  Book Now →
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No rooms available for this hotel.</p>
        )}
      </div>

      {/* Hotel Name and Description Section */}
      <div className="hotel-description">
        <h2>About {name}</h2>
        <p>{description}</p>
      </div>
      

      {/* Booking Modal */}
     
      {showModal && roomDetails && (
        <BookingModal
          hotelName={name}
          roomDetails={roomDetails}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          numberOfPersons={numberOfPersons}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default Hotelsone;
