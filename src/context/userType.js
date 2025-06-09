function getUserRole(type) {
	const roles = {
		0: "admin",
		1: "user",
		2: "manager",
		3: "technician",
	};
	return roles[type] || "unknown"; 
}

export default getUserRole;
