import { Route, Routes } from 'react-router-dom';
import './App.css';
import Mainpage from './components/mainpage';
import ShoppingCart from './components/shopping-cart';
import Checkout from './components/checkout';

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Mainpage/>}/>
      <Route path="/shopping-cart" element={<ShoppingCart/>}/>
      <Route path="/checkout" element={<Checkout/>}/>
    </Routes>
    </>
  )
}

export default App
