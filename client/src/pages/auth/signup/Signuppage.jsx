
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [usn, setUsn] = useState("");
  const [sfname, setSfname] = useState("");
  const [slname, setSlname] = useState("");
  const [passout, setPassout] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    const signupData = {
      email,
      password,
      firstName: sfname,
      lastName: slname,
      passoutYear: passout,
    };

    if (userType === "ALUMNI") {
      signupData.companyName = companyName;
    } else if (userType === "STUDENT") {
      signupData.usn = usn;
    }

    try {
      let response;
      if (userType === "ALUMNI") {
        response = await axios.post(
          "http://localhost:3004/auth/registerAlumni",
          signupData
        );
      } else if (userType === "STUDENT") {
        console.log(signupData)
        response = await axios.post(
          "http://localhost:3004/auth/registerStudent",
          signupData
        );
      }

      if (response.status === 201) {
        alert("Signup successful! Please login.");
        navigate("/login");
      } else {
        throw new Error("Signup failed");
      }
    } catch (err) {
      setError("Signup failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row bg-white">
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <div className="max-w-md py-8 px-4 w-full">
          <div className="text-sm text-blue-200 mb-4">
            <a
              className="hover:text-blue-800"
              href="https://central.sjceplacements.org/"
            >
              Click here to redirect to the college placement website
            </a>
          </div>

          <div className="flex justify-center md:pt-4">
            <a href="#">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Student_%28example%29.svg/888px-Student_%28example%29.svg.png"
                className="w-20 h-20"
                alt="Logo"
              />
            </a>
          </div>
          <h2 className="text-center text-3xl text-gray-700 pb-3">Signup</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex justify-center mb-4">
            <button
              className={`py-2 px-6 text-white font-semibold border border-gray-500 rounded ${
                userType === "ALUMNI" ? "bg-gray-800" : "bg-gray-300"
              }`}
              onClick={() => setUserType("ALUMNI")}
              style={{ marginRight: "5px" }}
            >
              ALUMNI
            </button>
            <button
              className={`py-2 px-6 text-white font-semibold border border-gray-500 rounded ${
                userType === "STUDENT" ? "bg-gray-800" : "bg-gray-300"
              }`}
              onClick={() => setUserType("STUDENT")}
            >
              STUDENT
            </button>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="sfname" className="text-lg">
                First Name
              </label>
              <input
                type="text"
                id="sfname"
                placeholder="First Name"
                value={sfname}
                onChange={(e) => setSfname(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="slname" className="text-lg">
                Last Name
              </label>
              <input
                type="text"
                id="slname"
                placeholder="Last Name"
                value={slname}
                onChange={(e) => setSlname(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-lg">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-lg">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="passout" className="text-lg">
                Passout Year
              </label>
              <input
                type="text"
                id="passout"
                placeholder="Passout Year"
                value={passout}
                onChange={(e) => setPassout(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {userType === "ALUMNI" && (
              <div className="flex flex-col">
                <label htmlFor="companyName" className="text-lg">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  placeholder="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            )}
            {userType === "STUDENT" && (
              <>
                <div className="flex flex-col">
                  <label htmlFor="usn" className="text-lg">
                    USN
                  </label>
                  <input
                    type="text"
                    id="usn"
                    placeholder="USN"
                    value={usn}
                    onChange={(e) => setUsn(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              </>
            )}
            <center>
              <input
                type="submit"
                value="Sign Up"
                className="bg-blue-900 text-white font-bold text-lg hover:bg-blue-200 hover:text-gray-900 py-2 px-2 rounded-xl mt-8"
              />
            </center>
          </form>

          <div className="text-center pt-8">
            <p className="text-blue-500">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500">
                Log in here
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1567132765096-e5486ab30ecf?q=80&w=2856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Background"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default Signup;
