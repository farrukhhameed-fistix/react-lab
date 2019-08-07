import React from 'react';
import {InquiryStatusRoutes} from './InquiryStatus';
import CmsLayout from './CmsLayout';

const routes = [
  { path: '/cms', exact: true, name: 'Home', component: CmsLayout },  
];

routes.push(...InquiryStatusRoutes)

export default routes;
