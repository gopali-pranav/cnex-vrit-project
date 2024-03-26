import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Spin, Row, Col, Pagination, Button, Modal } from "antd";
import { FaStar } from "react-icons/fa";

const { Meta } = Card;

const CollectionAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

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

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://fakestoreapi.com/products/${selectedProductId}`
      );
      setDeleteModalVisible(false);
      // Remove the deleted product from the products state
      setProducts(
        products.filter((product) => product.id !== selectedProductId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const openDeleteModal = (productId) => {
    setSelectedProductId(productId);
    setDeleteModalVisible(true);
  };

  // Calculate the index range for the current page
  const indexOfLastProduct = currentPage * 8;
  const indexOfFirstProduct = indexOfLastProduct - 8;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="collection-admin">
      <h1 className="text-3xl mb-4">Admin Collection</h1>
      <Row gutter={[16, 16]}>
        {loading ? (
          <Spin size="large" />
        ) : (
          currentProducts.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={12} lg={8} xl={6}>
              <Card hoverable style={{ marginBottom: 16 }}>
                <img
                  alt={product.title}
                  src={product.image}
                  style={{ width: "100%", height: 300, objectFit: "contain" }}
                />
                <div className="mt-4">
                  <Meta
                    title={product.title}
                    description={`$${product.price}`}
                  />
                  <div className="rating mt-3 flex">
                    {renderRatingStars(product.rating.rate)}
                    <span className="ml-2">
                      ({product.rating.count} reviews)
                    </span>
                  </div>
                  <div className="admin-actions mt-3">
                    <Button
                      type="danger"
                      onClick={() => openDeleteModal(product.id)}
                      className="bg-secondary text-white"
                    >
                      Delete
                    </Button>
                    {/* Add other admin actions like edit, manage, etc. */}
                  </div>
                </div>
              </Card>
            </Col>
          ))
        )}
      </Row>
      <Pagination
        current={currentPage}
        onChange={handlePageChange}
        total={products.length}
        pageSize={8} // Adjust page size to show 8 products per page
        showSizeChanger={false}
        className="mt-4 flex justify-center space-x-4"
      />

      {/* Delete confirmation modal */}
      <Modal
        title="Delete Product"
        visible={deleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ className: "text-black border-lorem" }}
        cancelButtonProps={{ className: "text-secondary" }}
      >
        <p>Are you sure you want to delete this product?</p>
      </Modal>
    </div>
  );
};

export default CollectionAdmin;
