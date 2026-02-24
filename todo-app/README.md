# Task Manager (React SPA, Context + Reducer Pattern)

A robust Task Management showcase application built with **React 17** and **TypeScript**. This project demonstrates a clean separation of concerns, custom hooks for asynchronous operations, and centralized state management using the `useReducer` and `Context API` pattern.

## 🚀 Key Features

* **Advanced State Management**: Utilizes `Context API` paired with `useReducer` to manage complex state transitions (loading, error, and data states) in a Redux-like fashion.
* **Asynchronous Action Pattern**: Implements a custom `useTaskActions` hook to handle mock API calls with proper `START`, `COMPLETE`, and `ERROR` dispatch cycles.
* **TypeScript Integration**: Fully type-safe development including interfaces for Models, Actions, and Application State.
* **Performance Optimized**: Uses `React.memo` and `useCallback` to prevent unnecessary re-renders in the task list components.
* **Clean Architecture**: Strict separation of UI components (Presentational) from Logic (Containers/Providers).

## 🛠 Tech Stack

* **Core**: React 17, TypeScript 4
* **State**: Context API, useReducer
* **Testing**: Jest, React Testing Library
* **Tooling**: Create React App (CRA)

---

## 🏗 Project Structure

The project follows a feature-based folder structure for better scalability:

```text
src/
└── ManageTasks/
    ├── CreateTask/      # Logic for adding new tasks
    ├── Models/          # TypeScript interfaces (ITaskModel)
    ├── Provider/        # State Central: Context, Reducer, and Actions
    ├── TaskList/        # UI components and Containers for displaying tasks
    └── ManageTasks.tsx  # Feature entry point

```

---

## ⚙️ How it Works: The State Flow

This project avoids "Prop Drilling" by using a centralized **TaskProvider**.

1. **Provider**: `TaskProvider.tsx` wraps the application and initializes the `useReducer` hook.
2. **Actions**: `useTaskActions.ts` provides functions like `SaveTask` and `GetAllTasks`. These handle the asynchronous "mock" API calls and dispatch the results to the reducer.
3. **Reducer**: `TaskStore.ts` contains the logic for how the state updates based on specific action types (e.g., `SET_TASKS`, `DELETE_TASK_API_START`).
4. **Consumption**: Components use `useContext(TaskContext)` to access data and `useTaskActions` to trigger changes.

---

## 🚦 Getting Started

### Prerequisites

* **Node.js** (v14+ recommended)
* **npm** or **yarn**

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/todo-app.git

```


2. Install dependencies:
```bash
npm install

```



### Available Scripts

* `npm start`: Runs the app in development mode at [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000).
* `npm run build`: Bundles the app for production.
* `npm test`: Launches the interactive test runner.
