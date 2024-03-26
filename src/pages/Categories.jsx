import { useState, useEffect } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import { Table, Modal, Input } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [showCreateCategories, setShowCreateCategories] = useState(false);
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);

  useEffect(() => {
    async function getCategory() {
      const response = await axios.get("http://localhost:3000/categories");
      setCategories(response.data);
    }
    getCategory();
  }, [categories]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/categories/${id}`);
      // Filter out the deleted category from the current categories state
      setCategories(categories.filter((category) => category._id !== id));
      toast.success("Category deleted successfully");
    } catch (error) {
      console.log("Error deleting category:", error);
    }
  };

  const handleEdit = (id, name) => {
    setEditCategoryId(id);
    setEditedCategoryName(name);
    setEditModalVisible(true);
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:3000/categories/${editCategoryId}`, {
        name: editedCategoryName,
      });
      setEditModalVisible(false);
      toast.success("Category updated successfully");
      // Refresh categories after editing
      const response = await axios.get("http://localhost:3000/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Edit",
      render: (_, update) => (
        <button>
          <FaRegEdit onClick={() => handleEdit(update._id, update.name)} />
        </button>
      ),
    },

    {
      title: "Delete",
      render: (_, record) => (
        <button>
          {" "}
          <AiFillDelete
            onClick={() => handleDelete(record._id)}
            className="text-white text-center size-6 bg-primary rounded-full p-1"
          />
        </button>
      ),
    },
  ];

  return (
    <div className="categories-container">
      <div className={`categories ${showCreateCategories ? "blur" : ""}`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl">Categories</h2>
            <p className="text-sidebarcolor text-sm">
              Add, edit or delete a category
            </p>
          </div>
          <button
            onClick={() => setShowCreateCategories(true)}
            className="bg-primary py-1 w-48 text-categoriestextcolor rounded-md flex items-center justify-center"
          >
            <span className="text-4xl mb-1">+</span> {""}
            <span className="text-sm mx-1">Create Categories</span>
          </button>
        </div>
        <div>
          <Table columns={columns} dataSource={categories} className="mt-8" />
        </div>
      </div>

      {showCreateCategories && (
        <div className="create-categories-container">
          <div className="create-categories">
            <CreateCategories onClose={() => setShowCreateCategories(false)} />
          </div>
        </div>
      )}

      <Modal
        title="Edit Category"
        visible={editModalVisible}
        onOk={handleEditSubmit}
        onCancel={() => setEditModalVisible(false)}
        okButtonProps={{ className: "text-black border-lorem" }}
        cancelButtonProps={{ className: "text-secondary" }}
      >
        <Input
          value={editedCategoryName}
          onChange={(e) => setEditedCategoryName(e.target.value)}
          placeholder="Enter category name"
        />
      </Modal>
    </div>
  );
};

const CreateCategories = ({ onClose }) => {
  const [name, setName] = useState(""); // State for category name

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Send POST request to create category
      await axios.post("http://localhost:3000/categories", { name });

      // Clear input field after successful category creation
      setName("");
      toast("Category created successfully!");
    } catch (error) {
      console.error("Error creating category:", error);
      toast("category already exists!");
    }
  };

  return (
    <div className="flex justify-center fixed w-5/6 bottom-96 h-0 items-center">
      <form className="p-14 w-96 rounded-lg relative shadow-md border-2 border-lorem">
        <IoMdClose
          className="text-2xl absolute top-2 right-2 cursor-pointer"
          onClick={onClose}
        />
        <div className="flex flex-col items-center">
          <div className="space-y-2">
            <h2 className="text-2xl">Category Name</h2>
            <input
              type="text"
              placeholder="For eg. Electronics"
              className="border-2 rounded-md p-2 w-80"
              value={name}
              onChange={(e) => setName(e.target.value)} // Update category name state onChange
            />
          </div>
          <button
            type="submit" // Specify button type as submit
            className="bg-primary w-80 p-3 rounded-md mt-10 text-categoriestextcolor"
            onClick={handleSubmit}
          >
            Create Category
          </button>
          <button className="text-secondary w-80 p-3 rounded-md mt-4 border-2 border-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Categories;
