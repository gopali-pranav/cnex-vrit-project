import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Spin, Row, Col } from "antd";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addItemToCart } from "../redux/cartSlice";

const { Meta } = Card;

const VariationsPage = () => {
  const [variations, setVariations] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchVariations() {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setVariations(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching variations:", error);
        setLoading(false);
      }
    }
    fetchVariations();
  }, []);

  const handleAddToCart = (variation) => {
    dispatch(addItemToCart(variation));
    toast.success("Product added to Collection successfully!");
  };
  const renderRatingStars = (rating) => {
    const starCount = 5;
    const filledStars = Math.floor(rating);
    const halfStars = Math.ceil(rating - filledStars);
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

  return (
    <div className="variations">
      <h1 className="text-3xl mb-4">Variations</h1>
      <Row gutter={[16, 16]}>
        {loading ? (
          <Spin size="large" />
        ) : (
          variations.map((variation) => (
            <Col key={variation.id} xs={24} sm={12} md={8} lg={8} xl={8}>
              <Link to={`/product/${variation.id}`}>
                <Card hoverable style={{ marginBottom: 16 }}>
                  <img
                    alt={variation.title}
                    src={variation.image}
                    style={{ width: "100%", height: 300, objectFit: "contain" }}
                  />
                  <div className="mt-4">
                    <Meta
                      title={variation.title}
                      description={`$${variation.price}`}
                    />
                    <div className="rating mt-3 flex">
                      {renderRatingStars(variation.rating.rate)}
                      <span className="ml-2">
                        ({variation.rating.count} reviews)
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
              <div className="w-full flex justify-center">
                <button
                  className="bg-secondary p-1 w-72 h-10 text-white rounded-lg "
                  onClick={() => handleAddToCart(variation)}
                >
                  Add to Collection
                </button>
              </div>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default VariationsPage;
