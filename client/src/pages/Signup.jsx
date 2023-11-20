import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate, Link } from "react-router-dom";
import meetNowWhite from "../assets/meetnow-white.png";
import meetNowBlue from "../assets/meetnow-blue.png";
import Select from "react-select";

const Signup = () => {
  const [user, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState(null);
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
    axios
      .post("http://localhost:3004/register", { email, username, password })
      .then(() => {
        alert("registration successful");
        setEmail("");
        setUsername("");
        setPassword("");
        fetchUsers();
        navigate("/login");
      })
      .catch((error) => {
        console.log("Unable to register user");
      });
  };

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "preferNotSay", label: "Prefer Not to Say" },
  ];

  const countryOptions = [
    // Add your list of countries here
    { value: "us", label: "United States" },
    { value: "in", label: "India" },
    // Add more countries as needed
  ];

  const stateOptions = [
    // Add your list of states here based on the selected country
    { value: "ny", label: "New York" },
    { value: "ca", label: "California" },
    // Add more states as needed
  ];

  const phoneNumberOptions = [
    { value: "+91", label: "🇮🇳 +91" },
    { value: "+1", label: "🇺🇸 +1" },
    // Add more country codes and flags as needed
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
          <img src={meetNowBlue} alt="Company Logo" className="w-8 h-8 mr-2" />
          <span className="text-lg text-black font-bold">Meet Now</span>
        </div>

        <form
          className="absolute left-0 w-[600px] h-[400px] pl-10  mt-10"
          onSubmit={handleRegister}
        >
          <div className="name  flex gap-44 ">
            <div className="firstname">
              <label className="text-[#7D8893] text-sm font-semibold">
                {" "}
                First Name.
              </label>
              <br />
              <input
                className="w-[130%] h-[50px] border border-[#7D8893] p-2 mt-2  font-semibold"
                type="email"
                style={{ borderRadius: "6px", color: "#1a1a1a" }}
                placeholder="Enter your firstname..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="lastname">
              <label className="text-[#7D8893] text-sm font-semibold">
                {" "}
                Last Name.
              </label>
              <br />
              <input
                className="w-[130%] h-[50px] border border-[#7D8893] p-2 mt-2  font-semibold"
                type="email"
                style={{ borderRadius: "6px", color: "#1a1a1a" }}
                placeholder="Enter your lastname..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div
            className="user-info1  flex gap-44 mt-3"
            style={{ minWidth: "33%" }}
          >
            <div className="date">
              <label className="text-[#7D8893] text-sm font-semibold">
                {" "}
                Date of birth.
              </label>
              <br />
              <input
                className="w-[130%] h-[50px] border border-[#7D8893] p-2 mt-2  font-semibold"
                type="email"
                style={{ borderRadius: "6px", color: "#1a1a1a" }}
                placeholder="DD/MM/YYYY"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="gender" style={{ minWidth: "34%" }}>
              <label className="text-[#7D8893] text-sm font-semibold">
                {" "}
                Gender.
              </label>
              <br />
              <div
                style={{ borderRadius: "6px", color: "#1a1a1a" }}
                className="w-[130%] h-[50px]  mt-2  font-semibold"
              >
                <Select
                  options={genderOptions}
                  placeholder="Select gender"
                  value={selectedGender}
                  onChange={(selectedOption) =>
                    setSelectedGender(selectedOption)
                  }
                  styles={{
                    // Customize the styles here based on your preference
                    control: (provided, state) => ({
                      ...provided,
                      marginRight: "40px",
                      width: "100%",
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
                    // Add more styles as needed
                  }}
                />
              </div>
            </div>
          </div>

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
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="username">
              <label className="text-[#7D8893] text-sm font-semibold">
                {" "}
                Username.
              </label>
              <br />
              <input
                className="w-[130%] h-[50px] border border-[#7D8893] p-2 mt-2  font-semibold"
                type="email"
                style={{ borderRadius: "6px", color: "#1a1a1a" }}
                placeholder="Enter your username..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="name  flex gap-44 font-semibold mt-4 ">
            <div className="country " style={{ minWidth: "34%" }}>
              <label className="text-[#7D8893] text-sm font-semibold">
                {" "}
                Country of residence.
              </label>
              <br />
              <Select
                options={countryOptions}
                placeholder="Select country"
                value={selectedCountry}
                onChange={(selectedOption) =>
                  setSelectedCountry(selectedOption)
                }
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
            <div className="state" style={{ minWidth: "34%" }}>
              <label className="text-[#7D8893] text-sm font-semibold">
                {" "}
                State.
              </label>
              <br />
              <Select
                options={stateOptions}
                placeholder="Select country"
                value={selectedState}
                onChange={(selectedOption) => setSelectedState(selectedOption)}
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
          </div>
          <div
            className="flex flex-col mt-5 w-full font-semibold"
            style={{ minWidth: "110%" }}
          >
            <label className="text-[#7D8893] text-sm font-semibold">
              Phone Number.
            </label>
            <div className="flex gap-3">
              <Select
                options={phoneNumberOptions}
                isSearchable={false}
                defaultValue={phoneNumberOptions[0]}
                value={selectedPhoneNumber}
                onChange={(selectedOption) =>
                  setSelectedPhoneNumber(selectedOption)
                }
                styles={{
                  // Customize the styles here based on your preference
                  control: (provided, state) => ({
                    ...provided,
                    marginTop: "4px",
                    marginRight: "40px",
                    width: "100% !important",
                    minWidth: "100%",
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
                    width: "100%", // Set the dropdown width
                  }),
                  // Add more styles as needed
                }}
              />
              <input
                className="w-full h-[50px] bg-white border border-[#7D8893] p-2 mt-1"
                style={{ borderRadius: "6px", color: "#1a1a1a" }}
                type="text"
                placeholder="Enter your phone number..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col mt-5 w-[110%] font-semibold">
            <label className="text-[#7D8893] text-sm font-semibold">
              Create password.
            </label>
            <input
              className="w-full h-[50px] bg-white border border-[#7D8893] p-2 mt-1"
              style={{ borderRadius: "6px", color: "#1a1a1a" }}
              type="text"
              placeholder="Enter your password..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col mt-5 w-[110%] font-semibold">
            <label className="text-[#7D8893] text-sm font-semibold">
              Confirm password.
            </label>
            <input
              className="w-full h-[50px] bg-white border border-[#7D8893] p-2 mt-1"
              style={{ borderRadius: "6px", color: "#1a1a1a" }}
              type="text"
              placeholder="Re-enter your password..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <button
            className="w-[47%] h-[40px] bg-#205bd4 text-white  bg-[#3B37FE] mt-8 font-semibold "
            type="submit"
            style={{ borderRadius: "6px" }}
          >
            Next
          </button>
          {/* email */}
          {/* <label> Email</label>
          <br />
          <input
            className="w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /> */}
          {/* <br />
          <br /> */}
          {/* username  input*/}
          {/* <label>Username</label>
          <br />
          <input
            className="w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <br /> */}
          {/* password */}
          {/* <label>Password</label>
          <br />
          <input
            className="w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button
            className="w-[200px] h-[50px] border hover:bg-teal-900"
            type="submit"
          >
            Sign Up
          </button> */}
        </form>
      </div>
      <div
        style={{ backgroundColor: "#205bd4" }}
        className="w-[40%] h-screen flex fixed right-0 "
      >
        <div className="w-full h-[100%] flex flex-col justify-center items-center bg-#205bd4">
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
      </div>
    </div>
  );
};

export default Signup;
