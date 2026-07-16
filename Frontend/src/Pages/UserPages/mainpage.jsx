import React from "react";
import Header from "../../Components/header";

const MainPage = () => {
  return (
    <div style={{ backgroundColor: "black" }}>
      <Header />
      <div className="mainpagesheet">
        <div className="mainpageiteside">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <div className="mainpagecartside"></div>
      </div>
    </div>
  );
};

export default MainPage;
