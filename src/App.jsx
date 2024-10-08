import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import ForgotPassword from "./Pages/ForgotPassword";
import Chats from "./Pages/Chats";
import Menu from "./Pages/Menu";
import AdminDashboard from "./Pages/AdminPage";
import Users from "./Pages/Users";
import Dashboard from "./Components/proyectoComponentes/Dashboard";
import Proyecto from "./Pages/Proyecto";
import ManageUsers from "./Pages/AdministarUser";
// import Sidebar from "./Pages/Sidebar";


function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "Tema claro" ? "dark" : "light"
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Login />
              </>
            }
          />

          <Route
            path="/chats"
            element={
              <>
                <NavBar TogleTheme={toggleTheme} />
                <Chats />
              </>
            }
          />
          <Route
            path="/menu"
            element={
              <>
                <Menu />
              </>
            }
          />
          <Route
            path="/proyecto"
            element=
            {
              <>
                <Proyecto />
              </>
            } />
          <Route
            path="/dashboard"
            element={
              <>
                <NavBar TogleTheme={toggleTheme} />
                <Dashboard />
              </>
            }
          />
          <Route
            path="/home"
            element={
              <>
                <NavBar TogleTheme={toggleTheme} />
                <Home />
              </>
            }
          />
          <Route
            path="/register"
            element=
            {
              <>
                <Register />
              </>
            } 
            />
          <Route
            path="/forgotpassword"
            element=
            {
              <>
                <ForgotPassword />
              </>
            } 
            />
            <Route
            path="/users"
            element=
            {
              <>
                <Users />
              </>
            } 
            />
            <Route
            path="/admin"
            element=
            {
              <>
                <AdminDashboard />
              </>
            } 
            />
            <Route
            path="/usersManage"
            element=
            {
              <>
                <ManageUsers />
              </>
            } 
            />
            {/* <Route
            path="/admin"
            element=
            {
              <>
                <AdminDashboard />
              </>
            } 
            /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
