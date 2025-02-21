import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

// Lazy Load Components
const Navbar = lazy(() => import("./Component/Navbar"));
const Login = lazy(() => import("./Component/Login"));
const Lesson = lazy(() => import("./Component/Lesson"));
const FetchLesson = lazy(() => import("./Component/FetchLesson"));

function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("user");
  return isLoggedIn ? children : <Navigate to="/login" />;
}

function App() {
  return (
    // <Router>
    <>
      <Suspense
        fallback={<div className="text-center p-5">Loading Navbar...</div>}
      >
        <Navbar />
      </Suspense>

      <div className="p-6">
        <Suspense
          fallback={<div className="text-center p-5">Loading Page...</div>}
        >
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <FetchLesson />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/lesson"
              element={
                <PrivateRoute>
                  <Lesson />
                </PrivateRoute>
              }
            />
            <Route
              path="*"
              element={
                <h1 className="text-center text-red-500">
                  404 - Page Not Found
                </h1>
              }
            />
          </Routes>
        </Suspense>
      </div>
      {/* // </Router> */}
    </>
  );
}

export default App;
