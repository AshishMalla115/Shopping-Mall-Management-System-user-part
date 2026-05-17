# Minimal React Frontend (for this backend)

This `frontend/` folder is a **shopping-mall themed React UI** for your Spring Boot backend (in the parent folder).  
It implements everything your **root `README.md` documents** for the API: signup, login, list users, get user by ID.  
(There are no shop/order endpoints in the backend yet—the mall “zones” on the home page are interactive UI only.)

### Folder layout (similar to your workshop)

Workshop used `create-react-app` with `src/App.js` and `src/components/`. This project uses **Vite + React**; files that contain JSX use the **`.jsx`** extension (Vite requirement).

```
frontend/src/
  App.jsx              ← main screen (like workshop App.js)
  App.css
  main.jsx
  api.js               ← fetch helpers
  components/
    header.jsx         ← top bar + navigation (like workshop header)
    functional.jsx     ← small reusable pieces (like workshop functional.js)
```

## Run the backend (Spring Boot)

From the project root:

```bash
mvn spring-boot:run
```

Backend runs at:

- `http://localhost:8080`

## Run the frontend (React)

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the URL shown by Vite (usually `http://localhost:5173`).

## How frontend calls backend

The frontend uses these API endpoints:

- `POST /api/users/signup`
- `POST /api/users/login`
- `GET /api/users`
- `GET /api/users/{id}`

During development, Vite proxies `/api` to `http://localhost:8080` (see `vite.config.js`), so you don’t need to set up CORS.
