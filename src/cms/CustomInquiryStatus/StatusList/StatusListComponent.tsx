import React, { Component } from "react";
import { connect } from "react-redux";

import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";

import { FetchListRequestSucceed } from "./actions";
import { InquiryStatusModel } from "./InquiryStatusModel";
import StatusListItem from "./statusListItem";
import { ApplicationState } from "../../../store";
import { ThunkDispatch } from "redux-thunk";
import { FetchListRequestThunk } from "./asyncActions";

interface IState {}

interface IOwnProps {
  message: string;
}

interface IDispatchProps {
  FetchListRequestSucceed: (payload: InquiryStatusModel[]) => void;
  FetchListRequest: () => void;
}

interface IStateProps {
  Statuses: Array<InquiryStatusModel>;
}

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
     this.props.FetchListRequest();
    // let statuses = new Array<InquiryStatusModel>();
    //     statuses.push(new InquiryStatusModel(1, "stats 1", "#123456"));
    //     statuses.push(new InquiryStatusModel(2, "stats 2", "#123456"));
    //     statuses.push(new InquiryStatusModel(3, "stats 3", "#123456"));
    //     this.props.FetchListRequestSucceed(statuses);
  };

  render() {
    return (
      <React.Fragment>
        <div className="animated fadeIn">
          <Row>
            <Col xl={6}>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify" /> Inquiry Statuses
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
                      {this.props.Statuses.map((status, index) => (
                        <StatusListItem key={index} {...status} />
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  } 
}

const mapStateToProps = (state: ApplicationState, ownProps: IOwnProps): IStateProps => {
  return {
    Statuses: state.InquiryStatus.inquiryStatusList.statuses
  };
};

const mapDispatchToProps3 = {

  FetchListRequest: () => {

  },
  FetchListRequestSucceed: (data:any) => {
    return FetchListRequestSucceed(data)
  }
}


const mapDispatchToProps1 = (dispatch:any) => ({
  
    FetchListRequest: () => {

    },
    FetchListRequestSucceed :(data: any) =>{
      dispatch(FetchListRequestSucceed(data))
    }
  
})
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>,ownProps: IOwnProps): IDispatchProps => {
  return {
    FetchListRequest: async () => {
      await dispatch(FetchListRequestThunk())      
      console.log('thunk call completed?')
    },
    FetchListRequestSucceed : (data)=>{
      dispatch(FetchListRequestSucceed(data))
    } 
  };
};

export default connect<IStateProps, IDispatchProps, IOwnProps, ApplicationState>(
  mapStateToProps,
  mapDispatchToProps
)(StatusListComponent);
