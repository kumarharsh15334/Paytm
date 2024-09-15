import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { TransferStatus } from "./pages/TransferStatus"; // Import the TransferStatus component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<SendMoney />} />
        <Route path="/transfer-status" element={<TransferStatus />} /> {/* Ensure this route is added */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
