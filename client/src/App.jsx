import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./state/store";
import Login from "./pages/auth/login/Loginpage";
import Signuppage from "./pages/auth/signup/Signuppage";
import DashBoard from "./student/DashBoard";
import Queries from "./student/Queries";
import MyQueries from "./student/MyQueries";
import AQueries from "./Alumni/Queries";
import Alumni from "./Admin/Alumni";
import Companies from "./Admin/companies";
import Adqueries from "./Admin/queries";
import Students from "./Admin/Students";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signuppage />} />
          <Route
            path="/student/:studentId/dashboard"
            element={<DashBoard />}
          />
          <Route
            path="/student/:studentId/queries/:companyId"
            element={<Queries />}
          />
          <Route
            path="/student/:studentId/queries"
            element={<Queries />}
          />
          <Route
            path="/student/:studentId/myqueries"
            element={<MyQueries />}
          />
          <Route
            path="/alumni/:alumniId/queries"
            element={<AQueries />}
          />
          <Route
            path="/admin/alumni"
            element={<Alumni />}
          />
          <Route
            path="/admin/companies"
            element={<Companies />}
          />
          <Route
            path="/admin/queries"
            element={<Adqueries />}
          />
          <Route
            path="/admin/student"
            element={<Students />}
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;