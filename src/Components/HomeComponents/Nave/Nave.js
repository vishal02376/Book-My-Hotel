import './Nave.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';  // Correct import

function Nave() {
  const [isOpen, setIsOpen] = useState(false);  // Toggle for dropdown

  return (
    <>
      <div className="Nave">
        <div className="Left">
          <div className="Logo">
          <img src="https://raw.githubusercontent.com/gocomet-india/frontend-hotel-assignment/286ebfc6c07d6a38969da05b673b21be6e89eab3/book-my-hotel-logo.svg" alt="logo" />

            
          </div>

          <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/hotel">Hotel</Link></li>
          <li><Link to="/">Places</Link></li>
          </ul>
          
        </div>

        <div className="Right">
          <ul>
            
            <li><Link to="/">Login</Link></li>
            
          </ul>
        </div>

        <div className="Dot" onClick={() => setIsOpen(!isOpen)}>
          <b>{isOpen ? "✕" : "☰"}</b>
        </div>
      </div>

      <div className={isOpen ? "Reponsive" : "Active"}>
        <div className="Box1">
          <div className="Top">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/hotel">Hotel</Link></li>
              <li><Link to="/">Places</Link></li>
            </ul>
          </div>
         
        </div>
      </div>
    </>
  );
}

export default Nave;
