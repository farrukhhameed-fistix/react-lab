import React from 'react';   
import DefaultLayout from '../layouts/DefaultLayout';
// sidebar nav config
import navigation from './_nav';
// routes config
import routes from './routes';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
const CmsLayout = function(props: any){
    return <DefaultLayout {...props} navigation={navigation} routes={routes} />
}

export default CmsLayout;