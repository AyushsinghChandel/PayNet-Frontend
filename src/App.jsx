import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/signin" />;
  }
  return element;
};

const RedirectIfLoggedIn = ({ element }) => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/dashboard" />;
  }
  return element;
};

const HomeRedirect = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/dashboard" />;
  } else {
    return <Navigate to="/signin" />;
  }
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/signup" element={<RedirectIfLoggedIn element={<Signup />} />} />
        <Route path="/signin" element={<RedirectIfLoggedIn element={<Signin />} />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/send" element={<ProtectedRoute element={<SendMoney />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
