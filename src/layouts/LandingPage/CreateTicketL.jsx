import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const CreateTicketL = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Add this handler
    const handleSubmit = () => {
        navigate("auth/login");
    };

    return (
        <>
            <div className="hidden lg:flex justify-center items-center min-h-screen -mt-25 bg-gray-100 md h-50">
                <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-4xl ">
                    <h2 className="text-2xl font-semibold text-center mb-6">
                        {t("createTicket.title")}
                    </h2>

                    {/* Input Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-600 mb-1">
                                {t("createTicket.firstName")}
                            </label>
                            <input
                                type="text"
                                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-1">
                                {t("createTicket.lastName")}
                            </label>
                            <input
                                type="text"
                                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-1">
                                {t("createTicket.email")}
                            </label>
                            <input
                                type="email"
                                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-1">
                                {t("createTicket.department")}
                            </label>
                            <select className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>{t("createTicket.selectDepartment")}</option>
                                <option>{t("createTicket.support")}</option>
                                <option>{t("createTicket.technical")}</option>
                                <option>{t("createTicket.billing")}</option>
                            </select>
                        </div>
                    </div>

                    {/* Ticket Details */}
                    <div className="mt-4">
                        <label className="block text-gray-600 mb-1">
                            {t("createTicket.details")}
                        </label>
                        <textarea
                            rows="4"
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={t("createTicket.placeholder")}
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6 text-center">
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-400 text-white px-6 py-2 rounded-md hover:bg-blue-500 transition"
                        >
                            {t("createTicket.submit")}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateTicketL;
