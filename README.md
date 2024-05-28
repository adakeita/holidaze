# Holidaze Booking Platform

Holidaze is a comprehensive booking platform designed for managing venues and bookings. This project includes features for user registration, authentication, venue management, booking management, and more.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Register and log in with secure authentication.
- **Venue Management**: Create, update, delete, and view venues.
- **Booking Management**: Book venues and manage bookings.
- **Calendar Integration**: View available dates and bookings on a calendar.
- **WCAG Compliance**: Accessibility features to ensure the platform is usable by everyone.

## Tech Stack

- **Frontend**: React, React Router, TailwindCSS, DaisyUI
- **State Management**: Context API
- **Backend**: Noroff V2 API (External API, no modifications allowed)
- **Calendar**: React Calendar
- **Styling**: TailwindCSS, DaisyUI custom CSS

## Installation

### Prerequisites

- Node.js (v12 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
    ```sh
    git clone https://github.com/yourusername/holidaze.git
    cd holidaze
    ```

2. **Install dependencies**
    ```sh
    npm install
    # or
    yarn install
    ```

3. **Create a .env file in the root directory and add your environment variables**
    ```env
    REACT_APP_API_URL=https://v2.api.noroff.dev
    REACT_APP_API_KEY=your-api-key
    ```

4. **Start the development server**
    ```sh
    npm start
    # or
    yarn start
    ```

## Usage

### Running the App

After starting the development server, open your browser and navigate to `http://localhost:3000` to use the app.

### User Registration and Login

- Navigate to the Register page to create a new account.
- Use the Login page to access your account.

### Venue Management

- As a venue manager, you can create, update, and delete venues.
- View a list of your venues in the Venue Management section.

### Booking Venues

- Navigate to a venue's details page to view available dates and make a booking.
- View and manage your bookings in the Dashboard.

## Project Structure

holidaze/
├── public/
│ ├── index.html
│ └── ...
├── src/
│ ├── assets/
│ ├── components/
│ │ ├── Auth/
│ │ ├── Booking/
│ │ ├── Calendar/
│ │ ├── Layout/
│ │ ├── Venue/
│ │ └── ...
│ ├── contexts/
│ ├── pages/
│ ├── services/
│ ├── styles/
│ ├── App.jsx
│ ├── index.js
│ └── ...
├── .env
├── .gitignore
├── package.json
├── README.md


## API Documentation

### User Endpoints

- **Register**: `POST /auth/register`
- **Login**: `POST /auth/login`
- **Profile**: `GET /profiles/:username`

### Venue Endpoints

- **Fetch Venues**: `GET /venues`
- **Create Venue**: `POST /venues`
- **Update Venue**: `PUT /venues/:id`
- **Delete Venue**: `DELETE /venues/:id`
- **Fetch Venue by ID**: `GET /venues/:id`

### Booking Endpoints

- **Create Booking**: `POST /bookings`
- **Fetch Bookings**: `GET /bookings`
- **Fetch Booking by ID**: `GET /bookings/:id`

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a new branch for your feature or bugfix**
    ```sh
    git checkout -b feature/your-feature-name
    ```
3. **Commit your changes**
    ```sh
    git commit -m "Description of your changes"
    ```
4. **Push to your branch**
    ```sh
    git push origin feature/your-feature-name
    ```
5. **Create a pull request** describing your changes

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

If you have any questions or need further assistance, feel free to open an issue or contact the project maintainers. Thank you for contributing to Holidaze!
