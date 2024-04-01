import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa6";
import { Table, Select } from "antd";

const { Option } = Select;

const OrderDetailPage = () => {
  const { orderId } = useParams(); // Ensure orderId is extracted from URL params
  const [order, setOrder] = useState(null);

  let DeliveryCharge = 300;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/orders/${orderId}`
        );
        console.log("Order response:", response.data);
        setOrder(response.data.order);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [orderId]);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Product Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Unit Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="flex items-center gap-4 mb-5 font-bold text-xl">
        {" "}
        <Link to={"/order"}>
          {" "}
          <FaArrowLeft className="cursor-pointer" />
        </Link>{" "}
        Order Details
      </h1>
      {order ? (
        <div className="flex justify-between">
          <div className="one">
            <div className="border w-[680px] p-4 border-lorem rounded-lg">
              <div className="border-b border-b-lorem flex justify-between">
                <div>
                  <p className="font-semibold">
                    Order ID:{" "}
                    <span className="text-featurecolor font-normal">
                      {order._id}
                    </span>
                  </p>
                  <p className="mb-3 font-semibold">
                    Order Date:{" "}
                    <span className="text-featurecolor font-normal">
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                  </p>
                </div>
                <div className="space-x-4">
                  <Select placeholder="paid" style={{ width: 100 }}>
                    <Option value="paid">Paid</Option>
                  </Select>
                  <Select placeholder="paid" style={{ width: 100 }}>
                    <Option value="paid">Paid</Option>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="mt-4">
                  <h2 className="font-semibold text-primary">
                    Customers Details
                  </h2>
                  <p className="text-sm">
                    Name: {order.customerDetails[0].name}
                  </p>
                  <p className="text-sm">
                    Phone: {order.customerDetails[0].phone}
                  </p>
                  <p className="text-sm">
                    Email: {order.customerDetails[0].email}
                  </p>
                </div>
                <div className="mt-4">
                  <h2 className="font-semibold text-primary">Deliver To</h2>
                  <p className="text-sm">Billing Name: Khal Drogo</p>
                  <p className="text-sm">Phone: +9779887456123</p>
                  <p className="text-sm">City: Butwal, Nepal-45210</p>
                </div>
                <div className="mt-4">
                  <h2 className="font-semibold text-primary">Order Info</h2>
                  <p className="text-sm">Payment Method: Card</p>
                  <p className="text-sm">Delivery Status: Shipped</p>
                </div>
              </div>
            </div>
          </div>
          <div className="two">
            <div className="border w-80 mr-5 p-4 border-lorem rounded-lg">
              <div className="border-b border-b-lorem flex justify-between items-center">
                <h2 className="font-semibold text-primary mb-3 ">
                  Billing Info
                </h2>
                <span className="bg-categoriestextcolor p-2 rounded-xl text-xs text-green font-semibold mb-3 ">
                  Paid
                </span>
              </div>
              <div className="text-sm">
                <ul>
                  {order.products.map((product, index) => (
                    <li key={index}>
                      <p className="flex justify-between mb-2  mt-2">
                        Subtotal: <span>NRs {product.totalPrice}</span>
                      </p>
                      <p className="flex justify-between mb-2">
                        Discount: <span>NRs {product.price * 0.87}</span>
                      </p>
                      <p className="flex justify-between mb-2">
                        Delivery Charge: <span>NRs {DeliveryCharge}</span>
                      </p>
                      <p className=" border-b border-b-lorem"></p>
                      <p className="font-semibold text-primary mt-2 flex justify-between">
                        Grand Total:{" "}
                        <span>
                          {" "}
                          NRs {""}
                          {product.totalPrice +
                            product.price * 0.87 +
                            DeliveryCharge}
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {/* Table for product details */}
      {order && (
        <Table
          columns={columns}
          dataSource={order.products.map((product, index) => ({
            ...product,
            key: index,
          }))}
          pagination={false}
        />
      )}
    </div>
  );
};

export default OrderDetailPage;
