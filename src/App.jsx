import Navbar from "./adminDashboard/Navbar";
import Home from "./adminDashboard/Home";
import Sidebar from "./adminDashboard/Sidebar";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <div className="grid-container">
      <Toaster />
      <Navbar />
      <Sidebar />
      <Home />
    </div>
  );
};

export default App;
