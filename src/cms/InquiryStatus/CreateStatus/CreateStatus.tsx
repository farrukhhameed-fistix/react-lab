import React, { Component } from "react";
import EditableStatusForm from "./EditableStatusForm";
import { StatusModel } from "./StatusModel";
import { ApplicationState } from "../../../store";
import { InquiryStatusModel } from "../StatusList/InquiryStatusModel";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { CreateRequestAction } from "./actions";

interface IState {
  statusModel: StatusModel;
  isTitleUnique?: boolean;
  isTitleUniuqueVerifyRequestInProgress?: boolean;
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
      statusModel: statusModel
    };
  }

  verifyUniqueTitle = (title: string) => {
    this.setState({
      isTitleUniuqueVerifyRequestInProgress: true,
      isTitleUnique: undefined
    });
    setTimeout(() => {
      this.setState({
        isTitleUnique: true,
        isTitleUniuqueVerifyRequestInProgress: false
      });
    }, 2000);
  };

  render() {
    return (
      <EditableStatusForm
        formMode="Create"
        statusModel={this.state.statusModel}
        verifyUniqueTitle={this.verifyUniqueTitle}
        isTitleUniuqueVerifyRequestInProgress={
          this.state.isTitleUniuqueVerifyRequestInProgress
        }
        isTitleUnique={this.state.isTitleUnique}
        saveStatus = {this.props.saveInquiryStatus}
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
