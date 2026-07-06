# Inventory Order Management System - Frontend

A responsive frontend for an Inventory Order Management System built with React. The application allows users to browse products, view product details, manage their wishlist, view their orders, and provides separate pages for administrators to manage products and categories.

This frontend communicates with a REST API built using Express.js and MySQL with JWT-based authentication.

---

## Live Demo

Frontend:
https://inventory-order-system-frontend-omega.vercel.app

Backend API:
https://endearing-learning-production-acc0.up.railway.app/api/products

---

## Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Logout

### Products

- View all products
- View product details
- Loading spinner while fetching data

### Wishlist

- Add products to wishlist
- View wishlist
- Protected page

### Orders

- View logged-in user's orders
- Protected page

### Admin

- View all products
- Delete products
- View categories
- Delete categories
- Delete confirmation before removing data

### UI

- Responsive layout using Bootstrap
- Navigation bar
- Footer
- Loading Spinner
- Custom 404 Page

---

## Tech Stack

### Frontend

- React
- React Router DOM
- Axios
- Bootstrap
- Bootstrap Icons

### Backend

- Node.js
- Express.js
- JWT Authentication

### Database

- MySQL

### Deployment

- Vercel
- Railway

---

## Project Structure

```
src
│
├── api
├── components
├── context
├── pages
├── styles
├── App.jsx
├── main.jsx
└── index.css
```

---

## Pages

| Page | Description |
|------|-------------|
| Login | User Login |
| Register | User Registration |
| Products | Display all products |
| Product Details | View selected product |
| Wishlist | User wishlist |
| Orders | User orders |
| Admin Products | Product management |
| Admin Categories | Category management |
| 404 | Custom not found page |

---

## Authentication Flow

```
Register
      ↓
Login
      ↓
JWT Token
      ↓
Local Storage
      ↓
Axios Interceptor
      ↓
Protected API Requests
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/guru6304/inventory-order-system-frontend.git
```

Move into the project

```bash
cd inventory-order-system-frontend
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

---

## Build

```bash
npm run build
```

---

## Future Improvements

Some improvements planned for future versions include:

- Search products
- Pagination
- Toast notifications
- Dashboard
- Analytics
- User profile
- Order history

---

## Author

Developed by **Guru**

GitHub:
https://github.com/guru6304