# Inquiry Management

A robust, enterprise-grade Single Page Application (SPA) built with **React**, **TypeScript**, and **Redux**. This project is built using the **CoreUI Admin Dashboard React Template**, providing a professional, responsive, and feature-rich interface for internal management systems.

---

## 🚀 Key Features

* **Admin Dashboard Integration:** Built on the **CoreUI React Template**, utilizing its extensive library of pre-styled components, layouts, and navigation patterns.
* **Advanced State Management:** Implements a dual-layer asynchronous strategy using **Redux-Saga** for background API watchers and **Redux-Thunk** for dispatching complex functional updates.
* **Type-Safe Architecture:** Developed with **TypeScript 3.2**, utilizing strict interfaces for Props, State, and Redux Actions to ensure compile-time safety and reliable refactoring.
* **Intelligent Form Logic:** Integrated **Formik** for form state management and **Yup** for schema-based validation, featuring real-time "unique title" verification via API gateways.
* **Performance Optimization:** Utilizes **React.lazy** and **Suspense** for component-level code splitting, ensuring optimized load times for a smoother user experience.
* **Dynamic UI Elements:** Enhanced with **Reactstrap** and **Styled Components**, featuring integrated data tables, loading states, and toast notifications.

---

## 🛠 Tech Stack

| Category | Technology |
| --- | --- |
| **UI Template** | **CoreUI Admin Dashboard (React Version)** |
| **Core Framework** | React 16.7, TypeScript 3.2 |
| **State Management** | Redux, Redux-Saga, Redux-Thunk, Typesafe-Actions |
| **Routing** | React Router DOM (HashRouter), Connected React Router |
| **Forms & Validation** | Formik, Yup |
| **Visualization** | Chart.js, React-chartjs-2, React-color |
| **Icons & Styling** | Font-Awesome, Simple Line Icons, Styled Components |

---

## 📂 Project Structure

The project follows a modular feature-based architecture, ensuring that logic related to specific domains is encapsulated:

* **CoreUI Layouts:** Optimized sidebar, header, and breadcrumb navigation provided by the CoreUI framework.
* **Feature Modules:** Located in `src/cms/`, each module (e.g., Inquiry Status) contains its own components, actions, reducers, and sagas.
* **API Gateway:** A dedicated layer for handling asynchronous requests, mock data simulation, and centralized error handling.
* **Shared Components:** Reusable UI elements such as custom Loaders, Messages, and Editable Form templates.

---

## 🚥 Getting Started

### Prerequisites

* **Node.js** (v10+ recommended for this environment)
* **npm** or **yarn**

### Installation

1. **Clone the repository:**
`git clone https://github.com/your-username/react-app.git`
2. **Install dependencies:**
`npm install`
3. **Start the development server:**
`npm start`

### Available Scripts

* `npm start`: Runs the app in development mode at [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000).
* `npm run build`: Bundles the app into static files for production.
* `npm test`: Launches the interactive test runner.

---

## 🏗 Architectural Highlights

### CoreUI Customization

The project demonstrates how to extend a professional template like **CoreUI** by integrating custom Redux flows and TypeScript interfaces without compromising the template's responsive integrity.

### Side-Effect Management

This project showcases how to handle complex asynchronous flows by separating UI triggers from business logic. By using Sagas to watch for specific action types, the UI remains decoupled from API implementation details.
