import React from 'react';
import {InquiryStatusRoutes} from './InquiryStatus';
import CmsLayout from './CmsLayout';

const Forms = React.lazy(() => import('../views/Base/Forms'));
const Dashboard = React.lazy(() => import('../views/Dashboard'));

const routes = [
  { path: '/cms', exact: true, name: 'Home', component: CmsLayout },
  { path: '/cms/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/cms/base/forms', name: 'Forms', component: Forms },
];

routes.push(...InquiryStatusRoutes)

export default routes;
