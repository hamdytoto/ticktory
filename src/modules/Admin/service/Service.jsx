import { useState } from "react";
import ServiceActions from "./ServiceAction.jsx";
import ServiceTable from "./ServiceTable.jsx";
import AddServiceModal from "./AddService.jsx";
import { useCreateServiceApiMutation, useShowAllServicesApiQuery } from "../../../redux/feature/admin/Services/admin.service.apislice.js";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const Service = () => {
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [createService] = useCreateServiceApiMutation();
  const { refetch } = useShowAllServicesApiQuery();

  const handleAddService = async () => {
    if (!serviceName.trim()) {
      toast.warn("Service name cannot be empty");
      return;
    }

    try {
      const response = await createService({ name: serviceName }).unwrap();
      console.log("Service created:", response);
      toast.success("Service added successfully!");
      setServiceName("");
      setShowModal(false);
      refetch();
    } catch (error) {
      console.error("Failed to create service:", error);
      toast.error("Failed to add service. Please try again.");
    }
  };

  return (
    <div className="relative p-6 mx-auto">
      <ServiceActions
        search={search}
        setSearch={setSearch}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        setShowModal={setShowModal}
      />
      <div className={showModal ? "pointer-events-none blur-sm" : ""}>
        <ServiceTable search={search} itemsPerPage={itemsPerPage} />
      </div>

      <AddServiceModal
        show={showModal}
        onClose={() => setShowModal(false)}
        serviceName={serviceName}
        setServiceName={setServiceName}
        onAdd={handleAddService}
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="light"
      />
    </div>
  );
};

export default Service;
