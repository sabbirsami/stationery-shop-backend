
# Stationery Shop Backend - Project Initialization and Setup
#### [Live Link](https://stationery-shop-backend.vercel.app/)
### Description

The **Stationery Shop Backend** is a TypeScript-based application designed for managing stationery products in an online store. It includes features such as product management, order handling, inventory tracking, and more. The backend is built with **Express**, **MongoDB** (using **Mongoose**), and **Zod** for input validation. This backend system also includes automated development workflows using **Husky** and **Lint-Staged**.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)
- [MongoDB](https://www.mongodb.com/) (Make sure it's running)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sabbirsami/stationery-shop-backend
   ```
2. **Change into the project directory:**
   ```bash
   cd stationery-shop-backend
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```

### Configuration

1. Create a `.env` file in the project root and set the following environment variables:
   ```env
   PORT=5000
   DATABASE_URL=<your-mongodb-uri>
   JWT_SECRET=<your-secret-key>
   ```
   Replace `<your-mongodb-uri>` with your actual MongoDB connection URI and `<your-secret-key>` with a secure secret key for JWT.

### Scripts

- `npm run build`: Build the TypeScript code.
- `npm start`: Start the server (after building).
- `npm run start:dev`: Start the server in development mode with automatic restarts on code changes.
- `npm run lint`: Run ESLint to lint TypeScript files.
- `npm run lint:fix`: Run ESLint and automatically fix fixable issues.
- `npm run prettier`: Run Prettier to format code.
- `npm run prettier:fix`: Run Prettier and automatically fix formatting issues.
- `npm test`: Run tests (not implemented in this template).

### Usage

1. **Build the project:**
   ```bash
   npm run build
   ```
2. **Start the server:**
   ```bash
   npm run start:dev
   ```
3. **Access the API at** `http://localhost:5000` (or the port you specified in the `.env` file).

### Development

For development with automatic restarts on code changes, use:

```bash
npm run start:dev
```

### Features

- **Product Management:** Add, update, and remove stationery products, including their name, price, description, and quantity.
- **Order Handling:** Track orders, manage order status, and calculate total prices.
- **Inventory Tracking:** Automatically update stock levels when orders are placed.
- **Category Management:** Group products into categories (e.g., Writing, Office Supplies).
- **Input Validation with Zod:** Ensure that all user inputs, such as product details and order data, are validated.
- **Automatic Linting and Formatting:** Integrated **ESLint** and **Prettier** with Husky to enforce consistent code quality.
- **MongoDB Integration:** Store and manage products, orders, and categories in **MongoDB** with **Mongoose**.
- **Environment Variables:** Use a `.env` file to securely manage environment-specific configurations.
