import React from "react";

const InquiryStatusListPage = React.lazy(() =>
  import("./StatusList/StatusListPage")
);

const InquiryStatusCreatePage = React.lazy(() =>
  import("./CreateStatus/CreateStatusPage")
);

const InquiryStatusEditPage = React.lazy(() =>
  import("./EditStatus/EditStatusPage")
);

const routes = [  
  {
    path: "/cms/inquiry-status",
    exact: true,
    name: "Inquiry Status List",
    component: InquiryStatusListPage
  },
  {
    path: "/cms/inquiry-status/create",
    name: "Create Inquiry Status",
    component: InquiryStatusCreatePage
  },
  {
    path: "/cms/inquiry-status/edit/:id",
    name: "Edit Inquiry Status",
    component: InquiryStatusEditPage
  }
];

export { routes as InquiryStatusRoutes };
