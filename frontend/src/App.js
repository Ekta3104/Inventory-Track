import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import './index.css'
import SalePage from "./pages/Sale";
import SaleHistory from "./pages/SaleHistory";

function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password/:token" element={<ResetPassword />} />
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/sale" element={<SalePage />} />
    <Route path="/sale-history" element={<SaleHistory />} />
    
    



  </Routes>
  </BrowserRouter>
  )
}

export default App;
