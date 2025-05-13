import { useState } from "react";
import TechnicianAction from "./components/TechnicianAction.jsx";
import TechnicianTable from "./components/TechnicianTable.jsx";
import AddTechnicianModal from "./components/AddTechnician.jsx";
import { ToastContainer, toast } from "react-toastify";

// API Hooks
import {
  useCreateTechnicianMutation,
  useShowAllTechnicianQuery,
} from "../../../redux/feature/Manager/technician/manager.tech.apiSlice.js";

const Technician = () => {
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);

  const [technicianData, setTechnicianData] = useState({
    name: "",
    email: "",
    password: "technician123",
    password_confirmation: "technician123",
  });

  const [createTechnician] = useCreateTechnicianMutation();
  const { refetch } = useShowAllTechnicianQuery();

  const handleAddTechnician = async () => {
    const { name, email, password, password_confirmation } = technicianData;

    if (!name || !email || !password || !password_confirmation) {
      toast.warn("Please fill all the fields.");
      return;
    }

    try {
      await createTechnician(technicianData).unwrap();
      toast.success("Technician added successfully!");
      setTechnicianData({
        name: "",
        email: "",
        password: "technician1Aa",
        password_confirmation: "technician1Aa",
      });
      setShowModal(false);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to add technician.");
    }
  };

  return (
    <div className="p-6 mx-auto">
      <TechnicianAction
        search={search}
        setSearch={setSearch}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        setShowModal={setShowModal}
      />

      <div className={showModal ? "pointer-events-none blur-sm" : ""}>
        <TechnicianTable
          search={search}
          itemsPerPage={itemsPerPage}
        />
      </div>

      <AddTechnicianModal
        show={showModal}
        onClose={() => setShowModal(false)}
        technicianData={technicianData}
        setTechnicianData={setTechnicianData}
        onAdd={handleAddTechnician}
      />

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Technician;
