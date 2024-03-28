import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Table, Spin } from "antd";
import { FaStar } from "react-icons/fa";
import { addItemToCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

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

  const handleAddToCart = () => {
    dispatch(addItemToCart(product));
    toast.success("Product added to Collection successfully!");
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
      title: "Actual Price",
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
    {
      title: "Action",
      key: "action",
      render: () => (
        <button
          className="bg-secondary p-1 w-40 h-10 text-white rounded-lg "
          onClick={handleAddToCart}
        >
          Add to Collection
        </button>
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
