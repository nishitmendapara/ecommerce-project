import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Regi from "./components/Regi";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Layout from "./components/Layout";
import Deshboard from "./admin/Deshboard";
import Letside from "./admin/Letside";
import AllProduct from "./admin/Allproduct";
import Addproduct from "./admin/Addproduct";
import CartProducts from "./admin/CartProducts";
import Usercontact from "./admin/Usercontact";
import UpdateProduct from "./admin/Updateprod";
import Users from "./admin/Users";
import SingleProduct from "./components/singleproduct";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Regi />} />
          <Route path="/about" element={<About />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/singleproduct/:id" element={<SingleProduct />} />
        </Route>
        
        <Route path="/" element={<Letside/>}>
        <Route path="/dash" element={<Deshboard/>}/>
        <Route path="/all-product" element={<AllProduct/>}/>
        <Route path="/add-product" element={<Addproduct/>}/>
        <Route path="/cart-products" element={<CartProducts/>}/>
        <Route path="/contact-us" element={<Usercontact/>}/>
        <Route path="/update-product/:id" element={<UpdateProduct/>}/>
        <Route path="/users" element={<Users/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
