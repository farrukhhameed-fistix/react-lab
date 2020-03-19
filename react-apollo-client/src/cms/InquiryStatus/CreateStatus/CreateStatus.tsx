import React, { Component, FunctionComponent, useState, useEffect } from "react";
import EditableStatusForm from "../Shared/EditableStatusForm";
import { StatusViewModel } from "../Shared/StatusViewModel";
//import { ApplicationState } from "../../../store";
import { InquiryStatusModel } from "../StatusList/InquiryStatusModel";
//import { Dispatch } from "redux";
//import { connect } from "react-redux";
//import { AddInquiryStatusToList } from "../StatusList/actions";
//import * as apiGateway from "../Shared/ApiGateway";
import ApiResult from '../Shared/ApiResult'
import IApiCallState from "../Shared/ApiCallState";
import { toast } from "react-toastify";
import {CreateStatusComponent, useCreateStatusMutation, CreateStatusMutation, CreateStatusDocument, AllStatusesDocument} from '../../../generated/graphql';
import { useMutation } from "@apollo/react-hooks";
import random from 'random';
import { ApolloError } from "apollo-boost";
import { GraphQLError } from "graphql/error/GraphQLError";

interface IState {
  statusModel: StatusViewModel;  
  saveApiCallStatus: IApiCallState,
  verifyTitleApiCallStatus: IApiCallState
  formReadonly?: boolean;
}



interface IStateProp {
  inquiryStatusList: InquiryStatusModel[];
}

interface IDispatchProp {
  AddInquiryStatusToList: (statusModel: StatusViewModel) => void;
}

type Props = IStateProp //& IDispatchProp;

const CreateStatus:React.FC = () => {

  let statusVM = new StatusViewModel();
  statusVM.color = "#a2744c";

  const [statusModel, setStatusModel] = useState(statusVM);
  //const [saveApiCallStatus, setSaveApiCallStatus] = useState({});  
  const [verifyTitleApiCallStatus, setVerifyTitleApiCallStatus] = useState({});
  const [formReadonly, setFormReadonly] = useState(false);
  //const [saveApiCallStatus, setSaveApiCallStatus] = useState({});  
  
      
  const [addStatus, { loading: mutationLoading, error: mutationError }] = useMutation(
    CreateStatusDocument,
    {     
      update(cache, { data: {addStatus} }){
        const data:any = cache.readQuery({ query: AllStatusesDocument });          
        data.allStatuses.push(addStatus);

        cache.writeQuery({
          query: AllStatusesDocument,
          data: data,
        });
      }  
    }
    );

    const verifyUniqueTitle = () => {
      setVerifyTitleApiCallStatus(Object.assign<IApiCallState,IApiCallState,IApiCallState>({}, verifyTitleApiCallStatus, {
        isRequestInProgress: true,
        isRequestSucceed: undefined,
        message: undefined
      }))
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
      } catch (error) {
        console.log(error);        
      }     

    }

    const resetForm = () => {
      statusVM = new StatusViewModel();
      statusVM.color = "#a2744c";

      setStatusModel(statusVM);
      //setSaveApiCallStatus({});
      setVerifyTitleApiCallStatus({});
      setFormReadonly(false);

    }

    let saveApiCallStatus:IApiCallState = {      
      isRequestInProgress: mutationLoading,
      isRequestSucceed: mutationError ? false : undefined,
      message: mutationError ? mutationError.message : undefined
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


export default CreateStatus;

// const mapStateToProps = (appState: ApplicationState): IStateProp => {
//   return {
//     inquiryStatusList: appState.InquiryStatus.inquiryStatusList.statuses
//   };
// };
// const mapDispatchToProps = (dispatch: Dispatch): IDispatchProp => ({
//   AddInquiryStatusToList: (model: InquiryStatusModel) => dispatch(AddInquiryStatusToList(model))
// })

// const mapDispatchToProps2 = (dispatch: Dispatch): IDispatchProp => {
//   return {
//     AddInquiryStatusToList: (model: InquiryStatusModel) => dispatch(AddInquiryStatusToList(model))
//   }
// };

// const mapDispatchToProps1:IDispatchProp = ({
//   AddInquiryStatusToList: AddInquiryStatusToList
// });

// export default connect<IStateProp, IDispatchProp, any, ApplicationState>(
//   mapStateToProps,
//   mapDispatchToProps
// )(CreateStatus);
