import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
const AnimatedText = () => {
    const { t } = useTranslation();
    const [textIndex, setTextIndex] = useState(0);
    const words = [t("landing.animatedText1"), t("landing.animatedText2")];

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <AnimatePresence mode="wait">
                <motion.span
                    key={textIndex}
                    className="text-cyan-400 font-bold  "
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    {"  "}{words[textIndex]}
                </motion.span>
            </AnimatePresence>
        </>
    )
}

export default AnimatedText
