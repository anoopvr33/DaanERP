import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Customer from "./pages/customer";
import Booking from "./pages/booking";
import { ToastContainer } from "react-toastify";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <ToastContainer></ToastContainer>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/customer" element={<Customer />}></Route>
        <Route path="/booking" element={<Booking />}></Route>
      </Routes>
    </div>
  );
}

export default App;
