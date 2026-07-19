import React from "react";
import Header from "../../Components/header";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const cartpage = () => {
  const User = JSON.parse(localStorage.getItem("user"));
  const username = User.UserName;
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState(0);

  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/user/get-cart/${username}`,
      );
      setCart(res.data.Cart[0].Products);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach((item) => {
      totalPrice += item.Product.ProductCost * item.Quantity;
      totalItems += item.Quantity;
    });

    setTotal(totalPrice);
    setItems(totalItems);
  }, [cart]);

  useEffect(() => {
    fetchCart();
  }, []);

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

      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  const updatepayment = async () => {
    if (!cart || cart.length === 0) {
      Swal.fire("Cart Empty 🛒", "Add items before placing order", "warning");
      return;
    }

    const result = await Swal.fire({
      title: "Place Order?",
      text: "Do you want to confirm your purchase?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Order it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/user/update-payment/${username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Cart: cart,
          }),
        },
      );

      await Swal.fire("Success 🎉", "Your order has been placed!", "success");

      fetchCart();
    } catch (err) {
      Swal.fire("Error ❌", "Something went wrong", "error");
    }
  };

  return (
    <div>
      <Header />

      <div className="cartpageproducts">
        <div className="single">
          {cart.length > 0 ? (
            cart.map((item) => {
              return (
                <div className="cartproductspart">
                  <div
                    className="cartproductpic1"
                    style={{
                      backgroundImage: `url(${item.Product.ProductPic})`,
                    }}
                  ></div>
                  <div className="cartproductresume1">
                    <h1>{item.Product.ProductName}</h1>
                    <h3>
                      {item.Product.ProductID} || {item.Product.ProductType} ||
                      Quantity : {item.Quantity}
                    </h3>
                    <h3>Stars || {item.Product.ProductCost}</h3>
                  </div>
                  <button
                    className="cartproductdelete1"
                    onClick={() => {
                      deleteItem(item.Product._id);
                    }}
                  ></button>
                </div>
              );
            })
          ) : (
            <h1
              style={{
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "50px",
              }}
            >
              Cart is empty
            </h1>
          )}
        </div>
        <div className="generatereceipt">
          <div className="smallrechead">
            <h2>Cart List</h2>
          </div>
          <div className="smallrecdetails">
            <h2>Total Items : {items} </h2>
            <h2>Total Cost : {total}</h2>
          </div>
          <button className="smallbill" onClick={() => updatepayment(cart._id)}>
            <div>Generate Receipt</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default cartpage;
