import React, { useState, useEffect } from "react";
import Header from "../../Components/header";
import axios from "axios";

const payment = () => {
  const User = JSON.parse(localStorage.getItem("user"));
  const username = User.UserName;

  const [payment, setPayment] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/user/get-payments/${username}`)
      .then((res) => {
        setPayment(res.data.Payments[0].Payments);
      })
      .catch((err) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="paymentsfullbox">
        <h1 style={{ marginTop: "20vh" }}>Payments List</h1>
        <div className="paymentbigbox">
          {payment.length > 0 ? (
            payment.map((pay, index) => {
              return (
                <div className="paymentsmallbox" key={index}>
                  <div className="datetotal">
                    <h2 className="row">
                      Date:
                      <span
                        className="value"
                        style={{
                          color: "white",
                          fontSize: "18px",
                          paddingLeft: "10px",
                        }}
                      >
                        {new Date(pay.Date).toLocaleString()}
                      </span>
                    </h2>

                    <h2 className="row">
                      Total:
                      <span
                        className="value"
                        style={{
                          color: "white",
                          fontSize: "18px",
                          paddingLeft: "10px",
                        }}
                      >
                        ₹{pay.TotalAmount}
                      </span>
                    </h2>
                  </div>
                  {pay.Receipt.map((item, i) => {
                    return (
                      <div className="totalitems" key={i}>
                        <div
                          className="pic"
                          style={{
                            backgroundImage: `url(${item.Product.ProductPic})`,
                          }}
                        ></div>
                        <div className="resume">
                          <h2>{item.Product.ProductName}</h2>
                          <h3>{item.Product.ProductDesc}</h3>
                          <h4>
                            {item.Product.ProductType} | ID:{" "}
                            {item.Product.ProductID}
                          </h4>
                          <h4>₹{item.Product.ProductCost}</h4>
                          <h4>Qty: {item.Quantity}</h4>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })
          ) : (
            <h1>No Payments Found</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default payment;