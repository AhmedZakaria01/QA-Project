// Documentation
/**
 * Sub Items Handled as a Drop Down List
 */

export const navList = [
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
    link: "/GenerateBarcode",
    // subItems: [
    //   { name: "Boxes", link: "/Boxes" },
    //   { name: "Files", link: "/Files" },
    //   { name: "Documents", link: "/Documents" },
    // ],
    dropDownMenus: [
      {
        label: "Generate",
        items: [
          {
            name: "Generate Barcode",
            link: "/GenerateBarcode",
            selected: true,
          },
          {
            name: "Generate Location Barcodes",
            link: "/Generate_Location_Barcodes",
          },
        ],
      },
      {
        label: "Print",
        items: [
          { name: "Reprint Barcode", link: "/Reprint_Barcode" },
          {
            name: "Reprint Location Barcodes",
            link: "/Reprint_Location_Barcodes",
          },
        ],
      },
    ],
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
    link: "/Boxes",
    subItems: [
      { name: "Boxes", link: "/Boxes" },
      { name: "Files", link: "/Files" },
      { name: "Documents", link: "/Documents" },
    ],
    // dropDownMenus: [
    //   {
    //     label: "Generate",
    //     items: [
    //       {
    //         name: "Generate Barcode",
    //         link: "/GenerateBarcode",
    //         selected: true,
    //       },
    //       {
    //         name: "Generate Location Barcodes",
    //         link: "/Generate_Location_Barcodes",
    //       },
    //     ],
    //   },
    //   {
    //     label: "Print",
    //     items: [
    //       { name: "Reprint Barcode", link: "/Reprint_Barcode" },
    //       {
    //         name: "Reprint Location Barcodes",
    //         link: "/Reprint_Location_Barcodes",
    //       },
    //     ],
    //   },
    // ],
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
