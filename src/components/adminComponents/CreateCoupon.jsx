import { IoMdClose } from "react-icons/io";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CreateCoupon = ({ onClose, couponId }) => {
  const [couponCode, setCouponCode] = useState("");
  const [usageLimit, setUsageLimit] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [couponType, setCouponType] = useState("Flat Discount");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (couponId) {
      fetchCouponDetails();
    }
  }, [couponId]);

  const fetchCouponDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/coupons/${couponId}`
      );
      const couponData = response.data;
      setCouponCode(couponData.couponCode);
      setUsageLimit(couponData.usageLimit);
      setStartDate(couponData.startDate);
      setEndDate(couponData.endDate);
      setCouponType(couponData.couponType);
      setDiscount(couponData.discount);
      setDescription(couponData.description);
    } catch (error) {
      console.error("Error fetching coupon details:", error);
      // Handle error (show error message, etc.)
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleCouponTypeChange = (e) => {
    setCouponType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (couponId) {
        const updatedFields = {};
        if (couponCode) updatedFields.couponCode = couponCode;
        if (usageLimit) updatedFields.usageLimit = usageLimit;
        if (startDate) updatedFields.startDate = startDate;
        if (endDate) updatedFields.endDate = endDate;
        if (couponType) updatedFields.couponType = couponType;
        if (discount) updatedFields.discount = discount;
        if (description) updatedFields.description = description;

        await axios.put(
          `http://localhost:3000/coupons/${couponId}`,
          updatedFields
        );
        toast.success("Coupon Updated Successfully");
      } else {
        // Create new coupon
        await axios.post("http://localhost:3000/coupons", {
          couponCode,
          usageLimit,
          startDate,
          endDate,
          couponType,
          discount,
          description,
        });
        toast.success("Coupon Created Successfully");
      }
      handleClose();
    } catch (error) {
      toast.error("Error saving coupon:", error);
      // Handle error (show error message, etc.)
    }
  };

  return (
    <div className="flex justify-center relative top-10">
      <div className="appointment-setup-form shadow-2xl bg-white w-[460px] p-10">
        <div className="text1 border-b border-b-lorem flex items-center justify-center relative">
          <h2 className=" p-2 text-lg mb-3">
            {couponId ? "Edit Coupon" : "Create New Coupon"}
          </h2>
          <IoMdClose
            className="text-2xl absolute right-0 top-2 cursor-pointer"
            onClick={handleClose}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="block mb-2" htmlFor="couponCode">
              Coupon Code
            </label>
            <input
              type="text"
              id="couponCode"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2" htmlFor="usageLimit">
              Usage Limit
            </label>
            <input
              type="number"
              id="usageLimit"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              value={usageLimit}
              onChange={(e) => setUsageLimit(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2" htmlFor="startDate">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2" htmlFor="endDate">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2">Coupon Type</label>
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  value="Flat Discount"
                  checked={couponType === "Flat Discount"}
                  onChange={handleCouponTypeChange}
                />
                Flat Discount
              </label>
              <label>
                <input
                  type="radio"
                  value="Percentage"
                  checked={couponType === "Percentage"}
                  onChange={handleCouponTypeChange}
                />
                Percentage
              </label>
            </div>
          </div>
          <div className="mt-4">
            <label className="block mb-2" htmlFor="discount">
              {couponType === "Flat Discount"
                ? "Discount Amount"
                : "Discount Percentage"}
            </label>
            <input
              type="number"
              id="discount"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              value={discount}
              placeholder={
                couponType === "Flat Discount"
                  ? "Enter discount amount"
                  : "Enter discount percentage"
              }
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              value={description}
              placeholder="Write description here..."
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-md"
            >
              {couponId ? "Update Coupon" : "Create Coupon"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCoupon;
