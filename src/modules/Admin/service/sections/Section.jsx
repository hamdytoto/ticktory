// Section.jsx (Main component)
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import SectionActions from "./SectionAction.jsx";
import SectionTable from "./SectionTable.jsx";
import AddSectionModal from "./AddSection.jsx";
import {
    useCreateSectionMutation,
    useShowAllSectionsQuery,
} from "../../../../redux/feature/admin/Services/Sections/service.section.apislice.js";
import { ToastContainer, toast } from "react-toastify";

const Section = () => {
    const { t } = useTranslation();
    const { serviceId } = useParams();
    
    const [search, setSearch] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [showModal, setShowModal] = useState(false);
    const [sectionName, setSectionName] = useState("");
    
    const [createSection] = useCreateSectionMutation();
    const { refetch } = useShowAllSectionsQuery(serviceId);

    const handleAddSection = async () => {
        if (!sectionName.trim()) {
            toast.warn(t("section.name_empty_warning"));
            return;
        }
        try {
            await createSection({ 
                body: { name: sectionName },
                serviceId: serviceId 
            }).unwrap();
            toast.success(t("section.add_success"));
            setSectionName("");
            setShowModal(false);
            refetch();
        } catch (error) {
            toast.error(t("section.add_error"));
            console.error(error);
        }
    };

    return (
        <div className="relative p-6 mx-auto">
            <SectionActions
                search={search}
                setSearch={setSearch}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                setShowModal={setShowModal}
            />
            <div className={showModal ? "pointer-events-none blur-sm" : ""}>
                <SectionTable search={search} itemsPerPage={itemsPerPage} />
            </div>
            <AddSectionModal
                show={showModal}
                onClose={() => setShowModal(false)}
                sectionName={sectionName}
                setSectionName={setSectionName}
                onAdd={handleAddSection}
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

export default Section;