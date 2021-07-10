import React from "react";
import { NavLink } from "react-router-dom";
import check from "./../assets/check.svg";

const Success = () => {
  return (
    <div className="success">
      <img src={check} alt="check" width={250} height={250} />
      <h1>Thank You</h1>
      <p>We sent an email to {localStorage.email ? localStorage.email : ``}</p>
      <p>Click confirmation link in the email to verify your account.</p>
      <NavLink to="/signin">
        <button>Go to Sign In</button>
      </NavLink>
    </div>
  );
};

export default Success;
