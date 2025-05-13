import { useEffect, useState } from "react";
import i18n from "i18next";

export default function useDirection() {
	const [dir, setDir] = useState(i18n.language === "ar" ? "rtl" : "ltr");

	useEffect(() => {
		const updateDir = (lng) => {
			const newDir = lng === "ar" ? "rtl" : "ltr";
			setDir(newDir);
			document.documentElement.setAttribute("dir", newDir);
			document.body.setAttribute("dir", newDir);
		};

		updateDir(i18n.language); // Initial

		i18n.on("languageChanged", updateDir);
		return () => {
			i18n.off("languageChanged", updateDir);
		};
	}, []);

	return dir;
}
