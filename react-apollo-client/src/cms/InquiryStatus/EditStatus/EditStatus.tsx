import React, { useState, useEffect } from "react";
import EditableStatusForm from "../Shared/EditableStatusForm";
import { StatusViewModel } from "../Shared/StatusViewModel";

import IApiCallState from "../Shared/ApiCallState";
import { toast } from "react-toastify";
import { useUpdateStatusMutation, AllStatusesDocument, AllStatusesQuery,  useFilterStatusesLazyQuery, UpdateStatusMutation, useGetStatusQuery} from '../../../generated/graphql';
import { GraphQLError } from "graphql/error/GraphQLError";
import { FetchResult } from "apollo-boost";
import {DataProxy} from "apollo-cache"
import { Spinner } from "reactstrap";

interface IProp{
  id: string
}

const EditStatus:React.FC<IProp> = ({id}) => {

  let toastId:any = null;
  let statusVM = new StatusViewModel();
  statusVM.color = "#a2744c";
   
  const [formReadonly, setFormReadonly] = useState(false);  
  const [isRequestSucceed, setIsRequestSucceed] = useState<boolean>();  
  const [isVerifyTitleRequestSucceed, setIsVerifyTitleRequestSucceed] = useState<boolean>();  
  const [verifyTitleRequestMessage, setVerifyTitleRequestMessage] = useState<string>();

  const { data:getStatusQueryResult, loading:getStatusQueryLoading, error:getStatusQueryError } = useGetStatusQuery({variables:{id:id}}); 

  const [updateStatus, { loading: mutationLoading, error: mutationError }] = useUpdateStatusMutation({ 
    update(cache:DataProxy, { data }:FetchResult<UpdateStatusMutation>){    
      if(data){
        const cacheData = cache.readQuery<AllStatusesQuery>({ query: AllStatusesDocument });                  
        if(cacheData && cacheData.allStatuses){
          
          var index = cacheData.allStatuses.findIndex(x => x?.id == statusVM.id.toString())
          if(index) {
            cacheData.allStatuses[index] =  data.updateStatus;

            cache.writeQuery({
              query: AllStatusesDocument,
              data: cacheData,
            });
          }
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
    if (!filterStatusQueryLoading && !filterStatusQueryError &&  filterStatusesQueryData && filterStatusesQueryData.allStatuses && filterStatusesQueryData.allStatuses.length >= 1 && filterStatusesQueryData.allStatuses[0]?.id !== statusVM.id.toString()){
      messages = 'Status with same title already exist';
    }else{
      messages = undefined;
    } 
    setVerifyTitleRequestMessage(messages);
  },[filterStatusesQueryData]);
  
    
  const verifyUniqueTitle = (title: string) => {

    filterTheStatuses({ variables: { filter: { title: title} }});
  }

  const saveInquiryStatus = async(vm: StatusViewModel) => {
    try {
      await updateStatus({
        variables:{
          id:vm.id.toString(),
          title:vm.title, 
          description: vm.description, 
          color: vm.color, 
          orderIndex: vm.orderIndex ?  vm.orderIndex : 1, 
          isActive: vm.isActive
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

    //setStatusModel(statusVM);          
    setFormReadonly(false);
    setIsRequestSucceed(undefined);
    setIsVerifyTitleRequestSucceed(undefined);
    setVerifyTitleRequestMessage(undefined);
  }


  let errorMessages:string = "";
  if (getStatusQueryError){ 
    if(getStatusQueryError.graphQLErrors) {        
      getStatusQueryError.graphQLErrors.forEach((err:GraphQLError) => {
        errorMessages = errorMessages + err.message;
      });
    } else{
      errorMessages = getStatusQueryError.message;
    }

     showNotify(toastId,false,errorMessages);

     return<></>;
  }
  
  if(getStatusQueryLoading){
    return <Spinner size="sm" color="primary"/>;
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

  statusVM.id =  parseInt(getStatusQueryResult?.Status?.id || "0");
  statusVM.title = getStatusQueryResult?.Status?.title || "";
  statusVM.description = getStatusQueryResult?.Status?.description || "";
  statusVM.color = getStatusQueryResult?.Status?.color || "#a2744c";
  statusVM.isActive = getStatusQueryResult?.Status?.isActive || true;
  statusVM.orderIndex = getStatusQueryResult?.Status?.orderIndex || 1;

  return <EditableStatusForm
          formMode="Create"
          isFormReadonly={formReadonly}
          statusModel={statusVM}
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
  } else {
    toastId = toast.error(message, { 
      autoClose: 5000, 
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }

  return toastId;
};

export default EditStatus;
