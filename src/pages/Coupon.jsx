import { useEffect, useState } from "react";
import CreateCoupon from "../components/adminComponents/CreateCoupon";
import {
  Table,
  Input,
  DatePicker,
  Select,
  Button,
  Switch,
  Checkbox,
} from "antd";
import axios from "axios";

const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;

const Coupon = () => {
  const [createCouponOpen, setCreateCouponOpen] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [couponTypeFilter, setCouponTypeFilter] = useState(null);
  const [couponId, setCouponId] = useState(null);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await axios.get("http://localhost:3000/coupons");
      const responseData = response.data;
      if (responseData.success) {
        setCoupons(responseData.data);
        setFilteredCoupons(responseData.data);
      } else {
        console.error("Error fetching coupons:", responseData.message);
      }
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };

  const handleCreateCouponClick = () => {
    setCreateCouponOpen(true);
  };

  const handleCloseSetup = () => {
    setCreateCouponOpen(false);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    filterCoupons(value, dateRange, couponTypeFilter);
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
    filterCoupons(searchText, dates, couponTypeFilter);
  };

  const handleCouponTypeFilterChange = (value) => {
    setCouponTypeFilter(value);
    filterCoupons(searchText, dateRange, value);
  };

  const filterCoupons = (searchText, dates, couponType) => {
    let filteredData = [...coupons];

    // Filter by search text
    filteredData = filteredData.filter((coupon) =>
      coupon.couponCode.toLowerCase().includes(searchText.toLowerCase())
    );

    // Filter by date range
    if (dates.length === 2) {
      filteredData = filteredData.filter((coupon) => {
        const couponDate = new Date(coupon.startDate);
        return (
          couponDate >= dates[0].startOf("day") &&
          couponDate <= dates[1].endOf("day")
        );
      });
    }

    // Filter by coupon type
    if (couponType) {
      filteredData = filteredData.filter(
        (coupon) => coupon.couponType === couponType
      );
    }

    setFilteredCoupons(filteredData);
  };

  const handleEdit = (id) => {
    setCouponId(id);
    setCreateCouponOpen(true);
  };

  const columns = [
    {
      title: "Select",
      dataIndex: "_id",
      render: (_, record) => (
        <Checkbox.Group>
          <Checkbox key={record._id} />
        </Checkbox.Group>
      ),
    },
    {
      title: "S.N",
      dataIndex: "id",
      render: (_, record, index) => index + 1,
    },
    {
      title: "Coupon Code",
      dataIndex: "couponCode",
      key: "couponCode",
    },
    {
      title: "Usage Limit",
      dataIndex: "usageLimit",
      key: "usageLimit",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Coupon Type",
      dataIndex: "couponType",
      key: "couponType",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Edit",
      render: (_, record) => (
        <Button
          className="w-14 border flex items-center justify-center p-3 text-sidebarcolor"
          size="small"
          onClick={() => handleEdit(record._id)}
        >
          Edit
        </Button>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Switch
          checked={record.isActive}
          onChange={(checked) => handleChangeActive(record.id, checked)}
          style={{ backgroundColor: record.isActive ? "#28a745" : "#636363" }}
        />
      ),
    },
  ];

  return (
    <div>
      <div className="content1 flex justify-between">
        <div>
          <h2 className="text-xl font-semibold">Coupons</h2>
          <p className="text-featurecolor text-sm">Create coupon code</p>
        </div>

        <button
          className="bg-primary py-1 w-48 text-categoriestextcolor rounded-md flex items-center justify-center"
          onClick={handleCreateCouponClick}
        >
          <span className="text-4xl mb-1">+</span>{" "}
          <span className="text-sm mx-1">Create New Coupon</span>
        </button>
      </div>

      {createCouponOpen && (
        <div className="overlay relative flex justify-center">
          <div className="overlay-content absolute z-20 ">
            <CreateCoupon onClose={handleCloseSetup} couponId={couponId} />
          </div>
        </div>
      )}
      <div className="mt-8">
        <div style={{ marginBottom: 16 }} className="flex justify-between">
          <div>
            <span>
              Show{" "}
              <span className="border p-1 rounded-md border-lorem">10</span> per
              page
            </span>
          </div>
          <Search
            placeholder="Search orders"
            style={{ width: 200, marginRight: 16 }}
            onSearch={handleSearch}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <RangePicker
            style={{ marginRight: 16 }}
            onChange={handleDateRangeChange}
            value={dateRange}
          />

          <Select
            placeholder="Coupon Type"
            style={{ width: 150, marginRight: 16 }}
            onChange={handleCouponTypeFilterChange}
            value={couponTypeFilter}
          >
            <Option value="Flat Discount">Flat Discount</Option>
            <Option value="Percentage">Percentage</Option>
          </Select>

          <Select placeholder="Payment Status" style={{ width: 150 }}>
            <Option value="Pending">Pending</Option>
            <Option value="Paid">Paid</Option>
            <Option value="Failed">Failed</Option>
          </Select>
        </div>
        <Table dataSource={filteredCoupons} columns={columns} />
      </div>
    </div>
  );
};

export default Coupon;
