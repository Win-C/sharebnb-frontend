# ShareBnB 

A full stack web application for people to share and rent out their private and public spaces with others. Users create listings that include photos, location, price, # of beds, # of rooms, etc. and are able to search for created listings by price, location, # of beds, and # of bathrooms, etc. Users book listings and message other users regarding a listing, directly on the platform.  

For **backend** related documentation and commentary, please go <a href="https://github.com/Win-C/jobly-backend">here</a> 

## Motivation

As we move towards a world where people share more and more things, it’s time we build an application where users can share indoor and outdoor spaces like backyards or pools!

## Screenshots

**React Component Hierarchy**

<img src="/static/images/sharebnb-react-component-hierarchy.png" width="600" height="300">

## Build status
- Proof of concept achieved
- WIP on minimum viable product

## Current features
- General app functions:
    - Authenticated users are able to create a listing with photos, price, and other details of the listing
    - Authenticated users are able to search listings by max_price, latitude, longitude, # of beds and # of bathrooms
    - Photos when uploaded are stored in Amazon S3, not in a database
- Backend:
    - AWS S3 cloud storage created and connected
    - database for users, listings, and messages
    - seed database using faker for development
    - SQL queries for specific user, all listings, specific listing, and messages between users and by listings
    - CRUD endpoints for users, listings, and messages
- Frontend: 
    - Homepage / signup / login / listings / logout
    - Forms functioning including uploading images with preview
    - Basic presentational components for listings

## Upcoming features
- Backend:
    - auth for admin
    - auth for same user as logged in, restrict access if false
    - queries for messages by listing
    - websockets for more real-time like messaging
- Frontend:
    - User profile with listings created and booked 
    - Messaging page linked to listings with booking capabilities
    - Interface with a map that updates with listings when moved
    - Pagination for showing listings

## Tech stack
- AWS S3 cloud storage
- PostgreSQL for database
- SQLAlchemy for database ORM
- Flask/Python for backend
- Create-React-App/React for frontend

## Dependencies

**Frontend dependencies** include:
- axios for requests
- bootstrap for styling
- jest *(ships with CRA)*
- jsonwebtoken for security
- react-router-dom for routing

## Installation

**Frontend Development Setup**

Make sure you're in the correct folder. Then go ahead and install the dependencies and start the application:
```console
npm install
npm start
```

## Authors
- Winnie Chou
- Alan Tseng (pair programming partner)
