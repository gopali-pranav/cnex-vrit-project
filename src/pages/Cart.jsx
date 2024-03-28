import { useState } from "react";
import { Table, Button, Pagination, Modal, Input, Space } from "antd";
import { FaStar, FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  clearCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";
import axios from "axios";
import { toast } from "react-hot-toast";

const { Column } = Table;

const Cart = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState([]);
  const [phone, setPhone] = useState([]);
  const [email, setEmail] = useState([]);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const renderRatingStars = (rating) => {
    if (!rating) return null;

    const starCount = 5;
    const filledStars = Math.floor(rating.rate);
    const halfStars = Math.ceil(rating.rate - filledStars);
    const emptyStars = starCount - filledStars - halfStars;

    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(<FaStar key={i} color="gold" />);
    }

    for (let i = 0; i < halfStars; i++) {
      stars.push(<FaStar key={`half-${i}`} color="gold" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} color="lightgray" />);
    }

    return stars;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOrder = async () => {
    try {
      // Format cart items to match backend expectations
      const products = cartItems.map((item) => ({
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.price * item.quantity,
      }));

      // Extract order details
      const customerDetails = {
        name: name,
        phone: phone,
        email: email,
      };

      const date = {
        date: new Date().toISOString().split("T")[0],
      };

      // Send the order details to the backend
      const response = await axios.post("http://localhost:3000/orders", {
        products,
        customerDetails,
        date,
      });

      // Handle response from the backend
      console.log(response.data);
      if (response.data) {
        toast("Order has been placed successfully");
        dispatch(clearCart()); // Clear the cart after placing the order
        setIsModalVisible(false); // Close the modal
        setName(""); // Clear the input fields
        setPhone("");
        setEmail("");
      } else {
        console.error("Unexpected response status:", response.status);
        toast("Failed to place order. Please try again later.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="collection-admin">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl">Admin Collection</h1>
        <div className="text-xl shadow-md p-1 rounded-md">
          Date & Time:{" "}
          <span className="text-sm font-normal">
            {new Date().toLocaleString()}
          </span>
        </div>
      </div>
      <Table dataSource={cartItems} pagination={false}>
        <Column
          title={<div style={{ fontSize: "14px" }}>Title </div>}
          dataIndex="title"
          key="title"
        />
        <Column
          title={<div style={{ fontSize: "14px" }}>Images</div>}
          key="image"
          render={(text, record) => (
            <img src={record.image} alt={record.title} style={{ width: 50 }} />
          )}
        />

        <Column
          title={<div style={{ fontSize: "14px" }}>Actual Price </div>}
          dataIndex="price"
          key="price"
          render={(price) => (
            <div className="flex items-center justify-center">
              <span>${price}</span>
            </div>
          )}
        />
        <Column
          title={<div style={{ fontSize: "14px" }}>Total Price </div>}
          key="totalPrice"
          render={(text, record) => {
            const totalPrice = record.price * record.quantity;
            return <span>${totalPrice.toFixed(0)}</span>;
          }}
        />

        <Column
          title={<div style={{ fontSize: "14px" }}>Ratings & Reviews</div>}
          key="rating"
          render={(text, record) => (
            <div className="flex flex-col items-center">
              <span className="flex">{renderRatingStars(record.rating)}</span>
              <span className="ml-2">{record.rating.count} reviews</span>
            </div>
          )}
        />

        <Column
          title={<div style={{ fontSize: "14px" }}>Quantity </div>}
          key="quantity"
          render={(text, record) => (
            <div className="quantity-buttons flex flex-col">
              <Button
                type="primary"
                icon={<FaPlus />}
                onClick={() => dispatch(increaseQuantity(record.id))}
                className="bg-primary w-5 h-6 text-xs"
              />
              <span className="quantity-value ml-2 mr-2">
                {record.quantity}
              </span>
              <Button
                type="primary"
                icon={<FaMinus />}
                onClick={() => dispatch(decreaseQuantity(record.id))}
                className="bg-purple w-5 h-6 text-xs"
              />
            </div>
          )}
        />
        <Column
          title={<div style={{ fontSize: "14px" }}>Delete</div>}
          key="actions"
          render={(record) => (
            <div>
              <Button
                icon={<FaTrash />}
                onClick={() => dispatch(removeFromCart(record.id))}
                className="bg-secondary text-white p-1 rounded-full flex items-center justify-center"
              />
            </div>
          )}
        />
      </Table>
      <div className="mt-4">
        <Button className="bg-reasonbackground text-white" onClick={showModal}>
          Order
        </Button>
        <Modal
          title="Enter Customer Information"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" onClick={handleOrder}>
              Confirm Order
            </Button>,
          ]}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <label>Enter Your Full Name:</label>
            <Input
              placeholder="Full Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                padding: "10px",
                marginBottom: "10px",
              }} // Adjust placeholder text color
            />
            <label>Enter Your Phone Number:</label>
            <Input
              placeholder="Phone Number"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{
                padding: "10px",
                marginBottom: "10px",
              }} // Adjust placeholder text color
            />
            <label>Enter Your Email Address:</label>
            <Input
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "10px",
                marginBottom: "10px",
              }} // Adjust placeholder text color
            />
          </Space>
        </Modal>
      </div>
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

export default Cart;
