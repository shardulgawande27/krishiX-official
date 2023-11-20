import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate, Link } from "react-router-dom";
import meetNowWhite from "../assets/meetnow-white.png";
import meetNowBlue from "../assets/meetnow-blue.png";

const Login = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get("http://localhost:3004/register").then((res) => {
      console.log(res.data);
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3004/login", {
        username,
        password,
      });
      const token = response.data.token;
      alert("login successful");
      setUsername("");
      setPassword("");
      fetchUsers();
      navigate("/account");
      window.location.reload();
      localStorage.setItem("token", token);
    } catch (error) {
      console.log("Login Error");
    }
  };

  return (
    <>
      <div
        style={{ backgroundColor: "#205bd4" }}
        className="w-full h-screen flex"
      >
        <div className="w-[40%] h-[100%] flex flex-col justify-center items-center bg-#205bd4">
          <img
            src={meetNowWhite}
            alt="MeetNow-logo-white"
            className="mb-4"
            style={{ width: "35%", height: "auto" }}
          />
          <h1
            className="text-5xl mb-2   text-white "
            style={{ fontWeight: "600" }}
          >
            Meet Now
          </h1>
          <p className=" text-white">Effortless Meetings, Every Time.</p>
        </div>

        <div className="w-[60%] h-[100%] bg-white text-white flex flex-col items-center relative">
          <div className="mt-8 text-5xl flex justify-center items-center text-black font-bold ">
            Welcome! 👋
          </div>
          <p className="text-black mt-4">Effortless Meetings, Every Time.</p>

          <div className="absolute top-5 right-5 flex items-center">
            <img
              src={meetNowBlue}
              alt="Company Logo"
              className="w-8 h-8 mr-2"
            />
            <span className="text-lg text-black font-bold">Meet Now</span>
          </div>
          <form
            className=" flex flex-col border rounded-lg w-[500px] h-auto items-center p-9 relative text-[#7D8893] mt-6"
            onSubmit={handleLogin}
          >
            <div className="text-xl self-start font-semibold ">Login as:</div>

            {/* username  input*/}
            <div className="flex flex-col mt-5 w-full font-semibold">
              <label>Email</label>
              <input
                className="w-[97%] h-[40px] bg-white border border-[#7D8893] p-2 mt-1"
                style={{ borderRadius: "6px", color: "#1a1a1a" }}
                type="text"
                placeholder="Enter your email..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* password */}
            <div className="flex flex-col w-full mt-8 font-semibold">
              <label>Password</label>
              <input
                className="w-[97%] h-[40px] bg-white border border-[#7D8893] p-2 mt-1"
                style={{ borderRadius: "6px", color: "#1a1a1a" }}
                type="text"
                placeholder="Enter your password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <br />
            <br />
            {/* Login button */}
            <button
              className="w-[97%] h-[40px] bg-#205bd4 text-white  bg-[#205BD4] font-semibold"
              type="submit"
              style={{ borderRadius: "6px" }}
            >
              Login
            </button>
            <br />

            {/* Forget password text */}
            <Link>
              <p className="text-sm mt-2 font-semibold">
                Forgot your password?
              </p>
            </Link>

            {/* Horizontal line with "OR" text */}

            <div className="flex mt-4">
              <div className="w-[180px] h-[1px] bg-black mt-3"></div>
              <div className=" px-2 text-black">OR</div>

              <div className="w-[180px] h-[1px] bg-black mt-3"></div>
            </div>

            {/* Register button */}
            <Link to="/signup" className="w-[97%] mt-4">
              <button
                className="w-full h-[40px] bg-[#205bd4] text-white font-semibold"
                type="submit"
                style={{ borderRadius: "6px" }}
              >
                Register
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
