import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let name, value;

  const handleInputChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, cpassword } = user;
    const res = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        email,
        password,
        cpassword,
      }),
    });
    const data = await res.json();
    if (data.status === 422 || !data) {
      window.alert("Registration Failed");
    } else {
      window.alert("Registration Successful");
      history.push("/signin");
    }
  };

  return (
    <div>
      <div className="head-info App">
        <h1>Tell us about yourself</h1>
        <p>Enter your details below</p>
      </div>
      <div>
        <form method="POST" id="signUpForm">
          <div className="group-parent">
            <div className="group">
              <input
                type="text"
                name="email"
                id="email"
                value={user.email}
                onChange={handleInputChange}
                required
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Email</label>
            </div>
          </div>
          <div className="flex">
            <div className="group-parent">
              <div className="group">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={user.firstName}
                  onChange={handleInputChange}
                  required
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>First Name</label>
              </div>
            </div>
            <div className="group-parent">
              <div className="group">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={user.lastName}
                  onChange={handleInputChange}
                  required
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Last Name</label>
              </div>
            </div>
          </div>
          <div className="group-parent">
            <div className="group">
              <input
                type="password"
                name="password"
                id="password"
                value={user.password}
                onChange={handleInputChange}
                required
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Password</label>
            </div>
          </div>
          <div className="group-parent">
            <div className="group">
              <input
                type="password"
                name="cpassword"
                id="cpassword"
                value={user.cpassword}
                onChange={handleInputChange}
                required
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Confirm Password</label>
            </div>
          </div>
          <div className="group App">
            <input
              type="submit"
              name="signup"
              id="signup"
              value="Sign Up"
              onClick={postData}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
