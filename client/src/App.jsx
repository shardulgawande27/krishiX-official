import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Navbar from "./components/Navbar";

function App() {
  const isUserSignedIn = !!localStorage.getItem("token");

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {isUserSignedIn && <Route path="/account" element={<Account />} />}
      </Routes>
    </div>
  );
}

export default App;
