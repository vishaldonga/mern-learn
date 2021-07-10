import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const About = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({});

  const getAboutMeData = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setUserData(data);

      if (res.status !== 200) {
        throw new Error(res.error);
      }
    } catch (err) {
      history.push("/signin");
    }
  };

  useEffect(() => {
    getAboutMeData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>About Me</h1>
      <form method="">
        <div className="row">
          Name:
          <h2>
            {userData.firstname
              ? `${userData.firstname} ${userData.lastname}`
              : ``}
          </h2>
          Email:<h2>{userData.email ? userData.email : ``}</h2>
        </div>
      </form>
    </div>
  );
};

export default About;
