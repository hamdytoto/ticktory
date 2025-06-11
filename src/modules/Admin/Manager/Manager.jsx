import { useState } from "react";
import ManagerActions from "./components/MangerAction.jsx";
import ManagerTable from "./components/MangerTable.jsx";
import AddManagerModal from "./components/AddManger.jsx";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";

// API Hooks
import {
  useCreateManagerApiMutation,
  useShowAllManagersApiQuery,
} from "../../../redux/feature/admin/Managers/admin.manager.apislice.js";

const Manager = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const [managerData, setManagerData] = useState({
    automatic_assignment:false,
    service_id: "",
    user: {
      name: "",
      email: "",
      password: "manager123",
      password_confirmation: "manager123",
    },
  });

  const [createManager] = useCreateManagerApiMutation();
  const { refetch } = useShowAllManagersApiQuery({
    per_page: itemsPerPage,
    page: currentPage,
    handle: search,
  });

  // Handle search change and reset page to 1
  const handleSearchChange = (newSearch) => {
    setSearch(newSearch);
    setCurrentPage(1);
  };

  // Handle items per page change and reset page to 1
  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleAddManager = async () => {
    const { service_id, user } = managerData;
    const { name, email, password, password_confirmation } = user;

    if (!service_id || !name || !email || !password || !password_confirmation) {
      toast.warn(t("manager.toast.fillAllFields", "Please fill all the fields."));
      return;
    }

    try {
      await createManager(managerData).unwrap();
      toast.success(t("manager.toast.addSuccess", "Manager added successfully!"));
      setManagerData({
        service_id: "",
        user: {
          name: "",
          email: "",
          password: "manager123",
          password_confirmation: "manager123",
        },
      });
      setShowModal(false);
      refetch();
    } catch (error) {
      toast.error(t("manager.toast.addFail", "Failed to add manager."));
      console.error(error);
    }
  };

  return (
    <div className="p-6 mx-auto">
      <ManagerActions
        search={search}
        setSearch={handleSearchChange}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={handleItemsPerPageChange}
        setShowModal={setShowModal}
      />

      <div className={showModal ? "pointer-events-none blur-sm" : ""}>
        <ManagerTable
          search={search}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
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