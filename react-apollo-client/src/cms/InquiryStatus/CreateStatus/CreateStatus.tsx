import React, { useState, useEffect } from "react";
import EditableStatusForm from "../Shared/EditableStatusForm";
import { StatusViewModel } from "../Shared/StatusViewModel";

import IApiCallState from "../Shared/ApiCallState";
import { toast } from "react-toastify";
import {CreateStatusComponent, useCreateStatusMutation, CreateStatusMutation, CreateStatusDocument, AllStatusesDocument, AllStatusesQuery, useFilterStatusesQuery, useFilterStatusesLazyQuery} from '../../../generated/graphql';
import { useMutation } from "@apollo/react-hooks";
import random from 'random';
import { GraphQLError } from "graphql/error/GraphQLError";

const CreateStatus:React.FC = () => {

  let toastId:any = null;
  let statusVM = new StatusViewModel();
  statusVM.color = "#a2744c";

  const [statusModel, setStatusModel] = useState(statusVM);  
  //const [verifyTitleApiCallStatus, setVerifyTitleApiCallStatus] = useState({});
  const [formReadonly, setFormReadonly] = useState(false);  
  const [isRequestSucceed, setIsRequestSucceed] = useState<boolean>();  
  const [isVerifyTitleRequestSucceed, setIsVerifyTitleRequestSucceed] = useState<boolean>();  
  const [verifyTitleRequestMessage, setVerifyTitleRequestMessage] = useState<string>();

  
  const [addStatus, { loading: mutationLoading, error: mutationError }] = useCreateStatusMutation({ 
    update(cache, { data }){    
      if(data){
        const cacheData = cache.readQuery<AllStatusesQuery>({ query: AllStatusesDocument });                  
        if(cacheData && cacheData.allStatuses){
          
          cacheData.allStatuses.push(data.createStatus);

          cache.writeQuery({
            query: AllStatusesDocument,
            data: cacheData,
          });
        }
      }
    }  
  });

  const [filterTheStatuses, {loading: filterStatusQueryLoading, error: filterStatusQueryError, data: filterStatusesQueryData }] = useFilterStatusesLazyQuery();

  useEffect(()=>{
    let messages = "";                                                        
    if (filterStatusQueryError && filterStatusQueryError.graphQLErrors) {        
      filterStatusQueryError.graphQLErrors.forEach((err:GraphQLError) => {
          messages = messages + err.message;
      });
    }
    setVerifyTitleRequestMessage(messages);
    if (!filterStatusQueryLoading && (!messages || messages.length < 1)){
      setIsVerifyTitleRequestSucceed(true);
    }

  },[filterStatusQueryError]);

  useEffect(()=>{
    let messages = undefined                                                        
    if (!filterStatusQueryLoading && !filterStatusQueryError &&  filterStatusesQueryData && filterStatusesQueryData.allStatuses && filterStatusesQueryData.allStatuses.length >= 1){
      messages = 'Status with same title already exist';
    }else{
      messages = undefined;
    } 
    setVerifyTitleRequestMessage(messages);
  },[filterStatusesQueryData]);
  
    
  const verifyUniqueTitle = (title: string) => {

    filterTheStatuses({ variables: { filter: { title: title} }});
  }

  const saveInquiryStatus = async(statusModel: StatusViewModel) => {
    try {
      await addStatus({
        variables:{
          id:random.int(1,100), 
          title:statusModel.title, 
          description: statusModel.description, 
          color: statusModel.color, 
          orderIndex: 1, 
          isActive: statusModel.isActive
        }
      });

      showNotify(toastId, true, "Record saved successfully");
      setFormReadonly(true);
      setIsRequestSucceed(true);

    } catch (error) {

      let messages = "";
      if(error.graphQLErrors){
        error.graphQLErrors.forEach((err:GraphQLError) => {
          messages = messages + err.message;
        });
      }
      
      showNotify(toastId, false, messages);
      
      setFormReadonly(false);
      setIsRequestSucceed(false);
    }     

  }

  const resetForm = () => {
    statusVM = new StatusViewModel();
    statusVM.color = "#a2744c";

    setStatusModel(statusVM);          
    setFormReadonly(false);
    setIsRequestSucceed(undefined);
    setIsVerifyTitleRequestSucceed(undefined);
    setVerifyTitleRequestMessage(undefined);
  }

  let saveApiCallStatus:IApiCallState = {      
    isRequestInProgress: mutationLoading,
    isRequestSucceed: isRequestSucceed,
    message: mutationError ? mutationError.message : undefined
  }

  let verifyTitleApiCallStatus:IApiCallState = {      
    isRequestInProgress: filterStatusQueryLoading,
    isRequestSucceed: isVerifyTitleRequestSucceed,
    message: verifyTitleRequestMessage
  }

  return <EditableStatusForm
          formMode="Create"
          isFormReadonly={formReadonly}
          statusModel={statusModel}
          verifyUniqueTitle={verifyUniqueTitle}
          saveStatus = {saveInquiryStatus}
          saveApiCallStatus={saveApiCallStatus}
          uniqueTitleVerifyApiCallStatus={verifyTitleApiCallStatus}
          resetForm={resetForm}
        />
}

const showNotify = (toastId: any, isSucceed: boolean, message: string) => {

  if (isSucceed) {
    toastId = toast.success(message, {
      autoClose: 5000, 
      position: toast.POSITION.BOTTOM_RIGHT
    });
    // if (!toastId || !toast.isActive(toastId)) {
    //   toastId = toast.success(message, {
    //     autoClose: 2000, position: 'bottom-right'
    //   });
    // }
  } else {
    toastId = toast.error(message, { 
      autoClose: 5000, 
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }

  return toastId;
};


export default CreateStatus;
