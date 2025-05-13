import { servicesCards } from "./services.js"
const ServicesSection = () => {
    return (
        <>
            {/* Services section */}
            <div className="pt-40 sm:pt-72 bg-gray-100 px-4" >
                <div className="container mx-auto px-10 text-center"id="services">
                    <h2 className="text-2xl md:text-3xl font-semibold mt-12">
                        Looking For <span className="text-blue-600 font-bold">Help?</span>
                    </h2>
                    <p className="text-gray-600 mt-2 text-sm md:text-base">
                        Here’s an example of our services.
                    </p>

                    {/* Service cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12 py-8" >
                        {servicesCards.map((item, index) => (
                            <div
                                key={index}
                                className="bg-[#0D1B2A] text-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center"
                            >
                                {/* Hexagonal Background for Icons */}
                                <div className="flex justify-center">
                                    <div className="w-16 h-16 bg-[#102A43] flex items-center justify-center rounded-md">
                                        <i className={`fa-solid ${item.icon} text-3xl text-white`}></i>
                                    </div>
                                </div>

                                <h3 className="text-lg md:text-xl font-semibold mt-4">{item.title}</h3>
                                <p className="mt-2 text-sm md:text-base text-gray-300">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}

export default ServicesSection
