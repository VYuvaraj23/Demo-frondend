import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Guard from "./utils/Auth";
import Profile from "./pages/Profile";
import AdminGuard from "./utils/AdminGuard";
import NavBar from "./components/Nav";

const ConditionalNavBar = () => {
  const location = useLocation();
  return location.pathname !== "/" ? <NavBar /> : null;
};
function App() {
  return (
    
    <BrowserRouter>
      <ConditionalNavBar/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <AdminGuard>
              <Dashboard />
            </AdminGuard>
          }
          />
        <Route
          path="/profile"
          element={
            <Guard>
              <Profile />
            </Guard>
          }
          />
        <Route path="*" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
