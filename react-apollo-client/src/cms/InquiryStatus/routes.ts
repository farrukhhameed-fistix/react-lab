import React from "react";

const InquiryStatusListPage = React.lazy(() =>
  import("./StatusList/StatusListPage")
);

// const InquiryStatusCreatePage = React.lazy(() =>
//   import("./CreateStatus/CreateStatusPage")
// );

// const InquiryStatusEditPage = React.lazy(() =>
//   import("./EditStatus/EditStatusPage")
// );

const routes = [
  {
    path: "/cms/settings",
    exact: true,
    name: "Setting",
    component: InquiryStatusListPage
  },
  {
    path: "/cms/settings/inquiry-status",
    exact: true,
    name: "Inquiry Status List",
    component: InquiryStatusListPage
  }
  // {
  //   path: "/cms/settings/inquiry-status/create",
  //   name: "Create Inquiry Status",
  //   component: InquiryStatusCreatePage
  // },
  // {
  //   path: "/cms/settings/inquiry-status/edit/:id",
  //   name: "Edit Inquiry Status",
  //   component: InquiryStatusEditPage
  // }
];

export { routes as InquiryStatusRoutes };
