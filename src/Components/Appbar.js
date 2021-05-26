import React from 'react'
import {NavLink, useHistory} from 'react-router-dom';

function Appbar(props) {

  const {cartlength}=props;
    const history=useHistory();
    const handlelogout=()=>{
        localStorage.setItem("User",null);
        history.push('/Login');
    }

    return (
        <>
       
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <a class="navbar-brand" href="/Home">ConnectedH</a>

  <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
    {
         JSON.parse(localStorage.getItem("User"))!=null?
    <ul className="navbar-nav mr-auto mt-2 mt-lg-0" >
      <li className="nav-item active">
        <NavLink className="nav-link" to="/Home">Home </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link"  to="/CartPage">Cart<span class="badge badge-pill badge-primary" style={{marginTop:"0%"}}>{cartlength}</span></NavLink>
      </li>
     
    </ul>:<></>
        }
    </ul>
    {
        
         JSON.parse(localStorage.getItem("User"))!=null ?<><p style={{marginTop:"6px"}}>{JSON.parse(localStorage.getItem("User")).username}</p>
      <button className="btn btn-outline-danger" style={{margin:"0px 5px"}} onClick={handlelogout}>Logout</button></>:<></>}
  </div>
</nav>
        </>
    )
}

export default Appbar
