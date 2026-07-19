import React, { useState, useEffect } from "react";
import Header from "../../Components/header";
import axios from "axios";
import { Link } from "react-router-dom";
const API = import.meta.env.VITE_API;

const MainPage = () => {
  const [product, setProduct] = useState([]);
  const User = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(`${API}/api/user/get-products`)
      .then((res) => {
        setProduct(res.data.Products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const username = User.UserName;

  const addItem = async (id) => {
    try {
      const res = await fetch(
        `${API}/api/user/update-cart/${username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Product: id,
            Quantity: 1,
          }),
        },
      );
      updatecart();
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const [cart, setCart] = useState([]);

  const updatecart = useEffect(() => {
    axios
      .get(`${API}/api/user/get-cart/${username}`)
      .then((res) => {
        setCart(res.data.Cart[0].Products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [addItem]);

  const deleteItem = async (productId) => {
    try {
      const res = await fetch(
        `${API}/api/user/delete-item/${username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Product: productId,
          }),
        },
      );

      const data = await res.json();
      console.log(data);

      updatecart();
    } catch (err) {
      console.log(err);
    }
  };

  const [itemname, setItemname] = useState("");

  const filteredProducts =
    itemname.trim() === ""
      ? product
      : product.filter(
          (item) =>
            item.ProductName.toLowerCase().includes(itemname.toLowerCase()) ||
            item.ProductType.toLowerCase().includes(itemname.toLowerCase()),
        );


        const viewitem = (item)=>{
          localStorage.setItem("item",JSON.stringify(item));
        }

  return (
    <div style={{ backgroundColor: "black" }}>
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
      <div className="mainpagesheet">
        <div className="mainpageiteside">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item, key) => {
              return (
                <div className="bar">
                  <div
                    className="barpic"
                    style={{ backgroundImage: `url(${item.ProductPic})` }}
                  ></div>
                  <div className="bardetails">
                    <h2>{item.ProductName}</h2>
                    <h3>
                      {item.ProductID} || {item.ProductType}
                    </h3>
                    <h3>Starsh || {item.ProductCost}</h3>
                    <Link to="/item" onClick={()=>{viewitem(item)}}>
                    <button style={{width:"100px",height:"20px"}}>CHECK</button>
                    </Link>
                  </div>
                  <div
                    className="add"
                    onClick={() => {
                      addItem(item._id);
                    }}
                  >
                    <h2>Add to Cart</h2>
                  </div>
                </div>
              );
            })
          ) : (
            <h1 style={{ marginLeft: "300px", width: "400px" }}>
              No Products Available
            </h1>
          )}
        </div>
        <div className="mainpagecartside">
          <div className="smallcarthead">
            <h2>Cart Items</h2>
          </div>

          {cart.length > 0 ? (
            cart.map((item) => {
              return (
                <div className="smallcartitem" key={item._id}>
                  <div
                    className="smallpic"
                    style={{
                      backgroundImage: `url(${item.Product.ProductPic})`,
                    }}
                  ></div>

                  <div className="smallresume">
                    <h3>{item.Product.ProductName}</h3>
                    <h5>
                      {item.Product.ProductID} || {item.Product.ProductType}
                    </h5>
                    <h4>Quantity : {item.Quantity}</h4>
                    <h4>{item.Product.ProductCost}</h4>
                  </div>

                  <button
                    className="smalldelete"
                    onClick={() => deleteItem(item.Product._id)}
                  >
                    <div></div>
                  </button>
                </div>
              );
            })
          ) : (
            <h1 style={{ marginLeft: "100px", marginTop: "30px" }}>
              Cart is empty
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
