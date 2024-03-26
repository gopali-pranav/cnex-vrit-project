import Categories from "../pages/Categories";
import Collections from "../pages/Collections";
import Products from "../pages/Products";
import { Routes, Route } from "react-router-dom";
import Variations from "../pages/Variations";
import ProductDetailPage from "../pages/ProductDetailPage";

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
      </Routes>
    </div>
  );
};

export default Home;
