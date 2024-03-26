import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Table, Spin } from "antd";
import { FaStar } from "react-icons/fa";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

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

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="Product" style={{ width: 50 }} />
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => (
        <div className="flex flex-wrap">
          {renderRatingStars(rating.rate)}
          <span>({rating.count} reviews)</span>
        </div>
      ),
    },
  ];

  return (
    <div className="product-detail">
      <h1 className="text-3xl mb-4">Product Detail</h1>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table columns={columns} dataSource={[product]} pagination={false} />
      )}
    </div>
  );
};

export default ProductDetailPage;
