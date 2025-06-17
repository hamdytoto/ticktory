import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
// import { useParams, useNavigate } from "react-router-dom";
import ServiceActions from "./ServiceAction.jsx";
import ServiceTable from "./ServiceTable.jsx";
import AddServiceModal from "./AddService.jsx";
import {
  useCreateServiceApiMutation,
  useShowAllServicesApiQuery,
} from "../../../redux/feature/admin/Services/admin.service.apislice.js";
import { ToastContainer, toast } from "react-toastify";
import Section from "./sections/Section.jsx";
import { useApiCallback } from "../../../Components/utils/validation.js";

const Service = () => {
  const { t } = useTranslation();
  const { serviceId } = useParams();
  // const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [createService] = useCreateServiceApiMutation();
  const { refetch } = useShowAllServicesApiQuery();
  const { handleApiCallback } = useApiCallback();
  const handleAddService = async () => {
    if (!serviceName.trim()) {
      toast.warn(t("service.name_empty_warning"));
      return;
    }

    await handleApiCallback(async () => {
      await createService({ name: serviceName }).unwrap();
      toast.success(t("service.add_success"));
      setServiceName("");
      setShowModal(false);
      refetch();
    }, 'AddService');
  };

  if (serviceId) {
    return <Section />;
  }

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

