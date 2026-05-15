# Interactive Full-Stack Portfolio Website

A MERN-style personal portfolio with a responsive React frontend, Express API, MongoDB persistence, admin project management, contact messages, dark mode, category filters, featured projects, and project preview modals.

The frontend also includes sample projects, so the portfolio still looks complete when the backend is empty or offline.

## Folder Structure

```text
portfolio/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      utils/
      app.js
      server.js
    .env.example
    package.json
  frontend/
    src/
      App.jsx
      api.js
      main.jsx
      styles.css
    .env.example
    index.html
    package.json
    vite.config.js
  README.md
```

## Requirements

- Node.js 18 or newer
- MongoDB running locally, or a MongoDB Atlas connection string
- npm

## Backend Setup

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Update `backend/.env`:

```env
PORT=5050
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio
CLIENT_URL=http://localhost:5173
JWT_SECRET=replace-with-a-long-random-secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change-this-password
```

The first backend start creates the admin user from `ADMIN_EMAIL` and `ADMIN_PASSWORD` if that email does not already exist.

## Frontend Setup

Open a second terminal:

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

The frontend runs at `http://localhost:5173` by default.

## Open Without the Dev Server

If you want to open the portfolio from File Explorer, build the frontend first:

```bash
cd frontend
npm run build
```

Then open:

```text
frontend/dist/index.html
```

Do not open `frontend/index.html` directly from File Explorer. That file is meant for the Vite dev server.

## Frontend Features

- Responsive single-page portfolio layout
- Light and dark theme toggle
- Built-in demo projects if the API has no project data
- Featured project spotlight
- Project category filters
- Project preview modal
- Admin dashboard modal for adding, editing, and deleting projects
- Contact form connected to the backend API

## API Endpoints

- `GET /api/health` - API health check
- `POST /api/auth/login` - admin login
- `GET /api/auth/me` - current admin user, requires token
- `GET /api/projects` - list public projects
- `POST /api/projects` - add project, requires token
- `PUT /api/projects/:id` - edit project, requires token
- `DELETE /api/projects/:id` - delete project, requires token
- `POST /api/contact` - submit contact form
- `GET /api/contact` - list contact messages, requires token

## Admin Dashboard

1. Start both backend and frontend.
2. Open the portfolio in the browser.
3. Click `Admin` in the navigation.
4. Log in with the credentials from `backend/.env`.
5. Add projects with title, image URL, description, tech stack, GitHub URL, optional live URL, and featured status.

## Project Data Shape

```json
{
  "title": "Portfolio Dashboard",
  "category": "Full Stack",
  "description": "A MERN project dashboard with admin CRUD.",
  "imageUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  "techStack": ["React", "Node", "Express", "MongoDB"],
  "githubUrl": "https://github.com/username/project",
  "liveUrl": "https://project.example.com",
  "featured": true
}
```

## Production Notes

- Use a strong `JWT_SECRET`.
- Replace the seeded admin password after first deployment.
- Set `CLIENT_URL` to the deployed frontend URL.
- Set `VITE_API_URL` to the deployed backend API URL.
- Use HTTPS in production.
