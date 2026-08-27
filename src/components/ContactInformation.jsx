export default function ContactInformation() {
  const contactItems = [
    {
      title: "Email",
      description: "For general inquiries and support",
      info: "info@haelsoftmasterclass.com"
    },
    {
      title: "Phone",
      description: "Available during business hours",
      info: "+234 7062827560"
    },
    {
      title: "Live Chat & Messaging",
      description: "Chat with our support team in real-time",
      info: "Available 24/7"
    },
    {
      title: "Office Address",
      description: "Visit our office location",
      info: "3rd Avenue , Citiview Estate Lagos , Nigeria"
    },
    {
      title: "Follow Us",
      description: "Connect with us on social media",
      info: [
        { name: "Twitter", icon: "/twitter.svg" },
        { name: "Facebook", icon: "/facebook.svg" },
        { name: "Instagram", icon: "/instagram.svg" },
        { name: "LinkedIn", icon: "/linkedin.svg" }
      ]
    }
  ];

  return (
    <div className="w-full flex  text-start mt-10 lg:my-20">
      <div className="space-y-6 lg:space-y-8">
        {/* Contact Items */}
        {contactItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row lg:justify-between space-x-16   pb-6 lg:pb-8"
          >
            {/* Left Side - Title */}
            <div className="flex-1 lg:w-1/2">
              <h3 className="text-[20px] md:text-[24px] font-bold text-active">
                {item.title}
              </h3>
            </div>

            {/* Right Side - Description and Info */}
            <div className="flex-1 lg:w-1/2 mt-3 lg:mt-0">
              <p className="text-inactive text-[14px] md:text-[16px] mb-2">
                {item.description}
              </p>
              {Array.isArray(item.info) ? (
                <div className="flex gap-4">
                  {item.info.map((social, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="transition-opacity hover:opacity-70"
                      title={social.name}
                    >
                      <img
                        src={social.icon}
                        alt={social.name}
                        className="w-8 h-8"
                      />
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-active text-[14px] md:text-[16px] font-semibold">
                  {item.info}
                </p>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
