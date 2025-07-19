import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { SignUp } from './pages/signUp/SignUp.jsx';
import { Login } from './pages/login/Login.jsx';
import { Home } from './pages/home/Home.jsx';
import {ContactUs} from './pages/contactUs/ContactUs.jsx'
import { ForgotPassword } from './pages/forgotPassword/ForgotPassword.jsx';
import { OtpVerify } from './pages/otpVerify/OtpVerify.jsx';
import { NotFound } from './pages/notFound/NotFound.jsx';
import { AddBooks } from './pages/addBooks/AddBooks.jsx';
import { AdminDashboard } from './pages/adminDashboard/AdminDashboard.jsx';
import { StudentPage } from './pages/studentPage/StudentPage.jsx';
import { ResetPassword } from './pages/resetPassword/ResetPassword.jsx';


import {Header} from './components/header/Header.jsx';
import {Navbar} from './components/navbar/Navbar.jsx';
import {Footer} from './components/footer/Footer.jsx';
import {ScrollToTop} from './components/scrollToTop/ScrollToTop.jsx';

import './App.css';

function App() {
  return (
    <>
      <ToastContainer autoClose={3000} />
      <Router>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/add-books" element={<AddBooks />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<OtpVerify />} />
           <Route path="/admin-dashboard" element={<AdminDashboard />} />
             <Route path="/student-page" element={<StudentPage />} />
             <Route path="/reset-password" element={<ResetPassword/>}></Route>
          <Route path="*" element={<NotFound />} />
         
        </Routes>
        <Footer />
        <ScrollToTop />
      </Router>
    </>
  );
}

export default App;