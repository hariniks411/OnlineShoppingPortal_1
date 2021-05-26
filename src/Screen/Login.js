import React, {useState} from "react";
import login from "../login.json";

import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  React.useEffect(() => {
    if (JSON.parse(localStorage.getItem("User")) != null) {
      window.location = "/Home";
    }
  }, []);

  const handleUsername = (e) => {
    console.log(e.target.value);
    setusername(e.target.value);
  };

  const handlePassword = (e) => {
    console.log(e.target.value);
    setpassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var user = null;
    for (const f of login) {
      if (f.username === username && f.password === password) {
        user = f;
      }
    }

    if (user) {
      localStorage.setItem("User", JSON.stringify(user));
      window.location = "/Home";
    } else {
      toast.error("Please provide correct username or password", {});
      console.log("Please provide correct username or password");
    }
  };
  return (
    <div
      className="container"
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-70%)",
        width: "100%",
      }}
    >
      <center>
        <h4>Signin</h4>
      </center>
      <form>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">
              U
            </span>
          </div>
          <input
            type="text"
            class="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={username}
            onChange={handleUsername}
          />
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">
              P
            </span>
          </div>
          <input
            type="password"
            class="form-control"
            aria-label="Username"
            aria-describedby="basic-addon1"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <div style={{width: "100%"}}>
          <button
            onClick={handleSubmit}
            className="btn btn-success"
            style={{width: "100%"}}
          >
            Login
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
