import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { CgNametag } from "react-icons/cg";
import { HiCheckCircle } from "react-icons/hi";

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

    if (!firstName || !lastName || !email || !password || !cpassword) {
      window.alert("Please fill all the fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      window.alert("Enter provide valid email.");
      return;
    }
    if (password !== cpassword) {
      window.alert("Password and confirm password are not matching.");
      return;
    }

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
      localStorage.email = email;
      history.push("/success");
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
              <MdEmail />
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
                  className="w-88"
                  value={user.firstName}
                  onChange={handleInputChange}
                  required
                />
                <CgNametag />
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
                  className="w-88"
                  value={user.lastName}
                  onChange={handleInputChange}
                  required
                />
                <CgNametag />
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
              <RiLockPasswordFill />
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
              <HiCheckCircle />
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
