import React, { useState, useEffect } from 'react';
import './assets/css/style.css';
import HomePage from './pages/homePage/HomePage';
import AccountProfile from './pages/accountDetail/AccountProfile'; // Thay đổi tên import
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import LoginPage from './pages/loginPage/LoginPage';
import Header from './layouts/headerLayout/Header';
import Footer from './layouts/footerLayout/Footer';
import { jwtDecode } from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';

import HomeScreen from './pages/homePage/homeScreen';
import LoginScreen from './pages/loginPage/loginScreen';
import ForgotPassword from './pages/FormForgotPassword/ForgotPassword';
import PhimDangChieuPage from './pages/phimPage/phimdanghieuScreen';
import PhimSapChieuPage from './pages/phimPage/phimsapchieuScreen';


function App() {
  const [logged, setLogged] = useState({ fullName: '', userName: '' , password: '', email: '', phoneNumber: 0, photo: ''});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Thời gian hiện tại tính bằng giây
      // Kiểm tra thời gian hết hạn
      if (decodedToken.exp > currentTime) {
        setLogged({ fullName: decodedToken.fullName, userName: decodedToken.sub });
      } else {
        // Token đã hết hạn, xoá token và thông tin đăng nhập
        localStorage.removeItem('token');
        setLogged({ fullName: '', userId: '' });
      }
    }
  }, []);

  return (
    <Router>
      <Header logged={logged} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setLogged={setLogged} />} />
        <Route path="/accountProfile" element={<AccountProfile />} /> {/* Đường dẫn tới AccountDetail */}
      <Header />
      <Routes> {/* Sử dụng Routes để xác định các route */}
        <Route path="/" element={<HomeScreen />} /> {/* Trang chủ */}
        <Route path="/login" element={<LoginScreen />} /> {/* Trang đăng nhập */}
        <Route path="/forgotpassword" element={<ForgotPassword />} /> {/* Trang đăng nhập */}
        <Route path="/phim-dang-chieu" element={<PhimDangChieuPage />} /> {/* Trang phim đang chiếu */}
        <Route path="/phim-sap-chieu" element={<PhimSapChieuPage />} /> {/* Trang phim sắp chiếu */}

        {/* Có thể thêm các route khác tại đây */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;