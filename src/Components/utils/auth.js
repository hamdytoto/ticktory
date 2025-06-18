export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const getUserDetails = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const getMyServiceId = () => {
  return getUserDetails()?.manager.service_id || 0;
};

export const getUserType = () => {
  return getUserDetails()?.type;
};
