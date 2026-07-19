import React from 'react'

const itemspage = () => {

    const item = JSON.parse(localStorage.getItem("item"));

  return (
    <div>
        <div className="itemspage">
            <div className="itempic" style={{backgroundImage:`url(${item.ProductPic})`}}>
            </div>
            <div className="itemdetails">
                <h2 style={{display:"flex",color:'orangered'}}>Name:<h3 style={{fontSize:"20px",paddingLeft:"10px",marginTop:"3px",color:"black"}}>{item.ProductName}</h3></h2>
                <h3 style={{display:"flex",color:'orangered'}}>Desc:<h4 style={{fontSize:"20px",paddingLeft:"10px",marginTop:"3px",color:"black"}}>{item.ProductDesc}</h4></h3>
                <h3 style={{display:"flex",color:'orangered'}}>ID:<h4 style={{fontSize:"20px",paddingLeft:"10px",marginTop:"3px",color:"black"}}>{item.ProductID}</h4></h3>
                <h3 style={{display:"flex",color:'orangered'}}>Type:<h4 style={{fontSize:"20px",paddingLeft:"10px",marginTop:"3px",color:"black"}}>{item.ProductType}</h4></h3>
                <h3 style={{display:"flex",color:'orangered'}}>⭐<h4 style={{fontSize:"20px",paddingLeft:"10px",marginTop:"3px",color:"black"}}>4.5</h4></h3>
            </div>
        </div>
    </div>
  )
}

export default itemspage;