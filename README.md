# React + Vite (JavaScript)

This project uses React with Vite and plain JavaScript.

## Scripts

- `npm run dev` starts the development server.
- `npm run build` creates a production build.
- `npm run preview` previews the production build locally.
- `npm run lint` runs ESLint.

## Environment

Create or update `.env` with:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1/
```

## Routing and Auth

- Public route: `/login`
- Protected route: `/dashboard`

Route guards are implemented with:

- `src/routes/PublicRoute.jsx`
- `src/routes/ProtectedRoute.jsx`
