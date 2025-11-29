# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


ecommerce-app/
├── public/
│   └── index.html
├── src/
│   ├── assets/                # Images, icons, fonts, etc.
│   ├── components/            # Reusable UI components
│   │   ├── ProductCard/
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   └── ...
│   ├── pages/                 # Route-level components (pages)
│   │   ├── Home/
│   │   ├── ProductDetails/
│   │   ├── Cart/
│   │   ├── Checkout/
│   │   ├── Login/
│   │   └── ...
│   ├── features/              # Redux slices or business logic modules
│   │   ├── products/
│   │   ├── cart/
│   │   ├── user/
│   │   └── reviews/
│   ├── services/              # API calls (e.g., axios)
│   │   └── api.js
│   ├── utils/                 # Utility functions/helpers
│   ├── hooks/                 # Custom hooks (e.g., useCart, useAuth)
│   ├── contexts/              # React Contexts (if used instead of Redux)
│   ├── routes/                # Route definitions
│   │   └── AppRoutes.jsx
│   ├── layouts/               # Layout wrappers (e.g., MainLayout, AuthLayout)
│   ├── styles/                # Global styles (CSS/SCSS modules)
│   │   └── global.css
│   ├── App.jsx
│   ├── main.jsx
│   └── config/                # App configuration files (e.g., constants, env settings)
│       └── index.js
├── .env
├── package.json
└── vite.config.js             # If using Vite