import { useState } from "react";
import { Card, Row, Col, Pagination, Button } from "antd";
import { FaStar } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";
const { Meta } = Card;

const CollectionAdmin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const renderRatingStars = (rating) => {
    const starCount = 5;
    const filledStars = Math.floor(rating.rate);
    const halfStars = Math.ceil(rating.rate - filledStars);
    const emptyStars = starCount - filledStars - halfStars;

    const stars = [];

    // Render filled stars
    for (let i = 0; i < filledStars; i++) {
      stars.push(<FaStar key={i} color="gold" />);
    }

    // Render half stars
    for (let i = 0; i < halfStars; i++) {
      stars.push(<FaStar key={`half-${i}`} color="gold" />);
    }

    // Render empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} color="lightgray" />);
    }

    return stars;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="collection-admin">
      <div className="flex justify-between items-center mb-8 ">
        <h1 className="text-3xl">Admin Collection</h1>
        <button className="bg-primary p-2 text-white rounded-md">
          <Link to={"/cart"}> Collection Details</Link>
        </button>
      </div>
      <Row gutter={[16, 16]}>
        {cartItems.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={12} lg={8} xl={6}>
            <Card hoverable style={{ marginBottom: 16 }}>
              <img
                alt={product.title}
                src={product.image}
                style={{ width: "100%", height: 300, objectFit: "contain" }}
              />
              <div className="mt-4">
                <Meta title={product.title} />
                <div className="mt-2">
                  <p className="font-semibold">
                    Total: <span className="text-yellow">$</span> {""}
                    <span className="text-red">
                      {(product.price * product.quantity).toFixed(0)}
                    </span>
                  </p>
                </div>
                <div className="rating mt-3 flex">
                  {/* Check if product.rating exists before accessing its properties */}
                  {product.rating && renderRatingStars(product.rating)}
                  {/* If product.rating is undefined or null, the rating won't be rendered */}
                  <span className="ml-2">
                    {product.rating && `${product.rating.count} reviews`}
                  </span>
                </div>
                <div className="quantity font-semibold">
                  Quantity:{" "}
                  <span className="text-secondary">{product.quantity}</span>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination
        current={currentPage}
        onChange={handlePageChange}
        total={cartItems.length}
        pageSize={8} // Adjust page size to show 8 products per page
        showSizeChanger={false}
        className="mt-4 flex justify-center space-x-4"
      />
    </div>
  );
};

export default CollectionAdmin;
