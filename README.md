# ZeroZCloths E-Commerce Site

![ZeroZCloths Logo]

A simple e-commerce website for **ZeroZCloths**, a clothing company based in Colombo, built using the **MERN stack** (MongoDB, Express, React, Node.js).

---

## Features

- **User Authentication**: Register, login, and logout functionality.
- **Product Management**: Add, update, delete, and view products.
- **Shopping Cart**: Add/remove products to/from the cart.
- **Checkout**: Secure checkout process.
- **Responsive Design**: Mobile-friendly and responsive UI.

---

## Technologies Used

- **Frontend**: React, React Router, Axios, Tailwind CSS, Flowbite React.
- **Backend**: Node.js, Express, MongoDB, Mongoose.
- **Authentication**: JSON Web Tokens (JWT).
- **Payment Integration**: PayHere.lk.
- **Deployment**: Namecheap.com.

---

## Project Structure

zeroZcloths-ecommerce/       # Root folder 
│
├── backend/                 # Backend 
│   ├── config/              # Configuration files
│   ├── controllers/         # Logic for handling routes
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── utils/               # Utility functions
│   ├── .env                 # Environment variables
│   ├── server.js            # Entry point for the backend
│   └── package.json         # Backend dependencies
│
├── frontend/                # Frontend (React)
│   ├── public/              # Static assets 
│   ├── src/                 # React source code
│   │   ├── components/      # Reusable components 
│   │   ├── pages/           # Page components 
│   │   ├── context/         # React context
│   │   ├── hooks/           # Custom hooks 
│   │   ├── utils/           # Utility functions
│   │   ├── App.jsx           # Main App component
│   │   ├── main.jsx         # Entry point for React
│   │ 
│   ├── .env                 # Frontend environment variables
│   ├── package.json         # Frontend dependencies
│   └── README.md            # Frontend documentation
│
├── .gitignore               # Git ignore file (for both frontend and backend)
└── README.md                # Project documentation


## 📌 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/sihina3436/Hunters.git
cd zeroZcloths-ecommerce
```

### 2️⃣ Backend Setup
```sh
cd backend
npm install
```
- Create a `.env` file in the `backend/` directory and add necessary environment variables.
- Start the backend server:
```sh
npm run dev
```

### 3️⃣ Frontend Setup
```sh
cd ../frontend
npm install
npm run dev
```

## 🎯 Features
✅ User Authentication (Login/Register)  
✅ Product Management (CRUD)  
✅ Shopping Cart  
✅ Order Management  
✅ Payment Integration 
✅ Admin Panel for Order & Inventory Control 

## 📜 License
This project is licensed under the MIT License.