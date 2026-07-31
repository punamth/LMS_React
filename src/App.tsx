import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Author from "./pages/Author";
import AuthRoute from "./components/AuthRoute";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
     <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Routes */}
        <Route element={<AuthRoute type="public" />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<AuthRoute type="protected" />}>
          <Route path="/author" element={<Author />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;