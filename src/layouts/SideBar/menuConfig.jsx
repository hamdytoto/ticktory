import DashboardIcon from "@mui/icons-material/Dashboard";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { ChatBubble, Settings } from "@mui/icons-material";
// Sidebar Menu Configuration
export const menuConfig = {
  admin: [
    { id: "dashboard", icon: <DashboardIcon />, labelKey: "menu.dashboard" },
    { id: "tickets", icon: <ConfirmationNumberIcon />, labelKey: "menu.allTickets" },
    { id: "manager", icon: <ManageAccountsIcon />, labelKey: "menu.addManager" },
    { id: "service", icon: <RadioButtonCheckedIcon />, labelKey: "menu.addService" },
  ],
  user: [
    { id: "dashboard", icon: <DashboardIcon />, labelKey: "menu.dashboard" },
    { id: "tickets", icon: <ConfirmationNumberIcon />, labelKey: "menu.myTickets" },
  ],
  manager: [
    { id: "dashboard", icon: <DashboardIcon />, labelKey: "menu.dashboard" },
    { id: "tickets", icon: <ConfirmationNumberIcon />, labelKey: "menu.manageTickets" },
    { id: "technician", icon: <ManageAccountsIcon />, labelKey: "menu.addTechnician" },
    { id: "settings", icon: <Settings />, labelKey: "menu.settings" },
  ],
  technician: [
    { id: "dashboard", icon: <DashboardIcon />, labelKey: "menu.dashboard" },
    { id: "tickets", icon: <ConfirmationNumberIcon />, labelKey: "menu.assignedTickets" },
  ],
};


