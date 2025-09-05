# Welcome to React Router!

# See project description below the boilerplate React information.

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.

# Proper Posts

Proper Posts is a fullstack message board application built with a modern React frontend and a simple Node.js/Express backend.

## Project Structure

```
mockUser/
  backend/         # Node.js/Express backend (API, database, seed)
  frontend/        # React frontend (Vite, Tailwind, React Router)
  README.md
  .gitignore
```

## Getting Started

### 1. Install dependencies

From the project root, install dependencies for both frontend and backend:

```sh
cd backend
npm install
cd ../frontend
npm install
```

### 2. Seed the database

Before running the backend, you must seed the database with initial users (Willy and Alice):

```sh
cd backend
node seed.js
```

### 3. Run the backend

```sh
npm start
```
The backend will start on [http://localhost:4000](http://localhost:4000).

### 4. Run the frontend

```sh
cd ../frontend
npm run dev
```
The frontend will start on [http://localhost:5173](http://localhost:5173).

---

## Features

- **Authentication:**  
  Login and registration with JWT-based authentication.  
  Login status is always visible in the bottom right corner.

- **Hero Section:**  
  Each main page (Home, Add Entry, Entries, Users) features a modern hero section for a consistent look.

- **Entries:**  
  - View all entries (requires login).
  - Add a new entry (requires login).
  - Choose how many entries to display (5, 10, or all).
  - Stylish cards with hover effects.

- **Users:**  
  - View all registered users (requires login).
  - User list styled to match entries.

- **Responsive Design:**  
  Built with Tailwind CSS for a modern, mobile-friendly UI.

- **Login Status Marker:**  
  Always visible, shows if you are logged in or not.

- **Elegant Alerts:**  
  Friendly, styled messages if you try to access protected content while logged out.

---

## Demo Users

After seeding, you can log in with:

- **Willy Wonka**  
  Email: `ww@example.com`  
  Password: `chocolate`

- **Alice**  
  Email: `alice@example.com`  
  Password: `wonderland`

---

## Notes

- Make sure to run the seed script before starting the backend.
- The backend must be running for the frontend to fetch entries and users.
- You can register new users via the registration form.

---

Enjoy Proper Posts!
