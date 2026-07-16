import React from 'react'
import {Route,Routes} from 'react-router-dom';
import Enter from './Pages/enter';
import Login from './Pages/login';
import Register from './Pages/register';
import Mainpage from './Pages/UserPages/mainpage';
import Payments from './Pages/UserPages/payment';
import Cart from './Pages/UserPages/cartpage';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Enter/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/mainpage' element={<Mainpage/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/payments' element={<Payments/>}/>
    </Routes>
  )
}

export default App;