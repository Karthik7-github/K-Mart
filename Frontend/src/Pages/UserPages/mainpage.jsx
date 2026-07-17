import React, { useState, useEffect } from "react";
import Header from "../../Components/header";
import axios from "axios";

const MainPage = () => {
  const [product, setProduct] = useState([]);
  const User = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/get-products")
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
        `http://localhost:5000/api/user/update-cart/${username}`,
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
      .get(`http://localhost:5000/api/user/get-cart/${username}`)
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
        `http://localhost:5000/api/user/delete-item/${username}`,
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

  return (
    <div style={{ backgroundColor: "black" }}>
      <Header />
      <div className="mainpagesheet">
        <div className="mainpageiteside">
          {product.length > 0 ? (
            product.map((item, key) => {
              return (
                <div className="bar" key={key}>
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
                    <h2>{item.Product.ProductName}</h2>
                    <h4>
                      {item.Product.ProductID} || {item.Product.ProductType}
                    </h4>
                    <h3>Quantity : {item.Quantity}</h3>
                    <h3>{item.Product.ProductCost}</h3>
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
            <h1 style={{marginLeft:"100px",marginTop:"30px"}}>Cart is empty</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
