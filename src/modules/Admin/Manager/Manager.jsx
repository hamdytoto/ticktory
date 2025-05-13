import { useState } from "react";
import ManagerActions from "./components/MangerAction.jsx";
import ManagerTable from "./components/MangerTable.jsx";
import AddManagerModal from "./components/AddManger.jsx";
import { ToastContainer, toast } from "react-toastify";

// API Hooks
import {
  useCreateManagerApiMutation,
  useShowAllManagersApiQuery,
} from "../../../redux/feature/admin/Managers/admin.manager.apislice.js";

const Manager = () => {
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);  

  const [managerData, setManagerData] = useState({
    service_id: "", // Set this dynamically if needed
    user: {
      name: "",
      email: "",
      password: "manager123",
      password_confirmation: "manager123",
    },
  });

  const [createManager] = useCreateManagerApiMutation();
  const { refetch } = useShowAllManagersApiQuery();

  const handleAddManager = async () => {
    const { service_id, user } = managerData;
    const { name, email, password, password_confirmation } = user;

    if (!service_id || !name || !email || !password || !password_confirmation) {
      toast.warn("Please fill all the fields.");
      return;
    }

    try {
      await createManager(managerData).unwrap();
      toast.success("Manager added successfully!");
      setManagerData({
        service_id: "",
        user: {
          name: "",
          email: "",
          password: "manager1Aa",
          password_confirmation: "manager1Aa",
        },
      });
      setShowModal(false);
      refetch();
    } catch (error) {
      toast.error("Failed to add manager.");
      console.error(error);
    }
  };

  return (
    <div className="p-6 mx-auto">
      <ManagerActions
        search={search}
        setSearch={setSearch}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        setShowModal={setShowModal}
      />

      <div className={showModal ? "pointer-events-none blur-sm" : ""}>
        <ManagerTable
          search={search}
          itemsPerPage={itemsPerPage}
        />
      </div>

      <AddManagerModal
        show={showModal}
        onClose={() => setShowModal(false)}
        managerData={managerData}
        setManagerData={setManagerData}
        onAdd={handleAddManager}
      />

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Manager;
