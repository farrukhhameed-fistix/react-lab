import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert, Card, CardBody, CardHeader, Col, Row, Table, Button } from "reactstrap";
import Loader from 'react-loader'

import { FetchListRequestSucceed } from "./actions";
import { InquiryStatusModel } from "./InquiryStatusModel";
import StatusListItem from "./statusListItem";
import { ApplicationState } from "../../../store";
import { ThunkDispatch } from "redux-thunk";
import { FetchListRequestThunk } from "./asyncActions";
import { Message, IMessage, MessageType } from "../../../shared/components/Message";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface IState {}

interface IOwnProps {}

interface IDispatchProps {  
  getAllStatuses: () => void;
}

interface IStateProps {
  statuses: Array<InquiryStatusModel>;
  showLoader: boolean;
  errors: string[]
}

const Div = styled("div")`
`;

type Props = IStateProps & IOwnProps & IDispatchProps;
class StatusListComponent extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = this.getInItState(props);
  }

  getInItState(props: Props): IState {
    return {
      Statuses: []
    };
  }

  componentDidMount = () => {    
    if (!this.props.statuses || this.props.statuses.length <= 0){
     this.props.getAllStatuses();    
    }
  };

  render() {
    let { errors } = this.props;
    let messages: IMessage[] = errors.map(error => { return { type: MessageType.error, message: error } });
    
    return (
      <React.Fragment>
        <Loader loaded={this.props.showLoader} />
        <Message messages = {messages}></Message>
        <Div className="animated fadeIn">
          <Row>
            <Col xl={12}>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify" /> Inquiry Statuses
                  <div className="card-header-actions">
                    <Link to="/cms/settings/inquiry-status/create">
                      <Button color="primary" className="px-4">Create</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardBody>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th scope="col">id</th>
                        <th scope="col">title</th>
                        <th scope="col">description</th>
                        <th scope="col">color</th>
                        <th scope="col">order</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.statuses.map((status, index) => (
                        <StatusListItem key={index} {...status} />
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Div>
      </React.Fragment>
    );
  } 
}

const mapStateToProps = (state: ApplicationState, ownProps: IOwnProps): IStateProps => {
  return {
    statuses: state.InquiryStatus.inquiryStatusList.statuses,
    showLoader: !state.InquiryStatus.inquiryStatusList.loading,
    errors: state.InquiryStatus.inquiryStatusList.errors
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>,ownProps: IOwnProps): IDispatchProps => {
  return {
    getAllStatuses: async () => {
      dispatch(FetchListRequestThunk())      
    } 
  };
};

export default connect<IStateProps, IDispatchProps, IOwnProps, ApplicationState>(
  mapStateToProps,
  mapDispatchToProps
)(StatusListComponent);
