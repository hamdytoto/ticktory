import { servicesCards } from "./services.js";

const ServicesSection = () => {
  return (
    <section id="services" className="bg-gray-100 py-20 sm:py-28 px-4">
      <div className="container mx-auto max-w-7xl text-center px-4 sm:px-8">
        {/* Heading */}
        <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-semibold leading-tight">
          Looking For <span className="text-blue-600 font-bold">Help?</span>
        </h2>
        <p className="text-gray-600 mt-3 text-[clamp(0.9rem,2vw,1.125rem)]">
          Here’s an example of our services.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
          {servicesCards.map((item, index) => (
            <div
              key={index}
              className="bg-[#0D1B2A] text-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 text-center flex flex-col items-center"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 bg-[#102A43] flex items-center justify-center rounded-md">
                <i className={`fa-solid ${item.icon} text-3xl text-white`}></i>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg md:text-xl font-semibold mt-4">
                {item.title}
              </h3>
              <p className="mt-2 text-sm md:text-base text-gray-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
