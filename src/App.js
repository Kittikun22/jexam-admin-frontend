import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import GuardRoutes from './Utils/GuardRoutes';
import DashboardPage from './Pages/DashboardPage';
import ApprovePage from './Pages/ApprovePage';
import ExamPage from './Pages/ExamPage';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<GuardRoutes />}>
            <Route path="/" element={<DashboardPage />} exact />
            <Route path="/approve" element={<ApprovePage />} />
            <Route path="/exam" element={<ExamPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
