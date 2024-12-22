# E-Shop

E-Shop is a full-stack e-commerce application designed for selling tech gadgets. It provides a seamless experience for users to browse, purchase, and pay with cryptocurrencies while enabling administrators to manage products and user data efficiently. The application follows a modern MERN (MongoDB, Express.js, React.js, Node.js) architecture.

---

## Table of Contents

- [E-Shop](#e-shop)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Other Tools](#other-tools)
  - [Setup Instructions](#setup-instructions)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
  - [Environment Variables](#environment-variables)
  - [Folder Structure](#folder-structure)
  - [Key Functionalities](#key-functionalities)
    - [User Features](#user-features)
    - [Admin Features](#admin-features)
    - [Miscellaneous](#miscellaneous)
  - [API Documentation](#api-documentation)
  - [Deployment](#deployment)
  - [Future Enhancements](#future-enhancements)
  - [Contributing](#contributing)
  - [License](#license)

---

## Features

- **User Authentication**: Secure sign-up, login, and logout functionalities.
- **Cryptocurrency Payments**: Integrated crypto payment gateway to minimize transaction fees.
- **Product Management**: Add, update, and delete products (admin-only).
- **Profile Management**: Users can upload and update profile pictures with real-time updates.
- **Responsive Design**: Fully responsive UI optimized for all devices.
- **Email Notifications**: HTML-styled confirmation emails for signups.

---

## Tech Stack

### Frontend

- React.js with Zustand for state management
- Tailwind CSS for styling
- Axios for API communication

### Backend

- Node.js with Express.js
- MongoDB with Mongoose ORM

### Other Tools

- Multer for file uploads
- JWT for secure authentication
- Nodemailer for email notifications

---

## Setup Instructions

### Prerequisites

- Node.js >= 16.x
- MongoDB >= 5.x
- Crypto payment API credentials
- npm or yarn package manager

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/e-shop.git
   cd e-shop
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   cd client && npm install
   ```

3. **Set Up Environment Variables**:

   - Create a `.env` file in the root directory and populate it using the [Environment Variables](#environment-variables) section.

4. **Run the Application**:

   - Start the backend server:
     ```bash
     npm run server
     ```
   - Start the frontend development server:
     ```bash
     cd client && npm start
     ```

5. **Access the App**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Add the following variables to your `.env` file:

```
# Backend
MONGO_URI=<your-mongo-db-uri>
JWT_SECRET=<your-jwt-secret>
SMTP_HOST=<your-smtp-host>
SMTP_PORT=<your-smtp-port>
SMTP_USER=<your-email-username>
SMTP_PASS=<your-email-password>

# Crypto API
CRYPTO_API_KEY=<your-crypto-api-key>
```

---

## Folder Structure

```
E-Shop/
├── client/               # Frontend source code
├── server/               # Backend source code
├── uploads/              # Directory for uploaded files
├── .env                  # Environment variables
├── package.json          # Project metadata
├── README.md             # Project documentation
```

---

## Key Functionalities

### User Features

- Browse products
- Add items to the cart
- Secure checkout with cryptocurrency payments

### Admin Features

- Product management (CRUD operations)
- View and manage orders

### Miscellaneous

- Profile picture uploads using Multer
- Cookie-based user session management
- Zustand-based global state management for seamless user experience

---

## API Documentation

The API documentation is available in the `server/docs` directory. Use Postman or any API testing tool to explore endpoints. Example endpoints:

- **User Authentication**:

  - POST `/api/auth/signup`
  - POST `/api/auth/login`

- **Product Management**:

  - GET `/api/products`
  - POST `/api/products` (Admin only)

- **Order Management**:
  - POST `/api/orders`

---

## Deployment

1. **Backend Deployment**:

   - Deploy on a Node.js hosting platform (e.g., AWS, Heroku, or Vercel).

2. **Frontend Deployment**:

   - Build the React app:
     ```bash
     npm run build
     ```
   - Deploy the build folder to a static hosting service (e.g., Netlify or Vercel).

3. **Configure Environment Variables** on the hosting platform.

---

## Future Enhancements

- Add support for multiple payment methods.
- Implement product reviews and ratings.
- Enhance admin dashboard with analytics and insights.

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with detailed explanations for changes.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
