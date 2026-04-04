import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Customer from "./pages/customer";
import Booking from "./pages/booking";
import { ToastContainer } from "react-toastify";
import UserLogin from "./Authentication/UserLogin";
import Accounts from "./pages/accounts";
import Reports from "./pages/reports";
import Payment from "./pages/payment";
import Employee from "./pages/Employe";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <ToastContainer></ToastContainer>

      <Routes>
        <Route path="/login" element={<UserLogin />}></Route>
        <Route
          path="/"
          element={<Navigate to="/dashboard?index=1" replace />}
        />
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/customer" element={<Customer />}></Route>
        <Route path="/booking" element={<Booking />}></Route>
        <Route path="/accounts" element={<Accounts />}></Route>
        <Route path="/reports" element={<Reports />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/employees" element={<Employee />}></Route>
      </Routes>
    </div>
  );
}

export default App;
