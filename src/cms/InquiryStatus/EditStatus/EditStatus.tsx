import React, { Component } from "react";
import EditableStatusForm from "../Shared/EditableStatusForm";
import { StatusViewModel } from "../Shared/StatusViewModel";
import { ApplicationState } from "../../../store";
import { InquiryStatusModel } from "../StatusList/InquiryStatusModel";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { UpdateInquiryStatusToList } from "../StatusList/actions";
import * as apiGateway from "../Shared/ApiGateway";
import ApiResult from '../Shared/ApiResult'
import IApiCallState from "../Shared/ApiCallState";
import { toast } from "react-toastify";
import {getStatusById} from '../Shared/Service';

interface IState {
  statusModel: StatusViewModel;  
  loadApiCallStatus: IApiCallState,
  saveApiCallStatus: IApiCallState,
  verifyTitleApiCallStatus: IApiCallState
  formReadonly?: boolean;
}


interface IProp {
  id: number;
}

interface IStateProp {
  inquiryStatusList: InquiryStatusModel[];
}

interface IDispatchProp {
  UpdateInquiryStatusInList: (statusModel: StatusViewModel) => void;
}

type Props = IProp & IStateProp & IDispatchProp;

class EditStatus extends Component<Props, IState> {  
  toastId: number = -1;

  constructor(props: Props) {
    super(props);
    this.state = this.inItState();
  }

  inItState(): IState {
    
    let statusModel = new StatusViewModel();
    statusModel.color = "#a2744c";
    return {
      statusModel: statusModel,
      loadApiCallStatus: {},
      saveApiCallStatus: {},
      verifyTitleApiCallStatus: {},
      formReadonly: true
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

  saveInquiryStatus = (statusModel: StatusViewModel) => {

    this.setState((prevState, props) => {
      return {        
        saveApiCallStatus: Object.assign<IApiCallState,IApiCallState,IApiCallState>({}, prevState.saveApiCallStatus, {
          isRequestInProgress: true,
          isRequestSucceed: undefined,
          message: undefined
        })
      };
    });

    apiGateway.updateInquiryStatus(statusModel)
      .then((result: ApiResult) => {
        let isFormReadonly = this.state.formReadonly;
        let statusModel = this.state.statusModel;

        if (result.isSucceed){
          if(result.object){            
            statusModel = result.object;
            this.props.UpdateInquiryStatusInList(result.object);
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

  componentDidMount(){
    this.setState((prevState, props) => {
      return {        
        loadApiCallStatus: Object.assign<IApiCallState,IApiCallState,IApiCallState>({}, prevState.loadApiCallStatus, {
          isRequestInProgress: true,
          isRequestSucceed: undefined,
          message: undefined
        })
      };
    });

    getStatusById(this.props.id).then(result => {

      if (result.isSucceed && result.object) {
      
          let model = new StatusViewModel();
          model.id = result.object.id;
          model.title = result.object.title;
          model.color = result.object.color;
          model.isActive = result.object.isActive;               
        

        this.setState(((prevState, props) => {
          return {
            loadApiCallStatus: Object.assign<IApiCallState,IApiCallState,IApiCallState>({}, prevState.loadApiCallStatus, {
              isRequestInProgress: false,
              isRequestSucceed: true,
              message: ''
            }),
            statusModel: model,
            formReadonly: false
          }
        }));
      } else{

        this.setState(((prevState, props) => {
          return {
            loadApiCallStatus: Object.assign<IApiCallState,IApiCallState,IApiCallState>({}, prevState.loadApiCallStatus, {
              isRequestInProgress: false,
              isRequestSucceed: result.isSucceed,
              message: result.message
            })
          }
        }));

      }

      
    });
  } 
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


const mapDispatchToProps = (dispatch: Dispatch): IDispatchProp => ({
  UpdateInquiryStatusInList: (model: InquiryStatusModel) => dispatch(UpdateInquiryStatusToList(model))
})


export default connect<IStateProp, IDispatchProp, any, ApplicationState>(
  null,
  mapDispatchToProps
)(EditStatus);
