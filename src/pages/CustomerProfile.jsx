import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Input, message } from "antd";
import { IoMdClose } from "react-icons/io";

const CustomerProfilePage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [masterPassword, setMasterPassword] = useState("");
  const [confirmMasterPassword, setConfirmMasterPassword] = useState("");
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [isSettingMasterPassword, setIsSettingMasterPassword] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [forgetPasswordForm, setForgetPasswordForm] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);

  useEffect(() => {
    // Fetch customers from API
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/users");
        setCustomers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    if (authenticated) {
      fetchCustomers();
    }
  }, [authenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send master password to the backend for authentication
      const response = await axios.post(
        "http://localhost:3000/masterpasswords/login",
        {
          password: masterPassword,
        }
      );

      if (response.data.authenticated) {
        setAuthenticated(true);
        setShowLoginForm(false);
        setMasterPassword("");
      } else {
        message.error("Incorrect master password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      message.error("Failed to login");
    }
  };

  const handleSetMasterPassword = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (masterPassword !== confirmMasterPassword) {
      message.error("Passwords do not match");
      return;
    }

    try {
      // Send master password and recovery email to the backend to be stored securely
      // Replace the URL with your backend endpoint
      await axios.post("http://localhost:3000/masterpasswords", {
        password: masterPassword,
        recoveryEmail: recoveryEmail,
      });
      message.success("Master password set successfully");
      setIsSettingMasterPassword(false);

      setMasterPassword("");
      setConfirmMasterPassword("");
      setRecoveryEmail("");
    } catch (error) {
      console.error("Error setting master password:", error);
      message.error("Failed to set master password");
    }
  };

  const handleResetMasterPassword = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (masterPassword !== confirmMasterPassword) {
      message.error("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:3000/masterpasswords", {
        password: masterPassword,
        recoveryEmail: recoveryEmail,
      });
      message.success("Master password set successfully");
      setIsSettingMasterPassword(false);

      setMasterPassword("");
      setConfirmMasterPassword("");
      setRecoveryEmail("");
    } catch (error) {
      console.error("Error setting master password:", error);
      message.error("Failed to set master password");
    }
  };

  const handleForgotPassword = async () => {
    setForgetPasswordForm(true);
  };

  const handleSendOTP = async () => {
    try {
      // Send recovery email to the backend to generate and send OTP
      await axios.post("http://localhost:3000/users/generateotp", {
        email: recoveryEmail,
      });
      message.success("OTP sent to your email");
      setOtpSent(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
      message.error("Failed to send OTP");
    }
  };

  const handleResendCode = async () => {
    try {
      // Send recovery email to the backend to generate and send OTP
      await axios.post("http://localhost:3000/users/generateotp", {
        email: recoveryEmail,
      });
      message.success("OTP sent to your email");
      setOtpSent(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
      message.error("Failed to send OTP");
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      setVerifyingOtp(true);

      const response = await axios.post(
        "http://localhost:3000/users/verifyotp",
        {
          email: recoveryEmail,
          otp: otp,
        }
      );

      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.success) {
          // OTP verification successful
          message.success(responseData.message || "OTP verified successfully");
          setShowResetForm(true); // Assuming you have a state variable to control the visibility of the reset form
        } else {
          // OTP verification failed
          message.error(responseData.message || "Failed to verify OTP");
        }
      } else {
        // Handle non-200 response status
        message.error("Failed to verify OTP. Server error.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      message.error("Failed to verify OTP. Please try again later.");
    } finally {
      setVerifyingOtp(false);
    }
  };

  const maskEmail = (email) => {
    const atIndex = email.indexOf("@");
    const visiblePart = email.slice(0, 3);
    const maskedPart = email.slice(3, atIndex).replace(/./g, "*");
    const domainPart = email.slice(atIndex);
    return visiblePart + maskedPart + domainPart;
  };

  const handleBackToLogin = () => {
    setForgetPasswordForm(false);
    setOtpSent(false);
  };

  const backtologin = () => {
    setIsSettingMasterPassword(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      className: "text-sm", // Decrease the size of title to sm (small)
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      className: "text-sm", // Decrease the size of title to sm (small)
    },
    {
      title: "Name",
      dataIndex: ["name", "firstname"],
      key: "name",
      className: "text-sm", // Decrease the size of title to sm (small)
      render: (firstname, record) => `${firstname} ${record.name.lastname}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      className: "text-sm", // Decrease the size of title to sm (small)
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      className: "text-sm", // Decrease the size of title to sm (small)
    },
    {
      title: "Address",
      children: [
        {
          title: "Street",
          dataIndex: ["address", "street"],
          key: "street",
          className: "text-sm", // Decrease the size of title to sm (small)
        },
        {
          title: "City",
          dataIndex: ["address", "city"],
          key: "city",
          className: "text-sm", // Decrease the size of title to sm (small)
        },
        {
          title: "Zipcode",
          dataIndex: ["address", "zipcode"],
          key: "zipcode",
          className: "text-sm", // Decrease the size of title to sm (small)
        },
        {
          title: "Geolocation",
          children: [
            {
              title: "Latitude",
              dataIndex: ["address", "geolocation", "lat"],
              key: "latitude",
              className: "text-sm", // Decrease the size of title to sm (small)
            },
            {
              title: "Longitude",
              dataIndex: ["address", "geolocation", "long"],
              key: "longitude",
              className: "text-sm", // Decrease the size of title to sm (small)
            },
          ],
        },
      ],
    },
  ];

  const customerProfileSection = (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl mb-4">Customer Profiles</h1>
        <Button
          onClick={() => setIsSettingMasterPassword(true)}
          style={{
            marginBottom: "1rem",
          }}
        >
          Set Master Password
        </Button>
      </div>

      {showLoginForm && (
        <div className="relative">
          <form
            className="absolute left-96 top-32 w-96 p-4 flex flex-col
          justify-center space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-center">
              <h2 className=" mb-4 font-semibold">
                Login{" "}
                <IoMdClose
                  className="absolute right-2 top-5 text-lg cursor-pointer
            "
                />
              </h2>
            </div>
            <label htmlFor="masterPassword">Enter Master Password:</label>
            <Input.Password
              id="masterPassword"
              placeholder="Enter master password"
              value={masterPassword}
              onChange={(e) => setMasterPassword(e.target.value)}
              style={{ height: "40px" }}
            />
            <Button
              type="submit"
              onClick={handleLogin}
              className="bg-primary text-white h-10"
            >
              Login
            </Button>
            <Button
              onClick={handleForgotPassword}
              className="outline-none border-none text-primary font-bold"
            >
              Forgot Password?
            </Button>
          </form>
        </div>
      )}

      {authenticated && (
        <div>
          <Table
            columns={columns}
            dataSource={customers}
            loading={loading}
            rowKey="id"
            bordered
          />
        </div>
      )}
    </div>
  );

  const forgetPasswordSection = (
    <div className="forgot-password-form flex justify-center relative top-40">
      {!otpSent ? (
        <form className="w-96 p-4 flex flex-col justify-center space-y-4 shadow-2xl">
          <div className="flex items-center justify-center relative">
            <h2 className="mb-4 font-semibold flex items-center ">
              Forgot Password{" "}
              <IoMdClose
                onClick={handleBackToLogin}
                className="absolute right-0  text-lg cursor-pointer"
              />
            </h2>
          </div>
          <label htmlFor="recoveryEmail">Enter Recovery Email:</label>
          <Input
            id="recoveryEmail"
            placeholder="Enter recovery email"
            value={recoveryEmail}
            onChange={(e) => setRecoveryEmail(e.target.value)}
            style={{ height: "40px" }}
          />
          <Button
            type="primary"
            onClick={handleSendOTP}
            className="bg-primary text-white h-10 "
          >
            Next
          </Button>
        </form>
      ) : (
        ""
      )}
    </div>
  );

  const otpVerificationSection = (
    <div className="otp-verification-form">
      <h2>
        We’ve sent a 5-digit OTP code to your email address:{" "}
        <span className="font-bold">{maskEmail(recoveryEmail)}</span>
      </h2>
      <form>
        <Input
          type="number"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <Button
          className="mt-4"
          loading={verifyingOtp}
          htmlType="submit"
          onClick={handleVerifyOTP}
        >
          Verify OTP
        </Button>
        <Button type="link" onClick={handleResendCode} className="mt-2">
          Resend Code
        </Button>
      </form>
    </div>
  );

  const setMasterPasswordForm = (
    <div className="absolute inset-0 flex justify-center items-start bg-gray-800 bg-opacity-75 z-10">
      <form
        onSubmit={handleSetMasterPassword}
        className="bg-white p-8  w-96 rounded-lg shadow-lg"
      >
        <h2 className="flex items-center justify-center relative mb-4 border-b p-2">
          Set Master Password{" "}
          <IoMdClose
            className="absolute right-0  text-lg cursor-pointer"
            onClick={backtologin}
          />
        </h2>

        <label htmlFor="masterPassword" className="block mb-2">
          Enter master password
        </label>
        <Input.Password
          id="masterPassword"
          placeholder="Enter master password"
          value={masterPassword}
          onChange={(e) => setMasterPassword(e.target.value)}
          className=" w-full mb-4 p-2  "
        />
        <label htmlFor="confirmMasterPassword" className="block mb-2">
          Confirm master password
        </label>
        <Input.Password
          id="confirmMasterPassword"
          placeholder="Confirm master password"
          value={confirmMasterPassword}
          onChange={(e) => setConfirmMasterPassword(e.target.value)}
          className=" w-full mb-4 p-2 "
        />
        <label htmlFor="recoveryEmail" className="block mb-2">
          Enter recovery email
        </label>
        <Input
          id="recoveryEmail"
          placeholder="Enter recovery email"
          value={recoveryEmail}
          onChange={(e) => setRecoveryEmail(e.target.value)}
          className=" w-full mb-4 p-2"
        />

        <button className="bg-primary text-white font-bold p-2 rounded-md w-full">
          Create
        </button>
      </form>
    </div>
  );

  const resetPasswordForm = (
    <div className="absolute inset-0 flex justify-center items-start bg-gray-800 bg-opacity-75 z-10">
      <form
        onSubmit={handleResetMasterPassword}
        className="bg-white p-8  w-96 rounded-lg shadow-lg"
      >
        <h2 className="flex items-center justify-center relative mb-4 border-b p-2">
          Set Master Password{" "}
          <IoMdClose
            className="absolute right-0  text-lg cursor-pointer"
            onClick={backtologin}
          />
        </h2>

        <label htmlFor="masterPassword" className="block mb-2">
          Enter new master password
        </label>
        <Input.Password
          id="masterPassword"
          placeholder="Enter master password"
          value={masterPassword}
          onChange={(e) => setMasterPassword(e.target.value)}
          className=" w-full mb-4 p-2  "
        />
        <label htmlFor="confirmMasterPassword" className="block mb-2">
          Confirm new master password
        </label>
        <Input.Password
          id="confirmMasterPassword"
          placeholder="Confirm master password"
          value={confirmMasterPassword}
          onChange={(e) => setConfirmMasterPassword(e.target.value)}
          className=" w-full mb-4 p-2 "
        />
        <label htmlFor="recoveryEmail" className="block mb-2">
          Enter your new recovery email (optional)
        </label>
        <Input
          id="recoveryEmail"
          placeholder="Enter recovery email"
          value={recoveryEmail}
          onChange={(e) => setRecoveryEmail(e.target.value)}
          className=" w-full mb-4 p-2"
          optional={true}
        />

        <button className="bg-primary text-white font-bold p-2 rounded-md w-full">
          Reset
        </button>
      </form>
    </div>
  );

  return (
    <div className="relative">
      {isSettingMasterPassword
        ? setMasterPasswordForm
        : forgetPasswordForm
        ? otpSent
          ? otpVerificationSection
          : forgetPasswordSection
        : showResetForm
        ? resetPasswordForm
        : customerProfileSection}
    </div>
  );
};

export default CustomerProfilePage;
