Fitness Tracker — React Hooks & State Management Assignment

Project Contents

src – React source code of the Fitness Tracker application
screenshots – Screenshots showing the working features of the application


Steps to Run

1. Create a new React project using Vite:

npm create vite@latest fitness-tracker
Select React and JavaScript.


2. Navigate to the project folder:

cd fitness-tracker


3. Install required dependencies:

npm install
npm install bootstrap
npm install @reduxjs/toolkit react-redux
npm install vite-plugin-pwa --legacy-peer-deps


4. delete the default "Vite.config.js", src and public folders created by Vite.

5. Copy the "Vite.config.js" src and public folder from this submission and replace it in the project directory (ROOT).

6. Run the project:

npm run dev
npm run preview


7. Open in browser:

http://localhost:5173




## Key Inclusions

React Context API
Global theme management with Light/Dark mode and theme persistence using localStorage.

Progressive Web App (PWA)
Application configured as an installable PWA with service worker and offline detection.

React Hooks
Workout Tracker implemented using `useState`, `useEffect`, `useRef`, and a custom hook `useTimer()`.

Redux Toolkit
Global state management for product data using `configureStore`, `createSlice`, `useSelector`, and async API fetching.


