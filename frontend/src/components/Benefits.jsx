import { FiTruck, FiShield, FiRefreshCcw, FiHeadphones } from "react-icons/fi";

const Benefits = () => {
  const features = [
    {
      icon: <FiTruck />,
      title: "Free & Fast Delivery",
      description:
        "Enjoy fast and reliable delivery on all orders with no extra shipping charges.",
    },
    {
      icon: <FiShield />,
      title: "Secure Payment",
      description:
        "Your payment information is protected with safe and secure payment methods.",
    },
    {
      icon: <FiRefreshCcw />,
      title: "Easy Returns",
      description:
        "Not satisfied with your purchase? Enjoy our simple and hassle-free return policy.",
    },
    {
      icon: <FiHeadphones />,
      title: "24/7 Support",
      description:
        "Our friendly customer support team is always here to help you.",
    },
  ];

  return (
    <section className="bg-gray-50 pt-5 pb-15">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
            Why Shop With Us
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything You Need for a
            <span className="text-indigo-600"> Better Shopping Experience</span>
          </h2>

          <p className="mt-4 text-gray-600">
            We make online shopping simple, secure, and convenient for you.
          </p>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-gray-200 bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
            >
              {/* Icon */}
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-2xl text-indigo-600 transition duration-300 group-hover:bg-indigo-600 group-hover:text-white">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="mt-6 text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-6 text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
