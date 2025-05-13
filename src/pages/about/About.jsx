import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import NavbarLanding from "../../layouts/Navbar/NavbarLanding";
import Footer from "../../layouts/Footer/Footer";
import { Fragment } from "react";

const AboutPage = () => {
    return (
        <Fragment>
            <div className="h-screen flex flex-col text-white" style={{ background: 'linear-gradient(to bottom,#00001c, #000046)' }}>
                <NavbarLanding />

                {/* Main Content - Takes Available Space */}
                <div className="flex flex-col flex-grow items-center justify-center px-6">

                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-3xl"
                    >
                        <h1 className="text-4xl font-extrabold text-white">Who We Are</h1>
                        <p className="text-md text-gray-300 mt-2">
                            We provide an intuitive support ticketing system that streamlines customer queries efficiently.
                        </p>
                    </motion.div>

                    {/* Content Section */}
                    <div className="mt-6 grid md:grid-cols-3 gap-4 max-w-5xl w-full">

                        {/* Our Mission */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="bg-[#1E293B] shadow-lg rounded-lg p-4 text-center"
                        >
                            <h2 className="text-xl font-semibold text-blue-400">Our Mission</h2>
                            <p className="text-gray-300 text-sm mt-2">
                                Enhancing user experience by offering an intuitive, seamless, and secure platform.
                            </p>
                        </motion.div>

                        {/* Why Choose Us */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                            className="bg-[#1E293B] shadow-lg rounded-lg p-4 text-center"
                        >
                            <h2 className="text-xl font-semibold text-blue-400">Why Choose Us?</h2>
                            <p className="text-gray-300 text-sm mt-2">
                                Our system ensures efficiency, security, and an effortless experience for users.
                            </p>
                        </motion.div>

                        {/* Contact Section */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.6 }}
                            className="bg-[#1E293B] shadow-lg rounded-lg p-4 text-center"
                        >
                            <h2 className="text-xl font-semibold text-blue-400">Get in Touch</h2>
                            <p className="text-gray-300 text-sm mt-2">
                                Have questions? Reach out to us for personalized support!
                            </p>
                            <Link
                                to="/contact"
                                className="inline-block mt-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all shadow-md transform hover:scale-105"
                            >
                                Contact Us
                            </Link>
                        </motion.div>

                    </div>
                </div>

                {/* Footer - Stays at the Bottom */}
                <Footer />
            </div>
        </Fragment>
    );
};

export default AboutPage;
