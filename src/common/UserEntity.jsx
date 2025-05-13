/* eslint-disable react/prop-types */
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const UserEntity = ({
  entityName = "User",
  defaultPassword = "user1Aa",
  ActionComponent,
  TableComponent,
  ModalComponent,
  useCreateEntityMutation,
  useShowAllEntitiesQuery,
}) => {
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);

  const [entityData, setEntityData] = useState({
    service_id: "",
    user: {
      name: "",
      email: "",
      password: defaultPassword,
      password_confirmation: defaultPassword,
    },
  });

  const [createEntity] = useCreateEntityMutation();
  const { refetch } = useShowAllEntitiesQuery();

  const handleAddEntity = async () => {
    const { service_id, user } = entityData;
    const { name, email, password, password_confirmation } = user;

    if (!service_id || !name || !email || !password || !password_confirmation) {
      toast.warn(`Please fill all the fields.`);
      return;
    }

    try {
      await createEntity(entityData).unwrap();
      toast.success(`${entityName} added successfully!`);
      setEntityData({
        service_id: "",
        user: {
          name: "",
          email: "",
          password: defaultPassword,
          password_confirmation: defaultPassword,
        },
      });
      setShowModal(false);
      refetch();
    } catch (error) {
      toast.error(`Failed to add ${entityName.toLowerCase()}.`);
      console.error(error);
    }
  };

  return (
    <div className="p-6 mx-auto">
      <ActionComponent
        search={search}
        setSearch={setSearch}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        setShowModal={setShowModal}
      />

      <div className={showModal ? "pointer-events-none blur-sm" : ""}>
        <TableComponent search={search} itemsPerPage={itemsPerPage} />
      </div>

      <ModalComponent
        show={showModal}
        onClose={() => setShowModal(false)}
        managerData={entityData}
        setManagerData={setEntityData}
        onAdd={handleAddEntity}
      />

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default UserEntity;
