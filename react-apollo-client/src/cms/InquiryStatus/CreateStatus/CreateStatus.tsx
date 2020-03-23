import React, { useState, useEffect } from "react";
import EditableStatusForm from "../Shared/EditableStatusForm";
import { StatusViewModel } from "../Shared/StatusViewModel";

import IApiCallState from "../Shared/ApiCallState";
import { toast } from "react-toastify";
import {useCreateStatusMutation, CreateStatusMutation, CreateStatusDocument, AllStatusesDocument, AllStatusesQuery, useFilterStatusesQuery, useFilterStatusesLazyQuery} from '../../../generated/graphql';
import random from 'random';
import { GraphQLError } from "graphql/error/GraphQLError";
import { FetchResult } from "apollo-boost";
import {DataProxy} from "apollo-cache"

const CreateStatus:React.FC = () => {

  let toastId:any = null;
  
  let vm = new StatusViewModel();
  vm.color = "#a2744c";

  const [statusViewModel, setStatusViewModel] = useState(vm);    
  const [formReadonly, setFormReadonly] = useState(false);  
  const [isRequestSucceed, setIsRequestSucceed] = useState<boolean>();  
  const [isVerifyTitleRequestSucceed, setIsVerifyTitleRequestSucceed] = useState<boolean>();  
  const [verifyTitleRequestMessage, setVerifyTitleRequestMessage] = useState<string>();

  
  const [addStatus, { loading: mutationLoading, error: mutationError }] = useCreateStatusMutation({ 
    update(cache:DataProxy, { data }:FetchResult<CreateStatusMutation>){    
      if(data){        
        try {
          const cacheData = cache.readQuery<AllStatusesQuery>({ query: AllStatusesDocument });                  
          if(cacheData && cacheData.allStatuses){
            
            cacheData.allStatuses.push(data.createStatus);
  
            cache.writeQuery({
              query: AllStatusesDocument,
              data: cacheData,
            });
          }  
        } catch (error) {
         console.log(error); 
        }        

        if(data.createStatus){
          vm.id =  parseInt(data.createStatus.id)
          vm.orderIndex = data.createStatus.orderIndex;
          vm.title = data.createStatus.title;
          vm.description = data.createStatus.description;
          vm.color = data.createStatus.color;
          vm.isActive = data.createStatus.isActive;
          
          setStatusViewModel(vm);
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

  const saveInquiryStatus = async(vmToSave: StatusViewModel) => {
    try {
      await addStatus({
        variables:{
          id:random.int(1,100), 
          title:vmToSave.title, 
          description: vmToSave.description, 
          color: vmToSave.color, 
          orderIndex: 1, 
          isActive: vmToSave.isActive
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
    vm = new StatusViewModel();
    vm.color = "#a2744c";

    setStatusViewModel(vm);          
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
          statusModel={statusViewModel}
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
