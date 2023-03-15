import './App.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Browser, Routes, Route } from "react-router-dom";
import Dashboard from './pages/dashboard/Dashboard';
import Registration from './pages/registration/Registration';
import Login from './pages/login/Login';
import { NewAccVerify } from './pages/verify/NewAccVerify';
import ResetPassword from './pages/reset/ResetPassword';
import Category from './pages/category/Category';
import Payment from './pages/payment/Payment';

function App() {
  return (
    <div className="App">
      <Browser>
        <Routes>
          <Route path="verify" element={<NewAccVerify />} />
          <Route path="/" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="register" element={<Registration />} />
          <Route path="resetPassword" element={<ResetPassword />} />
          <Route path="category" element={<Category />} />
          <Route path="paymentMethod" element={<Payment />} />


        </Routes>
      </Browser>
      <ToastContainer />



    </div>
  );
}

export default App;
