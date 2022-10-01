import { Routes, Route } from "react-router-dom";
import AllViews from './pages/AllViews'
import Home from "./pages/Home";
import ProductDetail from './pages/ProductDetail'
import UserDetail from './pages/UserDetail'
import Error from "./pages/error";
import Users from "./pages/Users"
import Products from "./pages/Products";
import '../public/css/App.css'

function App() {
  return (
    <>
      <AllViews />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/product/:id" element={<ProductDetail />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/user/:id" element={<UserDetail />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </>
  )
}

export default App;