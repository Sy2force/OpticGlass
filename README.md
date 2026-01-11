# Optic Glass

Hey! This is my e-commerce project for selling premium eyewear. I built it from scratch using React for the frontend and Express.js for the backend.

## What is this?

Optic Glass is an online store where you can browse and buy glasses - both optical frames and sunglasses. I wanted to create something that looks clean and professional, with a dark theme and gold accents.

## Tech I used

**Frontend:**
- React 18 with Vite (super fast builds)
- TailwindCSS for styling
- Framer Motion for animations
- React Router for navigation

**Backend:**
- Node.js with Express
- MongoDB for the database
- JWT for user authentication

## Main features

- Browse products by category (optical or sunglasses)
- Filter by brand, price, color, etc.
- Add items to cart and checkout
- User accounts with order history
- Admin dashboard to manage everything
- Responsive design - works on mobile too

## How to run it locally

First, clone the repo:

```bash
git clone https://github.com/Sy2force/OpticGlass.git
cd OpticGlass
```

### Backend setup

```bash
cd backend
npm install
```

Create a `.env` file:

```
NODE_ENV=development
PORT=3005
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Then start it:

```bash
npm start
```

### Frontend setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```
VITE_API_URL=http://localhost:3005/api
```

Then run:

```bash
npm run dev
```

Open `http://localhost:3006` in your browser.

## Deployment

I deploy the frontend on Render (static site) and the backend on Render too (web service). You need to set up the environment variables on Render for it to work.

**Backend variables on Render:**
- `MONGO_URI` - your MongoDB Atlas connection string
- `JWT_SECRET` - a random secret key
- `NODE_ENV` - set to `production`

**Frontend variables on Render:**
- `VITE_API_URL` - your backend URL like `https://your-backend.onrender.com/api`

## Project structure

```
OpticGlass/
├── backend/          # Express API
│   ├── controllers/  # Route handlers
│   ├── models/       # MongoDB schemas
│   ├── routes/       # API routes
│   └── server.js     # Entry point
│
├── frontend/         # React app
│   ├── src/
│   │   ├── pages/    # All the pages
│   │   ├── widgets/  # Reusable components
│   │   └── shared/   # Utils and helpers
│   └── index.html
│
└── README.md
```

## API endpoints

Here are the main ones:

- `POST /api/auth/register` - create account
- `POST /api/auth/login` - login
- `GET /api/products` - get all products
- `GET /api/products/:id` - get one product
- `GET /api/cart` - get user cart
- `POST /api/cart` - add to cart
- `GET /api/orders` - get user orders

Admin routes need authentication and admin role.

## Security stuff

- Passwords are hashed with bcrypt
- JWT tokens for authentication
- Rate limiting to prevent spam
- Input validation on all forms
- CORS configured properly

## Author

Built by Sy2force

GitHub: https://github.com/Sy2force/OpticGlass

## License

MIT - do whatever you want with it
