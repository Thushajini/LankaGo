# LankaGo - Sri Lanka Tourism Guide

## Project Overview

LankaGo is a responsive tourism web application developed using React and Tailwind CSS. The application helps users discover popular tourist destinations in Sri Lanka, search places, view detailed information, save favorite places, and find nearby attractions using geolocation.

---

## Framework and Technologies Used

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* React Icons
* JSON Server (Mock REST API)
* Browser Geolocation API
* Local Storage

---

## Features

* Responsive Splash Screen
* Home Page with Search
* Category Filtering
* Tourist Place Details
* Favorite Places (Local Storage)
* Nearby Places using Geolocation
* Google Maps Integration
* Mobile Responsive Design

---

## Browser Compatibility

The application has been tested and works correctly on the following browsers:

* Google Chrome (Recommended)
* Microsoft Edge
* Mozilla Firefox

For the best experience, use the latest version of Google Chrome.

---

## Prerequisites

Before running the project, install:

* Node.js (v18 or later)
* npm

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project folder:

```bash
cd lankago
```

Install dependencies:

```bash
npm install
```

---

## Running the JSON Server

Start the mock API:

```bash
npx json-server --watch db.json --port 3001
```

The API will be available at:

```
http://localhost:3001
```

---

## Running the Application

Start the React development server:

```bash
npm run dev
```

Open your browser and visit:

```
http://localhost:5173
```

---

## Project Structure

```
src/
 ├── assets/
 ├── components/
 ├── pages/
 ├── services/
 ├── App.jsx
 └── main.jsx
```

