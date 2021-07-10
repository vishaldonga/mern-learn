import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const [userName, setUserName] = useState("");

  const getHomeData = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setUserName(`${data.firstname} ${data.lastname}`);

      if (!res.status === 200) {
        throw new Error(res.error);
      }
    } catch (err) {
      // throw new Error(err);
      history.push("/");
    }
  };
  useEffect(() => {
    getHomeData();
  }, []);
  return (
    <div className="home">
      <h1>Welcome</h1>
      <h1>{userName ? userName : "User"}</h1>
    </div>
  );
};

export default Home;
