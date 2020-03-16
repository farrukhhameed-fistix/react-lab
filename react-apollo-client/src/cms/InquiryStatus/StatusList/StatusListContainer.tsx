import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { InquiryStatusModel } from './InquiryStatusModel';
import StatusListComponent from './StatusListComponent';
import { GET_ALL_STATUSES } from './graphql';


interface AllStatusData {
    allStatuses: InquiryStatusModel[];
}


function StatusListContainer(){
    
    let errors:string[] = [];
    let statuses:InquiryStatusModel[] = [];
    
    const { loading, error, data } = useQuery<AllStatusData>(GET_ALL_STATUSES);    

    if (error) {        
        errors.push(error.message);
    }
    
    if (data && data.allStatuses){
        statuses = data.allStatuses;
    }

    return <StatusListComponent showLoader={loading} errors={errors} statuses={statuses} />;
}

export default StatusListContainer;