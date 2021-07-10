import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { UserContext } from "../App";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { dispatch } = useContext(UserContext);

  const loginUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      window.alert("Please fill all the fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      window.alert("Enter provide valid email.");
      return;
    }

    const res = await fetch("/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = res.json();
    if (res.status === 400 || !data) {
      window.alert("Invalid Credentials");
    } else {
      dispatch({ type: "USER", payload: true });
      window.alert("Login Successful");
      history.push("/");
    }
  };

  return (
    <div>
      <div className="head-info App">
        <h1>Sign in to get started</h1>
        <p>Enter your details below</p>
      </div>
      <div>
        <form method="POST" id="signinForm">
          <div className="group-parent">
            <div className="group">
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <MdEmail />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Email</label>
            </div>
          </div>
          <div className="group-parent">
            <div className="group">
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <RiLockPasswordFill />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Password</label>
            </div>
          </div>
          <div className="group App">
            <input
              type="submit"
              name="signin"
              id="signin"
              value="Sign In"
              onClick={loginUser}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
