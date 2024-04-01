import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Input, DatePicker, Space, Select, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [deliveryStatusFilter, setDeliveryStatusFilter] = useState(null);
  const [paymentStatusFilter, setPaymentStatusFilter] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/orders");
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleSearch = (value) => {
    if (!value) {
      const fetchOrders = async () => {
        try {
          const response = await axios.get("http://localhost:3000/orders");
          setOrders(response.data.orders);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };

      fetchOrders();
    } else {
      // Filter orders based on search value
      const filteredOrders = orders.filter((order) => {
        const searchString = `${order._id} ${order.date} ${order.customerDetails[0].name} ${order.customerDetails[0].phone} ${order.customerDetails[0].email}`;
        return searchString.toLowerCase().includes(value.toLowerCase());
      });
      setOrders(filteredOrders);
    }
  };

  const handleDateRangeChange = (dates) => {
    if (dates && dates.length === 2) {
      // Filter orders based on selected date range
      const filteredOrders = orders.filter((order) => {
        const orderDate = new Date(order.date);
        return (
          orderDate >= dates[0].startOf("day") &&
          orderDate <= dates[1].endOf("day")
        );
      });
      setOrders(filteredOrders);
    } else {
      const fetchOrders = async () => {
        try {
          const response = await axios.get("http://localhost:3000/orders");
          setOrders(response.data.orders);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };

      fetchOrders();
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (text, record) => {
        const truncatedId =
          text.length > 8 ? text.substring(0, 8) + "..." : text;
        return (
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedOrderId(text)}
          >
            {truncatedId}
          </span>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Name/Phone/Email",
      dataIndex: "customerDetails",
      key: "customerName",
      render: (customerDetails) =>
        `${customerDetails[0].name} ${customerDetails[0].phone} ${customerDetails[0].email}`,
    },

    {
      title: "Qty",
      dataIndex: "products",
      key: "totalQuantity",
      render: (products) =>
        products.reduce((acc, product) => acc + product.quantity, 0),
    },
    {
      title: "Total",
      dataIndex: "products",
      key: "totalPrice",
      render: (products) => {
        const total = products.reduce(
          (acc, product) => acc + product.totalPrice,
          0
        );
        return `$${total}`;
      },
    },
    {
      title: "Discount Applied",
      dataIndex: "products",
      key: "totalPrice",
      render: (products) => {
        const totalPrice = products.reduce(
          (acc, product) => acc + product.totalPrice,
          0
        );
        const discountedPrice = (totalPrice * 0.87).toFixed(2); // Applying 13% discount
        return `$${discountedPrice}`;
      },
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      filters: [
        { text: "Pending", value: "Pending" },
        { text: "Paid", value: "Paid" },
        { text: "Failed", value: "Failed" },
      ],
      filteredValue: paymentStatusFilter ? [paymentStatusFilter] : null,
      onFilter: (value, record) => record.paymentStatus === value,
      render: (text, record) => (
        <Select
          defaultValue={record.paymentStatus}
          style={{ width: 120 }}
          onChange={(value) => {
            setPaymentStatusFilter(value);
          }}
          placeholder="Pending"
        >
          <Option value="Pending">Pending</Option>
          <Option value="Paid">Paid</Option>
          <Option value="Failed">Failed</Option>
        </Select>
      ),
    },
    {
      title: "Delivery Status",
      dataIndex: "deliveryStatus",
      key: "deliveryStatus",
      filters: [
        { text: "Pending", value: "Pending" },
        { text: "In Progress", value: "In Progress" },
        { text: "Delivered", value: "Delivered" },
      ],
      filteredValue: deliveryStatusFilter ? [deliveryStatusFilter] : null,
      onFilter: (value, record) => record.deliveryStatus === value,
      render: (text, record) => (
        <Select
          defaultValue={record.deliveryStatus}
          style={{ width: 120 }}
          onChange={(value) => {
            setDeliveryStatusFilter(value);
          }}
          placeholder="Pending"
        >
          <Option value="Pending">Pending</Option>
          <Option value="In Progress">In Progress</Option>
          <Option value="Delivered">Delivered</Option>
        </Select>
      ),
    },
    {
      title: "Order Details",
      key: "orderDetails",
      render: (text, record) => (
        <Space size="middle" className="flex justify-center">
          <Link to={`/order/${record._id}`}>
            <EyeOutlined className="border p-2 rounded-lg border-lorem text-primary cursor-pointer" />
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1 className="mb-7 font-semibold text-xl">Orders</h1>
      <div style={{ marginBottom: 16 }} className="flex justify-between">
        <div>
          <span>
            Show <span className="border p-1 rounded-md border-lorem">10</span>{" "}
            per page
          </span>
        </div>
        <Search
          placeholder="Search orders"
          style={{ width: 200, marginRight: 16 }}
          onSearch={handleSearch}
        />

        <RangePicker
          style={{ marginRight: 16 }}
          onChange={handleDateRangeChange}
        />

        <Select
          placeholder="Delivery Status"
          style={{ width: 150, marginRight: 16 }}
        >
          <Option value="Pending">Pending</Option>
          <Option value="In Progress">In Progress</Option>
          <Option value="Delivered">Delivered</Option>
        </Select>

        <Select placeholder="Payment Status" style={{ width: 150 }}>
          <Option value="Pending">Pending</Option>
          <Option value="Paid">Paid</Option>
          <Option value="Failed">Failed</Option>
        </Select>

        <Modal
          title="Order ID"
          visible={selectedOrderId !== null}
          onCancel={() => setSelectedOrderId(null)}
          footer={null}
        >
          <p>{selectedOrderId}</p>
        </Modal>
      </div>
      <Table columns={columns} dataSource={orders} />
    </div>
  );
};

export default OrderPage;
