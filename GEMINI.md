# GEMINI Code Companion Context

This document provides context for the Gemini AI assistant to understand the project structure, conventions, and goals.

## Project Overview

This is a "monorepo" containing multiple implementations of a "MyTodo" application. The primary and most feature-rich version is a **Vue 3** application located in the root `src` directory. The repository also contains older or alternative versions in the `v1`, `v2`, and `v3` directories, which appear to be built with React and plain HTML.

### Primary Application (Vue 3)

The main application is a comprehensive todo list manager with the following features:

*   **Core Functionality:** CRUD for tasks.
*   **Advanced Features:** Task priorities, categories, due dates, sub-tasks, and recurring tasks.
*   **Data & Analytics:** A statistics dashboard with charts to visualize task completion, priority distribution, and more.
*   **Data Portability:** Functionality to import/export tasks from/to JSON and CSV files.

### Technology Stack (Primary App)

*   **Framework:** Vue 3 (Composition API with `<script setup>`)
*   **Build Tool:** Vite
*   **State Management:** Pinia
*   **Routing:** Vue Router
*   **Styling:** TailwindCSS
*   **Charting:** Chart.js
*   **Icons:** Lucide

## Building and Running

The following commands pertain to the primary Vue 3 application.

*   **Install Dependencies:**
    ```bash
    npm install
    ```

*   **Run Development Server:**
    ```bash
    npm run dev
    ```

*   **Build for Production:**
    ```bash
    npm run build
    ```

*   **Preview Production Build:**
    ```bash
    npm run preview
    ```

## Project Structure (Primary App)

The main application's source code is organized as follows:

```
src/
├── main.js              # Application entry point (Vue app initialization, plugins)
├── App.vue              # Root Vue component
├── router.js            # Vue Router configuration (defines pages/routes)
├── components/          # Reusable UI components (e.g., TodoItem, FilterPanel)
├── views/               # Page-level components for each route (e.g., Dashboard, Tasks)
├── stores/              # Pinia state management stores (e.g., todos, categories)
├── composables/         # Reusable Composition API logic (e.g., useTodos, useFilters)
├── utils/               # Utility functions (e.g., localStorage access)
└── styles/              # Global CSS and TailwindCSS styles
```

## Development Conventions

*   **State Management:** Business logic and application state are managed centrally within Pinia stores (`src/stores`). Components should interact with stores rather than managing complex local state.
*   **Code Style:** The project uses Vue 3's `<script setup>` syntax for more concise and readable component logic.
*   **Modularity:** Logic is separated into composables (`src/composables`) for better reusability and organization.
*   **Data Persistence:** All task data is persisted in the browser's `localStorage`.
