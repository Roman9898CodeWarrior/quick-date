import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UsersList from "./components/usersList";
import NavBar from "./components/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Error from "./components/Error";
import Users from "./layouts/users";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="quick-date" element={<Main />} />
        <Route path="login" element={<Login />} />
        <Route path="users/:userId?" element={<Users />} />
        <Route path="404" element={<Error />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </div>
  );
};

export default App;
