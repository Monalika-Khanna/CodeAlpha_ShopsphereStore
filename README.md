# ShopSphere

ShopSphere is a full-stack e-commerce platform built for the CodeAlpha Full Stack Development internship. It includes a responsive React storefront, JWT authentication, MongoDB persistence, customer carts and checkout, order history, and an admin workspace.

## Features

- Product discovery with search, category filters, sorting, ratings, stock status, and responsive product cards
- Secure registration/login with bcrypt password hashing and JWT protected routes
- Persistent local cart with quantity limits based on inventory
- Validated shipping checkout that creates real orders and decrements stock
- Customer order history and order status visibility
- Admin product creation/deletion, inventory view, order status updates, and dashboard statistics
- Centralized API errors, loading skeletons, empty states, toast feedback, and responsive layout

## Stack

React + Vite, React Router, Axios, Tailwind CSS, Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, and lucide-react.

## Installation

Prerequisites: Node.js 18+, npm, and a running MongoDB instance (local or MongoDB Atlas).

```bash
npm run install:all
copy server\\.env.example server\\.env
copy client\\.env.example client\\.env
npm run dev
```

The storefront runs at `http://localhost:5173` and the API at `http://localhost:5000`. Seed sample data and an admin account with:

```bash
node server/seed.js
```

Default seeded admin credentials come from `server/.env` (`ADMIN_EMAIL` / `ADMIN_PASSWORD`). Change them before using a shared environment.

## Environment variables

Server: `PORT`, `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `GOOGLE_CLIENT_ID`.
Client: `VITE_API_URL` and `VITE_GOOGLE_CLIENT_ID`. Set both Google client ID variables to the same Google OAuth web client ID to enable Google sign-in. Never put server secrets in the client environment.

## API endpoints

- Auth: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- Products: `GET /api/products`, `GET /api/products/:id`, `POST|PUT|DELETE /api/products/:id` (admin)
- Orders: `POST /api/orders`, `GET /api/orders/my-orders`, `GET /api/orders/:id`, `GET /api/orders` (admin), `PUT /api/orders/:id/status` (admin)
- Users: `GET /api/users`, `GET /api/users/:id`, `PUT /api/users/:id` (admin)
- Health: `GET /api/health`

## Structure

`client/src` contains pages, components, context, services, routes, and layouts. `server` contains controllers, Mongoose models, routes, middleware, config, seed data, and the application entry point.

## Screenshots


<img width="757" height="401" alt="Screenshot 2026-09-06 172736" src="https://github.com/user-attachments/assets/0b144cc5-0ab5-4328-85ea-ef3a10afda32" />

## Future improvements

Add Cloudinary uploads, Stripe payment intents, pagination, product reviews, email notifications, refresh tokens, and automated integration tests backed by a test database.
