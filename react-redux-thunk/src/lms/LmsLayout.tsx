import React from 'react';   
import DefaultLayout from '../containers/DefaultLayout';
// sidebar nav config
import navigation from './_nav';
// routes config
import routes from './routes';

const LmsLayout = function(props: any){
    return <DefaultLayout {...props} navigation1={navigation} routes1={routes} />
}

export default LmsLayout;