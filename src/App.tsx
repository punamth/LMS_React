import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Author from "./pages/Author";
import Book from "./pages/Book";
import Issuing from "./pages/Issuing";
import Student from "./pages/Student";
import Transaction from "./pages/Transaction";
import Settings from "./pages/Settings";
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
          <Route path="/books" element={<Book />} />
          <Route path="/students" element={<Student />} />
          <Route path="/issuing" element={<Issuing />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/setting" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;