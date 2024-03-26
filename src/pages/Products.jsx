import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Modal, Input } from "antd";
import toast from "react-hot-toast";
import { FaStar, FaEdit, FaTrash } from "react-icons/fa";

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

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    getProducts();
  }, []);

  const handleEdit = (record) => {
    setEditedProduct(record);
    setEditModalVisible(true);
  };

  const handleEditSubmit = () => {
    // Simulate updating the product in the database
    // In a real application, you would make a PUT request to your API
    const updatedProducts = products.map((product) =>
      product.id === editedProduct.id ? editedProduct : product
    );
    setProducts(updatedProducts);
    setEditModalVisible(false);
    toast.success("Product updated successfully!");
  };

  const handleDelete = () => {
    // Simulate deleting the product from the database
    // In a real application, you would make a DELETE request to your API
    const updatedProducts = products.filter(
      (product) => product.id !== productToDelete.id
    );
    setProducts(updatedProducts);
    setDeleteModalVisible(false);
    toast.success("Product deleted successfully!");
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
      render: (price) => (
        <div className="flex items-center">
          <span className="mr-1">$</span>
          <span>{price}</span>
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description) => (
        <div className="flex items-center text-sm">
          <span>{description}</span>
        </div>
      ),
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
        <div className="flex flex-wrap text-sm">
          {renderRatingStars(rating.rate)}
          <span>({rating.count} reviews)</span>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="flex gap-6 items-center ">
          <FaEdit
            onClick={() => handleEdit(record)}
            style={{ cursor: "pointer", marginRight: "0.5rem" }}
          />
          <FaTrash
            onClick={() => {
              setProductToDelete(record);
              setDeleteModalVisible(true);
            }}
            style={{ cursor: "pointer", backgroundColor: "red" }}
            className=" rounded-full p-1 text-lorem size-6"
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-3xl">Products</h1>
      <Table columns={columns} dataSource={products} className="mt-8" />

      {/* Edit Product Modal */}
      <Modal
        title="Edit Product"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={handleEditSubmit}
        okButtonProps={{ className: "text-black border-lorem" }}
        cancelButtonProps={{ className: "text-secondary" }}
      >
        {/* Input fields for editing product details */}
        <Input
          value={editedProduct ? editedProduct.title : ""}
          onChange={(e) =>
            setEditedProduct({
              ...editedProduct,
              title: e.target.value,
            })
          }
          placeholder="Title"
          style={{ marginBottom: "1rem" }}
        />
        <Input
          value={editedProduct ? editedProduct.category : ""}
          onChange={(e) =>
            setEditedProduct({
              ...editedProduct,
              category: e.target.value,
            })
          }
          placeholder="Category"
          style={{ marginBottom: "1rem" }}
        />
        <Input
          value={editedProduct ? editedProduct.price : ""}
          onChange={(e) =>
            setEditedProduct({
              ...editedProduct,
              price: e.target.value,
            })
          }
          placeholder="Price"
          style={{ marginBottom: "1rem" }}
        />
        <Input.TextArea
          value={editedProduct ? editedProduct.description : ""}
          onChange={(e) =>
            setEditedProduct({
              ...editedProduct,
              description: e.target.value,
            })
          }
          placeholder="Description"
          style={{ marginBottom: "1rem" }}
        />
        <Input
          value={editedProduct ? editedProduct.image : ""}
          onChange={(e) =>
            setEditedProduct({
              ...editedProduct,
              image: e.target.value,
            })
          }
          placeholder="Image URL"
          style={{ marginBottom: "1rem" }}
        />
      </Modal>

      {/* Delete Product Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        onOk={handleDelete}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ className: "text-black border-lorem" }}
        cancelButtonProps={{ className: "text-secondary" }}
      >
        Are you sure you want to delete this product?
      </Modal>
    </div>
  );
};

export default Products;
