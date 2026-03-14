# Employee Insights Dashboard

## Live Demo

Live Application (Vercel):
[https://jotish-self.vercel.app/]

---

## Project Overview

This project is a **React-based Employee Insights Dashboard** built as part of an engineering assignment.
The application demonstrates advanced frontend concepts including authentication flow, custom virtualization, browser APIs, canvas image processing, and data visualization.

The goal of the project is to build a **high-performance employee management interface** capable of handling large datasets efficiently while also performing identity verification and analytics.

---

# Tech Stack

* React (Vite)
* React Router
* Tailwind CSS
* HTML5 Canvas
* Leaflet (Map visualization)
* Context API
* Browser Camera API

No UI component libraries were used as required by the assignment.

---

# Application Structure

The application contains four main screens.

## 1. Login Page

Handles authentication and session persistence.

Features:

* Context API based authentication
* Route protection
* Session persistence using localStorage

Credentials used for testing:

Username: testuser
Password: Test123

---

## 2. Employee List Page

Displays employee records fetched from the provided API.

API Endpoint:
POST https://backend.jotish.in/backend_dev/gettabledata.php

Payload:

```
{
  "username": "test",
  "password": "123456"
}
```

Features:

* Employee directory table
* Custom virtualization for large datasets
* Navigation to employee detail pages

---

## 3. Employee Details Page

Displays detailed information about a selected employee.

Route:

```
/details/:id
```

Features:

* Employee profile display
* Camera interface for identity verification
* Signature drawing using HTML5 canvas
* Image merging of captured photo and signature

The result is stored as a verification record.

---

## 4. Analytics Page

Displays insights derived from the employee dataset.

Features:

* Verified employee audit image
* Salary distribution visualization using **raw SVG**
* Geospatial employee distribution using **Leaflet map**

---

# Folder Structure

```
src
│
├── assets
│
├── components
│   ├── CityMap.jsx
│   ├── EmployeeHeader.jsx
│   ├── EmployeeNotFound.jsx
│   ├── EmployeeTable.jsx
│   ├── EmploymentInfo.jsx
│   ├── PersonalInfo.jsx
│   ├── ProtectedRoute.jsx
│   ├── SalaryChart.jsx
│   └── VerifiedCard.jsx
│
├── context
│   └── AuthContext.jsx
│
├── hooks
│   ├── useEmployees.js
│   └── useVirtualEmployees.js
│
├── pages
│   ├── Analytics.jsx
│   ├── Details.jsx
│   ├── List.jsx
│   └── Login.jsx
│
├── styles
│   └── global.css
```

---

# Custom Virtualization Implementation

To handle large datasets efficiently, a **custom virtualization algorithm** was implemented.

Instead of rendering all rows in the DOM, only the rows currently visible in the viewport (plus a small buffer) are rendered.

### Virtualization Logic

1. Track scroll position using `scrollTop`

2. Calculate visible start index

```
startIndex = scrollTop / rowHeight
```

3. Calculate number of visible rows

```
visibleRows = containerHeight / rowHeight
```

4. Determine the render window

```
endIndex = startIndex + visibleRows + buffer
```

5. Render only rows within this range.

A spacer element is used to maintain the correct scroll height.

### Benefits

* Significantly reduces DOM nodes
* Improves rendering performance
* Smooth scrolling even with large datasets

---

# Image Merging Logic

During identity verification, two images are combined:

1. Captured camera photo
2. User signature from canvas

The merging process uses the Canvas API:

1. Draw captured image on canvas
2. Draw signature canvas on top
3. Export merged result using

```
canvas.toDataURL()
```

This creates the final **verification audit image**.

---

# Map Visualization

Employee locations are visualized using **Leaflet**.

City names from the dataset are mapped to geographic coordinates using a predefined mapping object.

Markers are placed on the map with radius scaled based on employee count per city.

---

# Intentional Bug

(Required by assignment)

Description of intentional bug:

After capturing the employee photo and drawing the signature on the Details page, the merged image is successfully generated but the application **does not automatically redirect the user to the Analytics page**. Additionally, there is **no UI button provided to navigate to the Analytics page**.

To view the analytics results, the user must **manually enter `/analytics` in the browser URL**.

Location of bug in code:

The issue exists in the **Details page logic responsible for handling the image merge operation**. After generating the merged image using the Canvas API, the navigation step to `/analytics` is intentionally omitted.

Example expected navigation (not implemented intentionally):

```
navigate("/analytics")
```

Reason for choosing this bug:

This bug was intentionally introduced to satisfy the assignment requirement of including exactly one logical flaw in the application. It simulates a realistic UI flow issue where a successful operation does not trigger the expected navigation, forcing the user to manually access the results page.


# How to Run the Project

Install dependencies:

```
npm install
```

Start development server:

```
npm run dev
```

Build project:

```
npm run build
```

---

# Demo Walkthrough

Demo Link:
[Will Paste Demo URL here]

The project demonstration video includes:

1. Application walkthrough
2. Explanation of virtualization logic
3. Explanation of image merging implementation

The explainer section focuses on:

* Scroll offset calculation for virtualization
* Canvas image merging process

---

# Notes

This project was built without using UI libraries or virtualization libraries as required by the assignment.
All performance optimizations and UI components were implemented manually.
