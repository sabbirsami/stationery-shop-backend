# Stationery Shop Backend

A backend API for managing a stationery shop, built with Express.js and TypeScript, integrated with MongoDB using Mongoose for data management. The application allows for the management of stationery products, orders, and the calculation of total revenue from orders.

## Features

### 1. **Manage Products**
   - Effortlessly add, update, view, and delete stationery products.
   - Each product includes useful details like its name, brand, price, category, description, and available quantity.

### 2. **Handle Orders**
   - Customers can place orders for products, and you can easily update product stock based on sales.
   - The app also tracks and calculates total revenue from all orders.

### 3. **Product Categories**
   - Organize your products into clear categories (e.g., Writing, Office Supplies) to make searching and filtering easy.

### 4. **Validation with Mongoose & Zod**
   - Data is carefully validated using **Mongoose** to ensure consistency in the database, and **Zod** is used to validate incoming requests, ensuring accurate and secure data entry.

### 5. **Helpful Error Responses**
   - In case something goes wrong, you’ll get detailed error messages that help quickly identify the issue and fix it.


## Getting Started

To set up the project locally, follow these steps:

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (A running instance of MongoDB either locally or using a cloud provider like MongoDB Atlas)

### Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/stationery-shop-backend.git
   cd stationery-shop-backend
