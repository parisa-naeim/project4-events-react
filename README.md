# Events - Frontend with React

## Description

This repository contains the frontend implementation for the Events application. The frontend is built with React using Vite , and also uses MapBox for showing event location.

## Deployment

The project is deployed to Render. Can be accessed via:

https://project4-events-react.onrender.com/

The Backend of Events app is deployed to Render, and can be accessed on this link:

https://project4-events-express.onrender.com

## Features

- On this application, the users can create their events.
- User authentication and authorization (Sign up, Sign in, Sign out)
- Each user can create an Event and upload image for the event. They can also edit and delete their own events.
- Everyone can see all the events in the landing page.
- Only singed in user can see details of each event.
- Signed in users can choose to join/leave events.
- Organiser of the event is the first event attendee by default.

## Technologies:

- Bootstrap
- React.js
- Vite
- React Router Dom
- Render

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/parisa-naeim/project4-events-react.git
   cd project4-events-react
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add the following environment variables to the `.env` file:

   ```bash
   VITE_EXPRESS_BACKEND_URL= http://localhost:3000

   VITE_MAPBOX_API_KEY= your-mapbox-api-key-from-mapbox.com
   ```

3. Running the Development Server:

   ```bash
   npm run dev
   ```

4. Building for Production
   ```bash
   npm run build
   ```
5. Visit `localhost:3000`

## Contributors

- Parisa Naeim https://github.com/parisa-naeim

## Next Steps:

- Add time to event date
- Make Share button working
- Add profile to user
- Add image to user's profile
- Add notifications for each user in navbar
