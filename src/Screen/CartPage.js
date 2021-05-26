import React from "react";
import {useHistory} from "react-router-dom";

import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CartPage(props) {
  const {setcartlength} = props;
  const [product, setproduct] = React.useState([]);
  const history = useHistory();

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("User"));
    if (user !== null && user !== "") {
      if (JSON.parse(localStorage.getItem("Product")) !== null) {
        console.log(user._id);
        console.log(JSON.parse(localStorage.getItem("Product")));
        const cart = JSON.parse(localStorage.getItem("Product")).filter(
          (p) => user.username === p.user.username
        );
        console.log("Cart:" + cart);
        setproduct(cart);
      } else {
        setproduct(null);
      }
    } else {
      history.push("/");
    }
  }, []);
  const handleRemoveFromCart = (pro) => {
    if (window.confirm("Are you sure You want to delete form Cart?")) {
      const dummyproduct = product;
      let updatedproduct = dummyproduct.filter(
        (p, i) => p.imgUrl !== pro.imgUrl
      );
      console.log(
        updatedproduct.map(
          (d) => (d["user"] = JSON.parse(localStorage.getItem("User")))
        )
      );
      setcartlength(updatedproduct.length);
      localStorage.setItem("Product", JSON.stringify(updatedproduct));
      setproduct(updatedproduct);
      console.log(updatedproduct);
      toast.success("Product is Removed from Cart...", {});
    }
  };
  return (
    <div className="container">
      <center>
        <h2>CART</h2>
      </center>
      {product && product[0] ? (
        <table class="table table-striped ">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Id</th>
              {product[0] &&
                Object.keys(product[0]).map((keys, i) => {
                  return (
                    <th scope="col" key={i}>
                      {keys}
                    </th>
                  );
                })}
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody>
            {product
              .filter((p) => delete p.user)
              .map((p, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    {Object.entries(p).map((value, i) => {
                      if (value[0] === "imgUrl") {
                        return (
                          <td key={i}>
                            <img
                              src={value[1]}
                              width="50"
                              height="50"
                              alt=""
                              style={{borderRadius: "50%"}}
                            ></img>
                          </td>
                        );
                      } else {
                        return <td key={i}>{value[1]}</td>;
                      }
                    })}
                    <th scope="row">
                      <button
                        className="btn  btn-outline-danger"
                        onClick={(e) => handleRemoveFromCart(p)}
                      >
                        Remove
                      </button>
                    </th>
                  </tr>
                );
              })}
          </tbody>
        </table>
      ) : (
        <center>
          <h3>Cart is Empty</h3>
        </center>
      )}
      <ToastContainer />
    </div>
  );
}

export default CartPage;
