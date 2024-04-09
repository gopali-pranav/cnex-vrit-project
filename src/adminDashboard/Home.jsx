import Categories from "../pages/Categories";
import Collections from "../pages/Collections";
import Products from "../pages/Products";
import { Routes, Route } from "react-router-dom";
import Variations from "../pages/Variations";
import ProductDetailPage from "../pages/ProductDetailPage";
import CustomerProfilePage from "../pages/CustomerProfile.jsx";
import Cart from "../pages/Cart.jsx";
import OrderPage from "../pages/OrderPage.jsx";
import OrderDetailPage from "../pages/OrderDetailPage.jsx";
import Appointments from "../pages/Appointments.jsx";
import ManageAppointments from "../pages/ManageAppointments.jsx";
import Coupon from "../pages/Coupon.jsx";

const Home = () => {
  return (
    <div className="content p-6">
      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/variations" element={<Variations />} />
        <Route path="/products" element={<Products />} />
      </Routes>

      <Routes>
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/customerprofile" element={<CustomerProfilePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/order/:orderId" element={<OrderDetailPage />} />
        <Route path="/appointment" element={<Appointments />} />
        <Route path="/manage_appointment" element={<ManageAppointments />} />
        <Route path="/coupon" element={<Coupon />} />
      </Routes>
    </div>
  );
};

export default Home;
