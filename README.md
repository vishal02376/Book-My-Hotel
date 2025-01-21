# Front-End Assignment - GoComet India Pvt Ltd

This repository contains the front-end assignment issued by GoComet India Pvt Ltd. The goal of this project is to build a responsive and interactive hotel booking application using a JavaScript framework like ReactJS or AngularJS, adhering to specific guidelines and requirements.

![Screenshot (90)](https://github.com/user-attachments/assets/35029cd9-3d51-4692-b29d-5b408d5ad139)


#📝 Assignment Overview

The application includes the following features:

Home Page
Hero Section:

![Screenshot (91)](https://github.com/user-attachments/assets/d4ac7f68-bb8d-4115-91ef-b2e019633cd2)


Users can search for hotels by name or city using the "Search Hotels" API.
Selection of Check-in, Check-out dates, and Number of persons is required.
A valid search redirects the user to the Hotels Page.
Explore Hotels Section:

Displays a paginated list of hotels using the "Hotels List" API.
Minimum and maximum room prices for each hotel are calculated dynamically.
Includes a View button that navigates to the Hotel Details Page.
Filters and Sort:


![Screenshot (92)](https://github.com/user-attachments/assets/bec6c8c2-d02e-417b-b96e-209d1de2ddc9)




Implemented entirely on the frontend.
Allows filtering and sorting the hotel list for a better user experience.
Hotel Page
Fetches detailed hotel and room data using the "Hotel Details" API.
Displays amenities creatively via a View Facilities button.
Provides a Book Now button that opens a booking modal.
Booking Modal
Prefills details if accessed via the Search functionality.
Allows custom date and number of persons selection if accessed from the Explore section.
Includes form validations and success feedback upon booking.

🚀 Features and Functionalities
Responsive Design:

The application is optimized for mobile, tablet, and desktop views.
Interactivity:

Hover and click effects are implemented for better user experience.
Frontend-Handled Search & Filters:

Logic for search, filters, and sorting is implemented on the client side.
Booking Flow:

Smooth navigation and user-friendly modals for hotel booking.
Optimized and Scalable Code:

Adheres to coding standards, including indentation, comments, and naming conventions.
Bug-Free Experience:

Ensures a robust and seamless user interaction.

.
🛠️ Tech Stack
Frontend: ReactJS (preferred) or AngularJS
Styling: CSS (without any UI libraries)
API Integration: REST APIs
Validation: Form validations for required fields and valid data entry


📊 API Endpoints
Search Hotels

Method: GET
Endpoint: https://www.gocomet.com/api/assignment/hotels-name
Hotels List

![Screenshot (93)](https://github.com/user-attachments/assets/05d8f8f1-a287-480d-b978-eca784f3f2af)

Method: GET
Endpoint: https://www.gocomet.com/api/assignment/hotels
Query Params:
page: number (required)
size: number (required)
Hotel Details

![Screenshot (94)](https://github.com/user-attachments/assets/e1914291-cb18-4f21-8eb3-d52ae2d5c85d)

Method: GET
Endpoint: https://www.gocomet.com/api/assignment/hotels/{hotel-id}

🛠️ How to Run
Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-username/frontend-assignment.git
cd frontend-assignment
Install dependencies:

bash
Copy
Edit
npm install
Start the development server:

bash
Copy
Edit
npm start
Open the application in your browser:

arduino
Copy
Edit
http://localhost:3000
📜 Project Structure
plaintext
Copy
Edit
src/
├── assets/         # Logo, images, and icons
├── components/     # Reusable UI components
├── pages/          # Home, Hotel, and Booking pages
├── styles/         # CSS files for styling
├── utils/          # Helper functions (e.g., API calls, validations)
├── App.js          # Main application file
└── index.js        # Entry point
🏅 Extra Points Achieved
Bug-free implementation
Responsive design across devices
Clear and well-documented code
Optimized and scalable logic


