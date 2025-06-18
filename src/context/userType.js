function getUserRole(type) {
  const roles = {
    0: "admin",
    1: "user",
    2: "manager",
    3: "technician",
  };
  return roles[type] || "unknown";
}

export function getHomePageByUserType(type) {
  switch (type) {
    case 0:
      return "/dashboard";
    case "user":
      return "/dashboard";
    case "manager":
      return "/manager";
    case "technician":
      return "/technician";
    default:
      return "/dashboard";
  }
}
export default getUserRole;
