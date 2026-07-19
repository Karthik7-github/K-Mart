import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const User = JSON.parse(localStorage.getItem("user"));
  const [itemname, setItemname] = useState("");
  console.log(User);

  const navigate = useNavigate();

  const searchitem = (name) => {
    navigate("/mainpage", { state: { search: name } });
  };

  console.log(itemname);

  return (
    <div className="mainnavbar">
      <Link to="/mainpage" className="bar1">
        <div></div>
      </Link>
      <div className="bar2">
          <h1>Address</h1>
      </div>
      <div className="bar3">
        <input
          value={itemname}
          type="text"
          placeholder="Search for Item"
          onChange={(res) => {
            setItemname(res.target.value);
          }}
          required
        />
        <button onClick={() => searchitem(itemname)}>
          <img
            src="../../Images/image copy.png"
            alt=""
            style={{ width: "100%" }}
          />
        </button>
      </div>
      <div className="bar4">
        <h3>{User.UserName}</h3>
      </div>
      <div className="bar5">
        <Link to="/payments" className="returnbox">
          <div>
            <h4>Returns&</h4>
            <h2>Orders</h2>
          </div>
        </Link>
        <Link to="/cart" className="cartbox">
          <div>
            <h1>Cart</h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
