import React, { Component } from "react";
import EditableStatusForm from "./EditableStatusForm";
import { StatusModel } from "./StatusModel";
import { ApplicationState } from "../../../store";
import { InquiryStatusModel } from "../StatusList/InquiryStatusModel";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { AddInquiryStatusToList } from "../StatusList/actions";
import * as apiGateway from "../apiGateway";
import ApiResult from '../ApiResult'
import IApiCallState from "../ApiCallState";
import { toast } from "react-toastify";

interface IState {
  statusModel: StatusModel;  
  saveApiCallStatus: IApiCallState,
  verifyTitleApiCallStatus: IApiCallState
  formReadonly?: boolean;
}



interface IStateProp {
  inquiryStatusList: InquiryStatusModel[];
}

interface IDispatchProp {
  AddInquiryStatusToList: (statusModel: StatusModel) => void;
}

type Props = IStateProp & IDispatchProp;

class CreateStatus extends Component<Props, IState> {  
  toastId: number = -1;

  constructor(props: Props) {
    super(props);
    this.state = this.inItState();
  }

  inItState(): IState {
    
    let statusModel = new StatusModel();
    statusModel.color = "#a2744c";
    return {
      statusModel: statusModel,
      saveApiCallStatus: {},
      verifyTitleApiCallStatus: {},
      formReadonly: false
    };
  }

  verifyUniqueTitle = (title: string) => {    

    this.setState((prevState, props) => {
      return {        
        verifyTitleApiCallStatus: Object.assign<IApiCallState,IApiCallState,IApiCallState>({}, prevState.verifyTitleApiCallStatus, {
          isRequestInProgress: true,
          isRequestSucceed: undefined,
          message: undefined
        })
      };
    });

    apiGateway.getStatusByTitle(title)
      .then((result: ApiResult) => {

        if (result.isSucceed && result.object) {

          this.setState(((prevState, props) => {
            return {
              verifyTitleApiCallStatus: Object.assign<IApiCallState,IApiCallState,IApiCallState>({}, prevState.verifyTitleApiCallStatus, {
                isRequestInProgress: false,
                isRequestSucceed: true,
                message: 'Status with same title already exist'
              })
            }
          }));
        } else if (result.isSucceed && !result.object) {

          this.setState(((prevState, props) => {
            return {
              verifyTitleApiCallStatus: Object.assign<IApiCallState,IApiCallState,IApiCallState>({}, prevState.verifyTitleApiCallStatus, {
                isRequestInProgress: false,
                isRequestSucceed: true,
                message: ''
              })
            }
          }));
        } else {
          this.setState(((prevState, props) => {
            return {
              verifyTitleApiCallStatus: Object.assign<IApiCallState,IApiCallState,IApiCallState>({}, prevState.verifyTitleApiCallStatus, {
                isRequestInProgress: false,
                isRequestSucceed: false,
                message: undefined
              })
            }
          }));
        }        
      }).catch(error => {

        this.setState(((prevState, props) => {
          return {
            verifyTitleApiCallStatus: Object.assign<IApiCallState,IApiCallState,IApiCallState>({}, prevState.verifyTitleApiCallStatus, {
              isRequestInProgress: false,
              isRequestSucceed: false,
              message: undefined
            })
          }
        }));
      });
  };

  saveInquiryStatus = (statusModel: StatusModel) => {

    this.setState((prevState, props) => {
      return {        
        saveApiCallStatus: Object.assign<IApiCallState,IApiCallState,IApiCallState>({}, prevState.saveApiCallStatus, {
          isRequestInProgress: true,
          isRequestSucceed: undefined,
          message: undefined
        })
      };
    });

    apiGateway.saveNewInquiryStatus(statusModel)
      .then((result: ApiResult) => {
        let isFormReadonly = this.state.formReadonly;
        let statusModel = this.state.statusModel;

        if (result.isSucceed){
          if(result.object){            
            statusModel = result.object;
            this.props.AddInquiryStatusToList(result.object);
          }
          this.toastId = this.showNotify(this.toastId, true, "Record saved successfully");
          isFormReadonly = true;
        }else{
          isFormReadonly = false;
        }

        this.setState(((prevState, props) => {
          return {
            statusModel: statusModel,
            formReadonly: isFormReadonly,
            saveApiCallStatus: Object.assign<IApiCallState,IApiCallState,IApiCallState>({}, prevState.saveApiCallStatus, {
              isRequestInProgress: false,
              isRequestSucceed: result.isSucceed,
              message: result.message
            })

          }
        }));
      }).catch(error => {
        this.setState(((prevState, props) => {
          return {
            formReadonly: false,
            saveApiCallStatus: Object.assign<IApiCallState,IApiCallState,IApiCallState>({}, prevState.saveApiCallStatus, {
              isRequestInProgress: false,
              isRequestSucceed: false,
              message: error
            })
          }
        }));
      });

    // dispatch(CreateRequestAction(statusModel));
  }

  resetForm = () => {

    this.setState(this.inItState())
    // this.setState(((prevState, props) => {
    //   return {
    //     saveApiCallStatus: Object.assign<IApiCallState, IApiCallState, IApiCallState>({}, prevState.saveApiCallStatus, {
    //       isRequestInProgress: undefined,
    //       isRequestSucceed: undefined,
    //       message: undefined
    //     })
    //   }
    // }));
  }
  
  showNotify = (toastId: number, isSucceed: boolean, message: string) => {

    if (isSucceed) {
      if (!toast.isActive(toastId)) {
        toastId = toast.success(message, {
          autoClose: 2000, position: 'bottom-right'
        });
      }
    } else {
      // toast.error(message, { autoClose: 5000, position: 'bottom-right' });
    }

    return toastId;
  };

  render() {
    return (
      <EditableStatusForm
        formMode="Create"
        isFormReadonly={this.state.formReadonly}
        statusModel={this.state.statusModel}
        verifyUniqueTitle={this.verifyUniqueTitle}
        saveStatus = {this.saveInquiryStatus}
        saveApiCallStatus={this.state.saveApiCallStatus}
        uniqueTitleVerifyApiCallStatus={this.state.verifyTitleApiCallStatus}
        resetForm={this.resetForm}
      />
    );
  }
}

const mapStateToProps = (appState: ApplicationState): IStateProp => {
  return {
    inquiryStatusList: appState.InquiryStatus.inquiryStatusList.statuses
  };
};
const mapDispatchToProps = (dispatch: Dispatch): IDispatchProp => ({
  AddInquiryStatusToList: (model: InquiryStatusModel) => dispatch(AddInquiryStatusToList(model))
})

const mapDispatchToProps2 = (dispatch: Dispatch): IDispatchProp => {
  return {
    AddInquiryStatusToList: (model: InquiryStatusModel) => dispatch(AddInquiryStatusToList(model))
  }
};

const mapDispatchToProps1:IDispatchProp = ({
  AddInquiryStatusToList: AddInquiryStatusToList
});

export default connect<IStateProp, IDispatchProp, any, ApplicationState>(
  mapStateToProps,
  mapDispatchToProps
)(CreateStatus);
