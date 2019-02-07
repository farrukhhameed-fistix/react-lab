import React, { Component } from "react";
import EditableStatusForm from "./EditableStatusForm";
import { StatusModel } from "./StatusModel";
import { ApplicationState } from "../../../store";
import { InquiryStatusModel } from "../StatusList/InquiryStatusModel";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { CreateRequestAction } from "./actions";
import * as apiGateway from "../apiGateway";
import ApiResult from '../ApiResult'
import IApiCallState from "../ApiCallState";

interface IState {
  statusModel: StatusModel;
  isTitleUnique?: boolean;
  isTitleUniuqueVerifyRequestInProgress?: boolean;
  saveApiCallStatus: IApiCallState,
  verifyTitleApiCallStatus: IApiCallState
}



interface IStateProp {
  inquiryStatusList: InquiryStatusModel[];
}

interface IDispatchProp {
  saveInquiryStatus: (statusModel: StatusModel) => void;
}

type Props = IStateProp & IDispatchProp;

class CreateStatus extends Component<Props, IState> {
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
      verifyTitleApiCallStatus: {}
    };
  }

  verifyUniqueTitle = (title: string) => {
    // this.setState({
    //   isTitleUniuqueVerifyRequestInProgress: true,
    //   isTitleUnique: undefined
    // });

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

        this.setState(((prevState, props) => {
          return {
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

  render() {
    return (
      <EditableStatusForm
        formMode="Create"
        statusModel={this.state.statusModel}
        verifyUniqueTitle={this.verifyUniqueTitle}        
        isTitleUnique={this.state.isTitleUnique}
        saveStatus = {this.saveInquiryStatus}
        saveApiCallStatus={this.state.saveApiCallStatus}
        uniqueTitleVerifyApiCallStatus={this.state.verifyTitleApiCallStatus}
      />
    );
  }
}

const mapStateToProps = (appState: ApplicationState): IStateProp => {
  return {
    inquiryStatusList: appState.InquiryStatus.inquiryStatusList.statuses
  };
};
const mapDispatchToProps = (dispatch: Dispatch): IDispatchProp => {
  return {
    saveInquiryStatus: (statusModel: StatusModel) => {
      dispatch(CreateRequestAction(statusModel));
    }
  };
};

export default connect<IStateProp, IDispatchProp, any, ApplicationState>(
  mapStateToProps,
  mapDispatchToProps
)(CreateStatus);
