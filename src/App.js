import Login from "./Screen/Login";
import Home from "./Screen/Home";
import React, {useEffect} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import CartPage from "./Screen/CartPage";
import Appbar from "./Components/Appbar";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [cartlength, setcartlength] = React.useState("");
  useEffect(() => {
    if ("User" in localStorage) {
      console.log("User Object exists");
      const user = JSON.parse(localStorage.getItem("User"));
      const product = JSON.parse(localStorage.getItem("Product"));
      if (user && product) {
        const cartproduct = product.filter((p) => {
          if (p.user.username === user.username) {
            return p;
          }
        });
        console.log(cartproduct);
        setcartlength(cartproduct.length);
      } else {
        // toast.error("You must Be logged In", {});
        // window.location = "/Login";
      }
    } else {
      console.log("User not exists in Localstorage");
      localStorage.setItem("User", null);
    }
  }, []);
  return (
    <>
      <Router>
        <Switch>
          {localStorage.getItem("User") ? (
            <Route path="/Home">
              <Appbar cartlength={cartlength} />
              <Home setcartlength={setcartlength} />
            </Route>
          ) : (
            <Route path="/Login">
              <Appbar cartlength={cartlength} />
              <Login />
            </Route>
          )}
          <Route path="/Home">
            <Appbar cartlength={cartlength} />
            <Home setcartlength={setcartlength} />
          </Route>
          <Route path="/Login">
            <Appbar />
            <Login />
          </Route>
          <Route path="/CartPage">
            <Appbar cartlength={cartlength} />
            <CartPage setcartlength={setcartlength} />
          </Route>
        </Switch>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
