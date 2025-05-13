import AdminDash from "../../Components/Dashboard/AdminDashBoard";
import TechniDash from "../../Components/Dashboard/TechniDash";
import MangerDash from "../../Components/Dashboard/MangerDash";
import UserDash from "../../Components/Dashboard/UserDash";
import UserTickets from "../../modules/User/Tickets/UserTickets";
import AdminTickets from "../../modules/Admin/ticket/AdminTickets";
import ManagerTickets from "../../modules/Manager/Tickets/ManagerTickets";
import TechniTickets from "../../modules/Technician/Tickets/TechnicianTickets";
import Manager from "../../modules/Admin/Manager/Manager";
import Service from "../../modules/Admin/service/Service";
import ChatUI from "../../modules/Chat/ChatUi";
import Profile from "../../Components/Profile/Profile";
import Technician from "../../modules/Manager/Technician/Technician";

export const dashboardContent = {
    admin: { dashboard: <AdminDash />, tickets: <AdminTickets />, manager: <Manager />, service: <Service />, profile: <Profile /> },
    user: { dashboard: <UserDash />, tickets: <UserTickets />, chat: <ChatUI />, profile: <Profile /> },
    manager: { dashboard: <MangerDash />, tickets: <ManagerTickets />, technician: <Technician />, chat: <ChatUI />, profile: <Profile /> },
    technician: { dashboard: <TechniDash />, tickets: <TechniTickets />, chat: <ChatUI />, profile: <Profile /> },
};