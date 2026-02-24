# CMS - React Apollo Client

A type-safe Single Page Application (SPA) built with **React**, **Apollo Client**, and **TypeScript**. This project demonstrates a functional CMS interface featuring real-time GraphQL data fetching, mutations, and automated type generation, all wrapped in a professional admin dashboard.

---

## 🛠 Tech Stack

* **Frontend Framework**: React (v16.13) with TypeScript
* **UI Architecture**: **CoreUI Admin Dashboard for React** (v2.5.1)
* **Data Fetching**: Apollo Client (Apollo Boost), GraphQL
* **State Management**: Apollo Cache (In-memory)
* **Form Management**: Formik, Yup
* **Styling**: Sass, Styled Components, Bootstrap 4

---

## 🚀 Getting Started

### 1. Backend Setup (Mock Server)

This project utilizes `json-graphql-server` to provide a local GraphQL endpoint for development and testing.

```bash
# Install the server globally
yarn global add json-graphql-server

# Run the server from the project root folder
# Port 3001 is used to avoid conflict with the React dev server
json-graphql-server db.js --p 3001

```

* **GraphiQL Explorer**: [http://localhost:3001](https://www.google.com/search?q=http://localhost:3001)

### 2. Frontend Installation & Execution

```bash
# Install dependencies
yarn install

# Generate TypeScript types and Apollo hooks from .graphql files
yarn generate

# Start the development server
yarn start

```

* **App URL**: [http://localhost:3000]

---

## 🎨 UI & Layout

The project is built upon the **CoreUI Admin Dashboard for React**. This provides a professional, production-ready layout including:

* **Responsive Navigation**: Sidebar and Header system.
* **Dashboard Components**: Pre-styled Tables, Forms, and Cards.
* **Visual Feedback**: Integration with `react-toastify` for API response notifications.
* **Iconography**: Seamless use of `@coreui/icons`, `font-awesome`, and `simple-line-icons`.

---

## 🏗 Project Architecture

This project follows a professional **Container/Component pattern** and utilizes **GraphQL Code Generator** to ensure end-to-end type safety.

* **`src/cms/`**: Core business modules. Components are split into Containers (handling Apollo logic and data mapping) and Components (handling the UI and view logic).
* **`src/generated/`**: Contains automated TypeScript types and React Hooks (e.g., `useAllStatusesQuery`) generated directly from the `.graphql` schema and files.
* **`src/graphql/`**: Central Apollo Client configuration and client initialization.
* **`src/views/`**: Pages for authentication (Login/Register) and CoreUI layout wrappers.

---

## 📂 Key Implementations

* **GraphQL Queries**: Fetches data using generated hooks, supporting both Hook-based and Render-prop patterns.
* **GraphQL Mutations**: Demonstrates mutations with manual **Apollo Cache updates** (using `readQuery` and `writeQuery`) to ensure the UI stays in sync without a page refresh.
* **Type Generation**: Leverages `graphql-codegen` to eliminate manual interface writing and prevent runtime data errors.
* **Lazy Loading**: Implements code-splitting using `React.lazy` and `React.Suspense` for optimized initial bundle sizes and performance.

---
