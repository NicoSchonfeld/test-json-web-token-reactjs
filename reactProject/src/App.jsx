import React, { useState } from "react";
import { drumpFetch } from "drumpfetch";
const api = drumpFetch("http://localhost:3005/");

const App = () => {
  const [user, setUser] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.name !== "" && user.password !== "") {
      sendUserLogin(user);
    } else {
      alert("Llenar campos");
    }
  };

  const sendUserLogin = async (user) => {
    await fetch("http://localhost:3005/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: user }),
    })
      .then((res) => res.json())
      .then((cred) => {
        document.cookie = `token=${cred.token}; max-age=${
          60 * 3
        }: path=/: samesite=strict`;

        if (document.cookie) {
          testData();
        }
      });
  };

  const testData = async () => {
    const token = document.cookie.replace("token=", "");

    await fetch("http://localhost:3005/pruebaDatos", {
      method: "POST",
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        /* console.log(data); */

        if (data.message == "Exito") {
          console.log(data.message);
        } else {
          console.log(data.message);
        }
      });
  };

  return (
    <>
      <h1>Test JWT</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <button type="submit">Send</button>
      </form>

      <br />
      <br />
      <button onClick={() => testData()}>Test data</button>
    </>
  );
};

export default App;
