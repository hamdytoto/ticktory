import { useState } from "react";
import { useTranslation } from "react-i18next";
import ServiceActions from "./ServiceAction.jsx";
import ServiceTable from "./ServiceTable.jsx";
import AddServiceModal from "./AddService.jsx";
import {
  useCreateServiceApiMutation,
  useShowAllServicesApiQuery,
} from "../../../redux/feature/admin/Services/admin.service.apislice.js";
import { ToastContainer, toast } from "react-toastify";

const Service = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [createService] = useCreateServiceApiMutation();
  const { refetch } = useShowAllServicesApiQuery();

  const handleAddService = async () => {
    if (!serviceName.trim()) {
      toast.warn(t("service.name_empty_warning"));
      return;
    }

    try {
      await createService({ name: serviceName }).unwrap();
      toast.success(t("service.add_success"));
      setServiceName("");
      setShowModal(false);
      refetch();
    } catch (error) {
      toast.error(t("service.add_error"));
      console.error(error);
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