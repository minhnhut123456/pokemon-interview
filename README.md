# Pokémon List – Interview Test

This repository is an **interview coding exercise** implemented with **Next.js 15**.  
The application demonstrates how to build a Pokémon list page with server-side fetching, filtering, and pagination.

👉 **Live Demo:** [https://pokemon-interview.vercel.app/](https://pokemon-interview.vercel.app/)

---

## Features

- **Server Components (App Router)**  
  All data fetching is handled on the server for improved SEO and performance.

- **Pokémon Types**  
  - Fetches the full list of Pokémon types from the server on first load.  
  - The type list is always fresh and dynamically rendered.

- **Filtering by Type**  
  - If **no type** is selected → all Pokémon are listed with pagination.  
  - If **one type** is selected → Pokémon belonging to that type are listed.  
  - If **multiple types** are selected →  
    - For each pair of selected types, the Pokémon lists are intersected.  
    - The results are then merged together (Pokémon can have up to 2 types).  
    - This ensures accurate results when filtering across multiple types.

- **Pagination**  
  - Page number is read from the URL (`?page=...`).  
  - Pagination works together with the type filters.  
  - Query params always reflect the current state (`?type=fire,water&page=2`).

---

## Tech Stack

- **Next.js 15** (App Router + Server Components)  
- **TypeScript**  
- **PokéAPI** as data source  
- **Search Params** for state management (type & page)  
- **CSS Modules** for component-level styling  
- **Global CSS variables** (kept minimal) for shared tokens like colors and spacing

---

## Getting Started

Install dependencies:

```bash
yarn install
```

Run the development server:

```bash
yarn dev
```

Build and run in production mode:
```bash
yarn build
yarn start
```
