import React from "react";
import product from "../product.json";
import { Link } from "react-router-dom";
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home(props) {
  const {setcartlength}=props;
  React.useEffect(() => {
    if ("Product" in localStorage) {
    } else {
      localStorage.setItem("Product", null);
    }
    if(JSON.parse(localStorage.getItem("User"))==null)
    {
            window.location='/Login';
        }
  }, []);

  const handleAddtoCart = (pro) => {
    let Product_EXIST_In_Cart=false;
    if ("Product" in localStorage) {
      pro["user"] = JSON.parse(localStorage.getItem("User"));
      if (JSON.parse(localStorage.getItem("Product")) != null) {
        const cart = JSON.parse(localStorage.getItem("Product"));
        console.log(cart);
         for(const c of cart)
         {
           if(pro.imgUrl===c.imgUrl && pro.user.username === c.user.username)
           {
             Product_EXIST_In_Cart=true;
             break;
           }
         }
         console.log(Product_EXIST_In_Cart);
        if(Product_EXIST_In_Cart)
        {
          toast.warning("Product is Already Added to Cart...",{
          });
          console.log("Product is Already Added to Cart...")
        }
        else{
        cart.push(pro);
        localStorage.setItem("Product", JSON.stringify(cart));
        const cartl=JSON.parse(localStorage.getItem("Product")).filter(c=> pro.user.username === c.user.username);
         setcartlength(cartl.length);
         toast.success("Product is Added to Cart...",{
        });
        }
      } else {
        const newcart = [];
        newcart.push(pro);
        setcartlength(newcart.length);
        localStorage.setItem("Product", JSON.stringify(newcart));
        toast.success("Product is Added to Cart...",{
        });
      }
    } else {
      localStorage.setItem("Product", null);
    }
  };

  return (
    <>
      <div style={{margin:"01%"}}>
        <center>
          <div className="table-responsive">
        <table className="table table-striped ">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Id</th>
              {
                product[0] && Object.keys(product[0]).map(keys => {
                  return (
                    <th scope="col">{keys}</th>
                  );
                })
              }
              <th>Cart</th>
            </tr>
          </thead>
          <tbody>
            {
              product.filter(p => delete p._id && delete p.user).map((p, i) => {
                return <tr><th scope="row">{i + 1}</th>{Object.entries(p).map(value => { 
                  if (value[0] === "imgUrl") { 
                  return (<td><img src={value[1]} alt="" style={{borderRadius:"50%",width:"50px",height:"50px"}}></img></td>) } 
                  else { 
                      return (<th>{value[1]}</th>)
                  } 
                })}
                  <td><button className="btn btn-warning" style={{ color: "white" }} onClick={() => handleAddtoCart(p)}>Add </button></td></tr>
              })
            }

          </tbody>
        </table>
        </div>
        </center>
      </div>
            <center>
              
            <ToastContainer/>
      <button className="btn btn-primary"><Link to="/CartPage" style={{ color: "white", textDecoration: "none" }}>Go to Cart Page</Link></button>
      </center>
    </>
  );
}

export default Home;
