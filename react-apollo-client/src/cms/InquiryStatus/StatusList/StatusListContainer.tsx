import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { InquiryStatusModel } from './InquiryStatusModel';
import StatusListComponent from './StatusListComponent';

import {AllStatusesComponent, useAllStatusesQuery, AllStatusesDocument, AllStatusesQuery} from '../../../generated/graphql';


function StatusListContainerUsingHook(){
    
    let errors:string[] = [];    
    let statuses:InquiryStatusModel[] = [];

    //const { loading, error, data } = useQuery<AllStatusesQuery>(AllStatusesDocument);    
    const { data, loading, error } = useAllStatusesQuery();

    if (error) {        
        errors.push(error.message);
    }
    
    if (data && data.allStatuses){

        statuses = data.allStatuses.map(x => {
           let status = new InquiryStatusModel()
           status.id = x?.id || "";
           status.description = x?.description || "";
           status.color = x?.color || "";
           status.title = x?.title || "";
           status.orderIndex = x?.orderIndex || 0;

           return status;
        }) ;
    }

    return <StatusListComponent showLoader={loading} errors={errors} statuses={statuses} />;
}

function StatusListContainerUsingRenderProp(){    

    let errors:string[] = [];    
    let statuses:InquiryStatusModel[] = [];
    
    return <AllStatusesComponent>
         {({loading ,error, data }) => { 

            if (error) {        
                errors.push(error.message);
            }

             if (data && data.allStatuses){

                statuses = data.allStatuses.map(x => {
                let status = new InquiryStatusModel()
                status.id = x?.id || "";
                status.description = x?.description || "";
                status.color = x?.color || "";
                status.title = x?.title || "";
                status.orderIndex = x?.orderIndex || 0;

                return status;
                }) ;
            }
             return <StatusListComponent showLoader={loading} errors={errors} statuses={statuses}></StatusListComponent>
        }}
    </AllStatusesComponent>

}

const StatusListContainer = StatusListContainerUsingHook;



export default StatusListContainer;