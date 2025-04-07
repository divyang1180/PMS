import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import SignUpDashboard from './components/SignupPage/SignUpDashboard';
import StudentSignUp from './components/SignupPage/StudentSignUp';
import CompanySignUp from './components/SignupPage/CompanySignUp';
import ForgotPassword from './components/LoginPage/ForgotPassword';
import StudentDashboard from './components/Student/StudentDashboard';
import AppliedJobs from './components/Student/AppliedJobs';
import CompanyDashboard from './components/Company/CompanyDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import Profile from "./components/Student/Profile";
import JobPostings from "./components/Company/JobPosting"; // ✅ Import Job Posting component
import Application from "./components/Company/Application"; // ✅ Import Application component
import { AuthProvider } from "./components/context/AuthContext";  // ✅ Provide Auth Context
import ProtectedRoute from "./components/context/ProtectedRoute"; // ✅ Protect Routes
import { Toaster } from 'react-hot-toast';

function App() {
  return (  
    <AuthProvider>
      <Router>
        <div className="App">
      
          <Routes>
            <Route path="/toaster" element={<Toaster />} /> 
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpDashboard />} />
            <Route path="/signup/company" element={<CompanySignUp />} />
            <Route path="/signup/student" element={<StudentSignUp />} />
            <Route path="/login/ForgetPassword" element={<ForgotPassword />} />

            {/* ✅ Protected Routes */}
            <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/student-dashboard/applied-jobs" element={<AppliedJobs />} />
              
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["company"]} />}>
              <Route path="/company-dashboard" element={<CompanyDashboard />} />
              <Route path="/company-dashboard/job-postings" element={<JobPostings />} /> 
              <Route path="/company-dashboard/applications" element={<Application />} /> 
             
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Route>

            
             
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>

            

            {/* Catch-all Route */}
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
