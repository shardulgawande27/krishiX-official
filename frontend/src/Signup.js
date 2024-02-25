import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate, Link } from "react-router-dom";
// import bankNowWhite from "../assets/banknow-white.png";
// import bankNowBlue from "../assets/banknow-blue.png";
import KirshiX from "./assets/KrishiXLogo.png";

import Select from "react-select";

const Signup = () => {
  // const [user, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get("http://localhost:3004/register").then((res) => {
      console.log(res.data);
    });
  };

  const handleRegister = (event) => {
    event.preventDefault();

    // const bankerEmailRegex = /@banker\.com$/;

    // if (selectedRole?.value === "banker" && !bankerEmailRegex.test(email)) {
    //   setEmailError("Banker email must end with @banker.com");
    //   return;
    // }

    if (password !== cPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    axios
      .post("http://localhost:3004/register", {
        email: email,
        username: username,
        password: password,
        // role: selectedRole.value,
      })
      .then(() => {
        alert("registration successful");
        setEmail("");
        setUsername("");
        setPassword("");
        setSelectedRole(null);
        setEmailError("");
        setPasswordError("");
        fetchUsers();
        navigate("/login");
      })
      .catch((error) => {
        console.log("Unable to register user");
      });
  };

  const roleOptions = [
    // Add your list of countries here
    { value: "customer", label: "Customer" },
    { value: "banker", label: "Banker" },
  ];

  return (
    <div className="w-full h-screen flex">
      <div className="w-[60%] h-[100%] bg-white text-black flex justify-center items-center relative">
        <div className="w-[60%] h-[100%] bg-white text-white flex flex-col absolute left-6">
          <div
            className="text-4xl flex  text-black font-bold "
            style={{ marginTop: "70px" }}
          >
            Sign Up
          </div>
          <p className="text-black mt-4 font-semibold">
            Have an account ?{" "}
            <Link to="/login">
              <span className="text-[#205bd4]">Login Here</span>
            </Link>
          </p>
        </div>
        <div className="absolute top-5 left-5 flex items-center">
          <img src={KirshiX} alt="Company Logo" className="w-8 h-8 mr-2" />
          <span className="text-lg text-black font-bold">KrishiX</span>
        </div>

        <form
          className="absolute  left-0 w-[600px] h-[550px] pl-10 "
          onSubmit={handleRegister}
        >
          <div className="name  flex gap-44 mt-3">
            <div className="email">
              <label className="text-[#7D8893] text-sm font-semibold">
                {" "}
                Email.
              </label>
              <br />
              <input
                className="w-[160%] h-[50px] border border-[#7D8893] p-2 mt-2  font-semibold"
                type="email"
                style={{ borderRadius: "6px", color: "#1a1a1a" }}
                placeholder="Enter your email ID Work/Personal"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>
            <div className="username">
              <label className="text-[#7D8893] text-sm font-semibold">
                {" "}
                Username.
              </label>
              <br />
              <input
                className="w-[130%] h-[50px] border border-[#7D8893] p-2 mt-2  font-semibold"
                type="text"
                style={{ borderRadius: "6px", color: "#1a1a1a" }}
                placeholder="Enter your username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* <div className="name  flex gap-44 font-semibold mt-4 ">
            <div className="country " style={{ minWidth: "34%" }}>
              <label className="text-[#7D8893] text-sm font-semibold">
                {" "}
                Role.
              </label>
              <br />
              <Select
                options={roleOptions}
                placeholder="Select Role"
                value={selectedRole}
                onChange={(selectedRole) => setSelectedRole(selectedRole)}
                styles={{
                  // Customize the styles here based on your preference
                  control: (provided, state) => ({
                    ...provided,
                    marginRight: "40px",
                    width: "130% !important",
                    minWidth: "130%",
                    height: "50px",
                    borderRadius: "6px", // Set the border radius
                    border: "1px solid #7D8893", // Set the border color
                    boxShadow: state.isFocused ? "0 0 0 2px #205bd4" : "none",
                  }),
                  indicatorSeparator: (provided) => ({
                    ...provided,
                    display: "none",
                  }),
                  dropdownIndicator: (provided) => ({
                    ...provided,
                    color: "#205bd4",
                  }),
                  menu: (provided) => ({
                    ...provided,
                    width: "130%", // Set the dropdown width
                  }),
                  // Add more styles as needed
                }}
              />
            </div>
          </div> */}

          <div className="flex flex-col mt-5 w-[110%] font-semibold">
            <label className="text-[#7D8893] text-sm font-semibold">
              Create password.
            </label>
            <input
              className="w-full h-[50px] bg-white border border-[#7D8893] p-2 mt-1"
              style={{ borderRadius: "6px", color: "#1a1a1a" }}
              type="password"
              placeholder="Enter your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col mt-5 w-[110%] font-semibold">
            <label className="text-[#7D8893] text-sm font-semibold">
              Confirm password.
            </label>
            <input
              className="w-full h-[50px] bg-white border border-[#7D8893] p-2 mt-1"
              style={{ borderRadius: "6px", color: "#1a1a1a" }}
              type="password"
              placeholder="Re-enter your password..."
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>
          <button
            className="w-[47%] h-[40px] bg-#205bd4 text-white  bg-[#3B37FE] mt-8 font-semibold "
            type="submit"
            style={{ borderRadius: "6px" }}
          >
            Submit
          </button>
        </form>
      </div>
      <div
        style={{ backgroundColor: "#205bd4" }}
        className="w-[40%] h-screen flex fixed right-0 "
      >
        <div className="w-full h-[100%] flex flex-col justify-center items-center bg-#205bd4">
          <img
            src={KirshiX}
            alt="MeetNow-logo-white"
            className="mb-4"
            style={{ width: "35%", height: "auto" }}
          />
          <h1
            className="text-5xl mb-2   text-white "
            style={{ fontWeight: "600" }}
          >
            KrishiX
          </h1>
          <p className=" text-white">Seamless Plant Care, Every Scan.</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
