# Shopnest

Shopnest is a React/Vite storefront backed by the Express API in `../backend`.

## Run locally

Install dependencies with `npm run install:all` from the repository root. Set the backend environment variables required by the services you enable, then start both applications with `npm run dev`. The Vite development server proxies `/api` requests to `http://localhost:5000`; set `VITE_API_BASE_URL` when deploying the frontend separately.

The backend requires `MONGO_URI` and `JWT_SECRET`. Product image uploads require the Cloudinary credentials. Razorpay credentials enable online payment API requests; checkout also supports cash on delivery.

## Checks

- `npm test` runs the frontend and backend unit tests.
- `npm run lint --prefix frontend` runs ESLint.
- `npm run build` creates the production frontend bundle.
