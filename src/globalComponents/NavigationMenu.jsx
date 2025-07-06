import { Link } from "react-router-dom";

function NavigationMenu() {
  const navList = [
    {
      id: 1,
      name: "Advanced Search",
      icon: "fa-solid fa-magnifying-glass",
      link: "/advanced-search",
    },
    {
      id: 2,
      name: "Exceptions",
      icon: "fa-solid fa-triangle-exclamation",
      link: "/exceptions",
    },
    {
      id: 3,
      name: "Barcode Generator",
      icon: "fa-solid fa-barcode",
      link: "/barcode-generator",
      subItems: {
        subitem1: [
          {
            sub1: "Reprint Barcode",
            sub2: "Reprint Location Barcodes",
          },
        ],
        subitem2: [
          {
            sub1: "Generate Barcode",
            sub2: "Generate Location Barcodes",
          },
        ],
      },
    },
    {
      id: 4,
      name: "Customer Service",
      icon: "fa-solid fa-headset",
      link: "/customer-service",
    },
    {
      id: 5,
      name: "Fleet Management",
      icon: "fa-solid fa-arrow-up-right-from-square",
      link: "/fleet-management",
    },
    {
      id: 6,
      name: "Data Entry",
      icon: "fa-solid fa-laptop",
      link: "/data-entry",
    },
    {
      id: 7,
      name: "Warehouses",
      icon: "fa-solid fa-warehouse",
      link: "/warehouses",
    },
    {
      id: 8,
      name: "Services",
      icon: "fa-solid fa-concierge-bell",
      link: "/services",
    },
    {
      id: 9,
      name: "Department",
      icon: "fa-solid fa-building",
      link: "/department",
    },
    {
      id: 10,
      name: "Invoices",
      icon: "fa-solid fa-file-invoice",
      link: "/invoices",
    },
    {
      id: 11,
      name: "Tracker",
      icon: "fa-solid fa-location-arrow",
      link: "/tracker",
    },
    {
      id: 12,
      name: "Administration",
      icon: "fa-solid fa-user-shield",
      link: "/administration",
    },
    { id: 13, name: "Setting", icon: "fa-solid fa-gear", link: "/setting" },
    { id: 14, name: "Report", icon: "fa-solid fa-chart-line", link: "/report" },
  ];

  return (
    <nav className="bg-white p-6 rounded-2xl max-w-7xl mx-auto mt-12 shadow-lg">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px  border-gray-200 rounded-xl overflow-hidden">
        {navList.map((item) => (
          <Link
            key={item.id}
            to={item.link}
            className="group flex flex-col items-center justify-center gap-2 p-5 text-center bg-white transition duration-200 hover:bg-indigo-50"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-xl transition group-hover:bg-indigo-600 group-hover:text-white shadow">
              <i className={item.icon}></i>
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-700 transition">
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default NavigationMenu;
